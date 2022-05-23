import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
const firebaseConfig = {
    apiKey: "AIzaSyBCa_druQ0yexJrH8fkxhvjfZt3tt4qu2M",
    authDomain: "acorn-3ccb7.firebaseapp.com",
    projectId: "acorn-3ccb7",
    storageBucket: "acorn-3ccb7.appspot.com",
    messagingSenderId: "844390403904",
    appId: "1:844390403904:web:329f6d908395ba6f04b4a5",
    measurementId: "G-7EXZPVR47D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getUsers(db) {
  const usersCol = collection(db, 'Users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}


// onAuthStateChanged( auth, user =>{
//     if( user != null)
//     {
//         console.log("Logged in")
//     }
//     else{
//         console.log("No user")
//     }
// })
