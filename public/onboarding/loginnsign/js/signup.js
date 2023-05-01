import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUk2ijQQSjGaZ4VrDFjq6iHTDdWxhe1GM',
  authDomain: 'portfoliomate-e14a8.firebaseapp.com',
  databaseURL:
    'https://portfoliomate-e14a8-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'portfoliomate-e14a8',
  storageBucket: 'portfoliomate-e14a8.appspot.com',
  messagingSenderId: '410908578001',
  appId: '1:410908578001:web:b4ea082fd4482e801535f0',
  measurementId: 'G-C2KPMT6C8Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const analytics = getAnalytics(app);

export function handleSignUp(email, password) {
  console.log('FUNCTION CALLED');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert('USER CREATED', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  console.log(email, password, 'EMAIL AND PASSWORD');
}