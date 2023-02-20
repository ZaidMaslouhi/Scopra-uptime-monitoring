import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../firebase.config";

export const addMonitor = (user, project, monitor) => {
  const ref = collection(
    database,
    `user/${user.uid}/projects/${project.id}/monitors`
  );
  return addDoc(ref, monitor);
};

export const getMonitors = async (user, project) => {
  return await getDocs(
    collection(database, `user/${user.uid}/projects/${project.id}/monitors`)
  );
};
