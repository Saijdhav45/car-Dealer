import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

interface CustomerProfile {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  source?: string;
}

interface AuthContextType {
  user: User | null;
  customerProfile: CustomerProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isGateOpen: boolean;
  gateIntent: string | null;
  openLoginGate: (intentMessage?: string) => void;
  closeLoginGate: () => void;
  loginWithOTP: (phoneOrEmail: string, isPhone: boolean) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phoneOrEmail: string, token: string, isPhone: boolean, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  simulateGuestLogin: (name: string, phone: string, email?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(() => {
    const saved = localStorage.getItem("patil_dealers_customer");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("patil_dealers_admin_demo") === "true";
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [gateIntent, setGateIntent] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchCustomerProfile(session.user.id);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchCustomerProfile(session.user.id);
      } else {
        setIsAdmin(false);
        setCustomerProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("admin_users")
        .select("id, role")
        .eq("id", userId)
        .single();
      if (data) {
        setIsAdmin(true);
      }
    } catch {
      // Fallback
    }
  };

  const fetchCustomerProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (data) {
        setCustomerProfile(data);
      }
    } catch {
      // Ignore
    }
  };

  const openLoginGate = (intentMessage?: string) => {
    setGateIntent(intentMessage || "Please sign in to unlock full vehicle specs, inspection reports, and instant test drive booking.");
    setIsGateOpen(true);
  };

  const closeLoginGate = () => {
    setIsGateOpen(false);
    setGateIntent(null);
  };

  const loginWithOTP = async (phoneOrEmail: string, isPhone: boolean) => {
    if (!isSupabaseConfigured()) {
      // Demo / simulation mode
      return { success: true };
    }

    try {
      if (isPhone) {
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneOrEmail.startsWith("+") ? phoneOrEmail : `+91${phoneOrEmail}`,
        });
        if (error) return { success: false, error: error.message };
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: phoneOrEmail,
        });
        if (error) return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to send OTP" };
    }
  };

  const verifyOTP = async (phoneOrEmail: string, token: string, isPhone: boolean, fullName?: string) => {
    if (!isSupabaseConfigured()) {
      // Demo login
      const mockProf: CustomerProfile = {
        id: "cust-demo",
        full_name: fullName || "Valued Customer",
        phone: isPhone ? phoneOrEmail : "+91 98234 56789",
        email: !isPhone ? phoneOrEmail : undefined,
        source: "website_gate",
      };
      setCustomerProfile(mockProf);
      localStorage.setItem("patil_dealers_customer", JSON.stringify(mockProf));
      closeLoginGate();
      return { success: true };
    }

    try {
      const verifyPayload: any = {
        token,
        type: isPhone ? "sms" : "email",
      };
      if (isPhone) {
        verifyPayload.phone = phoneOrEmail.startsWith("+") ? phoneOrEmail : `+91${phoneOrEmail}`;
      } else {
        verifyPayload.email = phoneOrEmail;
      }

      const { data, error } = await supabase.auth.verifyOtp(verifyPayload);
      if (error) return { success: false, error: error.message };

      if (data?.user) {
        // Create/update customer record
        const { data: customerData } = await supabase
          .from("customers")
          .upsert({
            user_id: data.user.id,
            full_name: fullName || "Registered Visitor",
            phone: isPhone ? phoneOrEmail : (data.user.phone || ""),
            email: !isPhone ? phoneOrEmail : (data.user.email || ""),
            source: "website_gate",
          })
          .select()
          .single();

        if (customerData) {
          setCustomerProfile(customerData);
        }
      }

      closeLoginGate();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "OTP verification failed" };
    }
  };

  // Instant guest verification for seamless local testing without Supabase credentials
  const simulateGuestLogin = (name: string, phone: string, email?: string) => {
    const prof: CustomerProfile = {
      id: "cust-" + Date.now(),
      full_name: name,
      phone,
      email,
      source: "website_gate",
    };
    setCustomerProfile(prof);
    localStorage.setItem("patil_dealers_customer", JSON.stringify(prof));
    closeLoginGate();
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setCustomerProfile(null);
    setIsAdmin(false);
    localStorage.removeItem("patil_dealers_customer");
    localStorage.removeItem("patil_dealers_admin_demo");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        customerProfile,
        isAdmin,
        isLoading,
        isGateOpen,
        gateIntent,
        openLoginGate,
        closeLoginGate,
        loginWithOTP,
        verifyOTP,
        logout,
        simulateGuestLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
