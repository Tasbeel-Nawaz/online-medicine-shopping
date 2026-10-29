import React, { useState, useEffect } from "react";
import { Pill, Upload, Calendar, DollarSign, Package, User, Tag } from "lucide-react";
import axios from "axios";

const AddMedicine = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [image, setImage] = useState(null);
  const [medicine, setMedicine] = useState({
    name: "",
    quantity: "",
    category: "Tablet",
    price: "",
    supplier: "",
    expiryDate: "",
    role: "Nill"
  });
  useEffect(() => {
    axios.get("http://localhost:7000/suppliers")
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Error fetching suppliers:", err));
  }, []);

  const handleChange = (e) =>
    setMedicine({ ...medicine, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(medicine).forEach(key => data.append(key, medicine[key]));
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:7000/medicine_add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        alert("✨ Success! Medicine added to Emerald Stock.");
        setMedicine({ name: "", quantity: "", category: "Tablet", price: "", supplier: "", expiryDate: "", role: "Nill" });
        setImage(null);
        e.target.reset(); 
      }
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-1 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-[2.5rem] shadow-2xl">
      <div className="bg-white rounded-[2.3rem] p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
            <Pill size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">
            New <span className="text-emerald-600">Inventory</span> Item
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Fill in the details to update your stock</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <Tag size={14}/> Medicine Name
            </label>
            <input 
              name="name" 
              value={medicine.name}
              placeholder="e.g. Augmentin 625mg" 
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all font-semibold text-gray-700" 
              required 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <DollarSign size={14}/> Price (PKR)
            </label>
            <input 
              name="price" 
              value={medicine.price}
              type="number" 
              placeholder="0.00" 
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold text-gray-700" 
              required 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <Package size={14}/> Total Quantity
            </label>
            <input 
              name="quantity" 
              value={medicine.quantity}
              type="number" 
              placeholder="e.g. 500" 
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold text-gray-700" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <Calendar size={14}/> Expiry Date
            </label>
            <input 
              name="expiryDate" 
              value={medicine.expiryDate}
              type="date" 
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold text-gray-700" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              Category
            </label>
            <select 
              name="category" 
              value={medicine.category}
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold text-gray-700 appearance-none cursor-pointer"
            >
              <option>Tablet</option>
              <option>Syrup</option>
              <option>Injection</option>
              <option>Capsule</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <User size={14}/> Authorized Supplier
            </label>
            <select 
              name="supplier" 
              value={medicine.supplier}
              onChange={handleChange} 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold text-gray-700 transition-all cursor-pointer" 
              required
            >
              <option value="">Select a partner</option>
              {suppliers.map(sup => (
                <option key={sup._id} value={sup.name}>{sup.name} ({sup.company})</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-[0.1em]">
              <Upload size={14}/> Product Image
            </label>
            <div className="relative group border-2 border-dashed border-emerald-100 bg-emerald-50/20 rounded-3xl p-6 text-center hover:bg-emerald-50 transition-all cursor-pointer">
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="flex flex-col items-center">
                <Upload className="text-emerald-400 mb-2" />
                <p className="text-sm font-bold text-gray-500">{image ? image.name : "Tap to upload photo"}</p>
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="md:col-span-2 mt-4 bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-95 uppercase"
          >
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;