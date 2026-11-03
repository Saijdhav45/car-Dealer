import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCars } from "../hooks/useCars";
import { useAuth } from "../context/AuthContext";
import { DEALER_CONFIG } from "../config/dealerConfig";
import { formatINR, formatKM, calculateEMI } from "../lib/utils";
import {
  ShieldCheck,
  Calendar,
  Fuel,
  Gauge,
  UserCheck,
  MapPin,
  CheckCircle2,
  FileText,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ChevronLeft
} from "lucide-react";

export const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars } = useCars();
  const { customerProfile, openLoginGate } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveDate, setTestDriveDate] = useState("");
  const [testDriveTime, setTestDriveTime] = useState("Morning (10:00 AM - 1:00 PM)");
  const [testDriveSuccess, setTestDriveSuccess] = useState(false);

  // Fallback if car is not loaded or missing
  if (!car) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <p className="text-lg font-bold mb-4">Car details could not be found.</p>
        <Link to="/inventory" className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl">
          Return to Inventory
        </Link>
      </div>
    );
  }

  const allImages = car.images && car.images.length > 0
    ? car.images.map((img) => img.image_url)
    : ["https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80"];

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTestDriveSuccess(true);
    setTimeout(() => {
      setTestDriveOpen(false);
      setTestDriveSuccess(false);
    }, 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Patil Dealers (Nanded), I am interested in ${car.brand} ${car.model} (${car.year_of_manufacture}) listed for ${formatINR(car.selling_price)}. Is it available for inspection at Maltekdi showroom?`
  );

  const estimatedEMI = calculateEMI(car.selling_price * 0.8, 10.5, 48);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/inventory" className="hover:text-white flex items-center gap-1">
            <ChevronLeft size={14} /> Back to Inventory
          </Link>
          <span>/</span>
          <span className="text-slate-200">{car.brand}</span>
          <span>/</span>
          <span className="text-rose-400 font-medium">{car.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery & Detailed Specs */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Showcase Image */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={allImages[activeImageIdx]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-bold rounded-xl">
                    {car.status}
                  </span>
                  <span className="px-3 py-1 bg-amber-500/90 text-slate-950 text-xs font-black rounded-xl">
                    RTO {car.rto_city} ({car.registration_number.slice(0, 4)})
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        activeImageIdx === idx ? "border-rose-500 scale-95" : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Core Highlights */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-sm text-slate-400 mt-0.5">{car.variant || "Standard Variant"}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 font-medium block">All-Inclusive Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-rose-500">
                    {formatINR(car.selling_price)}
                  </span>
                  {car.negotiable && (
                    <span className="text-[11px] text-amber-400 font-semibold block">Slightly Negotiable at Showroom</span>
                  )}
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
                  <Calendar size={18} className="text-rose-500 mb-1" />
                  <span className="text-[11px] text-slate-400 block">Model Year</span>
                  <span className="text-sm font-bold text-white">{car.year_of_manufacture}</span>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
                  <Gauge size={18} className="text-rose-500 mb-1" />
                  <span className="text-[11px] text-slate-400 block">Kilometers Driven</span>
                  <span className="text-sm font-bold text-white">{formatKM(car.km_driven)}</span>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
                  <Fuel size={18} className="text-rose-500 mb-1" />
                  <span className="text-[11px] text-slate-400 block">Fuel Type</span>
                  <span className="text-sm font-bold text-white">{car.fuel_type}</span>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl">
                  <UserCheck size={18} className="text-rose-500 mb-1" />
                  <span className="text-[11px] text-slate-400 block">Ownership</span>
                  <span className="text-sm font-bold text-white">{car.owner_count} Owner(s)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Vehicle Overview & Inspection Notes</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {car.description || "Inspected thoroughly at Patil Dealers Nanded showroom. Engine, clutch, and electrical components tested. Certified accident-free."}
              </p>
            </div>

            {/* Key Features Checklist */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Key Features & Equipments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features && car.features.length > 0 ? (
                  car.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Power Steering, Air Conditioner, Front Power Windows, Central Locking.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Card + Test Drive + Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
              <div className="p-4 bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-900/30 rounded-2xl mb-6">
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Estimated Monthly EMI</span>
                <div className="text-2xl font-black text-white mt-1">
                  {formatINR(estimatedEMI)} <span className="text-xs text-slate-400 font-normal">/ month*</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Based on 20% down payment, 4-year tenure</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${DEALER_CONFIG.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setTestDriveOpen(true)}
                  className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition cursor-pointer"
                >
                  <Clock size={18} />
                  <span>Schedule Test Drive in Nanded</span>
                </button>

                <a
                  href={`tel:${DEALER_CONFIG.phone}`}
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Phone size={16} className="text-rose-400" />
                  <span>Call Dealership: {DEALER_CONFIG.phone}</span>
                </a>
              </div>

              {/* Showroom Assurance */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Non-Accidental & Clean Title Checked</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-emerald-400 shrink-0" />
                  <span>Full RTO MH-26 Transfer Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-400 shrink-0" />
                  <span>Inspect in person at Maltekdi Road, Nanded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Drive Modal */}
      {testDriveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-1">Book Test Drive in Nanded</h3>
            <p className="text-xs text-slate-400 mb-4">
              Schedule your visit to test drive the {car.brand} {car.model} at Patil Dealers.
            </p>

            {testDriveSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-emerald-400 text-xs font-semibold">
                ✓ Test drive requested! Our showroom coordinator will call you to confirm your slot.
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={testDriveDate}
                    onChange={(e) => setTestDriveDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Slot</label>
                  <select
                    value={testDriveTime}
                    onChange={(e) => setTestDriveTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 4:00 PM)</option>
                    <option>Evening (4:00 PM - 7:30 PM)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTestDriveOpen(false)}
                    className="w-1/3 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
