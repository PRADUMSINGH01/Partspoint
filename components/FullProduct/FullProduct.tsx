"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CompatibilityTable from "@/components/CompatibilityTable/CompatibilityTable";
import { FaWhatsapp } from "react-icons/fa";
import { fetchPartsBySKU } from "@/lib/FetchBYSku";
import { addInquiryToFirestore } from "@/lib/MakeQ";
import { useAlert } from "../Alert/Alert";

interface Product {
  brand: string;
  id: string;
  name: string;
  partNumber: string;
  price: number;
  discount: number;
  galleryImages: string[];
  description: string;
  Compatibility: [];
  sku: string;
  New: boolean;
}

const ProductReviewPage: React.FC<{ Id: string }> = ({ Id }) => {
  const { showAlert, AlertComponent } = useAlert();

  const [data, setData] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [showZoomPreview, setShowZoomPreview] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "0 0",
    backgroundSize: "0 0",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setCustomerName] = useState("");
  const [phone, setCustomerNumber] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const hasDiscount = typeof data?.discount === "number";
  const discountedPrice = hasDiscount
    ? ((data!.price * (100 - data!.discount)) / 100).toFixed(2)
    : data?.price.toFixed(2);

  const checkPincode = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("Delivery available to this pincode.");
    } else {
      setDeliveryMessage("Please enter a valid 6-digit pincode.");
    }
  };

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await fetchPartsBySKU(Id);
        if (Array.isArray(response) && response.length > 0) {
          const prod = response[0];
          setData(prod);
          if (prod.galleryImages && prod.galleryImages.length > 0) {
            setSelectedImage(prod.galleryImages[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (Id) fetchDataById();
  }, [Id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;

    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

    setZoomPosition({ x, y });

    const zoomLevel = 2;
    const bgX = x * 100;
    const bgY = y * 100;

    setZoomStyle({
      backgroundPosition: `${bgX}% ${bgY}%`,
      backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
    });
  };

  useEffect(() => {
    setZoomStyle({
      backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
      backgroundSize: zoomStyle.backgroundSize,
    });
  }, [selectedImage, zoomPosition.x, zoomPosition.y, zoomStyle.backgroundSize]);

  const handleFormSubmit = () => {
    showAlert("Your inquiry has been submitted successfully!", "success");
    addInquiryToFirestore(data, { name, phone });
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        Loading...
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        No data found
      </div>
    );

  const WHATSAPP_NUMBER = "9468929392";

  return (
    <div className="min-h-screen py-4 px-3 sm:px-6 lg:px-8 font-body bg-light">
      <div className="w-full mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 p-3 sm:p-6">
          {/* Image Gallery - Mobile First Column */}
          <div className="w-full md:w-1/2">
            <div className="mb-3 relative">
              {/* Main image container with improved aspect ratio */}
              <div
                ref={containerRef}
                className={`relative w-full overflow-hidden rounded-lg border border-gray-200 ${
                  isMobile ? "aspect-square" : "aspect-[4/3] max-h-[500px]"
                }`}
                onMouseEnter={() => !isMobile && setShowZoomPreview(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => !isMobile && setShowZoomPreview(false)}
              >
                <Image
                  src={selectedImage}
                  alt={data.name}
                  fill
                  className="object-contain cursor-pointer"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>

              {/* Zoom preview with improved positioning and sizing */}
              {showZoomPreview && !isMobile && (
                <div
                  ref={zoomRef}
                  className="hidden md:block absolute top-0 left-[calc(100%+20px)] w-[700px] h-[405px] rounded-lg overflow-hidden shadow-lg z-10 border border-gray-300"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundRepeat: "no-repeat",
                    ...zoomStyle,
                  }}
                />
              )}
            </div>

            {/* Thumbnail gallery with improved spacing */}
            <div className="flex gap-2 overflow-x-auto py-2 px-1">
              {data.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex-shrink-0 ${
                    isMobile ? "w-14 h-14" : "w-16 h-16"
                  } border-2 rounded-lg cursor-pointer transition-all ${
                    selectedImage === img ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`thumb-${idx}`}
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 640px) 50px, 70px"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product Details - Mobile Second Column */}
          <div className="w-full md:w-1/2">
            <div className="mb-3">
              <h2 className="text-sm text-secondary font-medium">
                {data.brand}
              </h2>
              <h1 className="text-xl sm:text-2xl font-bold text-primary mt-1">
                {data.name}
              </h1>

              <div className="flex items-center mt-2">
                <span className="text-gray-500 text-sm">Part type:</span>
                {data?.New ? (
                  <span className="bg-secondary text-white text-xs px-2 py-1 ml-2 rounded">
                    New
                  </span>
                ) : (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 ml-2 rounded">
                    Refurb
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mt-1">Part #: {data.sku}</p>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 my-4">
              <span className="text-2xl font-bold text-secondary">
                ₹{discountedPrice}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    MRP ₹{data.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save {data.discount}%
                  </span>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600 text-sm">{data.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Check Delivery
                </h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit pincode"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button
                    onClick={checkPincode}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition text-sm"
                  >
                    Check
                  </button>
                </div>
                {deliveryMessage && (
                  <p className="mt-2 text-sm text-green-600">
                    {deliveryMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition text-sm sm:text-base"
              >
                Send Inquiry
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `I'm interested in: ${data.name} (Part #: ${data.sku})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-green-500 text-green-700 font-medium rounded-lg hover:bg-green-50 text-sm sm:text-base"
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility Section */}
      <div className="mt-6 mx-3 sm:mx-0">
        {data.Compatibility?.length > 0 ? (
          <div className="overflow-x-auto">
            <CompatibilityTable data={data.Compatibility} />
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4 bg-white rounded-lg mx-3 sm:mx-0">
            No compatibility information available.
          </p>
        )}
      </div>

      {/* Inquiry Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Submit Your Inquiry
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Your Number"
                value={phone}
                onChange={(e) => setCustomerNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleFormSubmit}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition mt-2"
              >
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertComponent />
    </div>
  );
};

export default ProductReviewPage;
