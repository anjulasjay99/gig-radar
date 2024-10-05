// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClY-Xy6MgLArZT4rswhpn0LMucXWzumRc",
  authDomain: "gigradar-bd20f.firebaseapp.com",
  databaseURL: "https://gigradar-bd20f-default-rtdb.firebaseio.com",
  projectId: "gigradar-bd20f",
  storageBucket: "gigradar-bd20f.appspot.com",
  messagingSenderId: "1092204192639",
  appId: "1:1092204192639:web:ca07811f9f41624a24b04a",
  measurementId: "G-JVRBMTEHKV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);
