import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Pill, Activity } from "lucide-react";

const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);
  const fetchMedicines = async () => {
    const res = await axios.get("http://localhost:7000/medicines");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);


  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
        <div>
          <div className="relative mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg animate-pulse">
                <Activity className="text-green-600 w-6 h-6" />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500">
                Inventory Dashboard
              </h2>
              <div className="bg-green-100 p-2 rounded-lg animate-pulse">
                <Pill className="text-green-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-gray-500 font-medium italic">
              Manage your medical stock with ease
            </p>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <div
                key={med._id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all p-4"
              >
                <div className="h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  {med.image ? (
                    <img
                      src={`http://localhost:7000/uploads/${med.image}`}
                      alt="med"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {med.name}
                </h3>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-bold">Price:</span> Rs. {med.price}
                  </p>
                  <p>
                    <span className="font-bold">Quantity:</span> {med.quantity}
                  </p>
                  <p>
                    <span className="font-bold">Expiry:</span>{" "}
                    {med.expiryDate || "N/A"}
                  </p>
                  <p>
                    <span className="font-bold">Supplier:</span> {med.supplier}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default MedicineManager;