"use client";
import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import CarPartsSearch from "../SearchBar/Searchbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between h-16">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral hover:text-primary p-2 rounded-lg"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <h1 className="text-xl font-heading font-bold text-primary">
            Parts point
          </h1>

          <div className="relative">
            <CarPartsSearch />
          </div>
          <div className="flex items-center gap-4">
            <FiShoppingCart className="text-neutral hover:text-primary text-xl" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-20">
          <h1 className="text-2xl font-heading font-bold text-primary">
            Parts point
          </h1>

          <div className="flex items-center space-x-8 flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <CarPartsSearch />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <FiUser className="text-neutral hover:text-primary text-xl cursor-pointer" />
            <div className="relative">
              <FiShoppingCart className="text-neutral hover:text-primary text-xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-accent text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="md:flex items-center justify-center gap-8 py-4">
            {[
              {
                label: "Brands",
                url: "#Brands",
              },
              {
                label: "Categories",
                url: "#Categories",
              },
              {
                label: "Car Mechanic",
                url: "/car-mechanic",
              },
              {
                label: "Customer Support",
                url: "/Customer-Support",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="block text-neutral hover:text-primary px-4 py-2 rounded-lg font-heading hover:bg-gray-50 md:hover:bg-transparent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
