"use client";
import { useState, useEffect, useCallback } from "react";
//import { db } from "@/firebaseConfig"; // Adjust the path if needed
//import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

// interface VehicleSearchParams {
//   maker: string;
//   model: string;
//   year: string;
//   engine: string;
// }

interface Part {
  id: string;
  partNumber: string;
  name: string;
  price: number;
  compatibleMakes: string[];
  compatibleModels: string[];
  compatibleYears: number[];
  engineType?: string;
  // ... other part properties
}

interface Maker {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
}

interface Year {
  id: string;
  year: number; // Store year as number
}

interface Engine {
  id: string;
  type: string;
}

export default function VehicleSearch() {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");

  const [makers] = useState<Maker[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [engines, setEngines] = useState<Engine[]>([]);
  const [loading, setLoading] = useState(false);
  const [foundParts, setFoundParts] = useState<Part[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search was done

  // Fetch Makers
  const fetchMakers = useCallback(async () => {
    setLoading(true);
    try {
      //   const makersCollection = collection(db, "makers");
      //  const makersSnapshot = await getDocs(
      //    query(makersCollection, orderBy("name")) // Order makers alphabetically
      //  );
      //  const fetchedMakers: Maker[] = makersSnapshot.docs.map((doc) => ({
      //    id: doc.id,
      //     name: doc.data().name as string, // Ensure correct type
      //   }));
      //   setMakers(fetchedMakers);
    } catch (error) {
      console.error("Error fetching makers:", error);
      // Consider showing a user-friendly error message
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Models based on selected Maker
  const fetchModels = useCallback(async (makerId: string) => {
    if (!makerId) {
      setModels([]);
      setYears([]);
      setEngines([]);
      return;
    }
    setLoading(true);
    try {
      // const modelsCollection = collection(db, "models");
      // const modelsSnapshot = await getDocs(
      //    query(
      //     modelsCollection,
      //where("makerId", "==", makerId),
      //       orderBy("name")
      //   )
      // );
      //  const fetchedModels: Model[] = modelsSnapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     name: doc.data().name as string,
      ///  }));
      //   setModels(fetchedModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Years based on selected Maker and Model
  const fetchYears = useCallback(async (makerId: string, modelId: string) => {
    if (!makerId || !modelId) {
      setYears([]);
      setEngines([]);
      return;
    }
    setLoading(true);
    try {
      //  const yearsCollection = collection(db, "years");
      //  const yearsSnapshot = await getDocs(
      //    query(
      //      yearsCollection,
      //      where("makerId", "==", makerId),
      //     where("modelId", "==", modelId),
      //    orderBy("year")
      //   )
      // );
      // const fetchedYears: Year[] = yearsSnapshot.docs.map((doc) => ({
      //    id: doc.id,
      //    year: doc.data().year as number,
      //}));
      //   setYears(fetchedYears);
    } catch (error) {
      console.error("Error fetching years:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // // Fetch Engines based on selected Maker, Model and Year
  // const fetchEngines = useCallback(
  //   async (makerId: string, modelId: string, yearId: string) => {
  //     if (!makerId || !modelId || !yearId) {
  //       setEngines([]);
  //       return;
  //     }
  //     setLoading(true);
  //     try {
  //       const enginesCollection = collection(db, "engines");
  //       const enginesSnapshot = await getDocs(
  //         query(
  //           enginesCollection,
  //           where("makerId", "==", makerId),
  //           where("modelId", "==", modelId),
  //           where("yearId", "==", yearId),
  //           orderBy("type")
  //         )
  //       );
  //       const fetchedEngines: Engine[] = enginesSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         type: doc.data().type as string,
  //       }));
  //       setEngines(fetchedEngines);
  //     } catch (error) {
  //       console.error("Error fetching engines:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

  // Initial fetch of makers
  useEffect(() => {
    fetchMakers();
  }, [fetchMakers]);

  // Update models when maker changes
  useEffect(() => {
    if (selectedMaker) {
      fetchModels(selectedMaker);
    }
  }, [selectedMaker, fetchModels]);

  // Update years when model changes
  useEffect(() => {
    if (selectedMaker && selectedModel) {
      fetchYears(selectedMaker, selectedModel);
    }
  }, [selectedMaker, selectedModel, fetchYears]);

  // Update engines when year changes
  // useEffect(() => {
  //   if (selectedMaker && selectedModel && selectedYear) {
  //     fetchEngines(selectedMaker, selectedModel, selectedYear);
  //   }
  // }, [selectedMaker, selectedModel, selectedYear, fetchEngines]);

  const handleMakerChange = (makerId: string) => {
    setSelectedMaker(makerId);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    setSelectedYear("");
    setSelectedEngine("");
  };

  const handleYearChange = (yearId: string) => {
    setSelectedYear(yearId);
    setSelectedEngine("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngine) return;

    setLoading(true);
    setSearchPerformed(true); // Set to true before search
    setFoundParts([]);

    try {
      // const partsCollection = collection(db, "parts");
      // const q = query(
      //   partsCollection,
      //   where("compatibleMakes", "array-contains", selectedMaker),
      //   where("compatibleModels", "array-contains", selectedModel),
      //   where("compatibleYears", "array-contains", parseInt(selectedYear)), // Ensure year is a number
      //   where("engineType", "==", selectedEngine)
      // );
      // const querySnapshot = await getDocs(q);
      // const parts: Part[] = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...(doc.data() as Part), // Correctly type the document data
      // }));
      // setFoundParts(parts);
    } catch (error) {
      console.error("Error fetching parts:", error);
      // Display error to user
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          >
            <option value="">Select Maker</option>
            {makers.map((maker) => (
              <option key={maker.id} value={maker.id}>
                {maker.name}
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
            disabled={!selectedMaker || loading}
            required
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
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
            disabled={!selectedModel || loading}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year.id} value={year.id}>
                {year.year}
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
            disabled={!selectedYear || loading}
            required
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine.id} value={engine.id}>
                {engine.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-secondary w-full text-white px-8 py-3 rounded-lg font-heading font-semibold transition-all"
          disabled={!selectedEngine || loading}
        >
          {loading ? "Finding Parts..." : "Find Parts"}
        </button>
      </div>

      {/* Display Found Parts */}
      {searchPerformed && ( // Only show results section after a search
        <div className="mt-8">
          {loading ? (
            <div className="text-center text-gray-500">
              Searching for compatible parts...
            </div>
          ) : foundParts.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Found Parts:</h2>
              <ul>
                {foundParts.map((part) => (
                  <li key={part.id} className="mb-2 border-b pb-2">
                    <strong>{part.name}</strong> ({part.partNumber}) - $
                    {part.price.toFixed(2)}
                    <p className="text-sm text-gray-600">
                      Compatible with: {part.compatibleMakes.join(", ")}{" "}
                      {part.compatibleModels.join(", ")} (
                      {part.compatibleYears.join(", ")})
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No compatible parts found for the selected vehicle.
            </div>
          )}
        </div>
      )}
    </form>
  );
}
