import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { FileText, Shield, Download, Lock, CheckCircle2, Upload } from "lucide-react";

export const AdminDocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState([
    {
      id: "doc-01",
      title: "RC Smart Card (MH26 BV 4521)",
      car: "2021 Swift Dzire ZXi+",
      type: "RC",
      size: "1.4 MB",
      date: "2026-10-15",
      isSigned: true,
    },
    {
      id: "doc-02",
      title: "Comprehensive Insurance Policy",
      car: "2022 Hyundai Creta Diesel",
      type: "Insurance",
      size: "2.8 MB",
      date: "2026-10-18",
      isSigned: true,
    },
    {
      id: "doc-03",
      title: "Form 29 & 30 Sale Transfer Agreement",
      car: "2020 Honda City VX",
      type: "Transfer",
      size: "850 KB",
      date: "2026-10-20",
      isSigned: true,
    },
  ]);

  const handleDownload = (title: string) => {
    alert(`Generating secure time-limited Signed URL from private Supabase bucket for: ${title}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Private Vehicle Document Vault</h1>
          <p className="text-xs text-slate-400">
            Secure, RLS-protected storage for Registration Certificates (RC), Insurance, and RTO Transfer Agreements.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3 text-xs text-slate-300">
          <Lock size={18} className="text-amber-400 shrink-0" />
          <span>
            Documents are encrypted in the private <code className="text-rose-400">dealership-documents</code> bucket. Accessible only via authenticated signed URLs.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {docs.map((d) => (
            <div key={d.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-rose-600/10 text-rose-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded">
                  {d.type}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{d.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{d.car}</p>
                <div className="text-[10px] text-slate-500 mt-2">Size: {d.size} • Uploaded: {d.date}</div>
              </div>

              <button
                onClick={() => handleDownload(d.title)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download size={13} />
                <span>Get Signed Download URL</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
