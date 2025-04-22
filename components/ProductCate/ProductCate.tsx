"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiTool,
  FiWind,
  FiLink,
  FiCircle,
  FiTruck,
  FiSliders,
  FiShield,
  FiStar,
  FiZap,
  FiSettings,
  FiThermometer,
  FiAnchor,
  FiFilter,
  FiDroplet,
  FiBox,
  FiRadio,
  FiNavigation,
  FiCrosshair,
  FiPackage,
  FiWatch,
  FiUmbrella,
  FiDisc,
  FiAlertCircle,
  FiWifi,
  FiDollarSign,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Maintenance Service Parts",
    icon: FiTool,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 2,
    name: "Air Conditioning",
    icon: FiWind,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 3,
    name: "Belts Chains and Rollers",
    icon: FiLink,
    url: "Maintenance-Service-Parts",
  },
  { id: 4, name: "Bearings", icon: FiCircle, url: "Maintenance-Service-Parts" },
  { id: 5, name: "Body", icon: FiTruck, url: "Maintenance-Service-Parts" },
  {
    id: 6,
    name: "Control Cables",
    icon: FiSliders,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 7,
    name: "Brake System",
    icon: FiShield,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 8,
    name: "Car Accessories",
    icon: FiStar,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 9,
    name: "Clutch System",
    icon: FiZap,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 10,
    name: "Electric Components",
    icon: FiZap,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 11,
    name: "Engine",
    icon: FiSettings,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 12,
    name: "Engine Cooling System",
    icon: FiThermometer,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 13,
    name: "Exhaust System",
    icon: FiAnchor,
    url: "Maintenance-Service-Parts",
  },
  { id: 14, name: "Filters", icon: FiFilter, url: "Maintenance-Service-Parts" },
  {
    id: 15,
    name: "Fuel Supply System",
    icon: FiDroplet,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 16,
    name: "Gaskets and Sealing Rings",
    icon: FiBox,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 17,
    name: "Ignition and Glowplug System",
    icon: FiRadio,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 18,
    name: "Interior and comfort",
    icon: FiNavigation,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 19,
    name: "Lighting",
    icon: FiCrosshair,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 20,
    name: "Oils and Fluids",
    icon: FiDroplet,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 21,
    name: "Pipes and Hoses",
    icon: FiPackage,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 22,
    name: "Repair Kits",
    icon: FiWatch,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 23,
    name: "Sensors Relays and Control units",
    icon: FiUmbrella,
    url: "Maintenance-Service-Parts",
  },
  { id: 24, name: "Steering", icon: FiDisc, url: "Maintenance-Service-Parts" },
  {
    id: 25,
    name: "Suspension and Arms",
    icon: FiAlertCircle,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 26,
    name: "Towbar Parts",
    icon: FiWifi,
    url: "Maintenance-Service-Parts",
  },
  {
    id: 27,
    name: "Transmission",
    icon: FiDollarSign,
    url: "Maintenance-Service-Parts",
  },
  { id: 28, name: "Trims", icon: FiTool, url: "Maintenance-Service-Parts" },
  {
    id: 29,
    name: "Tyres and Alloys",
    icon: FiCircle,
    url: "Maintenance-Service-Parts",
  },
  { id: 30, name: "Universal", icon: FiStar, url: "Maintenance-Service-Parts" },
  { id: 31, name: "Wheels", icon: FiDisc, url: "Maintenance-Service-Parts" },
  {
    id: 32,
    name: "Windscreen Cleaning System",
    icon: FiWind,
    url: "Maintenance-Service-Parts",
  },
];

export default function PartsCategories() {
  const [visibleCategories, setVisibleCategories] = useState(6);

  const loadMore = () => {
    setVisibleCategories((prev) => prev + 10);
  };

  return (
    <div className="bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading text-neutral mb-8 text-center">
          Automotive Parts Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.slice(0, visibleCategories).map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-primary transition-all group"
              >
                <Link href={`Catalog/${category.url}`} className="hover">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {visibleCategories < categories.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Show More Categories ({categories.length - visibleCategories}{" "}
              remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
