import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNtkTIz9e9FVf7GgTJlvVLWFj8gv2lcHw",
    authDomain: "chatgpt-webapp-95192.firebaseapp.com",
    projectId: "chatgpt-webapp-95192",
    storageBucket: "chatgpt-webapp-95192.appspot.com",
    messagingSenderId: "32398996642",
    appId: "1:32398996642:web:aacff431e3a3bc367853fb",
    measurementId: "G-RF1KDK3RCW"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
const analytics = getAnalytics(app);