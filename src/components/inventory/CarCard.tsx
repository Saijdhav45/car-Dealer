import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "../../types";
import { formatINR, formatKM } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { Fuel, Gauge, Calendar, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { customerProfile, openLoginGate } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!customerProfile) {
      openLoginGate(`Sign in to inspect full specs and test drive details for ${car.brand} ${car.model}.`);
    } else {
      navigate(`/cars/${car.id}`);
    }
  };

  const coverImage =
    car.images?.find((img) => img.is_cover)?.image_url ||
    car.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300 flex flex-col"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img
          src={coverImage}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.status === "Sold" && (
            <span className="px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-sm">
              Sold
            </span>
          )}
          {car.status === "Reserved" && (
            <span className="px-2.5 py-1 bg-amber-500/90 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-sm">
              Reserved
            </span>
          )}
          {car.status === "Available" && car.is_featured && (
            <span className="px-2.5 py-1 bg-rose-600 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* City tag */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-medium rounded-md border border-slate-700">
            {car.rto_city} (MH-26)
          </span>
        </div>
      </div>

      {/* Car content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition truncate">
              {car.brand} {car.model}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-3 truncate">{car.variant || "Standard Edition"}</p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-800/60 rounded-xl mb-4 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-rose-400 shrink-0" />
              <span>{car.year_of_manufacture}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel size={13} className="text-rose-400 shrink-0" />
              <span>{car.fuel_type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={13} className="text-rose-400 shrink-0" />
              <span>{formatKM(car.km_driven)}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Patil Dealers Price</span>
            <span className="text-lg font-extrabold text-white">
              {formatINR(car.selling_price, true)}
            </span>
          </div>

          <button
            onClick={handleCardClick}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <span>{customerProfile ? "View Details" : "Unlock Details"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
