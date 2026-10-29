import {
  Search,
  Menu,
  ShoppingCart,
  HeartPulse,
  User,
  LogOut,
  ChevronDown,
  X,
  UserPlus,
  LogIn,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: null,
    email: null,
    image: null,
    role: null,
  });

  useEffect(() => {
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    const image = localStorage.getItem("Image");
    const role = localStorage.getItem("Role");

    if (name && name !== "null") {
      setUserData({
        name,
        email,
        role: role || "customer",
        image: image === "null" || !image ? null : image,
      });
    }
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:7000/api/medicines?search=${searchQuery.trim()}`
      );

      if (response.data && response.data.length > 0) {
        navigate(`/searches?search=${searchQuery.trim()}`);
        setOpen(false);
      } else {
        alert("Medicine not matched! Please check spelling.");
      }
    } catch (error) {
      console.error("Search API Error:", error);
      alert("Connection error! Make sure backend is running on port 7000.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserData({ name: null, email: null, image: null, role: null });
    setDropdown(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* ================= TOP HEADER ================= */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
              <HeartPulse className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              MediCare
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-10">
            <div className="relative w-full max-w-xl">
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines or categories..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all"
              />
            </div>
          </form>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6">
            {userData.name ? (
              <>
                {userData.role === "customer" && (
                  <Link
                    to="/cart"
                    className="flex items-center gap-1 text-slate-600 hover:text-emerald-600 transition"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-sm font-medium">Cart</span>
                  </Link>
                )}

                <div className="relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 bg-slate-50 p-1.5 pr-3 rounded-full hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100"
                  >
                    {userData.image ? (
                      <img
                        src={userData.image}
                        className="h-8 w-8 rounded-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <User size={18} />
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-700">
                      {userData.name}
                    </span>
                    <ChevronDown
                      size={14}
                      className={
                        dropdown ? "rotate-180 transition" : "transition"
                      }
                    />
                  </button>

                  {dropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-2xl rounded-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                      <Link
                        to="/change_profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 transition"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* If NOT Logged In (Guest Buttons) */
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 hover:text-emerald-600 px-4 py-2 transition flex items-center gap-2"
                >
                  <LogIn size={18} /> Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-bold bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-100 transition flex items-center gap-2"
                >
                  <UserPlus size={18} /> Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 text-slate-700 bg-slate-100 rounded-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-2xl z-40 animate-in slide-in-from-top duration-300">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </form>
            <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-2xl z-40 animate-in slide-in-from-top duration-300">
              <div className="p-4 space-y-4">
                {userData.name ? (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    {userData.image ? (
                      <img
                        src={userData.image}
                        alt="profile"
                        className="h-12 w-12 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                        <User size={24} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        {userData.name}
                      </p>
                      <p className="text-xs text-emerald-600 capitalize font-medium">
                        {userData.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition"
                    >
                      <LogIn size={18} /> Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl font-bold text-sm transition"
                    >
                      <UserPlus size={18} /> Sign Up
                    </Link>
                  </div>
                )}

                {/* NAV LINKS MOBILE */}
                <ul className="space-y-1">
                  {!userData.name && (
                    <>
                      <li>
                        <Link
                          to="/"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition font-medium"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/product"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition font-medium"
                        >
                          Products
                        </Link>
                      </li>
                    </>
                  )}
                  {userData.role === "admin" && (
                    <>
                      <li>
                        <Link
                          to="/"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/product"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/medicine_control"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Medicine Control
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/customer_control"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Customer Control
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/suppliers"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Supplier Control
                        </Link>
                        <Link
                          to="/manager"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          User Control
                        </Link>
                      </li>
                    </>
                  )}
                  {userData.role === "manager" && (
                    <>
                      <li>
                        <Link
                          to="/"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/product"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Product
                        </Link>
                      </li>
                    </>
                  )}
                  {userData.role === "customer" && (
                    <>
                      <li>
                        <Link
                          to="/"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/medicines"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Medicine
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my_order"
                          onClick={() => setOpen(false)}
                          className="block p-3 hover:bg-emerald-50 rounded-xl transition"
                        >
                          Order
                        </Link>
                      </li>
                    </>
                  )}
                </ul>

                {userData.name && (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 font-bold rounded-2xl transition"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESKTOP NAV (EMERALD BAR) ================= */}
      <nav className="bg-emerald-600 hidden md:block border-t border-emerald-500/30">
        <div className="max-w-7xl mx-auto flex justify-center gap-10 h-11 items-center text-white text-sm font-semibold">
          {!userData.name && (
            <>
              <Link
                to="/"
                className="hover:text-emerald-100 transition-colors uppercase tracking-wider"
              >
                Home
              </Link>
              <Link
                to="/product"
                className="hover:text-emerald-100 transition-colors uppercase tracking-wider"
              >
                Products
              </Link>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Link to="/" className="hover:text-emerald-100 transition-colors">
                Home
              </Link>
              <Link
                to="/product"
                className="hover:text-emerald-100 transition-colors"
              >
                Product
              </Link>
              <Link
                to="/medicine_control"
                className="hover:text-emerald-100 transition-colors"
              >
                Medicine Control
              </Link>
              <Link
                to="/customer_control"
                className="hover:text-emerald-100 transition-colors"
              >
                Customer Control
              </Link>
              <Link
                to="/suppliers"
                className="hover:text-emerald-100 transition-colors"
              >
                Supplier Control
              </Link>
              <Link
                to="/manager"
                className="hover:text-emerald-100 transition-colors"
              >
                User Control
              </Link>
            </>
          )}
          {userData.role === "manager" && (
            <>
              <Link to="/" className="hover:text-emerald-100 transition-colors">
                Home
              </Link>
              <Link
                to="/product"
                className="hover:text-emerald-100 transition-colors"
              >
                Poduct
              </Link>
            </>
          )}

          {userData.role === "customer" && (
            <>
              <Link to="/" className="hover:text-emerald-100 transition-colors">
                Home
              </Link>
              <Link
                to="/medicines"
                className="hover:text-emerald-100 transition-colors"
              >
                Medicines
              </Link>
              <Link
                to="/my_order"
                className="hover:text-emerald-100 transition-colors"
              >
                My Orders
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
