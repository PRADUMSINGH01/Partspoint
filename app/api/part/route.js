import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebaseAdmin";

export async function GET() {
  // try {
  //   const { searchParams } = new URL(request.url);
  //   const id = searchParams.get("sku") || undefined;
  //   const name = searchParams.get("name") || undefined;
  //   const brand = searchParams.get("brand") || undefined;
  //   const partsRef = firestore.collection("Part");
  //   // If SKU is provided, fetch the part by document ID
  //   if (id) {
  //     const partDoc = await partsRef.doc(id).get();
  //     if (!partDoc.exists) {
  //       return NextResponse.json(
  //         { error: "Part not found with the provided ID." },
  //         { status: 404 }
  //       );
  //     }
  //     return NextResponse.json({
  //       id: partDoc.id,
  //       ...partDoc.data(),
  //     });
  //   }
  //   // Create a query based on name and/or brand
  //   let query = partsRef;
  //   if (name) {
  //     query = query.where("name", "==", name);
  //   }
  //   if (brand) {
  //     query = query.where("brand", "==", brand);
  //   }
  //   const snapshot = await query.get();
  //   if (snapshot.empty) {
  //     return NextResponse.json(
  //       { error: "No parts found matching the criteria." },
  //       { status: 404 }
  //     );
  //   }
  //   const parts = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   return NextResponse.json(parts);
  // } catch (error) {
  //   console.error("Error fetching parts:", error);
  //   if (error instanceof Error) {
  //     if (error.message.includes("requires an index")) {
  //       return NextResponse.json(
  //         {
  //           error: "Query requires composite index",
  //           solution: "Create the index in Firestore console",
  //           details: error.message,
  //         },
  //         { status: 400 }
  //       );
  //     }
  //     return NextResponse.json(
  //       { error: error.message || "Database error" },
  //       { status: 500 }
  //     );
  //   }
  //   return NextResponse.json(
  //     { error: "Unknown error occurred here" },
  //     { status: 500 }
  //   );
  // }
}
