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
//       Compatibility: [
//         {
//           model: "IGNIS 1ST GEN 1.2L SIGMA",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L ALPHA",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L ALPHA SLDA",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L DELTA",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L DELTA AGS",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L ZETA",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.2L ZETA AGS",
//           year: "11.2016 - 02.2021",
//           engine: "1.2 L",
//           power_hp: 82,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L ALPHA",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L ALPHA SLDA",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L DELTA",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L DELTA AGS",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L ZETA",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN 1.3L ZETA AGS",
//           year: "11.2016 - 06.2019",
//           engine: "1.3 L",
//           power_hp: 74,
//           fuel_type: "Diesel",
//           engine_type: "D13A",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L ALPHA",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L SIGMA",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L DELTA",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L ZETA",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L ALPHA AGS",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L DELTA AGS",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//         {
//           model: "IGNIS 1ST GEN F/L 1.2L ZETA AGS",
//           year: "02.2020 - now",
//           engine: "1.2 L",
//           power_hp: 81,
//           fuel_type: "Petrol",
//           engine_type: "K12M",
//         },
//       ],
//       New: true,
//       createdAt: "Timestamp(seconds=1749553380, nanoseconds=0)",
//       updatedAt: "Timestamp(seconds=1749553380, nanoseconds=0)",
//     }; // Add the new document with the product data
//     const docRef = await addDoc(productsCollectionRef, data);

//     console.log("Document successfully written with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// export default addProduct;

const page = async () => {
  return <></>;
};

export default page;
