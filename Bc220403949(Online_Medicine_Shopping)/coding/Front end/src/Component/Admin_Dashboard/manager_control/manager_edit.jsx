import { useState, useEffect } from "react";
import axios from "axios";
import { Camera, ArrowLeft, Save, ChevronRight } from "lucide-react";

export default function Manager_Management() {
  const [managers, setmanagers] = useState([]);
  const [selectedmanager, setSelectedmanager] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchmanager();
  }, []);

  const fetchmanager = async () => {
    try {
      const res = await axios.get("http://localhost:7000/manager");
      setmanagers(res.data);
    } catch (err) {
      alert("Error fetching customers:", err);
    }
  };

  const handleEditClick = (manager) => {
    setSelectedmanager({ ...manager });
    setPreview(manager.image);
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String); 
        setSelectedmanager({ ...selectedmanager, image: base64String }); 
      };
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:7000/manager/${selectedmanager._id}`,
        selectedmanager
      );
      alert("manager Updated Successfully ✅");
      setSelectedmanager(null);
     fetchmanager();
    } catch (error) {
      alert("Update failed! Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!selectedmanager ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Manager List</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {managers.length} Total
              </span>
            </div>

            <div className="grid gap-4">
              {managers.map((man) => (
                <div
                  key={man._id}
                  onClick={() => handleEditClick(man)}
                  className="group bg-white p-4 rounded-2xl shadow-sm border flex items-center justify-between cursor-pointer hover:shadow-md hover:border-green-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={man.image || "https://i.pravatar.cc/150"}
                      alt={man.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                        {man.name}
                      </h3>
                      <p className="text-xs text-gray-500">{man.email}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedmanager(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition"
            >
              <ArrowLeft size={20} /> Back to List
            </button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
              <div className="h-28 bg-gradient-to-r from-green-600 to-emerald-500 relative">
                <div className="absolute -bottom-10 left-8">
                  <div className="relative group">
                    <img
                      src={preview || "https://i.pravatar.cc/150"}
                      className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
                      alt="Profile"
                    />
                    <label className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-md cursor-pointer text-green-600 hover:bg-green-50 transition">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-14 pb-8 px-8 space-y-4">
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    value={selectedmanager.name || ""}
                    onChange={(e) => setSelectedmanager({ ...selectedmanager, name: e.target.value })}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    value={selectedmanager.email || ""}
                    onChange={(e) => setSelectedmanager({ ...selectedmanager, email: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    value={selectedmanager.number || ""}
                    onChange={(e) => setSelectedmanager({ ...selectedmanager, number: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    value={selectedmanager.address || ""}
                    onChange={(e) => setSelectedmanager({ ...selectedmanager, address: e.target.value })}
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`w-full ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-green-100`}
                >
                  <Save size={18} /> {loading ? "Updating..." : "Update Data"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}