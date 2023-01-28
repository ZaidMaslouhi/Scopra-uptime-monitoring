import { auth } from "../firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


export const getCurrentUser = () => {
  return auth.currentUser;
};

export const userSignOut = () => {
  signOut(auth);
};

export const registerWithEmailAndPassword = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password);
};

export const updateUser = (newUserInfo) => {
  if (!newUserInfo) return null;
  return updateProfile(auth.currentUser, newUserInfo);
};

export const signInEmailPassword = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password);
};


export const signInGoogle = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};




