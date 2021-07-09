import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
require("firebase/auth");

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDEQSqEtpOQUcpTN06DfbF9kRjPjgCmDG0",
  authDomain: "react-chat-app-3f4f6.firebaseapp.com",
  databaseURL: "https://react-chat-app-3f4f6-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-3f4f6",
  storageBucket: "react-chat-app-3f4f6.appspot.com",
  messagingSenderId: "914881511077",
  appId: "1:914881511077:web:78ef56b420be85c11cd74c",
});

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth, storage };
