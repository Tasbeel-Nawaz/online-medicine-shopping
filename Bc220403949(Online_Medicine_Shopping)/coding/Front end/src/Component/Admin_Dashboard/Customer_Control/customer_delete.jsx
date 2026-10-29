import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Search } from "lucide-react";

export default function Customer_Delete() {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/customers/${id}`);
      alert("Customer Deleted Successfully ✅");
      fetchCustomers();
    } catch (error) {
      alert("Error deleting customer ❌");
    }
  };
  const filteredCustomers = customers.filter((cus) =>
    cus.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Delete Customers
          </h2>

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            {filteredCustomers.length} Found
          </span>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search customer by name..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {filteredCustomers.map((cus) => (
            <div
              key={cus._id}
              className="bg-white p-4 rounded-2xl shadow-sm border flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={cus.image || "https://i.pravatar.cc/150"}
                  alt={cus.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {cus.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {cus.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(cus._id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition active:scale-95"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No customers found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}