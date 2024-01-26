// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA6PGFwxOmYHPQixZ99YkBT-ELzPLf83bk",
//   authDomain: "auth-test-smortr.firebaseapp.com",
//   projectId: "auth-test-smortr",
//   storageBucket: "auth-test-smortr.appspot.com",
//   messagingSenderId: "44243960474",

//   appId: "1:44243960474:web:72e3e077037b9f1b5bd523",
//   measurementId: "G-HZPQ92611Y",
// }

const firebaseConfig = {
  apiKey: "AIzaSyC7WqRz-qH4RLmpGz1PRXta0kxKw6cgfRI",
  authDomain: "smortr-sign-up.firebaseapp.com",
  projectId: "smortr-sign-up",
  storageBucket: "smortr-sign-up.appspot.com",
  messagingSenderId: "268857224638",
  appId: "1:268857224638:web:41649e93afdb31e2059def",
  measurementId: "G-11BJ2XEE5C",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
