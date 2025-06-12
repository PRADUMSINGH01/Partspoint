// lib/partService.js

import { firestore } from "@/lib/firebaseAdmin";

// Reusable server function
export async function fetchParts({ sku, name, brand }) {
  try {
    const partsRef = firestore.collection("Part");

    // Fetch by SKU (document ID)
    if (sku) {
      const partDoc = await partsRef.doc(sku).get();
      if (!partDoc.exists) {
        return { error: "Part not found with the provided SKU." };
      }
      return {
        id: partDoc.id,
        ...partDoc.data(),
      };
    }

    // Query by name and/or brand
    let query = partsRef;
    if (name) {
      query = query.where("name", "==", name);
    }
    if (brand) {
      query = query.where("brand", "==", brand);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return { error: "No parts found matching the criteria." };
    }

    const parts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return parts;
  } catch (error) {
    console.error("Error in fetchParts:", error);

    if (error instanceof Error) {
      if (error.message.includes("requires an index")) {
        return {
          error: "Query requires composite index",
          solution: "Create the index in Firestore console",
          details: error.message,
        };
      }
      return { error: error.message || "Database error" };
    }

    return { error: "Unknown error occurred" };
  }
}
