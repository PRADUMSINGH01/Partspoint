// ./ProductFilter.tsx
"use client";
import { useState } from "react";
import { FiFilter, FiX, FiChevronDown, FiCheck } from "react-icons/fi";

// Assuming FilterState interface is defined as before
export interface FilterState {
  categories: string[];
  brands: string[];
  maxPrice: number;
}

interface FilterComponentProps {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  onFilter: (filters: FilterState) => void;
  filteredProductsCount: number;
}

export default function ProductFilter({
  categories,
  brands,
  priceRange,
  onFilter,
  filteredProductsCount,
}: FilterComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState(priceRange[1]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const FilterSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    // Use theme border color
    <div className="border-b border-border py-4 last:border-b-0">
      <button
        type="button" // Good practice for accessibility
        className="flex justify-between items-center w-full cursor-pointer group" // Added group for potential hover effects on children
        onClick={() => setActiveSection(activeSection === title ? null : title)}
        aria-expanded={activeSection === title} // Accessibility
        aria-controls={`filter-section-${title.replace(/\s+/g, "-")}`} // Accessibility
      >
        {/* Heading font, primary (black) color */}
        <h3 className="text-base font-heading font-medium text-primary">
          {title}
        </h3>
        {/* Neutral color for icon, rotates on open */}
        <FiChevronDown
          className={`text-neutral-light transform transition-transform duration-200 ${
            activeSection === title ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`filter-section-${title.replace(/\s+/g, "-")}`} // Accessibility
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          activeSection === title ? "mt-4 max-h-[500px]" : "max-h-0 mt-0" // Smooth height transition
        }`}
      >
        {children}
      </div>
    </div>
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const applyFilters = () => {
    const currentFilters: FilterState = {
      categories: selectedCategories,
      brands: selectedBrands,
      maxPrice: price,
    };
    onFilter(currentFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPrice(priceRange[1]);
    setActiveSection(null);
    onFilter({
      categories: [],
      brands: [],
      maxPrice: priceRange[1],
    });
  };

  // Calculate total filters applied (considering price only if changed from max)
  const priceFilterApplied = price < priceRange[1];
  const totalAppliedFilters =
    selectedCategories.length +
    selectedBrands.length +
    (priceFilterApplied ? 1 : 0);

  return (
    // Use body font defined globally or in tailwind.config.js
    <div className="font-body">
      {/* Mobile Trigger Button - Use secondary color */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full shadow-lg z-20 hover:bg-accent transition-colors flex items-center justify-center"
        aria-label="Open Filters" // Accessibility
      >
        <FiFilter size={20} />
        {/* Badge using danger color */}
        {totalAppliedFilters > 0 && (
          <span className="absolute -top-1 -right-1 bg-danger text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {totalAppliedFilters}
          </span>
        )}
      </button>

      {/* Filter Overlay */}
      <div
        className={`${
          isOpen ? "fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" : "hidden" // Slightly darker overlay with blur
        } md:block md:relative md:bg-transparent md:backdrop-blur-none`}
        onClick={() => setIsOpen(false)}
      >
        {/* Filter Panel - Use white bg, subtle shadow */}
        <div
          className={`fixed right-0 top-0 h-full w-full max-w-xs bg-white transform transition-transform duration-300 ease-in-out shadow-panel ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0 md:max-w-none md:w-full md:shadow-none md:h-auto md:bg-transparent`} // Adjusted for desktop
          onClick={(e) => e.stopPropagation()}
          role="dialog" // Accessibility
          aria-modal="true" // Accessibility
          aria-labelledby="filter-heading" // Accessibility
        >
          {/* Wrap filter content in a container for desktop view styling */}
          <div className="h-full flex flex-col md:bg-white md:rounded-lg md:shadow-subtle md:border md:border-border">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border">
              <div className="flex justify-between items-center">
                {/* Heading font, primary color */}
                <h2
                  id="filter-heading"
                  className="text-lg font-heading font-medium text-primary"
                >
                  Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden text-neutral-light hover:text-primary"
                  aria-label="Close Filters" // Accessibility
                >
                  <FiX size={24} />
                </button>
              </div>
              {totalAppliedFilters > 0 && (
                <div className="mt-1 text-sm text-secondary font-semibold">
                  {totalAppliedFilters} filter
                  {totalAppliedFilters !== 1 ? "s" : ""} applied
                </div>
              )}
            </div>

            {/* Scrollable Filter Content */}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {" "}
              {/* Reduced py */}
              {/* Price Filter */}
              <FilterSection title="Price Range">
                <div className="pt-2">
                  <div className="relative">
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider" // Use class for accent color
                    />
                    {/* Use neutral-light for less important text */}
                    <div className="flex justify-between text-sm text-neutral-light mt-2">
                      <span>₹{priceRange[0]}</span>
                      {/* Use neutral for current price */}
                      <span className="font-medium text-neutral">
                        Up to ₹{price}
                      </span>
                    </div>
                  </div>
                </div>
              </FilterSection>
              {/* Category Filter */}
              <FilterSection title="Categories">
                {/* Use max-height for scroll, adjust as needed */}
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryToggle(category)}
                      className={`flex items-center w-full p-2 text-sm rounded-md transition-colors text-left group ${
                        selectedCategories.includes(category)
                          ? "text-secondary font-medium" // Selected: secondary text, medium weight
                          : "text-neutral hover:bg-light" // Default: neutral text, light bg on hover
                      }`}
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`custom-checkbox ${
                          selectedCategories.includes(category)
                            ? "custom-checkbox--checked"
                            : "custom-checkbox--unchecked"
                        }`}
                      >
                        {selectedCategories.includes(category) && (
                          <FiCheck size={12} strokeWidth={3} />
                        )}
                      </div>
                      <span className="group-hover:text-primary">
                        {category}
                      </span>{" "}
                      {/* Optional: Darken text on hover */}
                    </button>
                  ))}
                </div>
              </FilterSection>
              {/* Brand Filter */}
              <FilterSection title="Brands">
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {brands.map((brand, index) => (
                    <button
                      key={index}
                      onClick={() => handleBrandToggle(brand)}
                      className={`flex items-center w-full p-2 text-sm rounded-md transition-colors text-left group ${
                        selectedBrands.includes(brand)
                          ? "text-secondary font-medium"
                          : "text-neutral hover:bg-light"
                      }`}
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`custom-checkbox ${
                          selectedBrands.includes(brand)
                            ? "custom-checkbox--checked"
                            : "custom-checkbox--unchecked"
                        }`}
                      >
                        {selectedBrands.includes(brand) && (
                          <FiCheck size={12} strokeWidth={3} />
                        )}
                      </div>
                      <span className="group-hover:text-primary">{brand}</span>
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Footer with Action Buttons and Count */}
            {/* Sticky footer on mobile, regular flow on desktop */}
            <div className="sticky bottom-0 bg-white border-t border-border p-4 md:static md:shadow-none md:rounded-b-lg">
              <p className="mb-3 text-sm text-neutral-light text-center">
                Showing{" "}
                <span className="font-semibold text-neutral">
                  {filteredProductsCount}
                </span>{" "}
                products
              </p>
              {/* Primary Action Button: Secondary Color */}
              <button
                onClick={applyFilters}
                className="w-full bg-secondary text-white py-2.5 px-4 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors duration-150 font-medium text-base shadow-sm hover:shadow-md"
              >
                Apply Filters
              </button>
              {/* Clear Button: Subtle style */}
              {totalAppliedFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full mt-2 text-neutral-light py-2 px-4 rounded-lg hover:bg-light hover:text-neutral transition-colors text-sm font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
