import React, { useState } from "react";
import { DEALER_CONFIG } from "../config/dealerConfig";
import { THEME_CONFIG } from "../config/theme";
import { ShieldCheck, IndianRupee, Clock, CheckCircle2, Car, Upload, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const SellCarPage: React.FC = () => {
  const { customerProfile, openLoginGate } = useAuth();

  const [formData, setFormData] = useState({
    name: customerProfile?.full_name || "",
    phone: customerProfile?.phone || "",
    brand: "",
    model: "",
    year: "2020",
    kmDriven: "",
    fuelType: "Petrol",
    transmission: "Manual",
    expectedPrice: "",
    conditionNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerProfile && !formData.phone) {
      openLoginGate("Please provide your contact number so we can share your car's instant valuation.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 block">
            Fair, Transparent & Instant Deal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Sell Your Car in Nanded with Patil Dealers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Get instant on-the-spot evaluation, best market price, doorstep inspection, and instant bank payout with zero RTO transfer hassle.
          </p>
        </div>

        {/* Benefits ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-rose-600/20 text-rose-400 rounded-xl">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Instant Valuation</span>
              <span className="text-[11px] text-slate-400">Within 30 minutes in Nanded</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
              <IndianRupee size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Instant Bank Transfer</span>
              <span className="text-[11px] text-slate-400">Direct account credit on pickup</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Free RTO Transfer</span>
              <span className="text-[11px] text-slate-400">Legal sale indemnity & receipt</span>
            </div>
          </div>
        </div>

        {/* Form or Confirmation */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-white">Car Valuation Request Received!</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{formData.name || "Customer"}</span>. Our evaluation expert from Patil Dealers Nanded will inspect your {formData.brand} {formData.model} details and call you shortly with the best valuation offer.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 text-xs text-slate-300 font-semibold rounded-xl hover:bg-slate-700"
                >
                  Submit Another Vehicle
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">
                1. Vehicle Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brand / Make</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maruti Suzuki, Hyundai, Tata"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Model & Variant</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swift VXi, Creta SX, Nexon XZ"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year of Manufacture</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:border-rose-500 focus:outline-none"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kilometers Driven (Approx)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45000"
                    value={formData.kmDriven}
                    onChange={(e) => setFormData({ ...formData, kmDriven: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transmission</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white pt-4 pb-3 border-b border-slate-800">
                2. Price Expectation & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Expected Selling Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 450000"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Santosh Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (WhatsApp Preferred)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98234 56789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Any specific details or issues?</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. First owner, new insurance, minor scratch on left door..."
                    value={formData.conditionNotes}
                    onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-rose-950 transition cursor-pointer"
              >
                Get Free Car Valuation in Nanded
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
