import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBWxh5GxPqASlWybg6qk4AXV5SGae9_MeQ",
  authDomain: "citypop-76fa9.firebaseapp.com",
  databaseURL: "https://citypop-76fa9.firebaseio.com",
  projectId: "citypop-76fa9",
  storageBucket: "citypop-76fa9.appspot.com",
  messagingSenderId: "274394776071"
};

export const app = firebase.initializeApp(config);
export const db = firebase.database(app);
