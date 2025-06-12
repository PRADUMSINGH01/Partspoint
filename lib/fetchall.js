import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchData() {
  try {
    // Reference to the collection
    const collectionRef = collection(db, "Part");

    // Get documents
    const snapshot = await getDocs(collectionRef);

    // Map documents
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
