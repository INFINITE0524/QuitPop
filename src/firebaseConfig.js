import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxAnCIevox4GKV6Vy7HPSYlr1VCq8KdCA",
    authDomain: "quitpop-fe11c.firebaseapp.com",
    projectId: "quitpop-fe11c",
    storageBucket: "quitpop-fe11c.firebasestorage.app",
    messagingSenderId: "381764253989",
    appId: "1:381764253989:web:8880522b12288932a082cc",
    measurementId: "G-G0R4QJ3V6F"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
