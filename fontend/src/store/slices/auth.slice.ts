import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo, toUserInfo } from "../../interfaces/auth.interface";
import {
  registerWithEmailAndPassword,
  signOnGoogle,
  updateUser,
  userSignOut,
  signInEmailPassword,
  storeUserLocally,
} from "./../../services/auth.service";

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (user: UserInfo) => {
    const loggedUser = toUserInfo((await signInEmailPassword(user)).user);
    if (loggedUser) {
      // storeUserLocally(loggedUser);
      return loggedUser;
    }
    return null;
  }
);

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (user: UserInfo) => {
    const newUser = toUserInfo((await registerWithEmailAndPassword(user)).user);
    if (newUser) {
      storeUserLocally(newUser);
      return newUser;
    }
    return null;
  }
);

export const authOauth = createAsyncThunk("auth/authOauth", async () => {
  const newUser = toUserInfo((await signOnGoogle()).user);
  if (newUser) {
    storeUserLocally(newUser);
    return newUser;
  }
  return null;
});

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (user: UserInfo) => {
    await updateUser(user);
    return { ...user };
  }
);

interface AuthState {
  user: UserInfo | null;
  status: "Idle" | "Pending" | "Succeeded" | "Failed";
  error: string | null;
}

const initialState: AuthState = { user: null, status: "Idle", error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyUser: (state: AuthState) => {
      return { ...state, status: "Pending" } as AuthState;
    },
    saveUser: (state: AuthState, action) => {
      const saveUser = {
        user: action.payload,
        status: "Succeeded",
        error: null,
      } as AuthState;
      return { ...saveUser };
    },
    signOut: () => {
      userSignOut();
      // removeUserLocally();
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state: AuthState) => {
        return { ...state, status: "Pending" } as AuthState;
      })
      .addCase(authLogin.fulfilled, (state: AuthState, action) => {
        return { user: action.payload, status: "Succeeded", error: null };
      })
      .addCase(authLogin.rejected, () => {
        return { user: null, status: "Failed", error: "Unable to login!" };
      });
    builder
      .addCase(authRegister.pending, (state: AuthState) => {
        return { ...state, status: "Pending" } as AuthState;
      })
      .addCase(authRegister.fulfilled, (state: AuthState, action) => {
        return { user: action.payload, status: "Succeeded", error: null };
      })
      .addCase(authRegister.rejected, () => {
        return {
          user: null,
          status: "Failed",
          error: "Unable to register new user!",
        };
      });
    builder
      .addCase(authOauth.pending, (state: AuthState) => {
        return { ...state, status: "Pending" } as AuthState;
      })
      .addCase(authOauth.fulfilled, (state: AuthState, action) => {
        return { user: action.payload, status: "Succeeded", error: null };
      })
      .addCase(authOauth.rejected, () => {
        return { user: null, status: "Failed", error: "Unable to signin!" };
      });
    builder
      .addCase(updateUserInfo.pending, (state: AuthState) => {
        return { ...state, status: "Pending" } as AuthState;
      })
      .addCase(updateUserInfo.fulfilled, (state: AuthState, action) => {
        return { user: action.payload, status: "Succeeded", error: null };
      })
      .addCase(updateUserInfo.rejected, () => {
        return {
          user: null,
          status: "Failed",
          error: "Unable to update user information!",
        };
      });
  },
});

export const selectUserState = (state: RootState) => state.auth;

export const { verifyUser, saveUser, signOut } = authSlice.actions;

export default authSlice.reducer;
