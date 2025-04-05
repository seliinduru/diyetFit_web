// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // sendPasswordResetEmail burada doğru import edildi
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-UXUH885zp5L2a0AELOP6DVHsZ6g8uI",
  authDomain: "diyetfit-5cd06.firebaseapp.com",
  projectId: "diyetfit-5cd06",
  storageBucket: "diyetfit-5cd06.firebasestorage.app",
  messagingSenderId: "837557736661",
  appId: "1:837557736661:web:07e621adef8e0ae8f8be5c",
  measurementId: "G-8DBPCNJKSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export auth ve sendPasswordResetEmail fonksiyonunu dışa aktar
export { app, db, auth, analytics, sendPasswordResetEmail };
