"use client";
import SearchBar from "@/components/Carpartsearchbar/Carpartsearchbar";
import { fetchData } from "@/lib/fetchall";
import ProductCatalogPage from "@/components/ProductCatalog/ProductCatalog";
import React, { useState, useEffect, useMemo } from "react";
// Removed: import { useSearchParams } from "next/navigation";
// Removed: import ProductCatalogPage from "@/components/ProductCatalog/ProductCatalog";

// --- Mock Data Structures (Now serving as the "real" data for client-side filtering) ---
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
  { name: "Wheels & Tires", subcategories: [] },
  { name: "Filters & Fluids", subcategories: [] },
  { name: "Performance Tuning", subcategories: [] },
  { name: "Tools & Garage", subcategories: [] },
  { name: "Steering", subcategories: ["Steering Angle Sensor"] }, // Added for consistency with mock data
];

const DUMMY_BRANDS = [
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
  "Mahindra", // Added for consistency with mock data
  "Tata", // Added for consistency with mock data
  "Maruti Suzuki", // Added for consistency with mock data
];

const DUMMY_PRICE_RANGE = [50, 25000];

// Helper: initial filters for client-side
const getInitialFilters = () => {
  return {
    categories: [], // No initial category filter
    subcategories: [], // No initial subcategory filter
    brands: [], // Initial brand filter as per your expectation
    maxPrice: DUMMY_PRICE_RANGE[1],
  };
};

