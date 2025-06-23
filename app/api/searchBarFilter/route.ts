import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// Define the expected shape of the request body
interface SearchRequestBody {
  maker?: string;
  model?: string;
  year?: number;
  engineName?: string;
}

// Define the shape of part data to return
interface PartResult {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  // You may include other fields if desired:
  // description?: string;
  // manufacturer?: string;
  // stockQty?: number;
  // imageURL?: string;
}

export async function POST(request: NextRequest) {
  // Only allow JSON
  let body: SearchRequestBody;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Failed to parse JSON body in searchBarFilter:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { maker, model, year, engineName } = body;

  // Validate required fields
  if (
    typeof maker !== "string" ||
    maker.trim() === "" ||
    typeof model !== "string" ||
    model.trim() === "" ||
    typeof year !== "number" ||
    isNaN(year) ||
    typeof engineName !== "string" ||
    engineName.trim() === ""
  ) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid parameters. Expected maker (string), model (string), year (number), engineName (string).",
      },
      { status: 400 }
    );
  }

  // Build the combined key exactly as stored in Firestore
  const combinedKey = `${maker}|${model}|${year}|${engineName}`;

  try {
    // Query Firestore: parts collection, where compatibilityKeys array-contains the combinedKey
    const partsRef = db.collection("New");
    const querySnapshot = await partsRef
      .where("compatibilityKeys", "array-contains", combinedKey)
      .get();

    const results: PartResult[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Ensure required fields exist and types are correct
      const name = typeof data.name === "string" ? data.name : null;
      const partNumber =
        typeof data.partNumber === "string" ? data.partNumber : null;
      const price = typeof data.price === "number" ? data.price : null;
      if (name && partNumber && price !== null) {
        results.push({
          id: docSnap.id,
          name,
          partNumber,
          price,
        });
      } else {
        // If some part doc is missing these fields, we skip or could include with defaults
        console.warn(
          `Part doc ${docSnap.id} missing required fields (name/partNumber/price). Skipping.`
        );
      }
    });

    // Return JSON array of parts
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error querying Firestore in searchBarFilter:", error);
    return NextResponse.json(
      { error: "Internal server error while searching parts." },
      { status: 500 }
    );
  }
}
