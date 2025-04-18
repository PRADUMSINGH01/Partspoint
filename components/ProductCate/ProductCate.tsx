"use client";
import { useState } from "react";
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
  { id: 1, name: "Maintenance Service Parts", icon: FiTool, count: 342 },
  { id: 2, name: "Air Conditioning", icon: FiWind, count: 215 },
  { id: 3, name: "Belts Chains and Rollers", icon: FiLink, count: 178 },
  { id: 4, name: "Bearings", icon: FiCircle, count: 302 },
  { id: 5, name: "Body", icon: FiTruck, count: 456 },
  { id: 6, name: "Control Cables", icon: FiSliders, count: 89 },
  { id: 7, name: "Brake System", icon: FiShield, count: 567 },
  { id: 8, name: "Car Accessories", icon: FiStar, count: 678 },
  { id: 9, name: "Clutch System", icon: FiZap, count: 123 },
  { id: 10, name: "Electric Components", icon: FiZap, count: 432 },
  { id: 11, name: "Engine", icon: FiSettings, count: 789 },
  { id: 12, name: "Engine Cooling System", icon: FiThermometer, count: 234 },
  { id: 13, name: "Exhaust System", icon: FiAnchor, count: 156 },
  { id: 14, name: "Filters", icon: FiFilter, count: 654 },
  { id: 15, name: "Fuel Supply System", icon: FiDroplet, count: 321 },
  { id: 16, name: "Gaskets and Sealing Rings", icon: FiBox, count: 189 },
  { id: 17, name: "Ignition and Glowplug System", icon: FiRadio, count: 276 },
  { id: 18, name: "Interior and comfort", icon: FiNavigation, count: 498 },
  { id: 19, name: "Lighting", icon: FiCrosshair, count: 582 },
  { id: 20, name: "Oils and Fluids", icon: FiDroplet, count: 765 },
  { id: 21, name: "Pipes and Hoses", icon: FiPackage, count: 143 },
  { id: 22, name: "Repair Kits", icon: FiWatch, count: 87 },
  {
    id: 23,
    name: "Sensors Relays and Control units",
    icon: FiUmbrella,
    count: 378,
  },
  { id: 24, name: "Steering", icon: FiDisc, count: 219 },
  { id: 25, name: "Suspension and Arms", icon: FiAlertCircle, count: 431 },
  { id: 26, name: "Towbar Parts", icon: FiWifi, count: 65 },
  { id: 27, name: "Transmission", icon: FiDollarSign, count: 329 },
  { id: 28, name: "Trims", icon: FiTool, count: 182 },
  { id: 29, name: "Tyres and Alloys", icon: FiCircle, count: 726 },
  { id: 30, name: "Universal", icon: FiStar, count: 54 },
  { id: 31, name: "Wheels", icon: FiDisc, count: 612 },
  { id: 32, name: "Windscreen Cleaning System", icon: FiWind, count: 129 },
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
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.count}+ Components
                    </p>
                  </div>
                </div>
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
