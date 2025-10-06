// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_hTIsV_lfa_A_HhJWKIOCF-xZofDELbs",
  authDomain: "geo-hierarchy-map.firebaseapp.com",
  projectId: "geo-hierarchy-map",
  storageBucket: "geo-hierarchy-map.firebasestorage.app",
  messagingSenderId: "630516714905",
  appId: "1:630516714905:web:ec7fb790030b0792101708",
  measurementId: "G-RQ1PPE7DZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);