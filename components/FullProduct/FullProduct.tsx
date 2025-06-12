"use client";
import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import images from "@/app/(Image)/light.png";
import car from "@/app/(Image)/light.jpg";
import light from "@/app/(Image)/light1.jpg";
import CompatibilityTable from "@/components/CompatibilityTable/CompatibilityTable";
import { FaWhatsapp } from "react-icons/fa"; // Using FaEnvelope for Inquiry button
import { fetchParts } from "@/lib/partsById";
interface Product {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  discount: number;
  images: StaticImageData[];
  description: string;
  compatibility: string;
  sku: string;
}

const product: Product = {
  id: "1",
  sku: "",
  name: "MARUTI IGNIS LHS TAIL LIGHT    ",
  partNumber: "35750M66R00",
  price: 950.0,
  discount: 0,
  images: [images, car, light, images],
  description:
    "Tail Light for MARUTI IGNIS 1ST GEN, IGNIS 1ST GEN F/L - 3575...6R00 - MARUTI SUZUKI",
  compatibility:
    "Compatible with Honda City, Maruti Suzuki Ciaz, Hyundai Verna.",
};

const ProductReviewPage: React.FC = (Id) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
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

  const [data, setData] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const hasDiscount = typeof product.discount === "number";
  const discountedPrice = hasDiscount
    ? ((product.price * (100 - product.discount)) / 100).toFixed(2)
    : product.price.toFixed(2);

  const checkPincode = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("Delivery available to this pincode.");
    } else {
      setDeliveryMessage("Please enter a valid 6-digit pincode.");
    }
  };

  useEffect(() => {
    async function fetchdataById() {
      const response = await fetchParts();

      setData(Array.isArray(response) ? response : [response]);
      setloading(false);
    }

    fetchdataById();
  }, [Id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

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
  }, [selectedImage]);

  const handleFormSubmit = () => {
    console.log("Customer Name:", customerName);
    console.log("Customer Number:", customerNumber);
    console.log("Product SKU:", product.partNumber);
    console.log("Product Name:", product.name);
    setShowForm(false);
  };

  if (loading) {
    return <>Loading</>;
  }

  // Define the WhatsApp number (replace with your actual number or environment variable)
  const WHATSAPP_NUMBER = "9468929392"; // Example format with country code

  return (
    <div className="bg-light min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-body md:mt-10">
      <div className="w-full mx-auto bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-6">
          <div className="sm:col-span-2">
            <div className="flex gap-4 mb-4">
              <div
                ref={containerRef}
                className="relative w-full aspect-[5/2] overflow-hidden rounded-lg"
                onMouseEnter={() => setShowZoomPreview(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowZoomPreview(false)}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover cursor-pointer"
                />
              </div>
              {showZoomPreview && (
                <div
                  ref={zoomRef}
                  className="absolute w-[50rem] h-[40rem] top-10 right-20 rounded-lg overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${selectedImage.src})`,
                    backgroundRepeat: "no-repeat",
                    ...zoomStyle,
                  }}
                />
              )}
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex-shrink-0 w-16 h-20 border-2 rounded cursor-pointer transition-all ${
                    selectedImage === img ? "border-primary" : "border-gray-200"
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

          <div className="sm:col-span-3">
            <h1 className="text-3xl font-heading text-primary mb-2">
              {data[0].name}{" "}
            </h1>
            <div className="text-gray-500">
              Part type :
              <span className=" bg-secondary text-white p-1 m-2 rounded">
                New
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">Part #: {data[0].sku}</p>

            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-3xl font-bold text-secondary">
                ₹{discountedPrice}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{data[0].price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{data[0].description}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Check Delivery Availability
                </h3>
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
                  <p className="mt-2 text-sm text-green-600">
                    {deliveryMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="block text-center px-4 py-3 bg-primary text-white font-medium rounded hover:bg-secondary transition"
              >
                Send Inquiry
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `I'm interested in: ${product.name} (Part #: ${product.partNumber})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border text-green-700 text-sm font-medium rounded-md hover:border-green-500 hover:border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <FaWhatsapp className="text-base" /> {/* Adjusted icon size */}
                WhatsApp
              </a>
            </div>

            {showForm && (
              <div className="mt-6 space-y-4 border border-gray-500  p-4 rounded absolute   bg-white shadow-lg">
                <button
                  className="flex justify-center items-center bg-black text-white hover:bg-secondary p-2 rounded-lg"
                  onClick={() => setShowForm(false)}
                >
                  close
                </button>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Your Number"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
                >
                  Submit Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CompatibilityTable />
    </div>
  );
};

export default ProductReviewPage;
