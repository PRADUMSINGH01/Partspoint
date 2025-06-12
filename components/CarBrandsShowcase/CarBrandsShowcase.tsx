"use client";
import { useState } from "react";
import {
  SiTata,
  SiMahindra,
  SiHyundai,
  SiKia,
  SiToyota,
  SiHonda,
  SiFord,
  SiVolkswagen,
  SiBmw,
  SiMercedes,
  SiAudi,
} from "react-icons/si";
import { FaCarSide } from "react-icons/fa"; // generic car icon
import { FaMotorcycle } from "react-icons/fa"; // Added FaMotorcycle
import { IconType } from "react-icons";
import Link from "next/link";

interface Brand {
  name: string;
  icon: IconType;
  isIndian: boolean;
  url: string;
}

export default function CarBrandsShowcase() {
  const [activeTab, setActiveTab] = useState<
    "all" | "indian" | "international"
  >("all");

  // Brand data with React Icons
  const brands: Brand[] = [
    // Indian Brands
    { name: "Tata", icon: SiTata, isIndian: true, url: "TATA" },
    { name: "Mahindra", icon: SiMahindra, isIndian: true, url: "MAHINDRA" },
    { name: "Maruti Suzuki", icon: FaCarSide, isIndian: true, url: "MARUTI " },
    { name: "Hyundai India", icon: SiHyundai, isIndian: true, url: "HYUNDAI " },
    { name: "Kia India", icon: SiKia, isIndian: true, url: "KIA" },
    {
      name: "Hindustan Motors",
      icon: FaCarSide,
      isIndian: true,
      url: "HINDUSTAN-MOTOR ",
    },
    {
      name: "Force Motors",
      icon: SiMahindra,
      isIndian: true,
      url: "FORCE-MOTOR",
    },
    {
      name: "Bajaj Auto",
      icon: FaMotorcycle,
      isIndian: true,
      url: "BAJAJ-AUTO",
    }, // Using FaMotorcycle for Bajaj

    // International Brands
    { name: "Toyota", icon: SiToyota, isIndian: false, url: "TOYOTA" },
    { name: "Honda", icon: SiHonda, isIndian: false, url: " HONDA" },
    { name: "Ford", icon: SiFord, isIndian: false, url: "FORD " },
    {
      name: "Volkswagen",
      icon: SiVolkswagen,
      isIndian: false,
      url: "VOLKSWAGEN",
    },
    { name: "BMW", icon: SiBmw, isIndian: false, url: " BMW" },
    {
      name: "Mercedes-Benz",
      icon: SiMercedes,
      isIndian: false,
      url: "MERCEDES-BENZ ",
    },
    { name: "Audi", icon: SiAudi, isIndian: false, url: "AUDI" },
    { name: "Hyundai", icon: SiHyundai, isIndian: false, url: "HYUNDAI" }, // Assuming global Hyundai uses the same icon
  ];

  // Filter brands based on active tab
  const filteredBrands = brands.filter((brand) => {
    if (activeTab === "indian") return brand.isIndian;
    if (activeTab === "international") return !brand.isIndian;
    return true;
  });

  // Get featured Indian brands (for highlight section)
  const featuredIndianBrands = brands
    .filter((brand) => brand.isIndian)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-bold text-black mb-4">
          Browse by Car Brand
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find parts for your vehicle from our extensive collection of brands
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === "all"
                ? "bg-primary text-white"
                : "bg-white text-neutral hover:bg-gray-50"
            }`}
          >
            All Brands
          </button>
          <button
            onClick={() => setActiveTab("indian")}
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "indian"
                ? "bg-primary text-white"
                : "bg-white text-neutral hover:bg-gray-50"
            }`}
          >
            Indian Brands
          </button>
          <button
            onClick={() => setActiveTab("international")}
            className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === "international"
                ? "bg-primary text-white"
                : "bg-white text-neutral hover:bg-gray-50"
            }`}
          >
            International Brands
          </button>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredBrands.map((brand, index) => {
          const Icon = brand.icon;
          return (
            <Link href={`/Catalog/${brand.url}`} key={index}>
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-border hover:shadow-md transition-all flex flex-col items-center"
              >
                <div className="text-4xl text-primary mb-3">
                  <Icon />
                </div>
                <h3 className="text-center font-medium text-neutral">
                  {brand.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Special Highlight for Indian Brands */}
      {activeTab !== "indian" && (
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-primary">
              Featured Indian Brands
            </h3>
            <p className="text-gray-600">
              Proudly showcasing India&apos;s automotive excellence
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {featuredIndianBrands.map((brand, index) => {
              const Icon = brand.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border-2 border-primary/20 hover:border-primary/40 transition-all flex flex-col items-center"
                >
                  <div className="text-4xl text-primary mb-3">
                    <Icon />
                  </div>
                  <h3 className="text-center font-medium text-neutral">
                    {brand.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
