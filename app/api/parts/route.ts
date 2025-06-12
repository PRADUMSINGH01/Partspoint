import { NextResponse } from "next/server";

// interface Part {
//   // Define your Part interface properties here based on your Firestore schema
//   id?: string;
//   name?: string;
//   brand?: string;
//   // Add other properties as needed
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("sku") || undefined;
//     const name = searchParams.get("name") || undefined;
//     const brand = searchParams.get("brand") || undefined;

//     const partsRef = firestore.collection("Part");

//     // Handle single document fetch by ID
//     if (id) {
//       const partDoc = await partsRef.doc(id).get();
//       if (!partDoc.exists) {
//         return NextResponse.json(
//           { error: "Part not found with the provided ID." },
//           { status: 404 }
//         );
//       }
//       return NextResponse.json({
//         id: partDoc.id,
//         ...(partDoc.data() as Part),
//       });
//     }

//     // Handle query by name and/or brand
//     let query: FirebaseFirestore.Query = partsRef;

//     if (name) query = query.where("name", "==", name);
//     if (brand) query = query.where("brand", "==", brand);

//     const snapshot = await query.get();

//     if (snapshot.empty) {
//       return NextResponse.json(
//         { error: "No parts found matching the criteria." },
//         { status: 404 }
//       );
//     }

//     const parts: Part[] = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as Part),
//     }));

//     return NextResponse.json(parts);
//   } catch (error: unknown) {
//     console.error("Error fetching parts:", error);

//     if (error instanceof Error) {
//       if (error.message.includes("requires an index")) {
//         return NextResponse.json(
//           {
//             error: "Query requires composite index",
//             solution: "Create the index in Firestore console",
//             details: error.message,
//           },
//           { status: 400 }
//         );
//       }

//       return NextResponse.json(
//         { error: error.message || "Database error" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  return NextResponse.json({ success: "done" });
}
