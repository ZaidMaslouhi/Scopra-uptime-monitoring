import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase.config";

export const subscribe = async (subscriber) => {
  const ref = collection(database, "subscribers");
  return addDoc(ref, subscriber);
};
