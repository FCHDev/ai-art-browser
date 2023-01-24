// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "ai-artwork-fe04b.firebaseapp.com",
    projectId: "ai-artwork-fe04b",
    storageBucket: "ai-artwork-fe04b.appspot.com",
    messagingSenderId: "40244069372",
    appId: "1:40244069372:web:a61c77cb16990bc05a6879",
    databaseURL: "https://ai-artwork-fe04b-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(appFirebase);
export const storage = getStorage(appFirebase);
export const auth = getAuth(appFirebase);
export const refDb = (a, b) => {
    return ref(a, b);
};