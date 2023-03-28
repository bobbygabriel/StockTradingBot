
// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const {getDatabase} = require('firebase/database')


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv7YesHh5bwUjEzOf-s8QCpIt2PhAdO0I",
  authDomain: "trademind-42b3d.firebaseapp.com",
  projectId: "trademind-42b3d",
  storageBucket: "trademind-42b3d.appspot.com",
  messagingSenderId: "574010239698",
  appId: "1:574010239698:web:b0356fcb8bb3e56ccddb0b",
  measurementId: "G-9YNYEVE9CR",
  databaseURL: "https://trademind-42b3d-default-rtdb.firebaseio.com/"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

