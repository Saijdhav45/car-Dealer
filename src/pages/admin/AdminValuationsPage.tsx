import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ExportButton } from "../../components/admin/ExportButton";
import { MOCK_VALUATIONS } from "../../data/mockData";
import { ValuationRequest } from "../../types";
import { formatINR } from "../../lib/utils";

export const AdminValuationsPage: React.FC = () => {
  const [valuations, setValuations] = useState<ValuationRequest[]>(MOCK_VALUATIONS);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Sell-Your-Car Valuations</h1>
            <p className="text-xs text-slate-400">Requests submitted by owners wanting to sell or exchange cars in Nanded.</p>
          </div>
          <ExportButton data={valuations} fileName="Patil_Dealers_Car_Valuations" sheetName="Valuations" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Seller</th>
                  <th className="py-3 px-4">Car Model</th>
                  <th className="py-3 px-4">Year & KM</th>
                  <th className="py-3 px-4">Fuel & Gear</th>
                  <th className="py-3 px-4">Expected Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {valuations.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{v.seller_name}</td>
                    <td className="py-3.5 px-4 font-bold text-rose-400">{v.brand} {v.model}</td>
                    <td className="py-3.5 px-4 text-slate-300">{v.year_of_manufacture} • {v.km_driven} km</td>
                    <td className="py-3.5 px-4 text-slate-300">{v.fuel_type} • {v.transmission}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{v.expected_price ? formatINR(v.expected_price) : "Negotiable"}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`tel:${v.seller_phone}`}
                        className="px-3 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-semibold"
                      >
                        Call Seller
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
