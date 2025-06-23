// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// const addProducts = async () => {
//   const products = [
//     {
//       name: "Air Filter Element",
//       partNumber: "AF-CRETA-15",
//       price: 600.0,
//       compatibleMakes: ["Hyundai"],
//       compatibleModels: ["Creta"],
//       compatibleYears: [
//         2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
//       ],
//       compatibleEngineNames: [
//         "1.5 L Petrol",
//         "1.5 L Diesel",
//         "1.4 L Turbo Petrol",
//       ],
//       compatibilityKeys: [
//         // Petrol 1.5L
//         "Hyundai|Creta|2015|1.5 L Petrol",
//         "Hyundai|Creta|2016|1.5 L Petrol",
//         "Hyundai|Creta|2017|1.5 L Petrol",
//         "Hyundai|Creta|2018|1.5 L Petrol",
//         "Hyundai|Creta|2019|1.5 L Petrol",
//         "Hyundai|Creta|2020|1.5 L Petrol",
//         "Hyundai|Creta|2021|1.5 L Petrol",
//         "Hyundai|Creta|2022|1.5 L Petrol",
//         "Hyundai|Creta|2023|1.5 L Petrol",
//         "Hyundai|Creta|2024|1.5 L Petrol",
//         // Diesel 1.5L
//         "Hyundai|Creta|2015|1.5 L Diesel",
//         "Hyundai|Creta|2016|1.5 L Diesel",
//         "Hyundai|Creta|2017|1.5 L Diesel",
//         "Hyundai|Creta|2018|1.5 L Diesel",
//         "Hyundai|Creta|2019|1.5 L Diesel",
//         "Hyundai|Creta|2020|1.5 L Diesel",
//         "Hyundai|Creta|2021|1.5 L Diesel",
//         "Hyundai|Creta|2022|1.5 L Diesel",
//         "Hyundai|Creta|2023|1.5 L Diesel",
//         "Hyundai|Creta|2024|1.5 L Diesel",
//         // Turbo Petrol 1.4L (assuming launched 2024)
//         "Hyundai|Creta|2024|1.4 L Turbo Petrol",
//       ],
//       description:
//         "Air filter for Hyundai Creta petrol and diesel variants (2015–2024); includes support for new 1.4L Turbo Petrol in 2024.",
//       manufacturer: "Hyundai Genuine",
//       stockQty: 22,
//       imageURL: "https://example.com/images/AF-CRETA-15.jpg",
//     },
//     {
//       name: "Engine Oil Filter",
//       partNumber: "OF-HARRIER-19",
//       price: 550.0,
//       compatibleMakes: ["Tata"],
//       compatibleModels: ["HARRIER"],
//       compatibleYears: [2019, 2020, 2021, 2022],
//       compatibleEngineNames: ["2.0L Kryotec Diesel (Multijet II sourced)"],
//       compatibilityKeys: [
//         "Tata|HARRIER|2019|2.0L Kryotec Diesel (Multijet II sourced)",
//         "Tata|HARRIER|2020|2.0L Kryotec Diesel (Multijet II sourced)",
//         "Tata|HARRIER|2021|2.0L Kryotec Diesel (Multijet II sourced)",
//         "Tata|HARRIER|2022|2.0L Kryotec Diesel (Multijet II sourced)",
//       ],
//       description: "Oil filter for Tata Harrier Diesel (2019–2022).",
//       manufacturer: "Tata Genuine",
//       stockQty: 18,
//       imageURL: "https://example.com/images/OF-HARRIER-19.jpg",
//     },
//     {
//       name: "Cabin Air Filter",
//       partNumber: "CF-MICRA-10",
//       price: 400.0,
//       compatibleMakes: ["Nissan"],
//       compatibleModels: ["Micra"],
//       compatibleYears: [2010, 2011, 2012, 2013, 2014],
//       compatibleEngineNames: ["1.2 L Petrol"],
//       compatibilityKeys: [
//         "Nissan|Micra|2010|1.2 L Petrol",
//         "Nissan|Micra|2011|1.2 L Petrol",
//         "Nissan|Micra|2012|1.2 L Petrol",
//         "Nissan|Micra|2013|1.2 L Petrol",
//         "Nissan|Micra|2014|1.2 L Petrol",
//       ],
//       description:
//         "Cabin air filter for Nissan Micra 1.2 L Petrol (2010–2014).",
//       manufacturer: "Aftermarket FilterCo",
//       stockQty: 50,
//       imageURL: "https://example.com/images/CF-MICRA-10.jpg",
//     },
//     {
//       name: "Front Brake Disc",
//       partNumber: "BD-THAR-20",
//       price: 3000.0,
//       compatibleMakes: ["Mahindra"],
//       compatibleModels: ["Thar"],
//       compatibleYears: [2020, 2021, 2022],
//       compatibleEngineNames: ["2.0L mStallion Petrol", "2.2L mHawk Diesel"],
//       compatibilityKeys: [
//         "Mahindra|Thar|2020|2.0L mStallion Petrol",
//         "Mahindra|Thar|2021|2.0L mStallion Petrol",
//         "Mahindra|Thar|2022|2.0L mStallion Petrol",
//         "Mahindra|Thar|2020|2.2L mHawk Diesel",
//         "Mahindra|Thar|2021|2.2L mHawk Diesel",
//         "Mahindra|Thar|2022|2.2L mHawk Diesel",
//       ],
//       description:
//         "Front brake disc for Mahindra Thar petrol & diesel variants (2020–2022).",
//       manufacturer: "Mahindra Genuine",
//       stockQty: 15,
//       imageURL: "https://example.com/images/BD-THAR-20.jpg",
//     },
//     {
//       name: "Air Filter Element",
//       partNumber: "AF-NEXON-17",
//       price: 500.0,
//       compatibleMakes: ["Tata"],
//       compatibleModels: ["NEXON"],
//       compatibleYears: [2017, 2018, 2019, 2020],
//       compatibleEngineNames: [
//         "1.2L Revotron Turbocharged Petrol",
//         "1.5L Revotorq Diesel",
//       ],
//       compatibilityKeys: [
//         "Tata|NEXON|2017|1.2L Revotron Turbocharged Petrol",
//         "Tata|NEXON|2018|1.2L Revotron Turbocharged Petrol",
//         "Tata|NEXON|2019|1.2L Revotron Turbocharged Petrol",
//         "Tata|NEXON|2020|1.2L Revotron Turbocharged Petrol",
//         "Tata|NEXON|2017|1.5L Revotorq Diesel",
//         "Tata|NEXON|2018|1.5L Revotorq Diesel",
//         "Tata|NEXON|2019|1.5L Revotorq Diesel",
//         "Tata|NEXON|2020|1.5L Revotorq Diesel",
//       ],
//       description:
//         "Air filter for Tata Nexon petrol and diesel variants (2017–2020).",
//       manufacturer: "Tata Genuine",
//       stockQty: 20,
//       imageURL: "https://example.com/images/AF-NEXON-17.jpg",
//     },
//   ];
//   const results = [];

//   for (const [index, product] of products.entries()) {
//     try {
//       const docRef = await addDoc(collection(db, "New"), {
//         ...product,
//         createdAt: new Date(), // Optional: Add timestamp
//       });

//       console.log(`Product ${index + 1} added with ID: ${docRef.id}`);
//       results.push({ success: true, id: docRef.id, index });
//     } catch (error) {
//       console.error(`Error adding product ${index + 1}:`, error);
//       results.push({ success: false, error, index, product });
//     }
//   }

//   return results;
// };

// export default addProducts;

const page = async () => {
  return <></>;
};

export default page;
