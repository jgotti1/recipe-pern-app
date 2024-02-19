// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVqeRkOJJId_fWCiESz2nKiXq8l09XXAE",
  authDomain: "recipephotos-b5621.firebaseapp.com",
  projectId: "recipephotos-b5621",
  storageBucket: "recipephotos-b5621.appspot.com",
  messagingSenderId: "562646961487",
  appId: "1:562646961487:web:4572fe00d53158d583093a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)