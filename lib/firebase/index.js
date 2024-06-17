// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeYORTibsJPRHL8gHqlStCqho38zpz8go",
  authDomain: "expense-tracker-f5941.firebaseapp.com",
  projectId: "expense-tracker-f5941",
  storageBucket: "expense-tracker-f5941.appspot.com",
  messagingSenderId: "761232265889",
  appId: "1:761232265889:web:b9508b57bf299c7e13d6e0",
  measurementId: "G-THJH9K6WRL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db };
