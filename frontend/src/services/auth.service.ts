import axios from "axios";
import { AxiosError } from "./../../node_modules/axios/index.d";
import { auth } from "../config/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserInfo } from "../interfaces/auth.interface";
import { ServerError } from "../utils/interfaces/Error.interface";

export const storeUserLocally = (user: UserInfo): UserInfo | null => {
  localStorage.setItem("user", JSON.stringify({ ...user, token: "" }));
  const userInfo: string | null = localStorage.getItem("user");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const getCurrentUser = (): UserInfo | null => {
  const currentUser: string | null = localStorage.getItem("user");
  if (currentUser) return JSON.parse(currentUser);
  return null;
};

export const removeUserLocally = (): void => {
  localStorage.removeItem("user");
};

export const userSignOut = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_USER}/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return { message: response.data["message"] };
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

export const registerWithEmailAndPassword = async (
  user: UserInfo
): Promise<UserInfo | ServerError> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_USER}/register`,
      { user: { email: user.email, password: user.password } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return {
        id: response.data["user"]["id"],
        email: response.data["user"]["email"],
        token: response.data["accessToken"],
      } as UserInfo;
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

export const updateUser = async (user: UserInfo) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_API_USER}/user`,
      { user },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return { user: response.data["user"] };
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

export const signInEmailPassword = async (
  user: UserInfo
): Promise<UserInfo | ServerError> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_USER}/login`,
      { user: { email: user.email, password: user.password as string } },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      return {
        id: response.data["user"]["id"],
        email: response.data["user"]["email"],
        username: response.data["user"]["username"],
        token: response.data["user"]["accessToken"],
        defaultProject: response.data["user"]["defaultProject"],
      } as UserInfo;
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

export const refreshToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_USER}/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return {
        id: response.data["user"]["id"],
        email: response.data["user"]["email"],
        token: response.data["accessToken"],
      } as UserInfo;
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

export const signOnGoogle = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};
