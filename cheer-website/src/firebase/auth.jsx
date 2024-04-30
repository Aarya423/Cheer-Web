import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust accordingly
});
//add user
const addUser = async (email, password, toggle) => {
  try{
    const add = await api.post('/api/adduser', {email: email, password: password, isAdmin: false, isVerified: false, disabled: false, isSignedUp: toggle});
  }
  catch (error) {
    console.error('Error adding user:', error);
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password, toggle) => {
  await addUser(email, password, toggle);
  
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
