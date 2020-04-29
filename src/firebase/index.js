import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF8Dm8aMjzGT4U4mYFgKH_IRSv04oUhOo",
  authDomain: "rauventa-project.firebaseapp.com",
  databaseURL: "https://rauventa-project.firebaseio.com",
  projectId: "rauventa-project",
  storageBucket: "rauventa-project.appspot.com",
  messagingSenderId: "98108153323",
  appId: "1:98108153323:web:465793fd984351cb8d4dae",
  measurementId: "G-VEDRV45Z78"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
