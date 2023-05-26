import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../config/firebase.config";
import { Monitor } from "../interfaces/monitor.interface";

export const addMonitor = (user: string, project: string, monitor: Monitor) => {
  const ref = collection(database, `user/${user}/projects/${project}/monitors`);
  return addDoc(ref, monitor);
};

export const getMonitors = async (user: string, project: string) => {
  return await getDocs(
    collection(database, `user/${user}/projects/${project}/monitors`)
  );
};
