import { collection, addDoc } from "firebase/firestore";
import { database } from "../config/firebase.config";

export interface Subscriber {
  email: string;
  username: string;
  timestamp: number;
}

export const subscribe = (subscriber: Subscriber) => {
  const ref = collection(database, "subscribers");
  return addDoc(ref, subscriber);
};
