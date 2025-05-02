import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBSBM1rC4DRAPZeEfK8eNjuvvIoxLGxPD4",
    authDomain: "readingjournalapp.firebaseapp.com",
    projectId: "readingjournalapp",
    storageBucket: "readingjournalapp.firebasestorage.app",
    messagingSenderId: "1057141801759",
    appId: "1:1057141801759:web:ee78e51d9848816eba262a"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

 export { auth };
 export const db = getFirestore(app);
