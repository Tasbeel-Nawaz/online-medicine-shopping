import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Package, Pill, Calendar } from "lucide-react";

const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);

  const getMedicines = () => {
    axios.get("http://localhost:7000/medicines")
      .then(res => setMedicines(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { getMedicines(); }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this medicine?")) {
      axios.delete(`http://localhost:7000/medicine_delete/${id}`)
        .then(() => {
          alert("🗑️ Removed!");
          getMedicines();
        })
        .catch(() => alert("Error deleting"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      
      <header className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Inventory Dashboard</h1>
        <p className="text-green-600 font-medium">Active Stock: {medicines.length} Items</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <div key={med._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden">
            <div className="h-32 bg-gray-100 flex items-center justify-center">
              {med.image ? (
                <img src={`http://localhost:7000/uploads/${med.image}`} className="h-full w-full object-contain" alt="medicine" />
              ) : (
                <Pill className="text-gray-300 w-10 h-10" />
              )}
            </div>

            {/* Details Section */}
            <div className="p-4 flex-grow">
              <h2 className="font-bold text-gray-800 text-lg leading-tight mb-2 truncate">{med.name}</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-bold text-green-600">Rs. {med.price}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Package size={12} /> {med.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50">
                  <span className="text-gray-500 flex items-center gap-1"><Calendar size={14} /> Expiry:</span>
                  <span className={`font-semibold ${med.expiryDate ? 'text-red-500' : 'text-gray-400'}`}>
                    {med.expiryDate || 'N/A'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-3 uppercase font-medium">Supplier: {med.supplier || 'Unknown'}</p>
            </div>
            <button 
              onClick={() => handleDelete(med._id)}
              className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-bold border-t border-red-100 flex items-center justify-center gap-2"
            >
              <Trash2 size={14} /> DELETE ITEM
            </button>
          </div>
        ))}
      </div>

      {medicines.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-medium">
          Stock is currently empty.
        </div>
      )}
    </div>
  );
};

export default MedicineManager;