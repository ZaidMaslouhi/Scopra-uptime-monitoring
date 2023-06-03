import axios from "axios";
import { AxiosError } from "./../../node_modules/axios/index.d";
import { UserInfo } from "../interfaces/auth.interface";
import { Project } from "../interfaces/project.interface";
import { ServerError } from "../utils/interfaces/Error.interface";

export const addNewProject = async (
  user: UserInfo,
  project: Project,
  isDefault: boolean
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_PROJECT}/`,
      {
        user: { id: user.id },
        project: {
          name: project.name,
          isDefault,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return {
        project: response.data["project"],
        message: response.data["message"],
      };
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

export const getProjects = async (user: UserInfo) => {
  try {
    const response = await axios.get(
      `${process.env.VITE_BACKEND_API_PROJECT}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return {
        projects: response.data["projects"],
        defaultProject: response.data["defaultProject"],
      };
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

export const updateProject = async (user: UserInfo, project: Project) => {
  try {
    const response = await axios.put(
      `${process.env.VITE_BACKEND_API_PROJECT}/`,
      { project: { id: project.id, name: project.name } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        project: response.data["project"],
        message: response.data["message"],
      };
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

export const removeProject = async (user: UserInfo, project: Project) => {
  try {
    const response = await axios.delete(
      `${process.env.VITE_BACKEND_API_PROJECT}/${project.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        project: response.data["project"],
      };
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
