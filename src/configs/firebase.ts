// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDzGdG9yLGNKyJQwkLlnLS_akZCa65a80k',
  authDomain: 'soulsforge-images.firebaseapp.com',
  projectId: 'soulsforge-images',
  storageBucket: 'soulsforge-images.appspot.com',
  messagingSenderId: '975160143309',
  appId: '1:975160143309:web:83e80c4aaa4ff30b6f2884',
  measurementId: 'G-ZSSXYS7059',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
