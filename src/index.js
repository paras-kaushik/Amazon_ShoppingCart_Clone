import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEuwoZorz-InppqAqYwVNsU9rmOeANoE4",
  authDomain: "reactrealtimedbcart.firebaseapp.com",
  projectId: "reactrealtimedbcart",
  storageBucket: "reactrealtimedbcart.appspot.com",
  messagingSenderId: "310878951006",
  appId: "1:310878951006:web:be38d74546fd4877a7c6cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
