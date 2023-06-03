import axios from "axios";
import { Monitor } from "../interfaces/monitor.interface";
import { AxiosError } from "./../../node_modules/axios/index.d";

type ServerError = { message: string };

export const addMonitor = async (
  user: string,
  projectId: string,
  monitor: Monitor
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_MONITOR}/`,
      {
        project: { id: projectId },
        monitor: { name: monitor.name, uri: monitor.endpoint },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        monitor: response.data["monitor"],
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { message: "Somthing went wrong!" };
  }
};

export const getMonitors = async (user: string, project: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_MONITOR}/${project}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { monitors: response.data["monitors"] };
    }
    throw new Error("Somthing went wrong!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { message: "Somthing went wrong!" };
  }
};
