// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "spyblogs-55396.firebaseapp.com",
  projectId: "spyblogs-55396",
  storageBucket: "spyblogs-55396.appspot.com",
  messagingSenderId: "285911201065",
  appId: "1:285911201065:web:c7c4e631b8ff33df363338"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

