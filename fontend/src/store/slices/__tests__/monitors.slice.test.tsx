import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as monitorServiceMock from "../../../services/monitor.service";
import { Monitor } from "../../../interfaces/monitor.interface";
import {
  getStateWithMonitors,
  getStoreWithState,
} from "../../../utils/test-utils";
import monitorsReducer, {
  addNewMonitor,
  getAllMonitors,
} from "../monitors.slice";

jest.mock("../../../services/monitor.service");
const mockStore = configureStore([thunk])();
const mockMonitorData = [
  { id: "1", data: () => ({ name: "Monitor 1", endpoint: "/1" }) },
  { id: "2", data: () => ({ name: "Monitor 2", endpoint: "/2" }) },
  { id: "3", data: () => ({ name: "Monitor 3", endpoint: "/3" }) },
];
const mockMonitorsList: Monitor[] = [
  {
    id: "1",
    name: "Monitor 1",
    endpoint: "/1",
  },
  {
    id: "2",
    name: "Monitor 2",
    endpoint: "/2",
  },
  {
    id: "3",
    name: "Monitor 3",
    endpoint: "/3",
  },
];
const mockUser = {
  uid: "foo",
  email: "jhon@gmail.com",
  username: "",
  photoURL: "",
  phoneNumber: "",
};

describe("Monitors Slice", () => {
  afterEach(() => {
    mockStore.clearActions();
  });

  test("should return the initial state when dispach an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = monitorsReducer(initialState, action);
    expect(result).toStrictEqual({
      monitors: [],
      status: "Idle",
      error: null,
    });
  });

  describe("Thunks with mocked dipatch and redux store", () => {
    describe("getAllMonitors", () => {
      test("should return list of monitors after getAllMonitors() have been resolved /mocked with dispatch", async () => {
        const dispatch = jest.fn();
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockResolvedValueOnce({ docs: mockMonitorData });

        const thunk = getAllMonitors({
          userId: mockUser.uid,
          projectId: "456",
        });
        await thunk(dispatch, () => ({}), undefined);
        const { calls } = dispatch.mock;

        expect(calls).toHaveLength(2);
        expect(calls[0][0].type).toEqual("monitors/getAllMonitors/pending");
        expect(calls[1][0].type).toEqual("monitors/getAllMonitors/fulfilled");
        expect(calls[1][0].payload).toHaveLength(3);
        mockMonitorData.forEach((monitor, index) => {
          expect(calls[1][0].payload[index]).toStrictEqual({
            ...monitor.data(),
            id: monitor.id,
          });
        });
      });

      test("should return empty list if no monitors exist after getAllMonitors() have been resolved /mocked with redux store", async () => {
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockResolvedValueOnce({ docs: [] });

        await mockStore.dispatch(
          getAllMonitors({ userId: mockUser.uid, projectId: "456" }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toHaveLength(0);
        expect(actions[0].type).toEqual("monitors/getAllMonitors/pending");
        expect(actions[1].type).toEqual("monitors/getAllMonitors/fulfilled");
      });

      test("should return error message after getAllMonitors() have been rejected /mocked with store", async () => {
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockRejectedValueOnce(
          new Error("Unable to get monitors!")
        );

        await mockStore.dispatch(
          getAllMonitors({ userId: "123", projectId: "456" }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toBeUndefined();
        expect(actions[0].type).toEqual("monitors/getAllMonitors/pending");
        expect(actions[1].type).toEqual("monitors/getAllMonitors/rejected");
        expect(actions[1].error.message).toEqual("Unable to get monitors!");
      });
    });

    describe("addNewMonitor", () => {
      test("should return new monitor object after addNewMonitor() have been resolved", async () => {
        const mockedAddMonitor = monitorServiceMock.addMonitor as jest.Mock;
        mockedAddMonitor.mockResolvedValueOnce({ id: "foo" });

        await mockStore.dispatch(
          addNewMonitor({
            userId: mockUser.uid,
            projectId: "222",
            monitor: { ...mockMonitorsList[0] },
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("monitors/addNewMonitor/pending");
        expect(actions[1].type).toEqual("monitors/addNewMonitor/fulfilled");
        expect(actions[1].payload).toEqual({
          ...mockMonitorsList[0],
          id: "foo",
        });
      });

      test("should return error message after addNewMonitor() have been rejected", async () => {
        const mockedAddMonitor = monitorServiceMock.addMonitor as jest.Mock;
        mockedAddMonitor.mockRejectedValueOnce(
          new Error("Unable to add new monitor!")
        );

        await mockStore.dispatch(
          addNewMonitor({
            userId: "123",
            projectId: "456",
            monitor: { ...mockMonitorsList[0] },
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("monitors/addNewMonitor/pending");
        expect(actions[1].type).toEqual("monitors/addNewMonitor/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual("Unable to add new monitor!");
      });
    });
  });

  describe("Thunks with associated reducer methods / with full redux store", () => {
    describe("getAllMonitors", () => {
      test("should return list of monitors with success status", async () => {
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockResolvedValueOnce({ docs: mockMonitorData });
        const store = getStoreWithState();

        await store.dispatch(
          getAllMonitors({ userId: mockUser.uid, projectId: "456" })
        );

        expect(store.getState().monitors).toEqual({
          monitors: [...mockMonitorsList],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockRejectedValueOnce(
          new Error("Unable to get monitors!")
        );

        const store = getStoreWithState();
        await store.dispatch(
          getAllMonitors({ userId: mockUser.uid, projectId: "456" })
        );

        expect(store.getState().monitors).toEqual({
          monitors: [],
          status: "Failed",
          error: "Unable to get monitors!",
        });
      });
    });

    describe("addNewMonitor", () => {
      test("should return list of monitors with success status", async () => {
        const mockedAddMonitor = monitorServiceMock.addMonitor as jest.Mock;
        mockedAddMonitor.mockResolvedValueOnce({ id: "4" });
        const state = getStateWithMonitors([...mockMonitorsList]);
        const store = getStoreWithState(state);

        expect(store.getState().monitors).toEqual({
          monitors: [...mockMonitorsList],
          status: "Idle",
          error: null,
        });

        const mockNewMonitor: Monitor = {
          name: "Monitor 4",
          endpoint: "/4",
        };
        await store.dispatch(
          addNewMonitor({
            userId: mockUser.uid,
            projectId: "222",
            monitor: mockNewMonitor,
          })
        );

        expect(store.getState().monitors).toEqual({
          monitors: [
            ...mockMonitorsList,
            { name: "Monitor 4", endpoint: "/4", id: "4" },
          ],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedGetMonitors = monitorServiceMock.getMonitors as jest.Mock;
        mockedGetMonitors.mockRejectedValueOnce(
          new Error("Unable to get monitors!")
        );
        const store = getStoreWithState();

        await store.dispatch(
          getAllMonitors({ userId: mockUser.uid, projectId: "456" })
        );

        expect(store.getState().monitors).toEqual({
          monitors: [],
          status: "Failed",
          error: "Unable to get monitors!",
        });
      });
    });
  });
});
