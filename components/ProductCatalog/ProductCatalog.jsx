// File: /components/ProductCatalogPage.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaTimes, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { addInquiryToFirestore } from "@/lib/MakeQ";

// Key for localStorage
const INQUIRY_STORAGE_KEY = "productInquiries";
// WhatsApp number: prefer env var
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9468929392";

const INITIAL_COUNT = 9;
const INCREMENT = 10;

const ProductCatalogPage = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [showForm, setShowForm] = useState(false);
  const [inquiredProducts, setInquiredProducts] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [submitting, setSubmitting] = useState(false);

  // Reset visibleCount when products prop changes
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [products]);

  // Load inquired products from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(INQUIRY_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setInquiredProducts(new Set(parsed));
          }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const nameTrim = formData.name.trim();
    const phoneTrim = formData.phone.trim();
    if (!nameTrim || !phoneTrim) {
      alert("Please enter your name and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      // Firestore write: pass selectedProduct and an object with name & phone
      await addInquiryToFirestore(selectedProduct, {
        name: nameTrim,
        phone: phoneTrim,
      });

      // Update local state & localStorage
      const updatedSet = new Set(inquiredProducts);
      updatedSet.add(selectedProduct.id);
      setInquiredProducts(updatedSet);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          INQUIRY_STORAGE_KEY,
          JSON.stringify(Array.from(updatedSet))
        );
      }

      // Reset & close
      setFormData({ name: "", phone: "" });
      setSelectedProduct(null);
      setShowForm(false);

      alert("Inquiry submitted successfully!");
    } catch (error) {
      console.error("Inquiry submit error:", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Format price: expects price in smallest unit (e.g., paise)
  const formatPrice = (priceInSmallestUnit) => {
    const price = Number(priceInSmallestUnit) || 0;
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Subset of products to display
  const visibleProducts = Array.isArray(products)
    ? products.slice(0, visibleCount)
    : [];

  const handleLoadMore = () => {
    if (Array.isArray(products)) {
      setVisibleCount((prev) => Math.min(prev + INCREMENT, products.length));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10 text-center">
          Product Catalog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {visibleProducts.map((product) => {
            const discount = Number(product.discount) || 0;
            const hasDiscount = discount > 0;
            // Round discounted price
            const discountedPriceInSmallest = hasDiscount
              ? Math.round((product.price * (100 - discount)) / 100)
              : product.price;

            const alreadyInquired = inquiredProducts.has(product.id);

            // Determine image URL or placeholder
            const imageUrl =
              product.galleryImages && product.galleryImages.length > 0
                ? product.galleryImages[0]
                : "/images/placeholder.png"; // ensure this exists in /public/images/

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Image wrapper with relative + aspect ratio */}
                <Link href={`/products/${product.sku || product.id}`}>
                  <div className="relative w-full aspect-square bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={product.name || "Product image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                    <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                      <FaInfoCircle className="text-base" />
                    </span>
                  </div>
                </Link>

                {/* Details */}
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

                  {/* Price & discount */}
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

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleInquiry(product)}
                        disabled={alreadyInquired}
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 ${
                          alreadyInquired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-stone-800"
                        } text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                      >
                        <FaEnvelope />
                        {alreadyInquired ? "Inquired" : "Inquire"}
                      </button>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `I'm interested in: ${product.name} (Part #: ${
                            product.partNumber || product.sku || product.id
                          })`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border text-green-700 text-sm font-medium rounded-md hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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

        {/* “Load More” */}
        {Array.isArray(products) && visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              More
            </button>
          </div>
        )}

        {/* Inquiry Modal */}
        {showForm && selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative shadow-xl m-4">
              <button
                onClick={() => {
                  if (!submitting) {
                    setShowForm(false);
                    setSelectedProduct(null);
                  }
                }}
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
                    disabled={submitting}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition sm:text-sm disabled:opacity-50"
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
                    disabled={submitting}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition sm:text-sm disabled:opacity-50"
                    placeholder="e.g., 9876543210"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    submitting
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                >
                  {submitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Fade-in animation */}
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
