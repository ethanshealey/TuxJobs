// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/firestore"

/***
 * 
 * @NOTE HOW TO USE FIRESTORE
 * 
 ************************************************************************
 * 
 * How to GET data from firestore:
 * 
 * const getUsers = async () => {
 *      const data = await db.collection('Users').get().then((qs) => {
 *           qs.forEach((doc) => {
 *               let d = doc.data()
 *               console.log(d)
 *           })
 *       })
 *   }
 * 
 ************************************************************************
 * 
 * How to PUT data to firestore:
 * 
 * const userRef = db.collection('Users').add({
 *    uid: userCredentials.user.uid,
 *    username: username,
 *    email: email,
 *    saved_jobs: [],
 * })
 *
 ************************************************************************
 *
 * How to UPDATE data to firestore:
 * 
 * const ref = await db.collection('Users').doc(id).update({
 *      saved_jobs: [...savedJobs, 1]
 * })
 * 
 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxwwAgEGKKT12tzOwsnAqQPKC54_CDNXI",
  authDomain: "tuxjobs-fc228.firebaseapp.com",
  projectId: "tuxjobs-fc228",
  storageBucket: "tuxjobs-fc228.appspot.com",
  messagingSenderId: "893457181493",
  appId: "1:893457181493:web:b9de84d4fbe39e86b6fa7c"
};

let app

if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }