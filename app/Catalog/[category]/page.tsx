// ./CarPartsPage.tsx
"use client";
import { useState } from "react";
import ProductFilter, { FilterState } from "@/components/Filter/Filter";
import { use } from "react";
import ProductCatalogPage from "@/components/ProductCatalog/ProductCatalog";

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
  console.log(activeFilters);
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start px-4 md:px-8 py-6">
      {/* Filter Sidebar */}
      <ProductFilter
        categories={DUMMY_CATEGORIES}
        brands={DUMMY_BRANDS}
        priceRange={DUMMY_PRICE_RANGE}
        onFilter={handleFilterChange}
        filteredProductsCount={productCount}
      />

      {/* Product Catalog Area */}
      <div className="flex-1 w-full   md:mt-10 z-10">
        <ProductCatalogPage />
      </div>
    </div>
  );
}
