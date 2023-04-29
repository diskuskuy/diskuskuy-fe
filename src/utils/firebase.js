// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATzVAoQsklKTqSjjJYwGgn9BV1owrBSto",
  authDomain: "diskuskuy-3b477.firebaseapp.com",
  projectId: "diskuskuy-3b477",
  storageBucket: "diskuskuy-3b477.appspot.com",
  messagingSenderId: "940777677322",
  appId: "1:940777677322:web:da4b30d57fa0ae8e5b75f3",
  measurementId: "G-PPZM6VQZ8P"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);