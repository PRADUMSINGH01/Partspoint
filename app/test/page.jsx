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
// const data =
// {

//   name: "BADGE SCORPIO BIG",
//       sku: "2302GW500171N",
//       brand: "Mahindra",
//       description:
//         "Emblem for MAHINDRA SCORPIO 1ST GEN, SCORPIO 1ST GEN F/L, SCORPIO 2ND GEN, SCORPIO 3RD GEN F/L, SCORPIO GETAWAY VER 1 ",
//       price: 398,
//       discount:9,
//       stockQuantity: 85,
//       galleryImages: [
//         "https://firebasestorage.googleapis.com/v0/b/partpoints.firebasestorage.app/o/IMG_9402_5_11zon.jpg?alt=media&token=047364ed-c7af-49ef-bda6-dbb32263af1a",
//         "https://firebasestorage.googleapis.com/v0/b/partpoints.firebasestorage.app/o/IMG_9403_1_11zon.jpg?alt=media&token=615cc2c1-e112-4253-a8f2-0cccdb37d221"],
//       New:true,
//       category: "Body",
//       subcategory: "Emblem",
//       searchTags: [
//        "SCORPIO ","Mahindra"
//       ],

//       Compatibility:
//       [
//         {
//           "model": "SCORPIO 1ST GEN 2.6L 2WD MT",
//           "year": "06.2002 - 03.2007",
//           "engine": "2.6 L",
//           "power_hp": 117,
//           "fuel_type": "Diesel",
//           "engine_type": "SZ26DI"
//         },
//         {
//           "model": "SCORPIO 1ST GEN 2.2L 2WD MT",
//           "year": "10.2002 - 03.2007",
//           "engine": "2.2 L",
//           "power_hp": 117,
//           "fuel_type": "Petrol",
//           "engine_type": "F4R-276/REV 116"
//         },
//         {
//           "model": "SCORPIO 1ST GEN 2.6L 2WD MT",
//           "year": "02.2005 - 03.2007",
//           "engine": "2.6 L",
//           "power_hp": 117,
//           "fuel_type": "Diesel",
//           "engine_type": "SZ26DI"
//         },
//         {
//           "model": "SCORPIO 1ST GEN F/L 2.6L SLX 2WD MT",
//           "year": "04.2006 - 03.2009",
//           "engine": "2.6 L",
//           "power_hp": 116,
//           "fuel_type": "Diesel",
//           "engine_type": "SZ26DI"
//         },
//         {
//           "model": "SCORPIO 1ST GEN F/L 2.5L 2WD MT",
//           "year": "04.2006 - 03.2009",
//           "engine": "2.5 L",
//           "power_hp": 75,
//           "fuel_type": "Diesel",
//           "engine_type": "m2DICR"
//         },
//         {
//           "model": "SCORPIO 2ND GEN 2.2L VLX 2WD MT",
//           "year": "04.2008 - 09.2015",
//           "engine": "2.2 L",
//           "power_hp": 120,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 2ND GEN 2.5L EX 2WD MT",
//           "year": "04.2008 - 09.2015",
//           "engine": "2.5 L",
//           "power_hp": 75,
//           "fuel_type": "Diesel",
//           "engine_type": "m2DICR"
//         },
//         {
//           "model": "SCORPIO 2ND GEN 2.2L SLE 2WD MT",
//           "year": "04.2008 - 09.2015",
//           "engine": "2.2 L",
//           "power_hp": 120,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 2ND GEN 2.2L LX 2WD MT",
//           "year": "04.2008 - 09.2015",
//           "engine": "2.2 L",
//           "power_hp": 75,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.5L S3 2WD MT",
//           "year": "12.2017 - 12.2020",
//           "engine": "2.5 L",
//           "power_hp": 75,
//           "fuel_type": "Diesel",
//           "engine_type": "m2DICR"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S7 2WD MT",
//           "year": "12.2017 - 12.2020",
//           "engine": "2.2 L",
//           "power_hp": 120,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S11 2WD MT",
//           "year": "12.2017 - 12.2020",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S5 2WD MT",
//           "year": "12.2017 - 12.2020",
//           "engine": "2.2 L",
//           "power_hp": 120,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S7 2WD MT",
//           "year": "12.2017 - 12.2020",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S9 2WD MT",
//           "year": "11.2018 - 12.2020",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S5 2WD MT (BS-VI)",
//           "year": "01.2020 - now",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S7 2WD MT (BS-VI)",
//           "year": "01.2020 - now",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S9 2WD MT (BS-VI)",
//           "year": "01.2020 - now",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S11 2WD MT (BS-VI)",
//           "year": "01.2020 - now",
//           "engine": "2.2 L",
//           "power_hp": 140,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L S3+ 2WD MT (BS-VI)",
//           "year": "02.2021 - now",
//           "engine": "2.2 L",
//           "power_hp": 120,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L CLASSIC S 2WD MT (BS-VI)",
//           "year": "08.2022 - now",
//           "engine": "2.2 L",
//           "power_hp": 130,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L CLASSIC S11 2WD MT (BS-VI)",
//           "year": "08.2022 - now",
//           "engine": "2.2 L",
//           "power_hp": 130,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO 3RD GEN F/L 2.2L CLASSIC S5 2WD MT (BS-VI)",
//           "year": "08.2022 - now",
//           "engine": "2.2 L",
//           "power_hp": 130,
//           "fuel_type": "Diesel",
//           "engine_type": "mHawk"
//         },
//         {
//           "model": "SCORPIO GETAWAY VER 1 2.6L",
//           "year": "06.2007 - 09.2009",
//           "engine": "2.6 L",
//           "power_hp": 115,
//           "fuel_type": "Diesel",
//           "engine_type": "CRDe"
//         },
//         {
//           "model": "SCORPIO GETAWAY VER 2 2.6L",
//           "year": "09.2008 - 04.2015",
//           "engine": "2.6 L",
//           "power_hp": 115,
//           "fuel_type": "Diesel",
//           "engine_type": "CRDe"
//         }
//       ]

// }

// const docRef = await addDoc(productsCollectionRef, data);

// console.log("Document successfully written with ID: ", docRef.id);

//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// export default addProduct;

const page = async () => {
  return <></>;
};

export default page;
