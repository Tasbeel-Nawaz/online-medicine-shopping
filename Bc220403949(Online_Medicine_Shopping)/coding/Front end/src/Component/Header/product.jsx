import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Pill, Info, Calendar, Tag } from "lucide-react";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/medicines")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Data fetching error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          Our <span className="text-emerald-600">Medicine</span> Collection
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Explore our wide range of authentic medical products with real-time stock availability.
        </p>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((prod) => (
          <div key={prod._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Image Container with Overlay */}
            <div className="relative h-56 bg-gray-50 overflow-hidden">
              {prod.image ? (
                <img 
                  src={`http://localhost:7000/uploads/${prod.image}`} 
                  alt={prod.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  <Pill size={64} />
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm border border-emerald-100 flex items-center gap-1">
                <Tag size={12} /> {prod.category || 'General'}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {prod.name}
                </h3>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">Rs. {prod.price}</span>
                  <span className={`text-xs px-2 py-1 rounded-md font-bold ${prod.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {prod.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-xl">
                  <Calendar size={16} className="text-emerald-500" />
                  <span className="font-medium">Expires: {prod.expiryDate || 'Not Mentioned'}</span>
                </div>
              </div>
            </div>
            </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-32">
          <ShoppingBag size={80} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-2xl font-bold text-gray-400">No Products Available</h3>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;