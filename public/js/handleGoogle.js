import { initializeApp } from "firebase/app";
import   { getAuth }  from 'firebase/auth';
import { GoogleAuthProvider,  signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcI8uUE-rIayyhcd9E3yfgXA6_vHoRwXM",
  authDomain: "polar-protocol-414721.firebaseapp.com",
  projectId: "polar-protocol-414721",
  storageBucket: "polar-protocol-414721.appspot.com",
  messagingSenderId: "712823743542",
  appId: "1:712823743542:web:4f718cd788ca2041876497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const handleGoogle = async (e)=>{
    const provider= await new GoogleAuthProvider();
     // 1. Create a new user with the Google provider. 
     return  signInWithPopup(getAuth,provider); 


 }