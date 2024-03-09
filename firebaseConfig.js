
import { initializeApp } from "firebase/app";
import   { getAuth }  from 'firebase/auth';


// Your web app's Firebase configuration
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

export const auth=  getAuth(app);

