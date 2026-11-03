import React from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { MOCK_CARS, MOCK_SALES, MOCK_PURCHASES, MOCK_ENQUIRIES } from "../../data/mockData";
import { formatINR } from "../../lib/utils";
import { Car, ShoppingCart, TrendingUp, MessageSquare, AlertCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
  const stockCount = MOCK_CARS.filter((c) => c.status === "Available").length;
  const soldCount = MOCK_CARS.filter((c) => c.status === "Sold").length;
  const totalRevenue = MOCK_SALES.reduce((acc, curr) => acc + curr.sale_price, 0);
  const totalProfit = MOCK_SALES.reduce((acc, curr) => acc + curr.calculated_profit, 0);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Dealership Executive Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time showroom overview, inventory metrics, and profitability tracker.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Cars in Stock</span>
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
                <Car size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{stockCount} Units</div>
            <span className="text-[11px] text-emerald-400 font-medium">Ready for immediate delivery</span>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Sold Units</span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <ShoppingCart size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{soldCount} Sold</div>
            <span className="text-[11px] text-amber-400 font-medium">This month</span>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Sales Revenue</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-400">{formatINR(totalRevenue, true)}</div>
            <span className="text-[11px] text-slate-400 font-medium">Total sales value</span>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Net Dealer Profit</span>
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-400">{formatINR(totalProfit, true)}</div>
            <span className="text-[11px] text-emerald-400 font-medium">Auto-deducted refurbishing</span>
          </div>
        </div>

        {/* Paperwork Alert Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Pending RTO Paperwork Alert</span>
              <span className="text-[11px] text-amber-200/80">
                1 vehicle transfer is currently pending with RTO Nanded (MH-26).
              </span>
            </div>
          </div>
          <Link
            to="/admin/sales"
            className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shrink-0"
          >
            Review Status
          </Link>
        </div>

        {/* 2-Column: Recent Enquiries + Quick Inventory list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} className="text-rose-400" />
                Latest Customer Enquiries
              </h3>
              <Link to="/admin/enquiries" className="text-xs text-rose-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_ENQUIRIES.map((enq) => (
                <div key={enq.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{enq.name}</span>
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-md text-[10px] font-semibold">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{enq.message}"</p>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>{enq.phone}</span>
                    <span>Car: {enq.car_name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stock Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Car size={16} className="text-amber-400" />
                Active Showroom Inventory
              </h3>
              <Link to="/admin/cars" className="text-xs text-rose-400 hover:underline">
                Manage Cars
              </Link>
            </div>

            <div className="space-y-2">
              {MOCK_CARS.slice(0, 4).map((car) => (
                <div key={car.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{car.brand} {car.model}</h4>
                    <span className="text-[11px] text-slate-400">{car.registration_number} • {car.fuel_type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-400 block">{formatINR(car.selling_price, true)}</span>
                    <span className={`text-[10px] font-semibold ${car.status === "Available" ? "text-emerald-400" : "text-amber-400"}`}>
                      {car.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
