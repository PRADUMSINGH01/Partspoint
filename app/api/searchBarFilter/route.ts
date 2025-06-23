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

  //const { maker, model, year, engineName } = body;
  const maker = "Mahindra";
  const model = "XUV 300";
  const year = 2019;
  const engineName = "1.2L Turbo Petrol";

  if (
    !maker ||
    typeof maker !== "string" ||
    !model ||
    typeof model !== "string" ||
    !year ||
    typeof year !== "number" ||
    isNaN(year) ||
    !engineName ||
    typeof engineName !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid parameters. Expected maker (string), model (string), year (number), engineName (string).",
      },
      { status: 400 }
    );
  }

  // --- CHANGE FOR CASE-INSENSITIVITY ---
  // Convert search inputs to lowercase before building the key.
  const combinedKey = `${maker.toLowerCase()}|${model.toLowerCase()}|${year}|${engineName.toLowerCase()}`;

  try {
    const partsRef = db.collection("New");

    // --- CHANGE FOR CASE-INSENSITIVITY ---
    // Query the new `compatibilityKeys_lowercase` field.
    const querySnapshot = await partsRef
      .where("compatibilityKeys_lowercase", "array-contains", combinedKey)
      .get();

    if (querySnapshot.empty) {
      // Return empty array if no documents found
      return NextResponse.json([], { status: 200 });
    }

    const results: PartResult[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // We still return the original, properly cased data
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
        console.warn(
          `Part doc ${docSnap.id} missing required fields (name/partNumber/price). Skipping.`
        );
      }
    });
    console.log(results, "-----");
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error querying Firestore in searchBarFilter:", error);
    return NextResponse.json(
      { error: "Internal server error while searching parts." },
      { status: 500 }
    );
  }
}
