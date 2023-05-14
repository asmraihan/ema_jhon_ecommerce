// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5BhXnm7a9VsjwpDBjcTIgBAB_2ZTCygM",
  authDomain: "ema-jhon-firebase-auth-5dfa9.firebaseapp.com",
  projectId: "ema-jhon-firebase-auth-5dfa9",
  storageBucket: "ema-jhon-firebase-auth-5dfa9.appspot.com",
  messagingSenderId: "15843039476",
  appId: "1:15843039476:web:6d59aee99f4a9790b5a6a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app