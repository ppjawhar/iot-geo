import { initializeApp } from "firebase/app";

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

export default app;