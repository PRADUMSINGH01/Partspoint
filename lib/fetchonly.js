import { db } from "@/lib/firebase";
import { cache } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
export const getLatestProducts = cache(async () => {
  const productsRef = collection(db, "Products");
  const q = query(productsRef, orderBy("createdAt", "desc"), limit(10));

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
});
