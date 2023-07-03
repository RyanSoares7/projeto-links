import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDMdMBGNbWhnbTCXVMadfFoGjtKuQMcm-E',
  authDomain: 'react-links-c4e72.firebaseapp.com',
  projectId: 'react-links-c4e72',
  storageBucket: 'react-links-c4e72.appspot.com',
  messagingSenderId: '44347173794',
  appId: '1:44347173794:web:f60f0fd0a970d7985aa0fb',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
