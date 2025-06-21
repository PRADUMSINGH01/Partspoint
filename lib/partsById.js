import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper: case-insensitive match
function caseInsensitiveIncludes(value = "", keyword = "") {
  return value.toLowerCase().includes(keyword.toLowerCase());
}

// Main search function
export async function fetchParts(searchTerm) {
  const search = searchTerm?.trim().toLowerCase();
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

    // 2. Exact match by SKU or Brand
    const skuQuery = query(partsCollectionRef, where("sku", "==", search));
    const brandQuery = query(partsCollectionRef, where("brand", "==", search));
    const [skuSnap, brandSnap] = await Promise.all([
      getDocs(skuQuery),
      getDocs(brandQuery),
    ]);

    [skuSnap, brandSnap].forEach((snap) => {
      snap.forEach((docSnap) => {
        matchedMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
      });
    });

    // 3. Partial match by name using a broad fetch and filter on client
    // You can optimize by paginating or limiting
    const nameSnap = await getDocs(partsCollectionRef);
    nameSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (
        data.name &&
        typeof data.name === "string" &&
        caseInsensitiveIncludes(data.name, search)
      ) {
        matchedMap.set(docSnap.id, { id: docSnap.id, ...data });
      }
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
