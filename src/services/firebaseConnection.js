import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzassCvATVaF-sdsmods0dsi3QIg0tpCprvE-Pfs",
  authDomain: "native-app-tiao.firebaseapp.com",
  databaseURL: "https://native-app-tiao-default-rtdb.firebaseio.com",
  projectId: "native-app-tiao",
  storageBucket: "native-app-tiao.appspot.com",
  messagingSenderId: "485703102563",
  appId: "1:485703102563:web:e00f843823adb51c2023456",
  measurementId: "G-0E6T5Z63DFG69"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase