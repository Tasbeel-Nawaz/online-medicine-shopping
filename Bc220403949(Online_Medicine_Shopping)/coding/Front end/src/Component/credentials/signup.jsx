import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword)
      return alert("Passwords Do Not Match");
  
    try {
      const response = await axios.post(
        "http://localhost:7000/signup",
        { password, name, email, number, address }
      );
  
      if (response.data.success) {
        alert("Sign-Up Successfully ✅");
      }
  
    } catch (err) {
  
      if (err.response) {
        const message = err.response.data?.message || "";
  
        if (message.includes("email")) {
          alert("Email already exists ❌");
        } 
        else if (message.includes("number")) {
          alert("Phone number already exists ❌");
        } 
        else {
          alert(message);
        }
  
      } else {
        alert("Network Error ⚠ Please check your connection");
      }
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-200">
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Create Your Account
        </h1>
        <p className="text-lg text-white/90 max-w-md">
          Join our trusted online pharmacy and get medicines delivered safely.
        </p>

        <div className="mt-8 space-y-3">
          <div className="bg-white/20 px-6 py-3 rounded-xl">
            ✅ Secure & Trusted
          </div>
          <div className="bg-white/20 px-6 py-3 rounded-xl">
            💊 Genuine Medicines
          </div>
          <div className="bg-white/20 px-6 py-3 rounded-xl">
            🚚 Fast Delivery
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Sign Up</h2>
            <p className="text-gray-500 text-sm mt-1">
              Create your free account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <User className="text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <Mail className="text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <MapPin className="text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="House Addess"
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <Phone className="text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Contact Number"
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <Lock className="text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center bg-gray-100 rounded-xl px-4">
                <Lock className="text-gray-400" size={16} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
                <button onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-sm hover:scale-[1.01] transition shadow-lg"
            >
              Create Account
            </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?
              <Link to="/login" className="text-indigo-600 font-semibold ml-1">
                Login
              </Link>
            </p>
            <p className="text-center text-sm mt-4">
              <Link to="/forget" className="text-indigo-600 font-semibold ml-1">
              Forget Password
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
