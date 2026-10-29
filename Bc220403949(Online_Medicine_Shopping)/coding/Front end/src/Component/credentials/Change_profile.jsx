import { useState, useEffect } from "react";
import axios from "axios";

export default function ChangeProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(""); 


  useEffect(() => {
    const storedName = localStorage.getItem("Name");
    const storedEmail = localStorage.getItem("Email");
    const storedImage = localStorage.getItem("Image");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedImage) setImage(storedImage);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("Email");

    try {
      const res = await axios.put("http://localhost:7000/update-profile", {
        currentEmail: storedEmail,
        name,
        email,
        password: currentPassword,
        newPassword,
        image, 
      });

      if (res.data.success) {
        localStorage.setItem("Name", res.data.user.name);
        localStorage.setItem("Email", res.data.user.email);
        if (res.data.user.image) {
          localStorage.setItem("Image", res.data.user.image);
        }
        alert("Profile Updated Successfully ✅");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error: Check if backend is running");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
          Change Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          
          {/* --- Image Preview & Upload --- */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-sm"
              />
            </div>
            <label className="mt-3 cursor-pointer text-sm font-semibold text-emerald-700 hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* --- Name Input --- */}
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* --- Email Input --- */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* --- Current Password --- */}
          <div>
            <label className="text-sm font-medium text-gray-600">Current Password</label>
            <input
              type="password"
              placeholder="Required to save changes"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* --- New Password --- */}
          <div>
            <label className="text-sm font-medium text-gray-600">New Password (Optional)</label>
            <input
              type="password"
              placeholder="Leave empty if not changing"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500 transition shadow-md font-bold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}