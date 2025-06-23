import { FaSearch, FaCar, FaTools } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#38bdf8]  shadow-xl overflow-hidden">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
            <span className="text-yellow-300">Premium Auto Parts</span>
            <br />
            <span className="text-white opacity-90">
              Expertly Curated for You
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-white/80 max-w-xl mx-auto mt-4 mb-10 font-body">
            Discover precision-engineered, high-performance parts designed for
            perfect compatibility and lasting durability.
          </p>

          {/* Icons Row */}
          <div className="flex justify-center gap-10 mb-12 text-yellow-300 text-3xl">
            <div className="flex flex-col items-center transition-transform hover:scale-110">
              <FaCar className="drop-shadow-lg" />
              <span className="text-sm mt-2 text-white font-medium">
                Verified Fits
              </span>
            </div>
            <div className="flex flex-col items-center transition-transform hover:scale-110">
              <FaTools className="drop-shadow-lg" />
              <span className="text-sm mt-2 text-white font-medium">
                OEM Quality
              </span>
            </div>
            <div className="flex flex-col items-center transition-transform hover:scale-110">
              <FaSearch className="drop-shadow-lg" />
              <span className="text-sm mt-2 text-white font-medium">
                Smart Search
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-yellow-300 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all shadow-md">
              Browse Catalog
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all shadow-md">
              Search by Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
