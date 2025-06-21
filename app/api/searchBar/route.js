// File: /app/api/compatibility-search/route.js

import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
function parseMonthYearRange(rangeStr) {
  if (typeof rangeStr !== "string") return null;
  const parts = rangeStr.split("-").map((s) => s.trim());
  if (parts.length !== 2) return null;
  const parsePart = (part) => {
    const [monStr, yearStr] = part.split(".").map((s) => s.trim());
    const month = parseInt(monStr, 10);
    const year = parseInt(yearStr, 10);
    if (isNaN(month) || isNaN(year)) return null;
    return { year, month };
  };
  const start = parsePart(parts[0]);
  const end = parsePart(parts[1]);
  if (!start || !end) return null;
  return { start, end };
}

function isYearInRange(rangeObj, filterYear) {
  if (!rangeObj) return false;
  const { start, end } = rangeObj;
  if (typeof filterYear === "number") {
    return filterYear >= start.year && filterYear <= end.year;
  }
  if (typeof filterYear === "string") {
    // try parse "MM.YYYY"
    const [monStr, yearStr] = filterYear.split(".").map((s) => s.trim());
    const month = parseInt(monStr, 10);
    const year = parseInt(yearStr, 10);
    if (!isNaN(month) && !isNaN(year)) {
      const startVal = start.year * 12 + start.month;
      const endVal = end.year * 12 + end.month;
      const targetVal = year * 12 + month;
      return targetVal >= startVal && targetVal <= endVal;
    }
    // maybe just a year string "2015"
    const y = parseInt(filterYear, 10);
    if (!isNaN(y)) {
      return y >= start.year && y <= end.year;
    }
    return false;
  }
  return false;
}

function filterCompatibilityEntries(compatArray, filters) {
  if (!Array.isArray(compatArray)) return [];
  const fEngineType = filters.engine_type
    ? String(filters.engine_type).trim().toLowerCase()
    : null;
  const fFuelType = filters.fuel_type
    ? String(filters.fuel_type).trim().toLowerCase()
    : null;
  const fEngine = filters.engine
    ? String(filters.engine).trim().toLowerCase()
    : null;
  const fModel = filters.model
    ? String(filters.model).trim().toLowerCase()
    : null;
  const fYearRaw = filters.year !== undefined ? filters.year : null;
  let fYearParsed = null;
  if (fYearRaw !== null) {
    if (typeof fYearRaw === "number") {
      fYearParsed = fYearRaw;
    } else if (typeof fYearRaw === "string") {
      fYearParsed = fYearRaw.trim();
    }
  }

  return compatArray.filter((entry) => {
    if (typeof entry !== "object" || entry === null) return false;

    if (fEngineType) {
      const et = entry.engine_type;
      if (typeof et !== "string" || et.trim().toLowerCase() !== fEngineType) {
        return false;
      }
    }
    if (fFuelType) {
      const ft = entry.fuel_type;
      if (typeof ft !== "string" || ft.trim().toLowerCase() !== fFuelType) {
        return false;
      }
    }
    if (fEngine) {
      const eng = entry.engine;
      if (
        typeof eng !== "string" ||
        !eng.trim().toLowerCase().includes(fEngine)
      ) {
        return false;
      }
    }
    if (fModel) {
      const m = entry.model;
      if (typeof m !== "string" || !m.trim().toLowerCase().includes(fModel)) {
        return false;
      }
    }
    if (fYearParsed !== null) {
      const rangeObj = parseMonthYearRange(entry.year);
      if (!isYearInRange(rangeObj, fYearParsed)) {
        return false;
      }
    }
    return true;
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      model, // string: used to find the Firestore document(s) by model line
      engine_type,
      fuel_type,
      engine,
      year,
      collection = "Part", // default collection name; adjust as needed
      // optionally: limit or pagination fields
    } = body;

    if (!model) {
      return NextResponse.json(
        {
          error:
            "Missing required field 'model' to locate compatibility document.",
        },
        { status: 400 }
      );
    }
    const modelLower = String(model).trim().toLowerCase();
    if (!modelLower) {
      return NextResponse.json(
        { error: "'model' must be a non-empty string." },
        { status: 400 }
      );
    }

    // Query Firestore for documents where modelLower field matches.
    // Adjust field name as per your schema.
    // For example, if each doc has { modelLower: "ciaz 1st gen 1.3l vdi mt", Compatibility: [...] }
    const colRef = db.collection(collection);
    const querySnapshot = await colRef
      .where("model", "==", modelLower)
      .limit(1) // assuming one document per model line
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: `No document found for model '${model}'.` },
        { status: 404 }
      );
    }
    // If multiple docs can match, you can iterate through all; here we take the first:
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    const compatArray = data.Compatibility || data.compatibility || [];
    if (!Array.isArray(compatArray) || compatArray.length === 0) {
      return NextResponse.json(
        { message: "No compatibility entries found.", results: [] },
        { status: 200 }
      );
    }

    // Apply filters
    const filters = { engine_type, fuel_type, engine, model: null, year };
    // Note: We don't filter by entry.model here because model refers to the top-level doc's model.
    // If you want to filter by entry.model inside Compatibility as well, pass filters.model = some substring.
    // For now, we assume we only wanted to fetch compatibility for the specified model document.
    const filteredEntries = filterCompatibilityEntries(compatArray, filters);
    console.log(filteredEntries, "---------server");
    return NextResponse.json({
      model: docSnap.id,
      matchedCount: filteredEntries.length,
      results: filteredEntries,
    });
  } catch (error) {
    console.error("Error in /api/compatibility-search:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
