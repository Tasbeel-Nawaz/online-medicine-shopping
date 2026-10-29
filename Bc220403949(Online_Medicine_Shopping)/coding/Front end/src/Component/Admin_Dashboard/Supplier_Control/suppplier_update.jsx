import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Truck,
  Edit3,
  Check,
  Phone,
  Mail,
  MapPin,
  Building2,
  X,
} from "lucide-react";

const SupplierManager = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7000/supplier_update/${editingId}`,
        editData
      );
      alert("✅ Supplier Updated!");
      setEditingId(null);
      fetchSuppliers();
    } catch (err) {
      alert("❌ Update Failed");
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-screen bg-white">
      {/* --- Minimal Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-100 pb-8 gap-4">
        <div>
          <h2 className="text-4xl font-light text-slate-800 tracking-tight">
            Registered{" "}
            <span className="font-black text-emerald-600">Suppliers</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-2">
            Manage your professional medical supply network
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-slate-200 tracking-tighter block leading-none">
            {suppliers.length.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Total Partners
          </span>
        </div>
      </div>

      {/* --- Simple Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {suppliers.map((sup) => (
          <div
            key={sup._id}
            className="group relative border-l-4 border-gray-100 hover:border-emerald-500 pl-8 py-4 transition-all duration-300"
          >
            {editingId === sup._id ? (
              /* --- Edit Mode --- */
              <form
                onSubmit={handleUpdate}
                className="bg-slate-50 p-6 rounded-3xl space-y-4 animate-in fade-in duration-300"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contact Person"
                  />
                  <input
                    value={editData.company}
                    onChange={(e) =>
                      setEditData({ ...editData, company: e.target.value })
                    }
                    className="col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Company Name"
                  />
                  <input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Email"
                  />
                  <input
                    value={editData.number}
                    onChange={(e) =>
                      setEditData({ ...editData, number: e.target.value })
                    }
                    className="col-span-2 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                  >
                    <Check size={16} className="inline mr-1" /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 bg-white text-slate-400 py-2.5 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              </form>
            ) : (
              /* --- View Mode --- */
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {sup.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                      <Building2 size={12} /> {sup.company}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingId(sup._id);
                      setEditData(sup);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-emerald-50 text-emerald-600 rounded-full transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <Phone size={14} />
                    </div>
                    <span className="text-sm font-semibold">{sup.number}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <Mail size={14} />
                    </div>
                    <span className="text-sm font-semibold truncate">
                      {sup.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 sm:col-span-2">
                    <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <MapPin size={14} />
                    </div>
                    <span className="text-sm font-semibold">
                      {sup.address || "Verified Distribution Center"}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Official Partner
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierManager;
