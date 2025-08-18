// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId
// };
const firebaseConfig = {
  apiKey: "AIzaSyDkYAXO1hv28UcFfsd_tSry68jD6ry3x00",
  authDomain: "simple-firebase-c2a53.firebaseapp.com",
  databaseURL: "https://simple-firebase-c2a53-default-rtdb.firebaseio.com",
  projectId: "simple-firebase-c2a53",
  storageBucket: "simple-firebase-c2a53.firebasestorage.app",
  messagingSenderId: "916144502435",
  appId: "1:916144502435:web:12af6e292cc17fe7fbf116"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);