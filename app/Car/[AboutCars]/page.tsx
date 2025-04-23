"use client";

import { FiMapPin, FiCalendar, FiInfo, FiStar } from "react-icons/fi";
import { SiTata } from "react-icons/si";

interface Brand {
  name: string;
  origin: string;
  founded: number;
  description: string;
  popularModels: string[];
  images: string[];
}

// Internal dummy data for Tata Motors
const tataBrand: Brand = {
  name: "Tata Motors",
  origin: "India",
  founded: 1945,
  description:
    "Tata Motors combines heritage and cutting-edge EV innovation. From the iconic Indica to the Nexon EV, experience Indian automotive excellence built on safety, performance, and sustainability.",
  popularModels: ["Nexon", "Harrier", "Safari", "Tiago", "Tigor"],
  images: [
    "/brands/tata-nexon.jpg",
    "/brands/tata-harrier.jpg",
    "/brands/tata-safari.jpg",
    "/brands/tata-ev.jpg",
  ],
};

export default function BrandDetailUI() {
  const brand = tataBrand;

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-6">
      <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Hero with Tata Icon */}
        <div className="relative h-64 bg-blue-100 flex items-center justify-center">
          <SiTata className="text-blue-600" size={96} />
        </div>

        <div className="p-8 space-y-10">
          {/* Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              {brand.name}
            </h1>
            <div className="flex space-x-6 text-sm text-gray-500 mt-4 sm:mt-0">
              <div className="flex items-center">
                <FiMapPin className="mr-1 text-blue-600" />
                {brand.origin}
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-1 text-blue-600" />
                Since {brand.founded}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {brand.description}
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Popular Models Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiStar className="mr-2 text-yellow-400" /> Popular Models
              </h2>
              <div className="flex flex-wrap gap-3">
                {brand.popularModels.map((model) => (
                  <span
                    key={model}
                    className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiInfo className="mr-2 text-blue-600" /> Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {brand.images.map((src, idx) => (
                  <div
                    key={idx}
                    className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative"
                  >
                    <img
                      src={src}
                      alt={`image ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
