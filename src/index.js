import { initializeApp } from "@firebase/app";


import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import router from "./router";
import store from "../src/store/index";
import apikey from "/api-keys.json";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";



const firebaseConfig = {
  apiKey: apikey.firebase,
  authDomain: "acorn-3ccb7.firebaseapp.com",
  projectId: "acorn-3ccb7",
  storageBucket: "acorn-3ccb7.appspot.com",
  messagingSenderId: "844390403904",
  appId: "1:844390403904:web:329f6d908395ba6f04b4a5",
  measurementId: "G-7EXZPVR47D",
};
////
//  WE export these functions for them to be called anywhere
///
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

// Get a list of users from your database
async function getUsers(db) {
  const usersCol = collection(db, "Users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
}

//signs in user
export async function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push({ name: "Play" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      router.push({ name: "home" });
      alert(errorMessage);
    });
    
  store.dispatch("isLoading", false);
}
//validates signed user
auth.onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
  if (user == null) setUserDoc(user);
  retrieveAvatar(user)
  store.dispatch("fetchIsLoading", false);
  getAllUsersDecks(user.uid);
});

async function retrieveAvatar(user){
  console.log(user)
  const ref = doc(db,"Users",user.uid)
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    getAvatar(docSnap.data().avatar)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

// function to create users
export async function createUser(email, password) {
  const uid = "";
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  store.dispatch("fetchIsLoading", false);
}

async function setUserDoc(user) {
  await setDoc(doc(db, "Users", user.uid), {
    uid: user.uid,
    email: user.email,
    userName: "",
    avatar: "Avatars/defaultAvatar.svg",
    decks: [],
  });
}
export async function updateUserDoc(uid, deck) {
  await updateDoc(doc(db, "Users", uid), {
    decks: arrayUnion(deck),
  });
  store.dispatch("fetchIsLoading", false);
  console.log("done");
}
export async function changeAvatar(uid, filepath) {
  await updateDoc(doc(db, "Users", uid), {
    avatar: filepath,
  });
  getAvatar(filepath);
  store.dispatch("fetchIsLoading", false);
  console.log("done");
}
export async function deleteUserDeck(uid, deck) {
  await updateDoc(doc(db, "Users", uid), {
    decks: arrayRemove(deck),
  });
  getAllUsersDecks(uid)
  store.dispatch("fetchIsLoading", false);
  
  console.log("done");

}
export async function forgotPasswordReset(email) {
  fetchSignInMethodsForEmail(auth, email)
    .then(() => {
      sendPasswordResetEmail(auth, email);
      router.push({ name: "home" });
      alert("Password reset link sent");
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
  store.dispatch("fetchIsLoading", false);
}

export async function getAllUsersDecks(uid) {
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    store.dispatch("fetchUserDecks", docSnap.data().decks);
  } else console.log("ERROR");
}

export async function uploadImgFirebase(file){
  //maybe a new naming convention
  const name = new Date().toLocaleDateString() + '-' + file.name
  const imgRef = ref(storage, 'Avatars/'+ name)
  console.log(file)
  uploadBytes(imgRef, file).then((snapshot) => {
    const filepath = snapshot.metadata.fullPath
   
    //push path to users avatar data
    console.log(store)
    changeAvatar(store.getters.getUserData.data.uid,filepath )

  });
}

export async function getAvatar(name){
  console.log(name)
  if(name == undefined)
    return '../assets/defaultAvatar'
  const imgRef = ref(storage, name)

 getDownloadURL(imgRef).then((url =>{
    console.log(url)
    store.dispatch("fetchAvatar",url)
    return url
  }))
}