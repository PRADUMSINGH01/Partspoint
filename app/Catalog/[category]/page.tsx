"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCatalogPage from "@/components/ProductCatalog/ProductCatalog";

interface Part {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  description?: string;
  sku?: string;
  compatibilityKeys_lowercase?: string[];
}

const DUMMY_PRICE_RANGE: [number, number] = [50, 25000];
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
  { name: "Steering", subcategories: ["Steering Angle Sensor"] },
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
  "Mahindra",
  "Tata",
  "Maruti",
];

const getInitialFilters = () => ({
  categories: [] as string[],
  subcategories: [] as string[],
  brands: [] as string[],
  maxPrice: DUMMY_PRICE_RANGE[1],
  searchTerm: "",
});

export default function CarPartsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const makerParam = searchParams.get("maker") || "";
  const modelParam = searchParams.get("model") || "";
  const yearParam = searchParams.get("year") || "";
  const engineParam =
    searchParams.get("engineType") || searchParams.get("engineName") || "";

  const [allProducts, setAllProducts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(getInitialFilters());
  const [compatibilityFilter, setCompatibilityFilter] = useState({
    maker: "",
    model: "",
    year: null as number | null,
    engineType: "",
  });
  const PRODUCTS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all parts with compatibility and category
  useEffect(() => {
    async function fetchAllParts() {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams();
        const { maker, model, year, engineType } = compatibilityFilter;
        if (maker && model && year && engineType) {
          qs.set("compatibility", `${maker}|${model}|${year}|${engineType}`);
        }
        if (categoryParam) qs.set("category", categoryParam);
        qs.set("limit", "500");

        const res = await fetch(`/api/searchBarFilter?${qs}`);
        const data = await res.json();

        if (!data.success) throw new Error(data.message || "API error");
        setAllProducts(data.products);
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error ? e.message : "Failed to load parts";
        setError(errorMessage);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllParts();
  }, [compatibilityFilter, categoryParam]);

  // Initialize filters from URL
  useEffect(() => {
    const init = getInitialFilters();
    const brandParam = searchParams.get("brand");
    if (brandParam)
      init.brands = DUMMY_BRANDS.filter(
        (b) => b.toLowerCase() === brandParam.toLowerCase()
      );
    setFilters(init);
    setCompatibilityFilter({
      maker: makerParam,
      model: modelParam,
      year: Number(yearParam) || null,
      engineType: engineParam,
    });
    setCurrentPage(1);
  }, [makerParam, modelParam, yearParam, engineParam, searchParams]);

  // Client-side filter logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (
        filters.categories.length &&
        !filters.categories.includes(product.category)
      )
        return false;
      if (
        filters.subcategories.length &&
        !filters.subcategories.includes(product.subcategory)
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(product.brand))
        return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.searchTerm.trim()) {
        const term = filters.searchTerm.toLowerCase();
        if (
          !product.name.toLowerCase().includes(term) &&
          !(product.description ?? "").toLowerCase().includes(term) &&
          !(product.sku ?? "").toLowerCase().includes(term)
        )
          return false;
      }
      return true;
    });
  }, [allProducts, filters]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filter handlers
  const handleCheckboxChange = (
    key: keyof ReturnType<typeof getInitialFilters>,
    value: string
  ) => {
    setFilters((prev) => {
      const list = prev[key] as string[];
      const updated = list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value];
      return { ...prev, [key]: updated };
    });
    setCurrentPage(1);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
    setCurrentPage(1);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    setCurrentPage(1);
  };

  // Reset all filters & URL
  const resetFilters = () => {
    setFilters(getInitialFilters());
    setCompatibilityFilter({
      maker: makerParam,
      model: modelParam,
      year: Number(yearParam) || null,
      engineType: engineParam,
    });
    setCurrentPage(1);
    router.push(pathname);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-6 bg-slate-50 min-h-screen mt-20">
      <aside className="w-full md:w-72 p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset All
          </button>
        </div>
        {compatibilityFilter.maker &&
          compatibilityFilter.model &&
          compatibilityFilter.year &&
          compatibilityFilter.engineType && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-xs text-gray-500 mb-1">Showing parts for:</p>
              <p className="font-medium text-sm">
                {compatibilityFilter.maker} / {compatibilityFilter.model} /{" "}
                {compatibilityFilter.year} / {compatibilityFilter.engineType}
              </p>
            </div>
          )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search by name, SKU..."
                className="w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-gray-700">Categories</h4>
            <div className="max-h-60 overflow-y-auto pr-2">
              {DUMMY_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`cat-${cat.name}`}
                    checked={filters.categories.includes(cat.name)}
                    onChange={() =>
                      handleCheckboxChange("categories", cat.name)
                    }
                    className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`cat-${cat.name}"`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-gray-700">Brands</h4>
            <div className="max-h-60 overflow-y-auto pr-2">
              {DUMMY_BRANDS.map((b) => (
                <div key={b} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`brand-${b}`}
                    checked={filters.brands.includes(b)}
                    onChange={() => handleCheckboxChange("brands", b)}
                    className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`brand-${b}"`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {b}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <h4 className="font-medium text-gray-700">Price Range</h4>
              <span className="font-medium text-blue-600">
                ₹{filters.maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={DUMMY_PRICE_RANGE[0]}
              max={DUMMY_PRICE_RANGE[1]}
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Min: ₹{DUMMY_PRICE_RANGE[0].toLocaleString()}</span>
              <span>Max: ₹{DUMMY_PRICE_RANGE[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-600 mb-2">
              Error Loading Products
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-gray-600 mb-2 sm:mb-0">
                Showing{" "}
                <span className="font-medium">{paginatedProducts.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                products
              </p>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                </select>
              </div>
            </div>

            <ProductCatalogPage products={paginatedProducts} />

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  } px-4 py-2 rounded-md flex items-center`}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    } w-10 h-10 rounded-md flex items-center justify-center`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  } px-4 py-2 rounded-md flex items-center`}
                >
                  Next
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Matching Products Found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Try adjusting your filters or search terms to find what you&lsquo;
              re looking for.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
