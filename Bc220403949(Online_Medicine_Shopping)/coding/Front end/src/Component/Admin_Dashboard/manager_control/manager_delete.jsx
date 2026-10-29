import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Search } from "lucide-react";

export default function Manager_Delete() {

  const [managers, setmanagers] = useState([]);

  useEffect(() => {
    fetchmanagers();
  }, []);

  const fetchmanagers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/manager");
      setmanagers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/manager/${id}`);
      alert("Manager Deleted Successfully ✅");
      fetchmanagers();
    } catch (error) {
      alert("Error deleting Manager ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Delete Manager
          </h2>
        </div>
        <div className="grid gap-4">
          {managers.map((man) => (
            <div
              key={man._id}
              className="bg-white p-4 rounded-2xl shadow-sm border flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={man.image || "https://i.pravatar.cc/150"}
                  alt={man.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {man.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {man.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(man._id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition active:scale-95"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          ))}

          {managers.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No managers found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}