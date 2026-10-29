import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Trash2,  Phone, Mail, MapPin } from "lucide-react";

const SupplierManager = () => {
  const [suppliers, setSuppliers] = useState([]);
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/suppliers");
      setSuppliers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSuppliers(); }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Delete this supplier?")) {
      await axios.delete(`http://localhost:7000/supplier_delete/${id}`);
      fetchSuppliers();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <Truck className="text-emerald-600" size={36} /> 
            Supplier <span className="text-emerald-600">Hub</span>
          </h2>
          <p className="text-gray-500 mt-1 font-medium italic">Your trusted medical supply network</p>
        </div>
        <div className="bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 px-6 py-2 rounded-2xl font-black text-sm tracking-widest">
          {suppliers.length} ACTIVE PARTNERS
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suppliers.map((sup) => (
          <div key={sup._id} className="bg-white rounded-[2rem] p-7 shadow-sm border border-gray-100 hover:border-emerald-200 transition-all duration-300 relative">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Truck size={24} />
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(sup._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition"><Trash2 size={20}/></button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 tracking-tight leading-none">{sup.name}</h3>
                <p className="text-emerald-600 font-extrabold text-xs mt-2 uppercase tracking-widest">{sup.company}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="p-1.5 bg-gray-100 rounded-lg"><Phone size={14}/></div> {sup.number}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="p-1.5 bg-gray-100 rounded-lg"><Mail size={14}/></div> {sup.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="p-1.5 bg-gray-100 rounded-lg"><MapPin size={14}/></div> {sup.address || 'Global Supplier'}
                  </div>
                </div>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierManager;