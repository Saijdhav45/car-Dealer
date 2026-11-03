import React, { useState } from "react";
import { formatINR, calculateEMI } from "../../lib/utils";
import { Calculator, ArrowRight, IndianRupee } from "lucide-react";

export const EMICalculatorWidget: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(4);

  const emi = calculateEMI(loanAmount, interestRate, tenureYears * 12);
  const totalPayment = emi * (tenureYears * 12);
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <Calculator size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Car Loan EMI Calculator</h3>
          <p className="text-xs text-slate-400">Estimate your monthly payment with our partner banks in Nanded</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">Loan Amount</span>
              <span className="text-sm font-bold text-rose-400">{formatINR(loanAmount)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="2500000"
              step="25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹1 Lakh</span>
              <span>₹25 Lakh</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">Interest Rate (% p.a.)</span>
              <span className="text-sm font-bold text-amber-400">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="8.5"
              max="16.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>8.5% (Prime)</span>
              <span>16.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">Loan Tenure</span>
              <span className="text-sm font-bold text-emerald-400">{tenureYears} Years ({tenureYears * 12} Months)</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>1 Year</span>
              <span>7 Years</span>
            </div>
          </div>
        </div>

        {/* Output card */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Estimated Monthly EMI
          </span>
          <div className="text-3xl sm:text-4xl font-black text-rose-500 mb-4">
            {formatINR(emi)} <span className="text-xs text-slate-400 font-normal">/ month</span>
          </div>

          <div className="space-y-2 py-3 border-t border-b border-slate-800/80 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Principal Amount:</span>
              <span className="font-semibold text-white">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Interest:</span>
              <span className="font-semibold text-amber-400">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Payable:</span>
              <span className="font-bold text-emerald-400">{formatINR(totalPayment)}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-3">
            *Indicative estimate. Financing available with SBI, HDFC, ICICI & Bank of Maharashtra at Patil Dealers, Nanded.
          </p>
        </div>
      </div>
    </div>
  );
};
