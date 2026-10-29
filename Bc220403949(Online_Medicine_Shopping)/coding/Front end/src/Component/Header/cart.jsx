import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingBag,
  ShoppingCart,
  Trash2,
  PackageSearch,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CompactBill from "../Customer_Dasshboard/generate_bill";

export default function MedicineShop() {
  const [medicines, setMedicines] = useState([]);
  const [stock, setStocks] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchMeds = async () => {
    try {
      const email = localStorage.getItem("Email");
      const res = await axios.get(`http://localhost:7000/get_cart/${email}`);
      const ress = await axios.get("http://localhost:7000/medicines");
      setMedicines(res.data);
      setStocks(ress.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  const handleBuy = async (med) => {
    try {
      const name = localStorage.getItem("Name");
      const email = localStorage.getItem("Email");

      if (!name || !email) {
        alert("Please login first");
        return;
      }

      const ress = await axios.put(
        `http://localhost:7000/medicines/buy/${med.id || med._id}`,
        { name, email }
      );

      if (ress.data.message === "Order successful") {
        alert(`✅ ${ress.data.name} Purchase successful!`);

        setSelectedOrder({
          product: med.product,
          price: med.price,
          category: med.category,
          orderId: ress.data.id,
          items: [{ name: med.product, price: med.price, qty: 1 }],
        });

        fetchMeds();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Purchase failed";
      alert(errorMsg);
    }
  };

  const handledeleteToCart = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/cart/${id}`);
      fetchMeds();
    } catch (err) {
      alert(err.response?.data?.message || "Remove to cart failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFE] font-sans text-slate-900">
      {selectedOrder && (
        <CompactBill
          orderData={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <main className="max-w-7xl mx-auto px-6 py-12">
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {medicines.map((med) => {
              const matchedStock = stock.find((st) => st.name === med.product);
              return (
                <div key={med._id} className="group">
                  <div className="aspect-square bg-white rounded-[2.5rem] overflow-hidden relative mb-4 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-100 group-hover:-translate-y-2">
                    <img
                      src={`http://localhost:7000/uploads/${med.image}`}
                      alt={med.product}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                    {matchedStock && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Stock: {matchedStock.quantity}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 px-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight truncate w-40">
                          {med.product}
                        </h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">
                          {med.category}
                        </p>
                      </div>
                      <span className="font-black text-indigo-600 text-lg">
                        Rs.{med.price}
                      </span>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleBuy(med)}
                        disabled={matchedStock?.quantity <= 0}
                        className={`w-full py-3 px-5 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                          ${
                            matchedStock?.quantity > 0
                              ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200 active:scale-95"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                      >
                        <ShoppingBag size={18} />
                        {matchedStock?.quantity > 0
                          ? "Buy Now"
                          : "Out of Stock"}
                      </button>

                      <button
                        onClick={() => handledeleteToCart(med._id)}
                        className="w-full py-3 px-5 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-white text-red-500 border border-red-50 hover:bg-red-50 hover:border-red-100"
                      >
                        <Trash2 size={18} />
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-b from-slate-50 to-white p-8 rounded-full border border-slate-100 shadow-inner">
                <PackageSearch
                  size={80}
                  className="text-slate-300"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg border-4 border-white">
                <ShoppingCart size={20} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">
              Your Cart is Empty
            </h2>
            <Link
              to="/medicines"
              className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-95"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
