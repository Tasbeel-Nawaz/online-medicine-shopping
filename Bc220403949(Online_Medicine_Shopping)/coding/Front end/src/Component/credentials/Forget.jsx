import { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);

 
  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:7000/verify-user", {
        name,
        email,
        number,
      });

      if (res.data.success) {
        setVerified(true); 
      } else {
        alert("User not found ❌");
      }
    } catch (err) {
      alert("Verification failed");
    }
  };
  const handleChangePassword = async () => {
    try {
      const res = await axios.post("http://localhost:7000/change-password", {
        email,
        newPassword,
      });

      if (res.data.success) {
        alert("Password updated successfully ✅");
      }
    } catch (err) {
      alert("Password update failed ❌");
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-200">
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <h1 className="text-5xl font-extrabold mb-6">Forgot Password?</h1>
        <p className="text-lg text-white/90 max-w-md">
          Verify your identity to reset your password.
        </p>
      </div>
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          {!verified ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">
                Verify Account
              </h2>

              <div className="space-y-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-4">
                  <User size={16} />
                  <input
                    type="text"
                    placeholder="Registered Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />
                </div>

                <div className="flex items-center bg-gray-100 rounded-xl px-4">
                  <Mail size={16} />
                  <input
                    type="email"
                    placeholder="Registered Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />
                </div>

                <div className="flex items-center bg-gray-100 rounded-xl px-4">
                  <Phone size={16} />
                  <input
                    type="text"
                    placeholder="Registered Phone"
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Verify
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">
                Change Password
              </h2>

              <div className="flex items-center bg-gray-100 rounded-xl px-4 mb-4">
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
              >
                Update Password
              </button>
            </>
          )}

          <p className="text-center text-sm mt-6">
            <Link to="/login" className="text-indigo-600 font-semibold">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}