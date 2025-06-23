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
}

export async function POST(request: NextRequest) {
  let body: SearchRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    console.error("Failed to parse JSON body in searchBarFilter:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { maker, model, year, engineName } = body;

  // Validate request body
  if (
    typeof maker !== "string" ||
    typeof model !== "string" ||
    typeof year !== "number" ||
    isNaN(year) ||
    typeof engineName !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid parameters. Expected: maker (string), model (string), year (number), engineName (string).",
      },
      { status: 400 }
    );
  }

  // Convert values to lowercase for case-insensitive search
  const combinedKey = `${maker.toLowerCase()}|${model.toLowerCase()}|${year}|${engineName.toLowerCase()}`;

  try {
    const partsRef = db.collection("New");

    const querySnapshot = await partsRef
      .where("compatibilityKeys_lowercase", "array-contains", combinedKey)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const results: PartResult[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();

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
        console.warn(`Skipping document ${docSnap.id} due to missing fields.`);
      }
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error querying Firestore in searchBarFilter:", error);
    return NextResponse.json(
      { error: "Internal server error while searching parts." },
      { status: 500 }
    );
  }
}
