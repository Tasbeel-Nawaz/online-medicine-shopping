
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pill, Activity } from "lucide-react";

const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [image, setImage] = useState(null);

  const fetchMedicines = async () => {
    const res = await axios.get("http://localhost:7000/medicines");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(editData).forEach((key) => data.append(key, editData[key]));
    if (image) data.append("image", image);

    try {
      await axios.put(
        `http://localhost:7000/medicine_update/${editingId}`,
        data
      );
      alert("✅ Updated!");
      setEditingId(null);
      fetchMedicines();
    } catch (err) {
      alert("❌ Update Failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      {editingId ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl border mb-10">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">
            Update Medicine
          </h2>
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-bold mb-1">
                Medicine Name
              </label>
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Price</label>
              <input
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Stock Quantity
              </label>
              <input
                value={editData.quantity}
                onChange={(e) =>
                  setEditData({ ...editData, quantity: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Expiry Date
              </label>
              <input
                value={editData.expiryDate}
                onChange={(e) =>
                  setEditData({ ...editData, expiryDate: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-1">Supplier</label>
              <input
                value={editData.supplier}
                onChange={(e) =>
                  setEditData({ ...editData, supplier: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-1">
                Change Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-1 border rounded bg-gray-50"
              />
            </div>
            <div className="md:col-span-2 flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="flex-1 bg-gray-500 text-white font-bold py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
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

                <button
                  onClick={() => {
                    setEditingId(med._id);
                    setEditData(med);
                  }}
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineManager;
