import React from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/home/HeroSection";
import { CarCard } from "../components/inventory/CarCard";
import { EMICalculatorWidget } from "../components/home/EMICalculatorWidget";
import { useCars } from "../hooks/useCars";
import { DEALER_CONFIG } from "../config/dealerConfig";
import { ShieldCheck, Award, FileCheck2, ArrowRight, Star, MapPin, Sparkles } from "lucide-react";

export const HomePage: React.FC = () => {
  const { cars, loading } = useCars();
  const featuredCars = cars.filter((c) => c.is_featured).slice(0, 4);

  const whyChooseUs = [
    {
      icon: <ShieldCheck size={28} className="text-rose-500" />,
      title: "150-Point Quality Inspection",
      description: "Engine, transmission, suspension, brakes, electricals, and frame are rigorously checked by certified mechanics.",
    },
    {
      icon: <FileCheck2 size={28} className="text-amber-500" />,
      title: "Guaranteed RTO MH-26 Transfer",
      description: "Zero paperwork headaches. We handle complete ownership transfer and NOC clearances directly in Nanded.",
    },
    {
      icon: <Award size={28} className="text-emerald-500" />,
      title: "Fair Market Pricing & Zero Commission",
      description: "Transparent prices without middleman markups. Complete history and test drive available with no obligations.",
    },
    {
      icon: <Star size={28} className="text-indigo-500" />,
      title: "Instant Car Valuation & Fast Payout",
      description: "Looking to sell your old car? Receive an instant quote and same-day payment right here in Nanded.",
    },
  ];

  const testimonials = [
    {
      name: "Pradeep Shinde",
      location: "Nanded City",
      car: "Maruti Dzire",
      comment: "Bought my first family car from Patil Dealers. The vehicle condition matched the description 100%, and RTO transfer happened within 8 days. Highly recommended!",
      rating: 5,
    },
    {
      name: "Dr. Rohini K.",
      location: "Maltekdi, Nanded",
      car: "Hyundai Creta",
      comment: "Super transparent team. They showed all service records and battery health upfront. The EMI assistance made the deal effortless.",
      rating: 5,
    },
    {
      name: "Sachin Deshmukh",
      location: "Loha Road, Nanded",
      car: "Tata Nexon",
      comment: "Sold my old Swift and upgraded to Nexon here. Got the best exchange valuation in entire Marathwada region.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Brands Scroll / Popular Makes */}
      <section className="py-8 bg-slate-900/60 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Certified Makes:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {DEALER_CONFIG.popularBrands.map((b) => (
                <Link
                  key={b.name}
                  to={`/inventory?brand=${encodeURIComponent(b.name)}`}
                  className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-rose-400 transition flex items-center gap-2"
                >
                  <span className="text-base">{b.logo}</span>
                  <span>{b.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
              <Sparkles size={14} /> Handpicked Stock
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Pre-Owned Cars in Nanded
            </h2>
          </div>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition"
          >
            <span>View All Stock ({cars.length} Cars)</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-slate-900/60 rounded-2xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Patil Dealers */}
      <section className="py-16 bg-slate-900/40 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              The Patil Dealers Promise
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why Customers Across Marathwada Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Over a decade of bringing honest car trading, spotless paperwork, and dependable vehicles to Nanded.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="mb-4 p-3 bg-slate-800/80 rounded-xl w-fit">{item.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EMICalculatorWidget />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Real Reviews from Car Owners in Nanded
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{t.comment}"</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white block">{t.name}</span>
                    <span className="text-slate-400 text-[11px]">{t.location}</span>
                  </div>
                  <span className="px-2 py-1 bg-slate-800 text-rose-400 rounded-md text-[10px] font-semibold">
                    {t.car}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Visit CTA */}
      <section className="py-12 bg-gradient-to-r from-rose-950/60 via-slate-950 to-amber-950/40 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want to test drive your dream car in Nanded?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Visit Patil Dealers showroom near Shivaji Statue, Maltekdi Road. Instant evaluation, transparent paperwork, and friendly car advisory.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${DEALER_CONFIG.phone}`}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-rose-950"
            >
              Call {DEALER_CONFIG.phone}
            </a>
            <a
              href={DEALER_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <MapPin size={16} className="text-rose-500" />
              <span>Get Directions to Showroom</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
