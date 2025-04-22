"use client";
import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaMailBulk } from "react-icons/fa";
import Caar from "@/app/(Image)/car.jpg";
interface Product {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  discount?: number;
  imageUrl: string;
  description: string;
}

// Sample product data with discounts
const products: Product[] = [
  {
    id: "1",
    name: "Brake Pad Set",
    partNumber: "BP-1234",
    price: 4999,
    discount: 10,
    imageUrl: "/images/brake-pad.jpg",
    description: "High-performance brake pads compatible with most sedans.",
  },
  {
    id: "2",
    name: "Air Filter",
    partNumber: "AF-5678",
    price: 1999,
    discount: 15,
    imageUrl: "/images/air-filter.jpg",
    description:
      "Durable air filter for cleaner intake and improved efficiency.",
  },
  {
    id: "3",
    name: "Spark Plug",
    partNumber: "SP-9101",
    price: 999,
    imageUrl: "/images/spark-plug.jpg",
    description: "Long-life spark plug to ensure smooth engine performance.",
  },
  {
    id: "4",
    name: "Oil Filter",
    partNumber: "OF-1121",
    price: 1499,
    discount: 5,
    imageUrl: "/images/oil-filter.jpg",
    description: "Premium oil filter for cleaner oil circulation.",
  },
];

const ProductCatalogPage: React.FC = () => (
  <div className="bg-light py-12 px-4 sm:px-6 lg:px-8 font-body md:mt-10">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading text-primary mb-8 text-center">
        Parts Point Product Catalog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const hasDiscount = typeof product.discount === "number";
          const discountedPrice = hasDiscount
            ? (product.price * (100 - product.discount!)) / 100
            : product.price;

          return (
            <div
              key={product.id}
              className="flex flex-col h-full bg-white border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={Caar.src}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-neutral mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Part #: {product.partNumber}
                </p>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-secondary">
                      {discountedPrice.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 flex-1">
                  {product.description}
                </p>
                <div className="mt-6 flex space-x-4">
                  <a
                    href={`mailto:sales@partspoint.com?subject=Inquiry%20for%20${encodeURIComponent(
                      product.name
                    )}`}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-secondary transition-colors duration-200"
                  >
                    <FaMailBulk className="mr-2" /> Inquiry
                  </a>
                  <a
                    href={`https://wa.me/1234567890?text=I'm%20interested%20in%20${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-4 px-1 border border-black text-black font-bold rounded-lg shadow-sm bg-white hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default ProductCatalogPage;
