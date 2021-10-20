// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { auth }