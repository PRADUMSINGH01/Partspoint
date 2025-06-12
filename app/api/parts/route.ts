import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebaseAdmin";
import { Part } from "@/lib/types"; // Assuming you have a Part type defined

// interface PartQueryParams {
//   sku?: string;
//   name?: string;
//   brand?: string;
// }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("sku");
    const name = searchParams.get("name");
    const brand = searchParams.get("brand");

    const partsRef = firestore.collection("Part");

    // Handle ID query
    if (id) {
      const partDoc = await partsRef.doc(id).get();
      if (!partDoc.exists) {
        return NextResponse.json(
          { message: "Part not found with the provided ID." },
          { status: 404 }
        );
      }
      const partData = partDoc.data() as Part;
      return NextResponse.json({ id: partDoc.id, ...partData });
    }

    // Handle name and brand queries
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      partsRef;

    if (name) {
      query = query.where("name", "==", name);
    }
    if (brand) {
      query = query.where("brand", "==", brand);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json(
        { message: "No parts found matching the criteria." },
        { status: 404 }
      );
    }

    const parts: (Part & { id: string })[] = [];
    snapshot.forEach((doc) => {
      parts.push({
        id: doc.id,
        ...(doc.data() as Part),
      });
    });

    return NextResponse.json(parts);
  } catch (error: unknown) {
    console.error("Error fetching parts from Firestore:", error);

    if (error instanceof Error && error.message.includes("requires an index")) {
      return NextResponse.json(
        {
          error:
            "Query requires a composite index. Please create it in your Firestore console.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
