"use client";
import { useState } from "react";

interface VehicleSearchParams {
  maker: string;
  model: string;
  year: string;
  engine: string;
}

// Sample data - replace with your Firebase data
const carMakers = {
  Toyota: {
    Camry: {
      "2023": ["2.5L I4", "3.5L V6"],
      "2022": ["2.5L I4", "3.5L V6"],
    },
    Corolla: {
      "2023": ["1.8L I4"],
      "2022": ["1.8L I4"],
    },
  },
  Honda: {
    Accord: {
      "2023": ["1.5L Turbo", "2.0L Turbo"],
      "2022": ["1.5L Turbo", "2.0L Turbo"],
    },
  },
};

export default function VehicleSearch() {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");

  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [engines, setEngines] = useState<string[]>([]);

  const handleMakerChange = (maker: string) => {
    setSelectedMaker(maker);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setModels(Object.keys(carMakers[maker as keyof typeof carMakers]));
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear("");
    setSelectedEngine("");
    const makerData = carMakers[selectedMaker as keyof typeof carMakers];
    setYears(Object.keys(makerData[model]));
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedEngine("");
    const makerData = carMakers[selectedMaker as keyof typeof carMakers];
    setEngines(makerData[selectedModel][year]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams: VehicleSearchParams = {
      maker: selectedMaker,
      model: selectedModel,
      year: selectedYear,
      engine: selectedEngine,
    };
    console.log("Search Parameters:", searchParams);
    // You can add Firebase database query here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Car Maker Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make
          </label>
          <select
            value={selectedMaker}
            onChange={(e) => handleMakerChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Maker</option>
            {Object.keys(carMakers).map((maker) => (
              <option key={maker} value={maker}>
                {maker}
              </option>
            ))}
          </select>
        </div>

        {/* Model Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedMaker}
            required
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Year Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedModel}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Engine Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine
          </label>
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={!selectedYear}
            required
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
          disabled={!selectedEngine}
        >
          Find Parts
        </button>
      </div>
    </form>
  );
}
