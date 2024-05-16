// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "react-social-media-proje-bbe91.firebaseapp.com",
  projectId: "react-social-media-proje-bbe91",
  storageBucket: "react-social-media-proje-bbe91.appspot.com",
  messagingSenderId: "1047291565066",
  appId: "1:1047291565066:web:82f1f565da0e90b13afbf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
