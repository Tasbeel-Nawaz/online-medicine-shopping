import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, } from "lucide-react";

export default function MyOrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("Email");
        const res = await axios.get(`http://localhost:7000/my-orders/${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Product
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Order ID
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Price
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 p-2 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img
                            src={`http://localhost:7000/uploads/${
                              order.image || "default-med.png"
                            }`}
                            alt={order.product}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src =
                                "https://cdn-icons-png.flaticon.com/512/883/883356.png";
                            }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">
                          {order.product}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-400 font-medium">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-slate-900">
                        Rs.{order.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="p-20 text-center">
              <Package className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-500 font-medium">
                No purchase records available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
