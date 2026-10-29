import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import CompactBill from "./generate_bill";

export default function MedicineShop() {
  const [medicines, setMedicines] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchMeds = async () => {
    try {
      const res = await axios.get("http://localhost:7000/medicines");
      setMedicines(res.data);
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
        `http://localhost:7000/medicines/buy/${med._id}`,
        { name, email }
      );

      if (ress.data.message === "Order successful") {
        fetchMeds();
        setSelectedOrder({
          ...med,
          orderId: ress.data.id || "MC-" + Math.floor(Math.random() * 9000),
          items: [med] 
        });
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Purchase failed";
      alert(errorMsg);
    }
  };

  const handleAddToCart = async (med) => {
    try {
      const name = localStorage.getItem("Name");
      const email = localStorage.getItem("Email");

      if (!name || !email) {
        alert("Please login first");
        return;
      }

      const res = await axios.post("http://localhost:7000/cart", {
        name,
        email,
        id: med._id,
        product: med.name,
        image: med.image,
        price: med.price,
        quantity: med.quantity,
      });

      if (res.data.message === "Added to cart") {
        alert(`🛒 ${med.name} added to cart!`);
      } else if (res.data.message === "Already Add To Cart") {
        alert(`🛒 ${med.name} already in cart!`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Add to cart failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* BILL MODAL - Yeh background blur ke sath upar show hoga */}
      {selectedOrder && (
        <CompactBill 
          orderData={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {medicines.map((med) => (
            <div key={med._id} className="group">
              {/* Product Image Card */}
              <div className="aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden relative mb-4 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-100 group-hover:-translate-y-2">
                <img
                  src={`http://localhost:7000/uploads/${med.image}`}
                  alt={med.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Stock: {med.quantity}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                      {med.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">
                      {med.category}
                    </p>
                  </div>
                  <span className="font-black text-slate-900 text-lg">
                    Rs.{med.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleBuy(med)}
                    disabled={med.quantity <= 0}
                    className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                      ${med.quantity > 0
                        ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200 active:scale-95"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingBag size={16} />
                    {med.quantity > 0 ? "Buy Now" : "Empty"}
                  </button>

                  <button
                    onClick={() => handleAddToCart(med)}
                    disabled={med.quantity <= 0}
                    className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                      ${med.quantity > 0
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md active:scale-95"
                        : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingCart size={16} />
                    + Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}