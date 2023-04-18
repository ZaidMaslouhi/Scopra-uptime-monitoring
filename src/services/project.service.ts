import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../config/firebase.config";
import { UserInfo } from "../interfaces/auth.interface";
import { Project } from "../interfaces/project.interface";

export const addNewProject = (user: UserInfo, project: Project) => {
  const ref = collection(database, `user/${user.uid}/projects`);
  return addDoc(ref, project);
};

export const getProjects = (user: UserInfo) => {
  return getDocs(collection(database, `user/${user.uid}/projects`));
};

export const updateProject = (user: UserInfo, project: Project) => {
  const projectDocument = doc(
    database,
    `user/${user.uid}/projects/${project.id}`
  );
  return updateDoc(projectDocument, { ...project });
};

export const removeProject = (user: UserInfo, project: Project) => {
  return deleteDoc(doc(database, `user/${user.uid}/projects/${project.id}`));
};
