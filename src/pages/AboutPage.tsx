import React from "react";
import { DEALER_CONFIG } from "../config/dealerConfig";
import { THEME_CONFIG } from "../config/theme";
import { Award, ShieldCheck, Users, Car, CheckCircle2 } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 block">
            Serving Nanded & Marathwada Since {DEALER_CONFIG.establishedYear}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About {THEME_CONFIG.dealerName}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Founded with a commitment to bring transparency, uncompromising vehicle quality, and zero-stress paperwork to pre-owned car buyers and sellers in Nanded.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"
              alt="Patil Dealers Nanded Team & Showroom"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why We Are Different From Typical Used Car Brokers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In traditional used car trading, buyers fear hidden accidents, tampered odometers, and delayed RTO document transfers. At <span className="text-rose-400 font-semibold">{THEME_CONFIG.dealerName}</span>, we own every car in our inventory or thoroughly verify each consignment with a strict 150-point diagnostic checklist.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We operate right at Maltekdi Road, Nanded, providing local buyers with personal warranty assistance, genuine spare-part checks, and direct coordination with local RTO MH-26 authorities.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xl font-black text-rose-500 block">{DEALER_CONFIG.stats.carsSold}</span>
                <span className="text-xs text-slate-400">Cars Sold in Marathwada</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-2xl font-black text-amber-400 block">{DEALER_CONFIG.stats.happyCustomers}</span>
                <span className="text-xs text-slate-400">Satisfied Families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-500 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Non-Accidental Guarantee</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every chassis, pillar, and underbody is scrutinized to ensure no car has structural damage or flood history.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Verified Ownership & RTO MH-26</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All paperwork, tax receipts, Hypothecation cancellations, and NOCs are validated before car delivery.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Fair Exchange Deals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent exchange valuations. Bring your old hatchback or sedan and drive away with an upgraded SUV on the same day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
