import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ExportButton } from "../../components/admin/ExportButton";
import { MOCK_CARS } from "../../data/mockData";
import { Car } from "../../types";
import { formatINR, formatKM } from "../../lib/utils";
import { Plus, Search, Edit3, Trash2, CheckCircle2, X } from "lucide-react";

export const AdminCarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // New Car Form State
  const [formCar, setFormCar] = useState({
    brand: "",
    model: "",
    variant: "",
    year: 2022,
    fuel: "Petrol",
    transmission: "Manual",
    km: "",
    owners: 1,
    regNumber: "MH26 ",
    price: "",
    color: "",
    features: "Power Steering, ABS, Airbags, Reverse Camera",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    status: "Available" as const,
  });

  const filteredCars = cars.filter(
    (c) =>
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.model.toLowerCase().includes(search.toLowerCase()) ||
      c.registration_number.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: Car = {
      id: "car-" + Date.now(),
      brand: formCar.brand,
      model: formCar.model,
      variant: formCar.variant,
      year_of_manufacture: Number(formCar.year),
      fuel_type: formCar.fuel as any,
      transmission: formCar.transmission as any,
      km_driven: Number(formCar.km) || 20000,
      owner_count: Number(formCar.owners),
      registration_number: formCar.regNumber,
      rto_city: "Nanded",
      selling_price: Number(formCar.price) || 500000,
      negotiable: true,
      features: formCar.features.split(",").map((f) => f.trim()),
      status: formCar.status,
      is_featured: false,
      created_at: new Date().toISOString(),
      images: [
        {
          id: "img-" + Date.now(),
          car_id: "car-" + Date.now(),
          image_url: formCar.image,
          is_cover: true,
          display_order: 1,
        },
      ],
    };

    setCars([newCar, ...cars]);
    setIsModalOpen(false);
    setActiveStep(1);
    setFormCar({
      brand: "",
      model: "",
      variant: "",
      year: 2022,
      fuel: "Petrol",
      transmission: "Manual",
      km: "",
      owners: 1,
      regNumber: "MH26 ",
      price: "",
      color: "",
      features: "Power Steering, ABS, Airbags, Reverse Camera",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      status: "Available",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Car Inventory Catalog</h1>
            <p className="text-xs text-slate-400">Add, edit, and track pre-owned vehicles in Nanded showroom.</p>
          </div>

          <div className="flex items-center gap-3">
            <ExportButton data={cars} fileName="Patil_Dealers_Cars_Inventory" sheetName="Cars" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-950 transition cursor-pointer"
            >
              <Plus size={16} /> Add New Car
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search make, model, MH-26 plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Cars Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Reg No</th>
                  <th className="py-3 px-4">Year & KM</th>
                  <th className="py-3 px-4">Fuel / Gear</th>
                  <th className="py-3 px-4">Selling Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredCars.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{c.brand} {c.model}</div>
                      <div className="text-[11px] text-slate-400">{c.variant || "Standard"}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-amber-400">
                      {c.registration_number}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{c.year_of_manufacture}</div>
                      <div className="text-[11px] text-slate-500">{formatKM(c.km_driven)}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{c.fuel_type}</div>
                      <div className="text-[11px] text-slate-500">{c.transmission}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {formatINR(c.selling_price)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        c.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : c.status === "Reserved"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setCars(cars.filter((x) => x.id !== c.id));
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition"
                        title="Delete vehicle"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Step-by-Step Add Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-1">Add Used Car to Inventory</h3>
            <p className="text-xs text-slate-400 mb-6">Step {activeStep} of 3: Follow the wizard to register the car.</p>

            {/* Stepper bar */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-1.5 flex-1 rounded-full ${
                    activeStep >= stepNum ? "bg-rose-500" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>

            <form onSubmit={handleSaveCar} className="space-y-4">
              {activeStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-rose-400">Step 1: Basic Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Brand</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hyundai"
                        value={formCar.brand}
                        onChange={(e) => setFormCar({ ...formCar, brand: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Model</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Creta"
                        value={formCar.model}
                        onChange={(e) => setFormCar({ ...formCar, model: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Variant</label>
                      <input
                        type="text"
                        placeholder="e.g. SX (O)"
                        value={formCar.variant}
                        onChange={(e) => setFormCar({ ...formCar, variant: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Reg Number</label>
                      <input
                        type="text"
                        required
                        placeholder="MH26 AB 1234"
                        value={formCar.regNumber}
                        onChange={(e) => setFormCar({ ...formCar, regNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl"
                  >
                    Next: Specs & Features →
                  </button>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-rose-400">Step 2: Technical Specs</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Model Year</label>
                      <input
                        type="number"
                        value={formCar.year}
                        onChange={(e) => setFormCar({ ...formCar, year: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Kilometers Driven</label>
                      <input
                        type="number"
                        placeholder="e.g. 35000"
                        value={formCar.km}
                        onChange={(e) => setFormCar({ ...formCar, km: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Fuel Type</label>
                      <select
                        value={formCar.fuel}
                        onChange={(e) => setFormCar({ ...formCar, fuel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      >
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>CNG</option>
                        <option>Electric</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Transmission</label>
                      <select
                        value={formCar.transmission}
                        onChange={(e) => setFormCar({ ...formCar, transmission: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      >
                        <option>Manual</option>
                        <option>Automatic</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Key Features (comma separated)</label>
                    <input
                      type="text"
                      value={formCar.features}
                      onChange={(e) => setFormCar({ ...formCar, features: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="w-1/3 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl"
                    >
                      Next: Price & Image →
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-rose-400">Step 3: Pricing & Photo</h4>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 750000"
                      value={formCar.price}
                      onChange={(e) => setFormCar({ ...formCar, price: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Photo Image URL</label>
                    <input
                      type="url"
                      value={formCar.image}
                      onChange={(e) => setFormCar({ ...formCar, image: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="w-1/3 py-2.5 bg-slate-800 text-slate-300 text-xs rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950"
                    >
                      Publish Car to Inventory
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
