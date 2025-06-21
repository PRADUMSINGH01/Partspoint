// /lib/MakeQ.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function addInquiryToFirestore(product, userData) {
  if (!product || !product.id) {
    throw new Error("Invalid product data");
  }
  if (!userData?.name || !userData?.phone) {
    throw new Error("Invalid user data");
  }

  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      productId: product.id,
      productName: product.name || "",
      partNumber: product.partNumber || product.sku || "",
      name: userData.name,
      phone: userData.phone,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to save inquiry to Firestore:", error);
    throw error;
  }
}
