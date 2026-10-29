import React from "react";
import { HeartPulse, Printer, CheckCircle, Smartphone, MapPin, ReceiptText, X } from "lucide-react";

export default function CompactBill({ orderData, onClose }) {
  if (!orderData) return null;
  const items = Array.isArray(orderData.items) ? orderData.items : [orderData];
  const total = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      
      {/* COMPACT CARD */}
      <div className="bg-white w-full max-w-[360px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* TOP STRIP */}
        <div className="bg-emerald-600 p-6 flex flex-col items-center text-white text-center">
          <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
             <HeartPulse size={28} />
          </div>
          <h1 className="font-black text-lg tracking-tighter uppercase italic">MediCare Official</h1>
          <p className="text-[10px] opacity-80 font-bold tracking-[0.2em] uppercase mt-1">Pharmacy Receipt</p>
        </div>

        {/* RECEIPT CONTENT */}
        <div className="p-8">
          {/* SUCCESS STATUS */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-2">
               <CheckCircle size={24} strokeWidth={3} />
            </div>
            <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">Transaction Complete</p>
          </div>

          {/* DYNAMIC CUSTOMER INFO */}
          <div className="flex justify-between items-center mb-8 border-y border-slate-50 py-3">
             <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase">Order ID</span>
                <span className="text-[11px] font-mono font-bold text-slate-700">#{orderData.orderId || Math.floor(Math.random() * 10000)}</span>
             </div>
             <div className="text-right flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase">Date</span>
                <span className="text-[11px] font-bold text-slate-700">{new Date().toLocaleDateString()}</span>
             </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Selected Medicine</p>
            {items.map((item, i) => (
              <div key={i} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <p className="font-bold text-slate-800 leading-none">{item.product || item.name}</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase italic">{item.category}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Quantity: {item.qty || 1}</p>
                </div>
                <span className="font-black text-slate-900">Rs.{item.price}</span>
              </div>
            ))}
          </div>

          {/* COMPACT TOTAL */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
             <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Net Payable</span>
                <span className="text-2xl font-black text-indigo-600 tracking-tight">Rs.{total}</span>
             </div>
          </div>

          {/* FOOTER ACTION */}
          <div className="mt-8 space-y-3">
             <button 
                onClick={() => window.print()} 
                className="w-full bg-slate-900 text-white py-4 rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
             >
                <Printer size={14} /> Print Receipt
             </button>
             
             <div className="flex justify-center gap-6 text-slate-200 mt-4">
                <Smartphone size={14} />
                <MapPin size={14} />
                <ReceiptText size={14} />
             </div>
          </div>
        </div>

        {/* DECORATIVE CUT-OUTS */}
        <div className="absolute left-[-10px] bottom-[140px] w-5 h-5 bg-slate-900/40 rounded-full"></div>
        <div className="absolute right-[-10px] bottom-[140px] w-5 h-5 bg-slate-900/40 rounded-full"></div>
      </div>
    </div>
  );
}