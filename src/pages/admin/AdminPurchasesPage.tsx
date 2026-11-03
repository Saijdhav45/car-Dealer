import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ExportButton } from "../../components/admin/ExportButton";
import { MOCK_PURCHASES } from "../../data/mockData";
import { PurchaseRecord } from "../../types";
import { formatINR } from "../../lib/utils";
import { Plus, ShoppingBag, FileText, CheckCircle2, Clock } from "lucide-react";

export const AdminPurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(MOCK_PURCHASES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newPurchase, setNewPurchase] = useState({
    carTitle: "",
    sellerName: "",
    sellerPhone: "",
    sellerAddress: "",
    purchasePrice: "",
    refurbCost: "0",
    paymentMode: "Bank Transfer",
    remarks: "",
  });

  const handleAddPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const item: PurchaseRecord = {
      id: "pur-" + Date.now(),
      car_title: newPurchase.carTitle,
      seller_name: newPurchase.sellerName,
      seller_phone: newPurchase.sellerPhone,
      seller_address: newPurchase.sellerAddress,
      purchase_price: Number(newPurchase.purchasePrice) || 0,
      purchase_date: new Date().toISOString().slice(0, 10),
      payment_mode: newPurchase.paymentMode,
      refurbishment_cost: Number(newPurchase.refurbCost) || 0,
      remarks: newPurchase.remarks,
      paperwork_status: "In Progress",
      created_at: new Date().toISOString(),
    };

    setPurchases([item, ...purchases]);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Car Purchase Inward Register</h1>
            <p className="text-xs text-slate-400">Cars bought by Patil Dealers from local sellers in Nanded & Marathwada.</p>
          </div>

          <div className="flex items-center gap-3">
            <ExportButton data={purchases} fileName="Patil_Dealers_Car_Purchases" sheetName="Purchases" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-rose-950 transition cursor-pointer"
            >
              <Plus size={16} /> New Car Purchase
            </button>
          </div>
        </div>

        {/* Purchases Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Car Acquired</th>
                  <th className="py-3 px-4">Seller Details</th>
                  <th className="py-3 px-4">Purchase Price</th>
                  <th className="py-3 px-4">Refurb Cost</th>
                  <th className="py-3 px-4">Payment Mode</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">RC / Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {p.car_title || "Certified Unit"}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">{p.seller_name}</div>
                      <div className="text-[11px] text-slate-400">{p.seller_phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-rose-400">
                      {formatINR(p.purchase_price)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {formatINR(p.refurbishment_cost)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{p.payment_mode}</td>
                    <td className="py-3.5 px-4 text-slate-400">{p.purchase_date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.paperwork_status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {p.paperwork_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Purchase Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Record New Car Purchase</h3>
            <form onSubmit={handleAddPurchase} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Car Model & Year</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2021 Swift Dzire ZXi"
                  value={newPurchase.carTitle}
                  onChange={(e) => setNewPurchase({ ...newPurchase, carTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Seller Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Joshi"
                    value={newPurchase.sellerName}
                    onChange={(e) => setNewPurchase({ ...newPurchase, sellerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Seller Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="98234 56789"
                    value={newPurchase.sellerPhone}
                    onChange={(e) => setNewPurchase({ ...newPurchase, sellerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Purchase Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 550000"
                    value={newPurchase.purchasePrice}
                    onChange={(e) => setNewPurchase({ ...newPurchase, purchasePrice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Estimated Refurb Cost (₹)</label>
                  <input
                    type="number"
                    value={newPurchase.refurbCost}
                    onChange={(e) => setNewPurchase({ ...newPurchase, refurbCost: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Payment Mode</label>
                <select
                  value={newPurchase.paymentMode}
                  onChange={(e) => setNewPurchase({ ...newPurchase, paymentMode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                  <option>UPI</option>
                  <option>Cash</option>
                </select>
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
                  Save Inward Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
