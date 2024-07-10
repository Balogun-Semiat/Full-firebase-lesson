import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcK-n5UD9EsSWv8VopSa1ytfi8manFOd0",
  authDomain: "firstproject-2db56.firebaseapp.com",
  databaseURL: "https://firstproject-2db56-default-rtdb.firebaseio.com",
  projectId: "firstproject-2db56",
  storageBucket: "firstproject-2db56.appspot.com",
  messagingSenderId: "615087608295",
  appId: "1:615087608295:web:e22bdc830102372572ed42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let email = document.getElementById("email");
let password = document.getElementById("password");
let signUpBttn = document.getElementById("signupbtn");

signUpBttn.addEventListener("click", function () {
  let userInfo = {
    email: email.value,
    password: password.value,
  };
  createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then(() => {
      alert("Sign Up Successfull");
    })
    .catch((err) => {
      if (err.message.includes("auth/email-already-in-use")) {
        alert("Email Alredy in Use");
      }
      console.log("ERROR : ", err.message);
    });
});

let signWggl = document.getElementById("SignwithGgl");

signWggl.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
