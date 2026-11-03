import React from "react";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  fileName: string;
  sheetName?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, fileName, sheetName = "Records" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
      title="Export to Excel / CSV"
    >
      <Download size={14} className="text-emerald-400" />
      <span>Export Excel</span>
    </button>
  );
};
