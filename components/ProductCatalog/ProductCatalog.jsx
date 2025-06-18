"use client";
import { fetchData } from "@/lib/fetchall";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaTimes, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

// Define a key for localStorage
const INQUIRY_STORAGE_KEY = "productInquiries";

// Define the WhatsApp number (replace with your actual number or environment variable)
const WHATSAPP_NUMBER = "9468929392";

const ProductCatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [showForm, setShowForm] = useState(false);
  const [inquiredProducts, setInquiredProducts] = useState(new Set());

  // Fetch products on mount
  useEffect(() => {
    async function FETCH() {
      try {
        const res = await fetchData();
        setProducts(res || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    FETCH();
  }, []);

  // Load inquired products from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(INQUIRY_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setInquiredProducts(new Set(parsed));
        } catch (error) {
          console.error("Failed to parse inquiries from localStorage:", error);
          localStorage.removeItem(INQUIRY_STORAGE_KEY);
        }
      }
    }
  }, []);

  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setFormData({ name: "", phone: "" });
    setShowForm(true);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

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

    // TODO: send inquiry data to backend

    const updated = new Set(inquiredProducts);
    updated.add(selectedProduct.id);
    setInquiredProducts(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        INQUIRY_STORAGE_KEY,
        JSON.stringify(Array.from(updated))
      );
    }

    setShowForm(false);
    setSelectedProduct(null);
    alert("Inquiry submitted successfully!");
  };

  // Format price: expects priceInSmallestUnit (e.g., paise)
  const formatPrice = (priceInSmallestUnit) => {
    const price = priceInSmallestUnit;
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
          {products.map((product) => {
            // Expect product.price in smallest unit (e.g., paise), product.discount as percentage number
            const discount = Number(product.discount) || 0;
            const hasDiscount = discount > 0;
            const discountedPriceInSmallest = hasDiscount
              ? (product.price * (100 - discount)) / 100
              : product.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <Link href={`/Catalog/Fullview/${product.sku || product.id}`}>
                  <div className="aspect-square relative group">
                    <Image
                      src={
                        product.galleryImages &&
                        product.galleryImages.length > 0
                          ? product.galleryImages[0]
                          : "/images/placeholder.png"
                      }
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 z-20"
                    />
                    <Link
                      href={`/products/${product.sku || product.id}`}
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="View product details"
                    >
                      <FaInfoCircle className="text-base" />
                    </Link>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                  <div>
                    <h3
                      className="text-base font-semibold text-slate-800 leading-snug mb-1 truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Part #: {product.sku || product.id}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-3 flex items-baseline space-x-2">
                    {hasDiscount ? (
                      <>
                        <span className="text-lg font-bold text-indigo-600">
                          {formatPrice(discountedPriceInSmallest)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          Save {discount}%
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-indigo-600">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleInquiry(product)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        <FaEnvelope />
                        Inquire
                      </button>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `I'm interested in: ${product.name} (Part #: ${
                            product.partNumber || product.sku || product.id
                          })`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border text-green-700 text-sm font-medium rounded-md hover:border-green-500 hover:border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <FaWhatsapp className="text-base" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiry Modal */}
        {showForm && selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative shadow-xl m-4">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Close inquiry form"
              >
                <FaTimes className="text-xl" />
              </button>

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

              <form onSubmit={handleSubmit} className="space-y-5">
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

      {/* Optional: fade-in animation */}
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
