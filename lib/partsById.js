import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper for case-insensitive partial match
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
    const partsCollectionRef = collection(db, "Products");

    // 1. Match by Document ID
    const idDocRef = doc(partsCollectionRef, search);
    const idSnap = await getDoc(idDocRef);
    if (idSnap.exists()) {
      matchedMap.set(idSnap.id, { id: idSnap.id, ...idSnap.data() });
    }

    // 2. Fetch all parts (you can optimize with pagination or limits)
    const allPartsSnap = await getDocs(partsCollectionRef);

    allPartsSnap.forEach((docSnap) => {
      const data = docSnap.data();

      const nameMatch =
        typeof data.name === "string" &&
        caseInsensitiveIncludes(data.name, search);
      const brandMatch =
        typeof data.brand === "string" &&
        caseInsensitiveIncludes(data.brand, search);
      const skuMatch =
        typeof data.sku === "string" &&
        caseInsensitiveIncludes(data.sku, search);

      if (nameMatch || brandMatch || skuMatch) {
        matchedMap.set(docSnap.id, { id: docSnap.id, ...data });
      }
    });

    return Array.from(matchedMap.values());
  } catch (error) {
    console.error("Error in fetchParts:", error);
    if (
      error instanceof Error &&
      error.message.includes("requires a composite index")
    ) {
      throw new Error(
        `Firestore query requires a composite index. Create it in the console. Details: ${error.message}`
      );
    }
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
