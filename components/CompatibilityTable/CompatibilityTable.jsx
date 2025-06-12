// components/CompatibilityTable.jsx

import React, { useState } from "react"; // Import useState
import { FaCarSide } from "react-icons/fa";

// Data remains the same
const compatibilityData = [
  {
    model: "IGNIS 1ST GEN 1.2L SIGMA",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L ALPHA",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L ALPHA SLDA",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L DELTA",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L DELTA AGS",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L ZETA",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.2L ZETA AGS",
    year: "11.2016 - 02.2021",
    engine: "1.2 L",
    power: "82 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN 1.3L ALPHA",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN 1.3L ALPHA SLDA",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN 1.3L DELTA",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN 1.3L DELTA AGS",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN 1.3L ZETA",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN 1.3L ZETA AGS",
    year: "11.2016 - 06.2019",
    engine: "1.3 L",
    power: "74 h.p.",
    fuel: "Diesel",
    engineType: "D13A",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L ALPHA",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L SIGMA",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L DELTA",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L ZETA",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L ALPHA AGS",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L DELTA AGS",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
  {
    model: "IGNIS 1ST GEN F/L 1.2L ZETA AGS",
    year: "02.2020 - now",
    engine: "1.2 L",
    power: "81 h.p.",
    fuel: "Petrol",
    engineType: "K12M",
  },
];

const CompatibilityTable = () => {
  // State to manage the number of visible items, starts at 10
  const [visibleCount, setVisibleCount] = useState(10);

  const handleSelectVehicle = (vehicle) => {
    alert(`You have selected: ${vehicle.model}`);
  };

  // Function to show all remaining items
  const loadMoreItems = () => {
    setVisibleCount(compatibilityData.length);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full">
      <div className="flex items-center gap-3 mb-4">
        <FaCarSide className="text-2xl text-secondary" />
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-neutral">
          Compatibility: <span className="font-medium">MARUTI IGNIS</span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-neutral">
          <thead className="text-xs uppercase bg-light border-b-2 border-border">
            <tr>
              <th scope="col" className="px-6 py-3 font-heading">
                Model
              </th>
              <th scope="col" className="px-6 py-3 font-heading">
                Year
              </th>
              <th scope="col" className="px-6 py-3 font-heading">
                Engine
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-heading whitespace-nowrap"
              >
                Power (hp)
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-heading whitespace-nowrap"
              >
                Fuel Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-heading whitespace-nowrap"
              >
                Engine Type
              </th>
              <th scope="col" className="px-6 py-3 font-heading text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Use .slice() to show only the visible items */}
            {compatibilityData.slice(0, visibleCount).map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b border-border hover:bg-slate-100 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-primary whitespace-nowrap">
                  {item.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.engine}</td>
                <td className="px-6 py-4">{item.power}</td>
                <td className="px-6 py-4">{item.fuel}</td>
                <td className="px-6 py-4">{item.engineType}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleSelectVehicle(item)}
                    className="font-bold text-white bg-secondary hover:bg-accent focus:ring-4 focus:ring-secondary/50 rounded-lg text-xs px-4 py-2 transition-all duration-200"
                  >
                    Choose
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render the "Load More" button */}
      {visibleCount < compatibilityData.length && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMoreItems}
            className="px-6 py-2 border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
          >
            Load More ({compatibilityData.length - visibleCount} remaining)
          </button>
        </div>
      )}

      <p className="md:hidden text-xs text-center text-neutral/70 mt-4">
        Scroll horizontally to see all details
      </p>
    </div>
  );
};

export default CompatibilityTable;
