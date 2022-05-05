
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Cuando se necesite pasar a producción recuerde que se necesita crear el archivo env

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_LOCAL_API_KEY,
  authDomain: "conon-app-test.firebaseapp.com",
  projectId: "conon-app-test",
  storageBucket: "conon-app-test.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_LOCAL_APP_MESSAGING_SENDIND_ID,
  appId: process.env.REACT_APP_FIREBASE_LOCAL_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage( app );
// const db = firebase.firestore();

export {
  app,
  storage
}