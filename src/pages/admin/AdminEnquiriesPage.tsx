import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ExportButton } from "../../components/admin/ExportButton";
import { MOCK_ENQUIRIES } from "../../data/mockData";
import { Enquiry } from "../../types";
import { MessageSquare, PhoneCall, Check, Clock } from "lucide-react";

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);

  const updateStatus = (id: string, newStatus: Enquiry["status"]) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Customer Enquiries & Leads</h1>
            <p className="text-xs text-slate-400">Incoming inquiries from website visitors in Nanded.</p>
          </div>
          <ExportButton data={enquiries} fileName="Patil_Dealers_Customer_Leads" sheetName="Enquiries" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Car Requested</th>
                  <th className="py-3 px-4">Customer Note</th>
                  <th className="py-3 px-4">Lead Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{enq.name}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      <a href={`tel:${enq.phone}`} className="hover:text-rose-400">
                        {enq.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-rose-400">{enq.car_name || "General Query"}</td>
                    <td className="py-3.5 px-4 text-slate-300 italic max-w-xs truncate">
                      "{enq.message}"
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                        className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] text-white focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Test Drive Scheduled">Test Drive Scheduled</option>
                        <option value="Closed - Won">Closed - Won</option>
                        <option value="Closed - Lost">Closed - Lost</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(enq.name)},%20this%20is%20Patil%20Dealers%20Nanded%20regarding%20your%20car%20enquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-semibold hover:bg-emerald-600/30"
                      >
                        WhatsApp
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
