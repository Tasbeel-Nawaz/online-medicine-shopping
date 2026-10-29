import React, { useState } from 'react';
import axios from 'axios';
import { Truck, User, Phone, Mail, MapPin } from "lucide-react";

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    address: '',
    company: '',
    role: "supplier"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7000/supplier_add", formData);
      if (res.data.success) {
        alert("✅ Supplier Added Successfully!");
        setFormData({ name: '', number: '', email: '', address: '', company: '', role: 'supplier' });
      }
    } catch (err) {
      console.error(err);
      alert(`❌ Error: ${err.response?.data?.message || "Server Error"}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 font-sans">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="bg-blue-50 p-3 rounded-full">
          <Truck className="text-blue-600 w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Add New Supplier</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2 mb-1">
            <User size={14} /> Supplier Name
          </label>
          <input 
            name="name" value={formData.name} onChange={handleChange}
            placeholder="Ali Ahmed" required
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1 block">Company Name</label>
          <input 
            name="company" value={formData.company} onChange={handleChange}
            placeholder="Getz Pharma"
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2 mb-1">
              <Phone size={14} /> Contact
            </label>
            <input 
              name="number" value={formData.number} onChange={handleChange}
              placeholder="03001234567" required
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2 mb-1">
              <Mail size={14} /> Email
            </label>
            <input 
              name="email" value={formData.email} onChange={handleChange}
              placeholder="info@supplier.com"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2 mb-1">
            <MapPin size={14} /> Office Address
          </label>
          <textarea 
            name="address" value={formData.address} onChange={handleChange}
            placeholder="Street, City, Country"
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 h-24 resize-none"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          Save Supplier
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;