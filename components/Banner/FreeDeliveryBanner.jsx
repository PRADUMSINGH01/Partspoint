// File: components/FreeDeliveryBanner.jsx
"use client";

import React from "react";
import { FaCarSide, FaShippingFast, FaWrench, FaCog } from "react-icons/fa";
import Link from "next/link";

const FreeDeliveryBanner = () => {
  return (
    <div
      className="w-full h-24 relative overflow-hidden 
                    bg-gradient-to-r from-gray-800 via-gray-900 to-black
                    [clip-path:polygon(0%_0%,100%_0%,90%100%,0%100%)]"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-green-400"></div>

      {/* Abstract shape accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Faint rotating gear shape (using FaCog in background via pseudo)? Instead we simulate via div */}
        {/* Circle pulses behind */}
        <div className="absolute -top-10 left-1/4 w-36 h-36 bg-green-500 opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-12 right-1/3 w-48 h-48 bg-yellow-500 opacity-10 rounded-full animate-ping"></div>
        {/* Thin diagonal bars */}
        <div className="absolute top-1/3 left-0 w-64 h-[2px] bg-green-400 opacity-20 transform -rotate-12"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-[2px] bg-yellow-400 opacity-15 transform rotate-25"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-10 lg:px-16">
        {/* Left group: icon badge + text */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Icon badge */}
          <div
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-400 text-black rounded-full shadow-md 
                          hover:bg-green-500 transition-colors"
          >
            <FaCarSide className="text-lg md:text-xl" aria-hidden="true" />
          </div>

          {/* Offer text */}
          <div className="text-white">
            <p className="font-medium text-sm md:text-base lg:text-lg">
              Buy above{" "}
              <span className="text-green-400 font-semibold underline decoration-green-400 decoration-2">
                ₹4999
              </span>{" "}
              & get{" "}
              <span className="text-yellow-400 font-semibold underline decoration-yellow-400 decoration-2">
                FREE Delivery
              </span>
            </p>
            <p className="text-xs md:text-sm text-gray-300">
              On all car parts orders
            </p>
          </div>
        </div>

        {/* Right group: supporting icons + CTA */}
        <div className="flex items-center gap-4">
          {/* Small theme icons with subtle hover */}
          <div className="flex items-center gap-2 text-gray-400">
            <FaWrench
              className="text-base md:text-lg hover:text-green-400 transition-colors"
              aria-hidden="true"
              title="Quality Parts"
            />
            <FaCog
              className="text-base md:text-lg hover:text-yellow-400 transition-colors"
              aria-hidden="true"
              title="Expert Service"
            />
            <FaShippingFast
              className="text-base md:text-lg hover:text-green-400 transition-colors"
              aria-hidden="true"
              title="Fast Shipping"
            />
          </div>

          {/* CTA Button */}
          <Link
            href="/shop"
            className="inline-flex items-center bg-gradient-to-r from-green-400 to-yellow-400
                       text-black text-xs md:text-sm font-semibold px-4 py-2 rounded-full shadow-lg
                       hover:from-green-500 hover:to-yellow-500 transform hover:scale-105 transition"
            aria-label="Shop now - free delivery on orders above ₹4999"
          >
            Shop Now
            {/* Optional small arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreeDeliveryBanner;
