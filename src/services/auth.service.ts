import { auth, database } from "../config/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { UserInfo, toUserInfo } from "../interfaces/auth.interface";
import { doc, setDoc } from "firebase/firestore";

export const storeUserLocally = (user: UserInfo): UserInfo | null => {
  localStorage.setItem("user", JSON.stringify(user));
  const userInfo: string | null = localStorage.getItem("user");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const getCurrentUser = (): UserInfo | null => {
  // const currentUser: string | null = localStorage.getItem("user");
  // if (!currentUser) return toUserInfo(auth.currentUser);
  // return JSON.parse(currentUser);
  return toUserInfo(auth.currentUser);
};

export const removeUserLocally = (): void => {
  localStorage.removeItem("user");
};

export const userSignOut = () => {
  signOut(auth);
};

export const registerWithEmailAndPassword = (user: UserInfo) => {
  return createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password as string
  );
};

export const updateUser = async (user: UserInfo) => {
  const ref = doc(database, `user/${user.uid}`);
  return await setDoc(ref, { ...user });
};

export const signInEmailPassword = (user: UserInfo) => {
  return signInWithEmailAndPassword(auth, user.email, user.password as string);
};

export const signOnGoogle = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};
