import firebase from "firebase";

import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfY7KHXVU_NO6jKipfVj1mWOh0zK5YeH4",
  authDomain: "my-app-9365f.firebaseapp.com",
  databaseURL: "https://my-app-9365f.firebaseio.com",
  projectId: "my-app-9365f",
  storageBucket: "my-app-9365f.appspot.com",
  messagingSenderId: "801668386600",
  appId: "1:801668386600:web:495f3bb024aa256f744a1d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db: any = firebase.firestore();

export default {
  firebase,
  db,
};
