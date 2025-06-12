import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // your initialized Firestore instance

// Example function using modular style:
export async function fetchParts() {
  try {
    // 1. Try direct match by document ID (SKU)
    const search = "Maruti";
    if (search) {
      const skuDocRef = doc(db, "Part", search);
      const skuSnap = await getDoc(skuDocRef);
      if (skuSnap.exists()) {
        return [{ id: skuSnap.id, ...skuSnap.data() }];
      }
    }

    // 2. Query by name or brand
    // Build two separate queries
    const partsCollectionRef = collection(db, "Part");

    const nameQuery = query(partsCollectionRef, where("name", "==", search));
    const brandQuery = query(partsCollectionRef, where("brand", "==", search));

    const [nameSnap, brandSnap] = await Promise.all([
      getDocs(nameQuery),
      getDocs(brandQuery),
    ]);

    const matchedMap = new Map<string, any>();
    nameSnap.forEach((docSnap) => {
      matchedMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
    });
    brandSnap.forEach((docSnap) => {
      matchedMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
    });

    const results = Array.from(matchedMap.values());
    return results; // empty array if no matches
  } catch (error: any) {
    console.error("Error in fetchParts:", error);
    if (error instanceof Error && error.message.includes("requires an index")) {
      throw new Error(
        `Firestore query requires a composite index. Create it in the console. Details: ${error.message}`
      );
    }
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
