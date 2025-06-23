import { FaShieldAlt, FaCogs, FaBolt } from "react-icons/fa";

export default function PremiumAutoBanner() {
  return (
    <div className="md:mt-20  w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#38bdf8] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Text Section */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Built for Power,{" "}
            <span className="text-yellow-300">Engineered to Last</span>
          </h2>
          <p className="text-sm md:text-base text-white/90 mt-2">
            Premium-grade parts trusted by pros. Discover unmatched quality and
            precision for every ride.
          </p>
        </div>

        {/* Features with Icons */}
        <div className="flex items-center gap-6 text-yellow-300 text-xl">
          <div className="flex flex-col items-center">
            <FaShieldAlt />
            <span className="text-xs mt-1 text-white">Trusted</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCogs />
            <span className="text-xs mt-1 text-white">Precision</span>
          </div>
          <div className="flex flex-col items-center">
            <FaBolt />
            <span className="text-xs mt-1 text-white">Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
