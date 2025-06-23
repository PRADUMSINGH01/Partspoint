// File: components/NeumorphicBanner.jsx
"use client";

import React from "react";
import { FaCarSide, FaShippingFast } from "react-icons/fa";
import Link from "next/link";

const NeumorphicBanner = () => {
  return (
    <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4">
      {/* Neumorphic panel */}
      <div
        className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800
                      rounded-2xl shadow-neu-light dark:shadow-neu-dark"
      >
        {/* Icon */}
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-neu-light-inner dark:shadow-neu-dark-inner">
          <FaCarSide
            className="text-green-600 dark:text-green-300 text-xl"
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="text-gray-800 dark:text-gray-100">
          <p className="font-medium text-sm sm:text-base md:text-lg">
            Buy above{" "}
            <span className="text-green-600 dark:text-green-300 font-semibold">
              ₹4999
            </span>{" "}
            & get{" "}
            <span className="text-yellow-500 dark:text-yellow-300 font-semibold">
              FREE Delivery
            </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            On all car parts orders
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/shop"
          className="ml-4 inline-flex items-center bg-green-600 text-white text-xs sm:text-sm font-semibold
                     px-3 py-1.5 rounded-full shadow-md hover:bg-green-700 transition"
          aria-label="Shop now - free delivery"
        >
          Shop Now
          <FaShippingFast className="ml-2" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default NeumorphicBanner;
