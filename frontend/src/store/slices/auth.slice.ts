import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo, isUser, toUserInfo } from "../../interfaces/auth.interface";
import {
  registerWithEmailAndPassword,
  signOnGoogle,
  updateUser,
  userSignOut,
  signInEmailPassword,
  storeUserLocally,
  refreshToken,
  getCurrentUser,
  removeUserLocally,
} from "./../../services/auth.service";
import { isServerError } from "../../utils/interfaces/Error.interface";

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (user: UserInfo) => {
    const result = await signInEmailPassword(user);
    if (isUser(result)) {
      storeUserLocally(result);
      return result;
    }
    throw new Error(result.message);
  }
);

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (user: UserInfo) => {
    const result = await registerWithEmailAndPassword(user);

    if (isUser(result)) {
      storeUserLocally(result);
      return result;
    }
    throw new Error(result.message);
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
    const result = await updateUser(user);

    if (isServerError(result)) throw new Error(result.message);
    return result;
  }
);

interface AuthState {
  user: UserInfo | null;
  status: "Idle" | "Pending" | "Succeeded" | "Failed";
  error: string | null;
}

const initialState: AuthState = {
  user: getCurrentUser(),
  status: "Idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loadUser: (state: AuthState, action)=>{
    //   const user = getCurrentUser();
    //   if(user)
    //   return {user: {state},}
    // },
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
      removeUserLocally();
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state: AuthState) => {
        return { ...state, status: "Pending" } as AuthState;
      })
      .addCase(authLogin.fulfilled, (_, action) => {
        return { user: action.payload, status: "Succeeded", error: null };
      })
      .addCase(authLogin.rejected, () => {
        return { user: null, status: "Failed", error: "Error" };
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
        return {
          user: { ...action.payload.user, id: action.payload.user._id },
          status: "Succeeded",
          error: null,
        };
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

export const { saveUser, signOut } = authSlice.actions;

export default authSlice.reducer;
