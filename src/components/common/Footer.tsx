import React from "react";
import { Link } from "react-router-dom";
import { DEALER_CONFIG } from "../../config/dealerConfig";
import { THEME_CONFIG } from "../../config/theme";
import { Car, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
                <Car size={20} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                {THEME_CONFIG.dealerName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {THEME_CONFIG.shortDescription}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Showroom Open Today • Nanded, MH
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/inventory" className="hover:text-rose-400 transition">Browse Used Cars</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-rose-400 transition">Sell Your Car in Nanded</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-400 transition">About Patil Dealers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400 transition">Showroom Location & Contact</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-rose-400 transition">Dealer Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands in Nanded */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Certified Brands</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {DEALER_CONFIG.popularBrands.map((b) => (
                <Link
                  key={b.name}
                  to={`/inventory?brand=${encodeURIComponent(b.name)}`}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:text-white transition flex items-center gap-1.5"
                >
                  <span>{b.logo}</span>
                  <span>{b.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Visit Our Showroom</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>{DEALER_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-rose-500 shrink-0" />
                <a href={`tel:${DEALER_CONFIG.phone}`} className="hover:text-white font-medium">
                  {DEALER_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-rose-500 shrink-0" />
                <span>{DEALER_CONFIG.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-rose-500 shrink-0" />
                <span>{DEALER_CONFIG.openingHours}</span>
              </li>
            </ul>
            <a
              href={DEALER_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Open on Google Maps <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {THEME_CONFIG.dealerName}, Nanded. All rights reserved.</p>
          <div className="flex gap-4">
            <span>RTO Nanded MH-26 Transfer Assistance</span>
            <span>150-Point Quality Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
