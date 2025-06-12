// ./CarPartsPage.jsx
"use client";
import { useState, use, useEffect } from "react";
import ProductCatalogPage from "@/components/ProductCatalog/ProductCatalog";

// --- Data Structures ---
const DUMMY_CATEGORIES = [
  {
    name: "Engine Parts",
    subcategories: ["Pistons", "Crankshafts", "Timing Belts", "Gaskets"],
  },
  {
    name: "Brakes & Suspension",
    subcategories: [
      "Brake Pads",
      "Rotors",
      "Calipers",
      "Shock Absorbers",
      "Struts",
    ],
  },
  {
    name: "Exhaust Systems",
    subcategories: ["Mufflers", "Catalytic Converters", "Exhaust Pipes"],
  },
  {
    name: "Lighting & Electrical",
    subcategories: ["Headlights", "Tail Lights", "Alternators", "Starters"],
  },
  {
    name: "Interior Accessories",
    subcategories: ["Seat Covers", "Floor Mats", "Steering Wheels"],
  },
  {
    name: "Exterior Body Parts",
    subcategories: ["Bumpers", "Fenders", "Hoods", "Grilles"],
  },
  { name: "Wheels & Tires" },
  { name: "Filters & Fluids" },
  { name: "Performance Tuning" },
  { name: "Tools & Garage" },
];

const DUMMY_BRANDS = [
  "Bosch",
  "Brembo",
  "ACDelco",
  "Denso",
  "KYB Shocks",
  "MagnaFlow",
  "Hella",
  "Sparco Seats",
  "Momo Steering",
  "NGK Spark Plugs",
  "Mobil 1",
  "Castrol",
  "Michelin",
  "Goodyear",
];

const DUMMY_CAR_MAKERS = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Nissan",
  "Hyundai",
];

const DUMMY_PRICE_RANGE = [50, 25000];

// --- Initial State for Reset Functionality ---
const getInitialFilters = (category) => ({
  categories: category ? [category] : [],
  subcategories: [],
  brands: [],
  carMakers: [],
  maxPrice: DUMMY_PRICE_RANGE[1],
});

export default function CarPartsPage({ params }) {
  const { category } = use(params);

  const [filters, setFilters] = useState(getInitialFilters(category));
  const [productCount, setProductCount] = useState(125);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const list = prev[key];
      const newList = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [key]: newList };
    });
  };

  const handlePriceChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(event.target.value),
    }));
  };

  const resetFilters = () => {
    setFilters(getInitialFilters(category));
  };

  useEffect(() => {
    let simulatedCount = 125;
    if (filters.categories.length > 0)
      simulatedCount -= filters.categories.length * 5;
    if (filters.subcategories.length > 0)
      simulatedCount -= filters.subcategories.length * 2;
    if (filters.brands.length > 0) simulatedCount -= filters.brands.length * 3;
    if (filters.carMakers.length > 0)
      simulatedCount -= filters.carMakers.length * 4;
    if (filters.maxPrice < DUMMY_PRICE_RANGE[1]) simulatedCount -= 15;
    setProductCount(Math.max(0, simulatedCount));

    console.log("Active Filters:", filters);
  }, [filters]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isFilterVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFilterVisible]);

  return (
    <div className="flex  md:mt-20 flex-col md:flex-row gap-4 md:gap-8 items-start px-4 md:px-8 py-6 bg-slate-50 min-h-screen">
      {/* --- Mobile Filter Trigger --- */}
      <div className="w-full md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setIsFilterVisible(true)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-slate-700 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filters
        </button>
        <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {productCount} Results
        </div>
      </div>

      {/* --- Mobile Filter Overlay (z-index lowered) --- */}
      {isFilterVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsFilterVisible(false)}
        ></div>
      )}

      {/* --- Responsive Filter Sidebar (z-index lowered) --- */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-xl z-40
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        md:relative md:h-auto md:w-72 lg:w-80 md:shadow-sm md:rounded-xl
        md:border md:border-slate-200 md:sticky md:top-24 md:translate-x-0 md:z-auto
        ${isFilterVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Filters</h3>
          <button
            onClick={resetFilters}
            className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setIsFilterVisible(false)}
            className="md:hidden text-slate-500 hover:text-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:inline-block text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-6">
          {productCount} Results Found
        </div>

        <div className="space-y-6">
          {/* Section: Categories & Subcategories */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">
              Category
            </h4>
            {DUMMY_CATEGORIES.map((cat) => (
              <details
                key={cat.name}
                className="group py-1"
                open={filters.categories.includes(cat.name)}
              >
                <summary
                  className="font-medium text-slate-700 cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 p-2 rounded-md transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheckboxChange("categories", cat.name);
                  }}
                >
                  <label className="flex items-center gap-3 pointer-events-none">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.name)}
                      readOnly
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    {cat.name}
                  </label>
                  {cat.subcategories && (
                    <svg
                      className="h-5 w-5 text-slate-500 group-open:rotate-90 transition-transform"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </summary>
                {cat.subcategories && (
                  <div className="pl-8 pt-3 space-y-3">
                    {cat.subcategories.map((sub) => (
                      <label
                        key={sub}
                        className="flex items-center gap-3 font-normal text-slate-600 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.subcategories.includes(sub)}
                          onChange={() =>
                            handleCheckboxChange("subcategories", sub)
                          }
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>

          <hr className="border-slate-200" />

          {/* Section: Car Makers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">
              Car Maker
            </h4>
            <div className="space-y-3">
              {DUMMY_CAR_MAKERS.map((maker) => (
                <label
                  key={maker}
                  className="flex items-center gap-3 font-normal text-slate-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.carMakers.includes(maker)}
                    onChange={() => handleCheckboxChange("carMakers", maker)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  {maker}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section: Brands */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">
              Brand
            </h4>
            <div className="space-y-3">
              {DUMMY_BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 font-normal text-slate-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange("brands", brand)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section: Price Range */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">
              Price Range
            </h4>
            <input
              type="range"
              min={DUMMY_PRICE_RANGE[0]}
              max={DUMMY_PRICE_RANGE[1]}
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center text-sm text-slate-600 mt-2">
              Up to{" "}
              <span className="font-bold text-slate-800">
                ${filters.maxPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="  w-full mt-6 md:hidden text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-lg"
        >
          Reset Filters
        </button>
      </aside>

      {/* --- Product Catalog Area (Unchanged) --- */}
      <div className="flex-1 w-full">
        <ProductCatalogPage />
      </div>
    </div>
  );
}
