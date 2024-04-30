import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "key removed for security reasons",
    authDomain: "cheer-website.firebaseapp.com",
    projectId: "cheer-website",
    storageBucket: "cheer-website.appspot.com",
    messagingSenderId: "129129883028",
    appId: "1:129129883028:web:95b6d80190b09194575b81"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
