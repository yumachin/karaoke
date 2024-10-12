import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS9ED9cVMVSSI3Btz63d3RZ-DNsU6G4AI",
  authDomain: "karaoke-tsx.firebaseapp.com",
  projectId: "karaoke-tsx",
  storageBucket: "karaoke-tsx.appspot.com",
  messagingSenderId: "1012659485586",
  appId: "1:1012659485586:web:758c9e0108e9b4e75b9f4b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };