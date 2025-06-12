// import {
//   getFirestore,
//   collection,
//   addDoc,
//   Timestamp,
// } from "firebase/firestore";

// import { db } from "@/lib/firebase";
// const addProduct = async () => {
//   try {
//     // Get a reference to the 'products' collection
//     const productsCollectionRef = collection(db, "Part");

//     const data = {
//       name: "Maruti Suzuki Genuine Rear Combination Lamp Assembly (Left)",
//       sku: "35750M66M00",
//       brand: "Maruti Suzuki Genuine Parts",
//       description:
//         "Official OEM Rear Left (LH) Combination Tail Light Assembly. Ensures perfect fit, functionality, and safety compliance for specified models. Includes housing and lens.",
//       price: 950.0,
//       stockQuantity: 85,
//       mainImageUrl:
//         "https://images.example.com/parts/maruti/35750M66M00_main.jpg",
//       galleryImages: [
//         "https://images.example.com/parts/maruti/35750M66M00_angle1.jpg",
//         "https://images.example.com/parts/maruti/35750M66M00_angle2.jpg",
//       ],
//       category: "Lighting & Electrical",
//       subcategory: "Tail Lights",
//       searchTags: [
//         "maruti",
//         "suzuki",
//         "genuine",
//         "parts",
//         "35750m66m00",
//         "taillight",
//         "tail",
//         "lamp",
//         "rear",
//         "combination",
//         "left",
//         "lh",
//         "alto",
//       ],
//       specifications: {
//         position: "Rear Left",
//         includesBulbs: true,
//         voltage: "12V",
//         lensMaterial: "Polycarbonate",
//       },
//       vehicleFitment: [
//         { make: "Maruti Suzuki", model: "Alto", year: 2010 },
//         { make: "Maruti Suzuki", model: "Alto", year: 2011 },
//         { make: "Maruti Suzuki", model: "Alto", year: 2012 },
//       ],
//       isActive: true,
//       createdAt: "Timestamp(seconds=1749553380, nanoseconds=0)",
//       updatedAt: "Timestamp(seconds=1749553380, nanoseconds=0)",
//     }; // Add the new document with the product data
//     const docRef = await addDoc(productsCollectionRef, data);

//     console.log("Document successfully written with ID: ", docRef.id);
//     alert(`Product added successfully with ID: ${docRef.id}`);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     alert("Error adding product. Check the console for details.");
//   }
// };

// export default addProduct;

const page = async () => {
  return <></>;
};

export default page;
