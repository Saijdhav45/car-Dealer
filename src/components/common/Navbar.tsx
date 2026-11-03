import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DEALER_CONFIG } from "../../config/dealerConfig";
import { THEME_CONFIG } from "../../config/theme";
import { Car, Menu, X, Phone, UserCheck, Shield, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { customerProfile, logout, openLoginGate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Inventory", path: "/inventory" },
    { label: "Sell Your Car", path: "/sell" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top micro bar for Nanded trust signals */}
      <div className="bg-rose-950/40 border-b border-rose-900/30 text-[11px] text-rose-300 py-1 px-4 text-center sm:flex sm:justify-between sm:items-center max-w-7xl mx-auto">
        <span className="flex items-center justify-center gap-1.5 font-medium">
          <Sparkles size={12} className="text-amber-400" />
          Nanded's Most Trusted Certified Pre-Owned Dealership • 150+ Inspection Checks
        </span>
        <div className="hidden sm:flex items-center gap-4">
          <span>📍 {DEALER_CONFIG.address.split(",")[0]}, {DEALER_CONFIG.city}</span>
          <a href={`tel:${DEALER_CONFIG.phone}`} className="hover:underline font-bold text-white">
            📞 {DEALER_CONFIG.phone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/40 group-hover:scale-105 transition">
              <Car size={22} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-tight">
                {THEME_CONFIG.dealerName.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold block">
                {DEALER_CONFIG.city} • USED CARS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(link.path)
                    ? "bg-slate-800 text-rose-400 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Auth info */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${DEALER_CONFIG.whatsappNumber}?text=Hi%20Patil%20Dealers,%20I%20am%20looking%20for%20a%20car.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>WhatsApp</span>
            </a>

            {customerProfile ? (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-200">{customerProfile.full_name}</div>
                  <div className="text-[10px] text-slate-400">{customerProfile.phone}</div>
                </div>
                <button
                  onClick={() => logout()}
                  className="text-xs text-slate-400 hover:text-white underline ml-1 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => openLoginGate("Unlock verified car papers & prices in Nanded")}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <UserCheck size={14} className="text-rose-400" />
                Sign In
              </button>
            )}

            <Link
              to="/admin"
              className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-950 flex items-center gap-1.5 transition"
            >
              <Shield size={13} />
              Admin Portal
            </Link>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${DEALER_CONFIG.phone}`}
              className="p-2 text-rose-400 bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Call Dealership"
            >
              <Phone size={18} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? "bg-rose-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {customerProfile ? (
              <div className="p-3 bg-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-white block">{customerProfile.full_name}</span>
                  <span className="text-slate-400 text-[11px]">{customerProfile.phone}</span>
                </div>
                <button onClick={() => logout()} className="text-rose-400 font-semibold underline">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginGate("Unlock verified car papers & prices in Nanded");
                }}
                className="w-full py-2.5 bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <UserCheck size={14} className="text-rose-400" />
                Customer Login / Register
              </button>
            )}

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Shield size={14} />
              Dealer Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
