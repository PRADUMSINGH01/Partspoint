"use client";
import React, { useState } from "react";
import Image from "next/image";
import Caar from "@/app/(Image)/car.jpg";

interface Product {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  discount?: number;
  images: string[];
  description: string;
  compatibility: string;
}

const product: Product = {
  id: "1",
  name: "Brake Pad Set",
  partNumber: "BP-1234",
  price: 4999,
  discount: 10,
  images: [Caar, Caar, Caar, Caar], // Replace with actual different images
  description: "High-performance brake pads compatible with most sedans.",
  compatibility: "Compatible with Honda City, Maruti Suzuki Ciaz, Hyundai Verna."
};

const ProductReviewPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const hasDiscount = typeof product.discount === 'number';
  const discountedPrice = hasDiscount
    ? (product.price * (100 - product.discount) / 100).toFixed(2)
    : product.price.toFixed(2);

  const checkPincode = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("Delivery available to this pincode.");
    } else {
      setDeliveryMessage("Please enter a valid 6-digit pincode.");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="bg-light min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="w-full mx-auto bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-6">
          {/* Image Gallery */}
          <div className="sm:col-span-2 flex flex-col space-y-4">
            <div 
              className="relative w-full aspect-square overflow-hidden rounded-lg cursor-zoom-in"
              onClick={() => setShowZoomModal(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
            >
              <Image 
                src={selectedImage} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-300 ease-in-out"
                style={{
                  transform: `scale(${zoomPosition.x ? 1.5 : 1})`,
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)} 
                  className={`relative flex-shrink-0 w-16 h-16 border-2 rounded cursor-pointer transition-all ${
                    selectedImage === img ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`thumb-${idx}`} 
                    fill 
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="sm:col-span-3">
            <h1 className="text-3xl font-heading text-primary mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-2">Part #: {product.partNumber}</p>
            
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-3xl font-bold text-secondary">₹{discountedPrice}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Compatibility</h3>
                <p className="text-gray-600">{product.compatibility}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Check Delivery Availability</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit pincode"
                    className="w-48 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button
                    onClick={checkPincode}
                    className="px-4 py-2 bg-primary text-white rounded font-medium hover:bg-secondary transition"
                  >
                    Check
                  </button>
                </div>
                {deliveryMessage && (
                  <p className="mt-2 text-sm text-green-600">{deliveryMessage}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`mailto:sales@partspoint.com?subject=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                className="block text-center px-4 py-3 bg-primary text-white font-medium rounded hover:bg-secondary transition"
              >
                Send Inquiry
              </a>
              
              <a
                href={`https://wa.me/1234567890?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-3 border border-green-600 text-green-600 font-medium rounded hover:bg-green-600 hover:text-white transition"
              >
                WhatsApp
              </a>
              
              <a
                href="tel:+911234567890"
                className="block text-center px-4 py-3 border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-600 hover:text-white transition"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoomModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoomModal(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Zoomed product image"
              width={1200}
              height={1200}
              className="object-contain w-full h-full"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
              onClick={() => setShowZoomModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewPage;