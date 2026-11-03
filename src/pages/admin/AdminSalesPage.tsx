import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ExportButton } from "../../components/admin/ExportButton";
import { MOCK_SALES } from "../../data/mockData";
import { SaleRecord } from "../../types";
import { formatINR } from "../../lib/utils";
import { Plus, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

export const AdminSalesPage: React.FC = () => {
  const [sales, setSales] = useState<SaleRecord[]>(MOCK_SALES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newSale, setNewSale] = useState({
    carTitle: "",
    buyerName: "",
    buyerPhone: "",
    salePrice: "",
    purchaseCostBasis: "600000",
    paymentMode: "Bank Transfer",
    rtoStatus: "Pending" as const,
  });

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    const sPrice = Number(newSale.salePrice) || 0;
    const pCost = Number(newSale.purchaseCostBasis) || 0;
    const profit = sPrice - pCost;

    const item: SaleRecord = {
      id: "sale-" + Date.now(),
      car_id: "car-" + Date.now(),
      car_title: newSale.carTitle,
      buyer_name: newSale.buyerName,
      buyer_phone: newSale.buyerPhone,
      sale_price: sPrice,
      sale_date: new Date().toISOString().slice(0, 10),
      payment_mode: newSale.paymentMode,
      calculated_profit: profit,
      paperwork_transfer_status: newSale.rtoStatus,
      created_at: new Date().toISOString(),
    };

    setSales([item, ...sales]);
    setIsModalOpen(false);
  };

  const totalSalesRevenue = sales.reduce((acc, curr) => acc + curr.sale_price, 0);
  const totalNetProfit = sales.reduce((acc, curr) => acc + curr.calculated_profit, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Car Sales & Profit Register</h1>
            <p className="text-xs text-slate-400">Sold cars, buyer delivery details, auto-computed profit, and RTO transfer tracking.</p>
          </div>

          <div className="flex items-center gap-3">
            <ExportButton data={sales} fileName="Patil_Dealers_Sales_Profits" sheetName="Sales" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-950 transition cursor-pointer"
            >
              <Plus size={16} /> Record Car Sale
            </button>
          </div>
        </div>

        {/* Summary Metric Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Total Realized Revenue</span>
              <div className="text-xl font-black text-white">{formatINR(totalSalesRevenue)}</div>
            </div>
            <TrendingUp size={24} className="text-emerald-400" />
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Net Dealership Profit</span>
              <div className="text-xl font-black text-emerald-400">{formatINR(totalNetProfit)}</div>
            </div>
            <TrendingUp size={24} className="text-emerald-400" />
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Sold Vehicle</th>
                  <th className="py-3 px-4">Buyer Customer</th>
                  <th className="py-3 px-4">Sale Price</th>
                  <th className="py-3 px-4">Net Profit</th>
                  <th className="py-3 px-4">Payment Mode</th>
                  <th className="py-3 px-4">Sale Date</th>
                  <th className="py-3 px-4">RTO Transfer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sales.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {s.car_title || "Verified Car"}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">{s.buyer_name}</div>
                      <div className="text-[11px] text-slate-400">{s.buyer_phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {formatINR(s.sale_price)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      +{formatINR(s.calculated_profit)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{s.payment_mode}</td>
                    <td className="py-3.5 px-4 text-slate-400">{s.sale_date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        s.paperwork_transfer_status === "Transferred"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : s.paperwork_transfer_status === "RTO Applied"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                        {s.paperwork_transfer_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Record Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Record Car Sale & Calculate Profit</h3>
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Car Sold</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2021 Swift Dzire ZXi Plus"
                  value={newSale.carTitle}
                  onChange={(e) => setNewSale({ ...newSale, carTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Buyer Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Shinde"
                    value={newSale.buyerName}
                    onChange={(e) => setNewSale({ ...newSale, buyerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Buyer Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="98234 56789"
                    value={newSale.buyerPhone}
                    onChange={(e) => setNewSale({ ...newSale, buyerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 685000"
                    value={newSale.salePrice}
                    onChange={(e) => setNewSale({ ...newSale, salePrice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Purchase Cost Basis (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 590000"
                    value={newSale.purchaseCostBasis}
                    onChange={(e) => setNewSale({ ...newSale, purchaseCostBasis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs flex justify-between items-center">
                <span className="text-slate-300">Auto Calculated Profit:</span>
                <span className="font-bold text-emerald-400">
                  {formatINR(Number(newSale.salePrice || 0) - Number(newSale.purchaseCostBasis || 0))}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
                >
                  Save Sale Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
