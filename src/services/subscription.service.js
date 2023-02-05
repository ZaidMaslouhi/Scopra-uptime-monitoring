import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase.config";

export const subscribe = (subscriber) => {
  const ref = collection(database, "subscribers");
  return addDoc(ref, subscriber);
};
