import * as firebase from "firebase/app";

import firebaseConfig from "./firebase.config";


export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

