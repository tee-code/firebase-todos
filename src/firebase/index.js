import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOqc_6s5HwTd1gJEAZyq_hFp-zkEElnZE",
    authDomain: "todos-1af3d.firebaseapp.com",
    projectId: "todos-1af3d",
    storageBucket: "todos-1af3d.appspot.com",
    messagingSenderId: "603294891967",
    appId: "1:603294891967:web:0d83325a3c9bd285696b0a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export {
    db
};