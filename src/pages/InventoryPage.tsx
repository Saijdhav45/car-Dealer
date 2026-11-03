import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCars, CarFilters } from "../hooks/useCars";
import { CarCard } from "../components/inventory/CarCard";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { formatINR } from "../lib/utils";

export const InventoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBrand = searchParams.get("brand") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(2500000);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "year-desc" | "km-asc">("year-desc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filters: CarFilters = {
    searchQuery,
    brand: selectedBrand,
    fuelType: selectedFuel,
    transmission: selectedTransmission,
    maxPrice,
    sortBy,
  };

  const { cars, loading } = useCars(filters);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("All");
    setSelectedFuel("All");
    setSelectedTransmission("All");
    setMaxPrice(2500000);
    setSortBy("year-desc");
    setSearchParams({});
  };

  const brands = ["All", "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Kia"];
  const fuels = ["All", "Petrol", "Diesel", "CNG", "Electric"];
  const transmissions = ["All", "Manual", "Automatic"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Certified Used Cars Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore certified, tested second-hand vehicles in Nanded. Filter by brand, budget, fuel, and transmission.
          </p>
        </div>

        {/* Search & Mobile Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search car make, model (e.g. Creta, Dzire, Scorpio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex-1 sm:flex-initial py-2.5 px-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal size={15} className="text-rose-400" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 focus:outline-none focus:border-rose-500"
            >
              <option value="year-desc">Latest Model Year</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="km-asc">Lowest Kilometers</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Car Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar (Desktop + Mobile Toggle) */}
          <aside className={`lg:block ${mobileFilterOpen ? "block" : "hidden"} bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-6 h-fit`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Refine By</span>
              <button
                onClick={resetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Price Budget */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                <span>Budget Max</span>
                <span className="text-rose-400 font-bold">{formatINR(maxPrice, true)}</span>
              </div>
              <input
                type="range"
                min="200000"
                max="2500000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹2 Lakh</span>
                <span>₹25+ Lakh</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">Brand / Make</span>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedBrand.toLowerCase() === b.toLowerCase()
                        ? "bg-rose-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">Fuel Type</span>
              <div className="flex flex-wrap gap-1.5">
                {fuels.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFuel(f)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedFuel.toLowerCase() === f.toLowerCase()
                        ? "bg-rose-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">Transmission</span>
              <div className="flex flex-wrap gap-1.5">
                {transmissions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTransmission(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedTransmission.toLowerCase() === t.toLowerCase()
                        ? "bg-rose-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Cars Grid */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
                ))}
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <p className="text-base font-bold text-white mb-2">No cars matched your criteria</p>
                <p className="text-xs text-slate-400 mb-6">
                  Try broadening your price range or clearing selected brand/fuel filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="text-xs text-slate-400 mb-4 font-medium">
                  Showing <span className="font-bold text-white">{cars.length}</span> verified cars in stock
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
