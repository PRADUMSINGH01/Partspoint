"use client";
import { fetchData } from "@/lib/fetchall";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa"; // Using FaEnvelope for Inquiry button

// Assuming Caar is used elsewhere or is a fallback, otherwise it can be removed if not needed.
import Caar from "@/app/(Image)/light.png";

import Link from "next/link";

// Define the Product interface

// Sample product data with discounts
// const products = [
//   {
//     id: "1",
//     name: "MARUTI IGNIS LHS TAIL LIGHT    ",
//     partNumber: "35750M66R00",
//     price: 95000.0, // Example: 4999.00 INR
//     discount: 0,
//     // Make sure these paths are correct relative to your `public` directory
//     // or use a full URL if images are hosted elsewhere.
//     imageUrl: "/images/brake-pad.jpg",
//     description:
//       "Tail Light for MARUTI IGNIS 1ST GEN, IGNIS 1ST GEN F/L - 3575...6R00 - MARUTI SUZUKI",
//   },
// ];

// Define a key for localStorage
const INQUIRY_STORAGE_KEY = "productInquiries";

// Define the WhatsApp number (replace with your actual number or environment variable)
const WHATSAPP_NUMBER = "9468929392"; // Example format with country code

const ProductCatalogPage = () => {
  const [products, setdata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [showForm, setShowForm] = useState(false);
  const [inquiredProducts, setInquiredProducts] = useState(new Set());

  useEffect(() => {
    async function FETCH() {
      const res = await fetchData();
      return setdata(res);
    }

    FETCH();
  }, []);
  // Load inquired products from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInquiries = localStorage.getItem(INQUIRY_STORAGE_KEY);
      if (storedInquiries) {
        try {
          const parsedInquiries = JSON.parse(storedInquiries);
          setInquiredProducts(new Set(parsedInquiries));
        } catch (error) {
          console.error("Failed to parse inquiries from localStorage:", error);
          localStorage.removeItem(INQUIRY_STORAGE_KEY); // Clear corrupted data
        }
      }
    }
  }, []);

  // Function to check if an inquiry exists for a product ID
  const hasExistingInquiry = (productId) => {
    return inquiredProducts.has(productId);
  };

  // Function to handle opening the inquiry form
  const handleInquiry = (product) => {
    setSelectedProduct(product);
    // Reset form data when opening for a new product (optional)
    setFormData({ name: "", phone: "" });
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    // Basic validation (optional)
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please fill in both name and phone number.");
      return;
    }

    console.log("Inquiry Submitted:");
    console.log(
      "Product:",
      selectedProduct.name,
      `(ID: ${selectedProduct.id})`
    );
    console.log("User Name:", formData.name);
    console.log("User Phone:", formData.phone);

    // --- TODO: Send inquiry data to your backend/API here ---

    // Add product ID to the inquired list and update localStorage
    const updatedInquiries = new Set(inquiredProducts);
    updatedInquiries.add(selectedProduct.id);
    setInquiredProducts(updatedInquiries);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        INQUIRY_STORAGE_KEY,
        JSON.stringify(Array.from(updatedInquiries))
      );
    }

    // Close the form and clear selection
    setShowForm(false);
    setSelectedProduct(null);
    alert("Inquiry submitted successfully!"); // Provide user feedback
  };

  // Helper function to format price (handles potential floating point issues)
  const formatPrice = (priceInSmallestUnit) => {
    const price = priceInSmallestUnit / 100; // Convert from paisa/cents to rupees/dollars
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10 text-center">
          Product Catalog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {" "}
          {/* Added xl breakpoint */}
          {products.map((product) => {
            return (
              <div
                key={product.id}
                // Softer shadow, subtle hover effect, slightly larger rounding
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <Link
                  href={`/Catalog/Fullview/${product.sku}`}
                  key={product.id}
                >
                  {/* Image Container */}
                  <div className="aspect-square relative group">
                    <Image
                      src={Caar.src} // Ensure this path is correct relative to /public
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 z-20"
                      // Optional: Placeholder for better loading experience
                      // placeholder="blur"
                      // blurDataURL={`/_next/image?url=${encodeURIComponent(product.imageUrl)}&w=16&q=1`} // Low quality image placeholder
                      onError={(e) => {
                        // Fallback image
                        e.currentTarget.srcset = "/images/placeholder.png"; // Path to your placeholder
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                    {/* Details Link - More subtle, appears on hover */}
                    <Link
                      href={`/products/${product.sku}`} // Ensure this route exists
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="View product details"
                    >
                      <FaInfoCircle className="text-base" />
                    </Link>
                  </div>
                </Link>
                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  {" "}
                  {/* Added flex-grow */}
                  {/* Product Name & Part Number */}
                  <div>
                    <h3
                      className="text-base font-semibold text-slate-800 leading-snug mb-1 truncate"
                      title={product.name}
                    >
                      {" "}
                      {/* Added truncate */}
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Part #: {product.sku}
                    </p>
                  </div>
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-indigo-600 mr-2">
                      {" "}
                      ₹ {product.price}
                    </span>
                  </div>
                  {/* Description - Takes remaining space */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {" "}
                    {/* Added flex-grow */}
                    {product.description}
                  </p>
                  {/* Action Area - Pushed to bottom */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    {" "}
                    {/* Added mt-auto and top border */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Inquiry Button - Primary */}
                      <button
                        onClick={() => handleInquiry(product)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        <FaEnvelope /> {/* Changed Icon */}
                        Inquire
                      </button>
                      {/* WhatsApp Button - Secondary (Green) */}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `I'm interested in: ${product.name} (Part #: ${product.partNumber})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border text-green-700 text-sm font-medium rounded-md hover:border-green-500 hover:border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <FaWhatsapp className="text-base" />{" "}
                        {/* Adjusted icon size */}
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiry Modal - Refined Styling */}
        {showForm && selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            {" "}
            {/* Added backdrop-blur and simple animation */}
            <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative shadow-xl m-4">
              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Close inquiry form"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-1">
                  Product Inquiry
                </h2>
                <p className="text-sm text-slate-500">
                  For:{" "}
                  <span className="font-medium text-slate-700">
                    {selectedProduct.name}
                  </span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormDataChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition sm:text-sm"
                    placeholder="e.g., John Doe"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormDataChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition sm:text-sm"
                    placeholder="e.g., 9876543210"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Optional: Add a simple fade-in animation class to your global CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductCatalogPage;
