import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingBag, ShieldCheck, Zap, Info } from "lucide-react";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const role = localStorage.getItem("Role");

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      const search = params.get("search");

      let url = "http://localhost:7000/api/medicines";
      if (search) {
        url = `http://localhost:7000/api/medicines?search=${search}`;
      }

      try {
        const res = await axios.get(url);
        setMedicines(res.data);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto py-16 px-6">
        <header className="mb-16 text-center">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mb-4">
            MediCare Catalog
          </h2>
          <h1 className="text-5xl font-extrabold mb-6">
            Essential{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
              Wellness
            </span>{" "}
            Store
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            100% genuine medicines with fast & secure delivery.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-emerald-600 font-semibold animate-pulse">
              Loading medicines...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {medicines.length > 0 ? (
              medicines.map((med) => (
                <div
                  key={med._id}
                  className="group bg-white/80 backdrop-blur-lg p-4 rounded-3xl border border-emerald-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col sm:flex-row items-center"
                >
                 <div className="w-full sm:w-44 h-44 bg-emerald-50 rounded-2xl overflow-hidden flex-shrink-0">
                    {med.image ? (
                      <img
                        src={`http://localhost:7000/uploads/${med.image}`}
                        alt={med.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-300">
                        <Zap size={50} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow w-full">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                      {med.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4 text-emerald-600">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Verified & Safe
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="bg-emerald-100 px-4 py-2 rounded-xl">
                        <p className="text-xs text-emerald-700 font-bold uppercase">
                          Price
                        </p>
                        <p className="text-2xl font-extrabold text-emerald-700">
                          ${med.price}
                        </p>
                      </div>

                      {role === "customer" && (
                        <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95">
                          <ShoppingBag size={18} />
                          <span className="font-semibold">Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-16 rounded-3xl text-center shadow-md border border-emerald-100">
                <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Info size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  No Medicines Found
                </h3>
                <p className="text-slate-500 mt-2">
                  Try searching with a different keyword.
                </p>
                <button
                  onClick={() => (window.location.href = "/medicines")}
                  className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                  View All Medicines
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}