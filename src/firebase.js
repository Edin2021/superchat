import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFG0a09e55_5MBzDsqM8qH0M90hTEe7rY",
  authDomain: "superchat-d7ade.firebaseapp.com",
  projectId: "superchat-d7ade",
  storageBucket: "superchat-d7ade.appspot.com",
  messagingSenderId: "263540043294",
  appId: "1:263540043294:web:a6f40ba1625297b171080f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
