// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMa_MaTd-M8EySIiV9YWK10dlG4ne9mz0",
  authDomain: "instagram-clonev1-f297a.firebaseapp.com",
  projectId: "instagram-clonev1-f297a",
  storageBucket: "instagram-clonev1-f297a.appspot.com",
  messagingSenderId: "69371977436",
  appId: "1:69371977436:web:f9894719291d0cbf2ade19",
  measurementId: "G-BRKDTG22N5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};