import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Building2, Phone, Mail, MapPin, 
  PackageCheck, Info, ArrowRight, ShieldCheck, 
  Boxes, BadgeCheck 
} from "lucide-react";

const SupplierDetail = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supRes, medRes] = await Promise.all([
          axios.get("http://localhost:7000/suppliers"),
          axios.get("http://localhost:7000/medicines")
        ]);
        setSuppliers(supRes.data);
        setMedicines(medRes.data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase">
          Network Directory
        </span>
        <h1 className="text-5xl font-black text-slate-900 mt-4 tracking-tight">
          Supplier <span className="text-emerald-600">Profiles</span>
        </h1>
        <p className="text-slate-500 mt-3 text-lg font-medium">Detailed insights into your medical supply chain partners</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12">
        {suppliers.map((sup) => {
          const suppliedProducts = medicines.filter(
            (med) => med.supplier === sup.name || med.supplier === sup.company
          );

          return (
            <div key={sup._id} className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
              
              {/* LEFT SIDE: Supplier Identity */}
              <div className="lg:w-1/3 bg-slate-900 p-10 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Building2 size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="h-20 w-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                    <User size={40} strokeWidth={2.5} />
                  </div>
                  
                  <h2 className="text-3xl font-black leading-tight mb-2">{sup.name}</h2>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider uppercase mb-8">
                    <ShieldCheck size={16} /> Verified Supplier
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        <Phone size={18} />
                      </div>
                      <span className="text-slate-300 font-medium">{sup.number}</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <span className="text-slate-300 font-medium truncate">{sup.email}</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        <MapPin size={18} />
                      </div>
                      <span className="text-slate-300 font-medium">{sup.address || 'Headquarters'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Product Portfolio */}
              <div className="lg:w-2/3 p-10 md:p-14 bg-white">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                      <Boxes className="text-emerald-600" /> Supply Portfolio
                    </h3>
                    <p className="text-slate-400 font-medium mt-1 text-sm italic">Inventory provided by {sup.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-emerald-600 block leading-none">{suppliedProducts.length}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active SKUs</span>
                  </div>
                </div>

                {suppliedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suppliedProducts.map((med, idx) => (
                      <div key={idx} className="group flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-all shadow-sm">
                            <PackageCheck size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-base">{med.name}</h4>
                            <p className="text-xs text-slate-400 font-semibold">{med.category} • {med.price} PKR</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase ${med.quantity > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            Stock: {med.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                    <Info className="text-slate-300 mb-2" size={40} />
                    <p className="text-slate-500 font-bold">No products currently linked to this partner.</p>
                  </div>
                )}

                {/* Footer Insight */}
                <div className="mt-12 p-6 bg-emerald-600 rounded-3xl flex items-center justify-between text-white shadow-xl shadow-emerald-200">
                  <div className="flex items-center gap-4">
                    <BadgeCheck size={28} />
                    <div>
                      <p className="font-black text-sm uppercase tracking-wider">Trusted Distribution</p>
                      <p className="text-xs text-emerald-100">This supplier meets all medical safety standards.</p>
                    </div>
                  </div>
                  <ArrowRight className="opacity-50" />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierDetail;