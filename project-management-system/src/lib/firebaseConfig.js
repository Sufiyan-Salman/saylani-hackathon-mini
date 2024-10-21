import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrbC_btIH2rojZI5nI_2ZTDHbQGcTt7Go",
    authDomain: "saylani-hackathon-mini.firebaseapp.com",
    projectId: "saylani-hackathon-mini",
    storageBucket: "saylani-hackathon-mini.appspot.com",
    messagingSenderId: "815278661437",
    appId: "1:815278661437:web:346ceb348d6916e19a6f54"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { app, auth, createUserWithEmailAndPassword,query, where, db,getDocs, addDoc, collection }