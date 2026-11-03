import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DEALER_CONFIG } from "../../config/dealerConfig";
import { THEME_CONFIG } from "../../config/theme";
import {
  LayoutDashboard,
  Car,
  ShoppingCart,
  TrendingUp,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Inventory Cars", path: "/admin/cars", icon: <Car size={18} /> },
    { label: "Purchase Records", path: "/admin/purchases", icon: <ShoppingCart size={18} /> },
    { label: "Sales & Profits", path: "/admin/sales", icon: <TrendingUp size={18} /> },
    { label: "Enquiries & Leads", path: "/admin/enquiries", icon: <MessageSquare size={18} /> },
    { label: "Customer Valuations", path: "/admin/valuations", icon: <Users size={18} /> },
    { label: "Document Vault", path: "/admin/documents", icon: <FileText size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
              <Car size={18} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block leading-tight">{THEME_CONFIG.dealerName}</span>
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Owner Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive(item.path)
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Live Website
            </span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
};
