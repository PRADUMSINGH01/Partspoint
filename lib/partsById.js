import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Fetch parts by id (doc ID), sku, name, or brand
export async function fetchParts(searchTerm) {
  const search = searchTerm?.trim();
  if (!search) return [];

  console.log("search", search);

  try {
    const matchedMap = new Map();
    const partsCollectionRef = collection(db, "Part");

    // 1. Match by Document ID
    const idDocRef = doc(db, "Part", search);
    const idSnap = await getDoc(idDocRef);
    if (idSnap.exists()) {
      matchedMap.set(idSnap.id, { id: idSnap.id, ...idSnap.data() });
    }

    // 2. Match by SKU, Name, Brand
    const queries = [
      query(partsCollectionRef, where("sku", "==", search)),
      query(partsCollectionRef, where("name", "==", search)),
      query(partsCollectionRef, where("brand", "==", search)),
    ];

    const results = await Promise.all(queries.map((q) => getDocs(q)));

    results.forEach((snap) => {
      snap.forEach((docSnap) => {
        matchedMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
      });
    });

    return Array.from(matchedMap.values());
  } catch (error) {
    console.error("Error in fetchParts:", error);
    if (error instanceof Error && error.message.includes("requires an index")) {
      throw new Error(
        `Firestore query requires a composite index. Create it in the console. Details: ${error.message}`
      );
    }
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
