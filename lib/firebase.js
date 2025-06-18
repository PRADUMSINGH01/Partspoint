// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDjUDFMEE_KHiSizbwWK27C-nG5TRjiAt8",
  authDomain: "partpoints.firebaseapp.com",
  projectId: "partpoints",
  storageBucket: "partpoints.firebasestorage.app",
  messagingSenderId: "955762051828",
  appId: "1:955762051828:web:fe4324365b6cd77ba02ca1",
  measurementId: "G-SLE2HG9YV4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// database_model = {
//   Id: "",
//   Sku: "",
//   Name: "",
//   Price: "",
//   Discrition: "",
//   Percent: "",
//   Com: [],
// };
