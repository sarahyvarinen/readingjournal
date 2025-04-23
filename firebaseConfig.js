import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyADPPPYvEjqzrlydAtGUdn6FUdaVPPbQWo',
    authDomain: 'readingjournalapp.firebase.com',
    projectId: 'readingjournalapp',
    storageBucket: 'readingjournalapp.appspot.com',
    messagingSenderId: '...',
    appId: '...'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };