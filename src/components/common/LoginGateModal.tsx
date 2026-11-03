import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, ShieldCheck, Phone, Mail, ArrowRight, CheckCircle2, Car } from "lucide-react";
import { DEALER_CONFIG } from "../../config/dealerConfig";

export const LoginGateModal: React.FC = () => {
  const { isGateOpen, closeLoginGate, loginWithOTP, verifyOTP, simulateGuestLogin, gateIntent } = useAuth();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [inputValue, setInputValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isGateOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your name");
      return;
    }
    if (!inputValue.trim()) {
      setErrorMsg(method === "phone" ? "Please enter your 10-digit phone number" : "Please enter your email");
      return;
    }

    setLoading(true);
    const res = await loginWithOTP(inputValue, method === "phone");
    setLoading(false);

    if (res.success) {
      setStep("otp");
    } else {
      setErrorMsg(res.error || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrorMsg("Please enter the verification code");
      return;
    }
    setLoading(true);
    const res = await verifyOTP(inputValue, otp, method === "phone", fullName);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Invalid code. Please re-enter.");
    }
  };

  const handleFastDemoLogin = () => {
    simulateGuestLogin(
      fullName || "Customer from Nanded",
      inputValue || "9823456789",
      method === "email" ? inputValue : "customer@patildealers.com"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-white">
        {/* Close Button */}
        <button
          onClick={closeLoginGate}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-2 text-rose-500 font-semibold tracking-wider text-xs uppercase">
          <Car size={16} />
          {DEALER_CONFIG.name} • {DEALER_CONFIG.city}
        </div>

        <h3 className="text-xl font-bold text-slate-100">
          {step === "input" ? "Access Full Car Details" : "Verify Your Number"}
        </h3>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          {gateIntent || "Enter your contact details to inspect full service records, RTO status, and instant WhatsApp deals."}
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">
            {errorMsg}
          </div>
        )}

        {step === "input" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Patil"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
              />
            </div>

            {/* Method switch */}
            <div className="flex p-1 bg-slate-800 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  method === "phone" ? "bg-rose-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Phone size={14} /> Phone OTP
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  method === "email" ? "bg-rose-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mail size={14} /> Email OTP
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {method === "phone" ? "Mobile Number (India)" : "Email Address"}
              </label>
              <div className="relative">
                {method === "phone" && (
                  <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">
                    +91
                  </span>
                )}
                <input
                  type={method === "phone" ? "tel" : "email"}
                  required
                  placeholder={method === "phone" ? "98234 56789" : "you@example.com"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`w-full py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition ${
                    method === "phone" ? "pl-12 pr-3.5" : "px-3.5"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Sending Code..." : "Continue"} <ArrowRight size={16} />
            </button>

            {/* Instant Demo Bypass */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleFastDemoLogin}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer"
              >
                ⚡ Fast Demo Access (Instant Unlock without SMS)
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Enter 6-Digit OTP sent to {inputValue}
              </label>
              <input
                type="text"
                maxLength={6}
                autoFocus
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep("input")}
                className="w-1/3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition"
              >
                Change
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Unlock"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleFastDemoLogin}
              className="w-full text-center text-xs text-rose-400 hover:text-rose-300 underline font-medium"
            >
              ⚡ Click here for Instant Demo Access
            </button>
          </form>
        )}

        {/* Trust Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>Zero Spam Policy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>Instant Price Unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
};
