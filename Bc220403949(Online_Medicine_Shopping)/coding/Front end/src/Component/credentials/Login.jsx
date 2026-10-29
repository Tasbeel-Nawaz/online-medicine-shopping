import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, UserCircle } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/login", {
        email,
        password,
        role, 
      });

      if (res.data.success) {
        localStorage.setItem("Name", res.data.user.name);
        localStorage.setItem("Email", res.data.user.email);
        localStorage.setItem("Image", res.data.user.image);
        localStorage.setItem("Role", res.data.user.role);
          navigate("/");
      } else {
        alert("❌ " + (res.data.message || "Invalid Email or Password"));
      }
    } catch (err) {
      alert(
        "❌ Login Failed: " +
          (err.response?.data?.message || err.message || "Network Error")
      );
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200">
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Online Medicine <br /> Shopping System
        </h1>
        <p className="text-lg text-white/90 max-w-md">
          Buy medicines safely from home. Trusted pharmacy, fast delivery, secure payments.
        </p>
        <div className="mt-10 flex gap-4">
          <div className="bg-white/20 px-6 py-4 rounded-xl">💊 Verified Medicines</div>
          <div className="bg-white/20 px-6 py-4 rounded-xl">🚚 Fast Delivery</div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Login As</label>
              <div className="flex items-center mt-2 bg-gray-100 rounded-xl px-4">
                <UserCircle className="text-gray-400" size={18} />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-transparent px-3 py-4 outline-none text-gray-700 cursor-pointer appearance-none"
                >
                  <option value="customer">Customer</option>
                  <option value="manager">User/Manger</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <div className="flex items-center mt-2 bg-gray-100 rounded-xl px-4">
                <Mail className="text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-3 py-4 outline-none text-gray-700"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center mt-2 bg-gray-100 rounded-xl px-4">
                <Lock className="text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-3 py-4 outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mb-8">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>
              <Link to="/forget" className="text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-lg font-semibold hover:scale-[1.02] transition shadow-lg"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?
            <Link to="/signup" className="text-indigo-600 font-semibold ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}