import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
const addProduct = async () => {
  try {
    // Get a reference to the 'products' collection
    const productsCollectionRef = collection(db, "Part");
const data = 
     
     
     {
      id:"904500204R",
  name: "STAB TRUNK DOOR",
  sku: "904500204R",
  brand: "NISSAN",
  description:
    "Gas Spring for RENAULT KWID - 904...204R - Nissan / Renault",
  price: 667.00,
  Percent:10,
  New:true ,
  stockQuantity: 85,
  galleryImages: [
    "https://images.example.com/parts/maruti/35750M66M00_angle1.jpg",
    "https://images.example.com/parts/maruti/35750M66M00_angle2.jpg",
  ],
  category: "Body",
  subcategory: "Tailgate Strut",
  searchTags: [
   "NISSAN","nissan","Renault "
  ],

 
  Compatibility:[
    {
      "Model": "KWID 0.8L BWMA MT",
      "Year": "02.2015 - 09.2020",
      "Engine": "0.8 L",
      "Power (hp)": "54 h.p.",
      "Fuel type": "Petrol",
      "Engine type": "B4A"
    },
    {
      "Model": "KWID 1.0L BWMB MT",
      "Year": "02.2015 - 09.2020",
      "Engine": "1 L",
      "Power (hp)": "63 h.p.",
      "Fuel type": "Petrol",
      "Engine type": "B4D"
    }
  ]

}

const docRef = await addDoc(productsCollectionRef, data);

console.log("Document successfully written with ID: ", docRef.id);

  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default addProduct;

// const page = async () => {
//   return <></>;
// };

// export default page;
