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
  apiKey: "AIzaSyBm4VJts5TgHFZgd7DFc2Za1ZNTzJUX3rs",
  authDomain: "lawrence-demo-8d328.firebaseapp.com",
  projectId: "lawrence-demo-8d328",
  storageBucket: "lawrence-demo-8d328.appspot.com",
  messagingSenderId: "140860362328",
  appId: "1:140860362328:web:6687d38f580152a2c7c42d",
  measurementId: "G-NLE3T7FC7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);