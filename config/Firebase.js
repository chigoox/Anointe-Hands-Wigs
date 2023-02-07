// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr8UdRXxsqguEJJ0p3u2zvi0akXd7SZE0",
  authDomain: "anointed-hands-wigs.firebaseapp.com",
  projectId: "anointed-hands-wigs",
  storageBucket: "anointed-hands-wigs.appspot.com",
  messagingSenderId: "309907460540",
  appId: "1:309907460540:web:e8f757efc32a63e8b85bb9",
  measurementId: "G-V0VTMBDDQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DATABASE = getFirestore(app);
export default {app}
export {AUTH, DATABASE}
