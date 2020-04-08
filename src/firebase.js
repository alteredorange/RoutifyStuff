import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyBEwl2tquKkN7miHiFkF1b_TkHEwb7bR6c",
  authDomain: "quibi-is-doomed.firebaseapp.com",
  databaseURL: "https://quibi-is-doomed.firebaseio.com",
  projectId: "quibi-is-doomed",
  storageBucket: "quibi-is-doomed.appspot.com",
  messagingSenderId: "308370483180",
  appId: "1:308370483180:web:da08ca5ea0d84818f282c9",
  measurementId: "G-FRH226NBN9",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const functions = firebase.functions();

//export const emailProvider = new firebase.auth.EmailAuthProvider();
