// ./CarPartsPage.tsx
"use client";
import { useState } from "react";
import ProductFilter, { FilterState } from "@/components/Filter/Filter";
import { use } from "react";

const DUMMY_CATEGORIES: string[] = [
  "Engine Parts",
  "Brakes & Suspension",
  "Exhaust Systems",
  "Lighting & Electrical",
  "Interior Accessories",
  "Exterior Body Parts",
  "Wheels & Tires",
  "Filters & Fluids",
  "Performance Tuning",
  "Tools & Garage",
];
const DUMMY_BRANDS: string[] = [
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
const DUMMY_PRICE_RANGE: [number, number] = [50, 25000];

export default function CarPartsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [category],
    brands: [],
    maxPrice: DUMMY_PRICE_RANGE[1],
  });
  const [productCount, setProductCount] = useState<number>(125);
  console.log(category);
  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
    // Placeholder count logic (keep as is or replace with real logic)
    let simulatedCount = 125;
    if (newFilters.categories.length > 0)
      simulatedCount -= newFilters.categories.length * 5;
    if (newFilters.brands.length > 0)
      simulatedCount -= newFilters.brands.length * 3;
    if (newFilters.maxPrice < DUMMY_PRICE_RANGE[1]) simulatedCount -= 15;
    setProductCount(Math.max(0, simulatedCount));
  };

  // No need for the <style jsx global> block if using global CSS / tailwind.config.js

  return (
    // Apply body font, set background to light theme color
    <div className="font-body bg-light min-h-screen">
      <div className="container mx-auto p-4 py-6 md:p-8">
        {/* Heading font, primary (black) color */}
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary">
          Shop Car Parts
        </h1>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Filter Component Column */}
          {/* Adjusted width for desktop */}
          <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <ProductFilter
              categories={DUMMY_CATEGORIES}
              brands={DUMMY_BRANDS}
              priceRange={DUMMY_PRICE_RANGE}
              onFilter={handleFilterChange}
              filteredProductsCount={productCount}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {/* Use white background, border, and subtle shadow for the content card */}
            <div className="bg-white p-6 rounded-lg shadow-subtle border border-border">
              <h2 className="text-xl font-heading font-medium mb-4 text-primary">
                Currently Applied Filters
              </h2>
              {/* Use neutral text colors */}
              <div className="space-y-2 text-neutral text-sm">
                <div>
                  <strong className="font-semibold">Categories:</strong>{" "}
                  {activeFilters.categories.length > 0 ? (
                    activeFilters.categories.join(", ")
                  ) : (
                    <span className="text-neutral-light italic">None</span>
                  )}
                </div>
                <div>
                  <strong className="font-semibold">Brands:</strong>{" "}
                  {activeFilters.brands.length > 0 ? (
                    activeFilters.brands.join(", ")
                  ) : (
                    <span className="text-neutral-light italic">None</span>
                  )}
                </div>
                <div>
                  <strong className="font-semibold">Max Price:</strong> ₹
                  {activeFilters.maxPrice}{" "}
                  {activeFilters.maxPrice === DUMMY_PRICE_RANGE[1] ? (
                    <span className="text-neutral-light italic">(Any)</span>
                  ) : (
                    ""
                  )}
                </div>
                {/* Display count clearly */}
                <div className="pt-2">
                  <strong className="font-semibold">Products Found:</strong>{" "}
                  {productCount}
                </div>
              </div>

              {/* Placeholder for Product Display */}
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-lg font-heading font-medium mb-4 text-primary">
                  Product Display Area
                </h3>
                <div className="text-center py-10 border border-dashed border-border rounded-lg bg-light">
                  <p className="text-neutral-light">
                    (Products matching filters will appear here)
                  </p>
                </div>
                {/* TODO: Add Product Grid/List component here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
