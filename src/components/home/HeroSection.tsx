import React from "react";
import { Link } from "react-router-dom";
import { DEALER_CONFIG } from "../../config/dealerConfig";
import { THEME_CONFIG } from "../../config/theme";
import { Shield, Sparkles, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-900">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-rose-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-rose-500/30 text-rose-300 text-xs font-semibold"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Certified Pre-Owned Cars in {DEALER_CONFIG.city}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight"
            >
              Buy & Sell Quality Used Cars with <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-400">Total Trust</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {DEALER_CONFIG.name} is Nanded's premier pre-owned car dealership. Every car undergoes a strict 150-point inspection, complete non-accidental verification, and hassle-free MH-26 RTO transfer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to="/inventory"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-950 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Browse Inventory</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/sell"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Sell Your Car (Instant Valuation)</span>
              </Link>
            </motion.div>

            {/* Micro value props */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>150-Point Quality Checklist</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Easy Bank Loan / EMI Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card + Animated Stats */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-2"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                  alt="Patil Dealers Nanded Showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-rose-400">Featured Showroom Deal</p>
                      <h4 className="text-sm font-bold text-white">Maruti Suzuki Swift Dzire ZXi+</h4>
                    </div>
                    <span className="text-sm font-black text-white">₹6.85 Lakh</span>
                  </div>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -top-3 -right-3 p-3 bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl flex items-center gap-2 text-xs">
                <Shield size={16} />
                <span>MH-26 Verified</span>
              </div>
            </motion.div>

            {/* Quick Live Stats in Nanded */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <div className="text-lg font-black text-rose-500">{DEALER_CONFIG.stats.carsSold}</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Cars Sold</div>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <div className="text-lg font-black text-amber-400">{DEALER_CONFIG.stats.happyCustomers}</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Happy Families</div>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
                <div className="text-lg font-black text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">RC Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
