import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDDcshNr0JchlCnQisDRxJp3CFaxKFowLM",
  authDomain: "perseo-tv.firebaseapp.com",
  projectId: "perseo-tv",
  storageBucket: "perseo-tv.appspot.com",
  messagingSenderId: "211751613810",
  appId: "1:211751613810:web:6679b0501ee7d1cdb959eb",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
