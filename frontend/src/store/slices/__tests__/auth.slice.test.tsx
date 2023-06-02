import { Mock, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { UserInfo } from "../../../interfaces/auth.interface";
import { RootState } from "../../store";
import { getStoreWithState } from "../../../utils/test-utils";
import * as authServiceMock from "../../../services/auth.service";
import authReducer, {
  authLogin,
  authRegister,
  authOauth,
  updateUserInfo,
  verifyUser,
  saveUser,
  signOut,
} from "../auth.slice";

vi.mock("../../../services/auth.service");
const mockStore = configureStore([thunk])();
const mockUser = {
  uid: "foo",
  email: "jhon@gmail.com",
  username: "",
  photoURL: "",
  phoneNumber: "",
};

describe("Auth Slice", () => {
  afterEach(() => {
    mockStore.clearActions();
  });

  test("should return the initial state when dispach an empty action", () => {
    const initialState = getStateWithAuth(null);
    const action = { type: "" };
    const result = authReducer(initialState.auth, action);

    expect(result).toStrictEqual({
      user: null,
      status: "Idle",
      error: null,
    });
  });

  describe("Auth action creators", () => {
    test("should change status state to pending", () => {
      const state = getStateWithAuth(null);
      const store = getStoreWithState(state);
      store.dispatch(verifyUser());

      expect(store.getState().auth).toEqual({
        status: "Pending",
        user: null,
        error: null,
      });
    });

    test("should update state with the user and Succeeded status", () => {
      const state = getStateWithAuth(null);
      const store = getStoreWithState(state);
      store.dispatch(saveUser(mockUser));

      expect(store.getState().auth).toEqual({
        user: { ...mockUser },
        status: "Succeeded",
        error: null,
      });
    });

    test("should return the initial state after sign out", () => {
      const state = getStateWithAuth(mockUser);
      const store = getStoreWithState(state);
      store.dispatch(signOut());

      expect(store.getState().auth).toEqual({
        user: null,
        status: "Idle",
        error: null,
      });
    });
  });

  describe("Thunks with mocked redux store", () => {
    describe("authLogin", () => {
      test("should return logged user", async () => {
        const mockedLoginUser =
          authServiceMock.signInEmailPassword as Mock;
        mockedLoginUser.mockResolvedValueOnce({ user: mockUser });

        await mockStore.dispatch(authLogin(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authLogin/pending");
        expect(actions[1].type).toEqual("auth/authLogin/fulfilled");
        expect(actions[1].payload).toEqual({ ...mockUser });
      });

      test("should return null if no user found", async () => {
        const mockedLoginUser =
          authServiceMock.signInEmailPassword as Mock;
        mockedLoginUser.mockResolvedValueOnce({ user: null });

        await mockStore.dispatch(authLogin(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authLogin/pending");
        expect(actions[1].type).toEqual("auth/authLogin/fulfilled");
        expect(actions[1].payload).toBeNull();
      });

      test("should return error message", async () => {
        const mockedLoginUser =
          authServiceMock.signInEmailPassword as Mock;
        mockedLoginUser.mockRejectedValueOnce(new Error("Unable to login!"));

        await mockStore.dispatch(authLogin(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authLogin/pending");
        expect(actions[1].type).toEqual("auth/authLogin/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual("Unable to login!");
      });
    });

    describe("authRegister", () => {
      test("should return registred user", async () => {
        const mockedRegistredUser =
          authServiceMock.registerWithEmailAndPassword as Mock;
        mockedRegistredUser.mockResolvedValueOnce({ user: mockUser });

        await mockStore.dispatch(authRegister(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authRegister/pending");
        expect(actions[1].type).toEqual("auth/authRegister/fulfilled");
        expect(actions[1].payload).toEqual({ ...mockUser });
      });

      test("should fail to register and return null", async () => {
        const mockedRegistredUser =
          authServiceMock.registerWithEmailAndPassword as Mock;
        mockedRegistredUser.mockResolvedValueOnce({ user: null });

        await mockStore.dispatch(authRegister(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authRegister/pending");
        expect(actions[1].type).toEqual("auth/authRegister/fulfilled");
        expect(actions[1].payload).toBeNull();
      });

      test("should return error message", async () => {
        const mockedLoginUser =
          authServiceMock.registerWithEmailAndPassword as Mock;
        mockedLoginUser.mockRejectedValueOnce(
          new Error("Unable to register new user!")
        );

        await mockStore.dispatch(authRegister(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authRegister/pending");
        expect(actions[1].type).toEqual("auth/authRegister/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual(
          "Unable to register new user!"
        );
      });
    });

    describe("authOauth", () => {
      test("should return registred user", async () => {
        const mockedOauth = authServiceMock.signOnGoogle as Mock;
        mockedOauth.mockResolvedValueOnce({ user: mockUser });

        await mockStore.dispatch(authOauth() as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authOauth/pending");
        expect(actions[1].type).toEqual("auth/authOauth/fulfilled");
        expect(actions[1].payload).toEqual({ ...mockUser });
      });

      test("should fail to register and return null", async () => {
        const mockedOauth = authServiceMock.signOnGoogle as Mock;
        mockedOauth.mockResolvedValueOnce({ user: null });

        await mockStore.dispatch(authOauth() as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/authOauth/pending");
        expect(actions[1].type).toEqual("auth/authOauth/fulfilled");
        expect(actions[1].payload).toBeNull();
      });

      test("should return error message", async () => {
        const mockedLoginUser = authServiceMock.signOnGoogle as Mock;
        mockedLoginUser.mockRejectedValueOnce(new Error("Unable to signin!"));

        await mockStore.dispatch(authOauth() as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toBeUndefined();
        expect(actions[0].type).toEqual("auth/authOauth/pending");
        expect(actions[1].type).toEqual("auth/authOauth/rejected");
        expect(actions[1].error.message).toEqual("Unable to signin!");
      });
    });

    describe("updateUserInfo", () => {
      test("should return updated user", async () => {
        const mockedUpdatedUser = authServiceMock.updateUser as Mock;
        mockedUpdatedUser.mockResolvedValueOnce({ user: mockUser });

        await mockStore.dispatch(updateUserInfo(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/updateUserInfo/pending");
        expect(actions[1].type).toEqual("auth/updateUserInfo/fulfilled");
        expect(actions[1].payload).toEqual({ ...mockUser });
      });

      test("should return error message", async () => {
        const mockedUpdatedUser = authServiceMock.updateUser as Mock;
        mockedUpdatedUser.mockRejectedValueOnce(
          new Error("Unable to update user information!")
        );

        await mockStore.dispatch(updateUserInfo(mockUser) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("auth/updateUserInfo/pending");
        expect(actions[1].type).toEqual("auth/updateUserInfo/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual(
          "Unable to update user information!"
        );
      });
    });
  });

  describe("Thunks with associated reducer methods / with full redux store", () => {
    describe("authLogin", () => {
      test("should return the logged user with success status", async () => {
        const mockedLoginUser =
          authServiceMock.signInEmailPassword as Mock;
        mockedLoginUser.mockResolvedValueOnce({ user: mockUser });

        const store = getStoreWithState();
        await store.dispatch(authLogin(mockUser));

        expect(store.getState().auth).toEqual({
          user: { ...mockUser },
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedLoginUser =
          authServiceMock.signInEmailPassword as Mock;
        mockedLoginUser.mockRejectedValueOnce(new Error("Unable to login!"));

        const store = getStoreWithState();
        await store.dispatch(authLogin(mockUser));

        expect(store.getState().auth).toEqual({
          user: null,
          status: "Failed",
          error: "Unable to login!",
        });
      });
    });

    describe("authRegister", () => {
      test("should return the new user with success status", async () => {
        const mockedRegistredUser =
          authServiceMock.registerWithEmailAndPassword as Mock;
        mockedRegistredUser.mockResolvedValueOnce({ user: mockUser });

        const store = getStoreWithState();
        await store.dispatch(authRegister(mockUser));

        expect(store.getState().auth).toEqual({
          user: { ...mockUser },
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedRegistredUser =
          authServiceMock.registerWithEmailAndPassword as Mock;
        mockedRegistredUser.mockRejectedValueOnce(
          new Error("Unable to register new user!")
        );

        const store = getStoreWithState();
        await store.dispatch(authRegister(mockUser));

        expect(store.getState().auth).toEqual({
          user: null,
          status: "Failed",
          error: "Unable to register new user!",
        });
      });
    });

    describe("authOauth", () => {
      test("should return the new user with success status", async () => {
        const mockedOauth = authServiceMock.signOnGoogle as Mock;
        mockedOauth.mockResolvedValueOnce({ user: mockUser });

        const store = getStoreWithState();
        await store.dispatch(authOauth());

        expect(store.getState().auth).toEqual({
          user: { ...mockUser },
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedOauth = authServiceMock.signOnGoogle as Mock;
        mockedOauth.mockRejectedValueOnce(new Error("Unable to signin!"));

        const store = getStoreWithState();
        await store.dispatch(authOauth());

        expect(store.getState().auth).toEqual({
          user: null,
          status: "Failed",
          error: "Unable to signin!",
        });
      });
    });

    describe("updateUserInfo", () => {
      test("should return updated user with success status", async () => {
        const mockedUpdatedUser = authServiceMock.updateUser as Mock;
        mockedUpdatedUser.mockResolvedValueOnce({ user: mockUser });

        const store = getStoreWithState();
        await store.dispatch(updateUserInfo(mockUser));

        expect(store.getState().auth).toEqual({
          user: { ...mockUser },
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedUpdatedUser = authServiceMock.updateUser as Mock;
        mockedUpdatedUser.mockRejectedValueOnce(
          new Error("Unable to update user information!")
        );

        const store = getStoreWithState();
        await store.dispatch(updateUserInfo(mockUser));

        expect(store.getState().auth).toEqual({
          user: null,
          status: "Failed",
          error: "Unable to update user information!",
        });
      });
    });
  });
});

function getStateWithAuth(user: UserInfo | null): RootState {
  const state: RootState = {
    auth: { user, status: "Idle", error: null },
    projects: { projects: [], status: "Idle", error: null },
    githubRepo: {
      content: {
        commits: [],
        issues: [],
        pullRequests: [],
      },
      status: "Idle",
      error: null,
    },
    monitors: {
      monitors: [],
      status: "Idle",
      error: null,
    },
  };
  return state;
}
