// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_KEY = process.env.EXPO_PUBLIC_FIREBASE_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'pharmazing-425018.firebaseapp.com',
  projectId: 'pharmazing-425018',
  storageBucket: 'pharmazing-425018.firebasestorage.app',
  messagingSenderId: '739739212160',
  appId: '1:739739212160:web:1085d8aea463d4e8620965',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
