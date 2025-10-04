"use client";
import React, { useState } from "react";

const CompatibilityTable = ({ data = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? data : data.slice(0, 10);

  return (
    <div className="overflow-x-auto mt-6 font-body">
      <table className="w-full text-sm text-left border border-gray-300 text-black">
        <thead className="text-xs uppercase bg-black text-white font-heading">
          <tr>
            <th className="px-4 py-3 border border-gray-300">Brand</th>
            <th className="px-4 py-3 border border-gray-300">Model</th>
            <th className="px-4 py-3 border border-gray-300">Engine</th>
            <th className="px-4 py-3 border border-gray-300">Year</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, idx) => (
            <tr
              key={idx}
              className="bg-white border-b border-gray-300 hover:bg-gray-100 transition"
            >
              <td className="px-4 py-2 border border-gray-200">{item.brand}</td>
              <td className="px-4 py-2 border border-gray-200">{item.model}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.engine}
              </td>

              <td className="px-4 py-2 border border-gray-200">
                {item.year || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show More / Show Less Button */}
      {data.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition rounded"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTable;
