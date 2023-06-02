import { Mock, vi } from "vitest";
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import Monitors from "../Monitors";
import * as monitorsServiceMock from "../../../services/monitor.service";
import { ErrorNotification } from "../../../components/ui/toasts/toasts";
import { getAllMonitors } from "../../../store/slices/monitors.slice";
import {
  getStateWithMonitors,
  getStateWithProjects,
  getStoreWithState,
  renderWithContext,
} from "../../../utils/test-utils";
import { Monitor } from "../../../interfaces/monitor.interface";

vi.mock("../../../services/monitor.service");
vi.mock("../../../components/ui/toasts/toasts");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

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

describe("Monitors component", () => {
  test("Renders loading animation in monitors pending status", () => {
    const state = getStateWithMonitors([], "Pending");

    renderWithContext(<Monitors />, state);

    waitFor(async () => {
      await expect(screen.getByRole("graphics-document")).toBeInTheDocument();
    });
  });

  describe("Succeeded fetching monitors", () => {
    test("dispaly monitor cards", async () => {
      const state = getStateWithMonitors([...mockMonitorsList], "Succeeded");
      const mockedStore = getStoreWithState(state);

      renderWithContext(<Monitors />, mockedStore.getState());

      waitFor(async () => {
        await expect(screen.getByRole("button")).toBeInTheDocument();
        await expect(screen.getByText("New Monitor")).toBeInTheDocument();
        mockMonitorsList.forEach((monitor) => {
          expect(screen.getByText(monitor.name)).toBeInTheDocument();
        });
      });
    });

    test("update store with monitors list and Succeeded status", async () => {
      const mockedGetMonitors = monitorsServiceMock.getMonitors as Mock;
      mockedGetMonitors.mockResolvedValueOnce({ docs: [...mockMonitorData] });

      const state = getStateWithProjects([], "Succeeded");
      const mockedStore = getStoreWithState(state);
      await mockedStore.dispatch(
        getAllMonitors({ userId: mockUser.uid, projectId: "bar" })
      );

      const { store } = renderWithContext(<Monitors />, mockedStore.getState());

      waitFor(async () => {
        await expect(mockedGetMonitors).toHaveBeenCalled();
        await expect(store.getState().monitors.status).toEqual("Succeeded");
        await expect(store.getState().monitors.monitors.length).toEqual(
          mockMonitorData.length
        );
      });
    });

    test("dispaly no monitors message w/ add monitor button", () => {
      const mockedGetMonitors = monitorsServiceMock.getMonitors as Mock;
      mockedGetMonitors.mockResolvedValue({});

      renderWithContext(<Monitors />);

      waitFor(async () => {
        expect(mockedGetMonitors).toBeCalled();
        expect(screen.getByText("You have no monitor")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("Create a new monitor")).toBeInTheDocument();
      });
    });
  });

  describe("Failed fetching monitors", () => {
    test("dispaly error message after failed fetching monitors", () => {
      const mockedGetMonitors = monitorsServiceMock.getMonitors as Mock;
      mockedGetMonitors.mockRejectedValueOnce(
        new Error("Unable to get monitors!")
      );

      renderWithContext(<Monitors />);

      waitFor(async () => {
        await expect(
          screen.getByRole("graphics-document")
        ).not.toBeInTheDocument();
        await expect(
          screen.getByText("Unable to get monitors!")
        ).toBeInTheDocument();
      });
    });

    test("dispaly toast/notification error message", () => {
      const mockedGetMonitors = monitorsServiceMock.getMonitors as Mock;
      mockedGetMonitors.mockRejectedValueOnce(
        new Error("Unable to get monitors!")
      );

      renderWithContext(<Monitors />);

      waitFor(async () => {
        expect(mockedGetMonitors).toBeCalled();
        expect(ErrorNotification).toHaveBeenCalledWith(
          "Unable to get monitors!"
        );
      });
    });
  });
});
