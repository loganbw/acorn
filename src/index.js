import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { moduleExpression } from "@babel/types";
import { storeKey } from "vuex";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
const firebaseConfig = {
  apiKey: "AIzaSyBCa_druQ0yexJrH8fkxhvjfZt3tt4qu2M",
  authDomain: "acorn-3ccb7.firebaseapp.com",
  projectId: "acorn-3ccb7",
  storageBucket: "acorn-3ccb7.appspot.com",
  messagingSenderId: "844390403904",
  appId: "1:844390403904:web:329f6d908395ba6f04b4a5",
  measurementId: "G-7EXZPVR47D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
// Get a list of users from your database
async function getUsers(db) {
  const usersCol = collection(db, "Users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

export async function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(user);
      console.log(user)
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      return false
    });
    return true
}

// function to create users
export async function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}