export default function CarPartsPage() {
  // Removed: const searchParams = useSearchParams();

  // --- State Management ---
  const [filters, setFilters] = useState(() => getInitialFilters());
  // products state now refers to the currently displayed (filtered & paginated) products
  // allParts stores the full dataset for client-side filtering
  const [allParts, setAllParts] = useState([]);
  const [loading, setLoading] = useState(true); // Simulate initial data load
  const [error, setError] = useState(null); // Error state (less common for static data)
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const PRODUCTS_PER_PAGE = 12; // Define pagination limit
  const [GetFilter, SetFilter] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      if (filters.brands && filters.categories === null) {
        SetFilter(true);
      }
      const simulateLoad = async () => {
        const res = await fetchData();
        setAllParts(res); // Load all mock data into state
      };
      simulateLoad();
    } catch (err) {
      console.error("Error setting mock data:", err);
      setError("An error occurred loading product data.");
    } finally {
      setLoading(false);
    }
  }, []); // Runs once on mount

  // Effect to prevent body scroll when mobile filter overlay is open
  useEffect(() => {
    document.body.style.overflow = isFilterVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isFilterVisible]);

  // --- Client-Side Filtering and Pagination with useMemo ---
  // This hook efficiently filters the 'allParts' data and applies pagination.
  // It only re-runs when 'allParts', 'filters', or 'page' changes.
  const { paginatedProducts, totalFilteredResults, totalFilteredPages } =
    useMemo(() => {
      let currentFiltered = allParts;

      // Apply category filter
      if (filters.categories.length > 0) {
        currentFiltered = currentFiltered.filter((product) =>
          filters.categories.includes(product.category)
        );
      }

      // Apply subcategory filter (only if category is selected and subcategory exists)
      if (filters.subcategories.length > 0) {
        currentFiltered = currentFiltered.filter((product) =>
          filters.subcategories.includes(product.subcategory)
        );
      }

      // Apply brand filter
      if (filters.brands.length > 0) {
        currentFiltered = currentFiltered.filter((product) =>
          filters.brands.includes(product.brand)
        );
      }

      // Apply max price filter
      currentFiltered = currentFiltered.filter(
        (product) => product.price <= filters.maxPrice
      );

      // Calculate total results AFTER filtering, but BEFORE pagination
      const calculatedTotalResults = currentFiltered.length;
      const calculatedTotalPages = Math.ceil(
        calculatedTotalResults / PRODUCTS_PER_PAGE
      );

      // Apply pagination slice
      const start = (page - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;
      const paginatedProducts = currentFiltered.slice(start, end);

      return {
        paginatedProducts,
        totalFilteredResults: calculatedTotalResults,
        totalFilteredPages: calculatedTotalPages,
      };
    }, [allParts, filters, page, PRODUCTS_PER_PAGE]); // Dependencies

  // Update totalResults and totalPages states after useMemo calculates them
  useEffect(() => {
    setTotalResults(totalFilteredResults);
    setTotalPages(totalFilteredPages);
  }, [totalFilteredResults, totalFilteredPages]);

  // --- Event Handlers ---

  // Generic handler for checkbox changes (categories, brands, etc.)
  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const list = prev[key] || [];
      const newList = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];

      const newState = { ...prev, [key]: newList };

      // Clean up subcategories if a parent category is deselected
      if (key === "categories") {
        const relevantSubcategories = DUMMY_CATEGORIES.filter((cat) =>
          newList.includes(cat.name)
        ).flatMap((cat) => cat.subcategories);

        newState.subcategories = prev.subcategories.filter((sub) =>
          relevantSubcategories.includes(sub)
        );
      }

      return newState;
    });
    setPage(1); // Reset to page 1 whenever a filter is changed
  };

  // Handler for the price range slider
  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setFilters((prev) => ({ ...prev, maxPrice: val }));
    setPage(1); // Reset to page 1 on price change
  };

  // Handler to reset all filters to their initial state
  const resetFilters = () => {
    setFilters(getInitialFilters());
    setPage(1);
  };

  // Handler for pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start px-4 md:px-8 py-6 bg-slate-50 min-h-screen mt-20 ">
      {/* Mobile Filter Header */}

      {GetFilter && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md" />

          <div className="relative z-10 flex justify-center items-center h-full w-full p-4">
            <button
              className="absolute top-4 right-4 text-white text-2xl md:text-3xl hover:text-gray-200 transition-colors"
              onClick={() => SetFilter(false)}
            >
              &times;
            </button>

            <div className="w-full max-w-2xl">
              <SearchBar className="w-full" />
            </div>
          </div>
        </div>
      )}

      <div className="w-full md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setIsFilterVisible(true)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-xs text-slate-700 font-medium hover:shadow-sm transition-shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
        <div className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          {loading ? "Loading..." : `${totalResults} Results`}
        </div>
      </div>

      {/* Filter Panel Overlay */}
      {isFilterVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 backdrop-blur-sm transition-opacity"
          onClick={() => setIsFilterVisible(false)}
        />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto
                 md:relative md:h-auto md:w-72 lg:w-80 md:shadow-none md:rounded-lg md:border md:border-slate-100 md:sticky md:top-24
                 ${
                   isFilterVisible ? "translate-x-0" : "-translate-x-full"
                 } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors hidden md:block"
            >
              Reset All
            </button>
            <button
              onClick={() => setIsFilterVisible(false)}
              className="md:hidden text-slate-400 hover:text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full mb-6 hidden md:inline-block">
          {loading ? "Loading products..." : `${totalResults} items found`}
        </div>

        {/* Filter Sections */}
        <div className="space-y-7">
          {/* Category Filter */}
          <div>
            <h4 className="text-base font-medium text-slate-900 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              Categories
            </h4>
            <div className="space-y-2 pl-1">
              {DUMMY_CATEGORIES.map((cat) => (
                <div key={cat.name} className="group">
                  <div className="flex items-center justify-between py-1.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat.name)}
                        onChange={() =>
                          handleCheckboxChange("categories", cat.name)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{cat.name}</span>
                    </label>
                    {cat.subcategories?.length > 0 && (
                      <svg
                        className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>

                  {cat.subcategories?.length > 0 &&
                    filters.categories.includes(cat.name) && (
                      <div className="ml-7 mt-2 space-y-2 border-l border-slate-200 pl-3 py-1">
                        {cat.subcategories.map((sub) => (
                          <label
                            key={sub}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.subcategories.includes(sub)}
                              onChange={() =>
                                handleCheckboxChange("subcategories", sub)
                              }
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-slate-600 text-sm">
                              {sub}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100"></div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-base font-medium text-slate-900 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Brands
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {DUMMY_BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange("brands", brand)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-700 text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100"></div>

          {/* Price Filter */}
          <div>
            <h4 className="text-base font-medium text-slate-900 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Price Range
            </h4>
            <div className="px-2">
              <input
                type="range"
                min={DUMMY_PRICE_RANGE[0]}
                max={DUMMY_PRICE_RANGE[1]}
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-3">
                <span>₹{DUMMY_PRICE_RANGE[0].toLocaleString()}</span>
                <span className="font-medium text-blue-600">
                  Up to ₹{filters.maxPrice.toLocaleString()}
                </span>
                <span>₹{DUMMY_PRICE_RANGE[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Footer */}
        <div className="mt-8 md:hidden border-t border-slate-100 pt-6">
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 text-center text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsFilterVisible(false)}
              className="flex-1 py-3 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-red-800">Loading Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {paginatedProducts.length > 0 ? (
              <>
                <ProductCatalogPage products={paginatedProducts} />
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="inline-flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm border border-slate-100">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (num) => (
                          <button
                            key={num}
                            onClick={() => handlePageChange(num)}
                            className={`px-4 py-2 text-sm rounded-md ${
                              page === num
                                ? "bg-blue-600 text-white font-medium"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {num}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 max-w-md mx-auto">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-900">
                  No matching products
                </h3>
                <p className="text-slate-600 mt-2 mb-5">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
