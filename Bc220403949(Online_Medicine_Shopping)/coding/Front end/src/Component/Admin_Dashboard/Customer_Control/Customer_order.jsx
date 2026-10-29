import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, User, Mail, Hash, CreditCard } from "lucide-react";

export default function MyOrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/order`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Product Details</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Tracking ID</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Amount</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Customer Reach</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-all duration-200">
                    {/* Product with Small Image */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 p-1.5 flex-shrink-0 shadow-sm overflow-hidden">
                          <img
                            src={`http://localhost:7000/uploads/${order.image || "default-med.png"}`}
                            alt={order.product}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/883/883356.png"; }}
                          />
                        </div>
                        <span className="font-semibold text-slate-700 text-sm tracking-tight">{order.product}</span>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 font-mono text-xs text-indigo-500 font-bold bg-indigo-50/50 px-3 py-1 rounded-lg w-fit">
                        <Hash size={12} /> {order._id.slice(-6).toUpperCase()}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <CreditCard size={14} className="text-slate-300" />
                        <span>Rs.{order.price}</span>
                      </div>
                    </td>

                    {/* Email / Info */}
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                          <Mail size={13} className="text-slate-400" />
                          {order.email}
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-8 py-5 text-center">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        Processed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="py-24 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Package className="text-slate-300" size={28} />
              </div>
              <p className="text-slate-400 font-medium tracking-tight">System holds no transaction records.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}