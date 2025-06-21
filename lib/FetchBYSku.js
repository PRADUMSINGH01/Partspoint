import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Case-insensitive SKU search (client-side filter)
export async function fetchPartsBySKU(searchTerm) {
  const search = searchTerm?.trim().toLowerCase();
  if (!search) return [];

  try {
    const matchedParts = [];
    const partsRef = collection(db, "Part");

    // Firestore doesn't support case-insensitive queries, so we fetch and filter manually
    const snapshot = await getDocs(partsRef);

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const sku = data.sku?.toLowerCase?.();
      if (sku && sku.includes(search)) {
        matchedParts.push({ id: docSnap.id, ...data });
      }
    });

    return matchedParts;
  } catch (error) {
    console.error("Error fetching parts by SKU:", error);
    throw new Error("Failed to search by SKU");
  }
}
