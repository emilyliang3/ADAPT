// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgonR9Q1aky2wyOCbkpbV-VK_lm8e3L4U",
  authDomain: "adapt-ee5b3.firebaseapp.com",
  projectId: "adapt-ee5b3",
  storageBucket: "adapt-ee5b3.appspot.com",
  messagingSenderId: "493689765468",
  appId: "1:493689765468:web:0656f64296ef7e6d1d3099",
  measurementId: "G-SZJPGXT8JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);