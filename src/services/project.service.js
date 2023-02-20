import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../firebase.config";

export const newProject = (user, project) => {
  const ref = collection(database, `user/${user.uid}/projects`);
  return addDoc(ref, project);
};

export const getProjects = (user) => {
  return getDocs(collection(database, `user/${user.uid}/projects`));
};