"use client";
import React from "react";

const CompatibilityTable = ({ data = [] }) => {
  console.log(data, "------");

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left text-gray-200 border border-gray-600">
        <thead className="text-xs uppercase bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Fuel</th>
            <th className="px-4 py-2">Engine</th>
            <th className="px-4 py-2">Engine Type</th>
            <th className="px-4 py-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="bg-gray-900 border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="px-4 py-2">{item.model}</td>
              <td className="px-4 py-2">{item.fuel_type}</td>
              <td className="px-4 py-2">{item.engine}</td>

              <td className="px-4 py-2">{item.power_hp ?? "-"}</td>
              <td className="px-4 py-2">{item.year || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompatibilityTable;
