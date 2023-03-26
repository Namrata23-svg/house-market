// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd8uyKZt5f1xz1X9D8QpLBdbO1lo4QYvU",
  authDomain: "house-market-37fa4.firebaseapp.com",
  projectId: "house-market-37fa4",
  storageBucket: "house-market-37fa4.appspot.com",
  messagingSenderId: "950147523770",
  appId: "1:950147523770:web:1a038d780618fe1b7e0e83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();