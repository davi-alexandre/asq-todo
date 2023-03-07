'use client'

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPwt8nP3mFFmVdIQ3fv0ZPaXshO2VrSi8",
  authDomain: "todo-react-app-5a693.firebaseapp.com",
  projectId: "todo-react-app-5a693",
  storageBucket: "todo-react-app-5a693.appspot.com",
  messagingSenderId: "725121657302",
  appId: "1:725121657302:web:3b605a18f4b7c14dcb1c77",
  measurementId: "G-D9WPHWES4V",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);