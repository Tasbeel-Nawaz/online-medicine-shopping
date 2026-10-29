import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Banner from "../banner";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const res = await axios.get("http://localhost:7000/medicines");
        setMedicines(res.data.slice(0, 5));
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchMeds();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Banner />
      
      <section className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-10 bg-emerald-600 rounded-full"></span>
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">Featured Selection</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/product")}
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-sm"
          >
            Explore Full Catalog 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {medicines.map((med) => (
            <div 
              key={med._id} 
              className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 hover:-translate-y-2 relative"
            >
              <div className="absolute top-6 right-6 z-10">
                 <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl border border-slate-100 text-emerald-600 shadow-sm">
                    <Star size={14} fill="currentColor" />
                 </div>
              </div>
              <div className="aspect-[4/5] bg-slate-50 rounded-[2rem] mb-5 overflow-hidden flex items-center justify-center p-8 group-hover:bg-emerald-50/30 transition-colors duration-500">
                <img
                  src={`http://localhost:7000/uploads/${med.image}`}
                  alt={med.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="px-2 pb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{med.category || "Pharmacy"}</p>
                <h3 className="font-bold text-slate-800 text-lg truncate mb-4">{med.name}</h3>
                
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                  <span className="text-indigo-600 font-black text-base ml-2">Rs.{med.price}</span>
                  <button 
                    onClick={() => navigate("/product")}
                    className="h-10 w-10 bg-emerald-600 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 flex items-center justify-center shadow-lg shadow-emerald-100"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center lg:hidden">
          <button 
            onClick={() => navigate("/product")}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-200"
          >
            See All Products <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}