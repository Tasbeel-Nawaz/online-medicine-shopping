import { useState } from "react";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react"; 
import axios from "axios";

export default function Customer_Add() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "", // Matching the key used in state
    address: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX 1: Destructure from 'form' state before using
      const { name, email, number, address, password } = form;

      const response = await axios.post(
        "http://localhost:7000/signup",
        { password, name, email, number, address }
      );

      if (response.data.success) {
        alert("Sign-Up Successfully ✅");
        // Optional: Reset form after success
        setForm({ name: "", email: "", number: "", address: "", password: "" });
      }

    } catch (err) {
      if (err.response) {
        const message = err.response.data?.message || "";

        if (message.toLowerCase().includes("email")) {
          alert("Email already exists ❌");
        } 
        else if (message.toLowerCase().includes("number")) {
          alert("Phone number already exists ❌");
        } 
        else {
          alert(message || "Registration failed");
        }
      } else {
        alert("Network Error ⚠ Please check your connection");
      }
    }
  };

  return (
    <div className="flex p-6 justify-center items-center  bg-gradient-to-br from-green-50 to-green-100 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-4 text-white text-center">
          <h2 className="text-xl font-bold">Add New Customer</h2>
          <p className="text-xs opacity-90 mt-1">Fill in the details</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone Field - FIX 2: Fixed state key mismatch (number vs phone) */}
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              required
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>

          {/* Address Field */}
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              required
              placeholder="Address"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            ➕ Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}