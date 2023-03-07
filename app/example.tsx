'use client'

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
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
const db = getFirestore(app);

// async function getCities(db: firestore.Firestore) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
//   return cityList;
// }

const q = query(collection(db, "cities"))//, where("state", "==", "CA"));



export default function Home() {
  let [ cities, setCities ] = useState<DocumentData[]>([])
  useEffect(() => {
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const allCities = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setCities(allCities)
      }
    )
    return () => { unsubscribe() }
  }, [])
  return (
    <>
      { cities.map(({ id, city }:DocumentData) => <p key={id}>{ city }</p>) }
    </>
  );
}