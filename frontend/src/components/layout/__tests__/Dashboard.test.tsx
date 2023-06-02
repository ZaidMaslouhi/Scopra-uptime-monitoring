/**
 * @vitest-environment jsdom
 */
import { vi } from "vitest";
import { test, describe, expect } from "vitest";
import React from "react";
import {
  getStateWithProjects,
  renderWithContext,
} from "../../../utils/test-utils";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { useNavigate } from "react-router-dom";
import * as projectServiceMock from "../../../services/project.service";
import { ErrorNotification } from "../../ui/toasts/toasts";
import { Project } from "../../../interfaces/project.interface";

vi.mock("../../ui/toasts/toasts");
vi.mock("../../../services/project.service");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  NavLink: () => <div />,
}));
const mockedProjectsList: Project[] = [
  {
    id: "1",
    name: "project 1",
    selected: true,
    github: { owner: "foo", repository: "bar" },
  },
  {
    id: "2",
    name: "project 2",
    selected: false,
    github: null,
  },
];

describe("Dashboard Layout", () => {
  test("Renders loading animation when fetching projects", () => {
    const state = getStateWithProjects([], "Pending");

    renderWithContext(
      <Dashboard>
        <div data-testid="test-child"></div>
      </Dashboard>,
      state
    );

    waitFor(async () => {
      await expect(screen.queryByTestId("test-child")).not.toBeInTheDocument();
      await expect(screen.getByRole("graphics-document")).toBeInTheDocument();
    });
  });

  describe("Succeeded fetching projects", () => {
    test("Renders child components after fetching projects", () => {
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;
      const state = getStateWithProjects([...mockedProjectsList]);

      renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>,
        state
      );

      waitFor(() => {
        expect(mockedGetProjects).toBeCalled();
        expect(screen.queryByRole("graphics-document")).not.toBeInTheDocument();
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
      });
    });

    test("update store w/ Succeeded status and fetched projects", () => {
      const state = getStateWithProjects([...mockedProjectsList]);
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;

      const { store } = renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>,
        state
      );

      waitFor(() => {
        expect(mockedGetProjects).toBeCalled();
        expect(store.getState().projects.status).toEqual("Succeeded");
        expect(store.getState().projects.projects).toHaveLength(
          mockedProjectsList.length
        );
      });
    });
  });

  describe("Failed fetching projects", () => {
    test("Redirect to the welcome page after reject fetching projects", () => {
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;
      mockedGetProjects.mockRejectedValueOnce(
        new Error("Unable to get projects!")
      );

      renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>
      );

      waitFor(() => {
        expect(useNavigate).toBeCalledWith("/welcome");
        expect(screen.queryByRole("graphics-document")).not.toBeInTheDocument();
        expect(screen.getByTestId("test-child")).not.toBeInTheDocument();
      });
    });

    test("Redirect to the welcome page if no projects found", () => {
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;
      mockedGetProjects.mockResolvedValue({});

      renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>
      );

      waitFor(() => {
        expect(useNavigate).toBeCalledWith("/welcome");
        expect(screen.queryByRole("graphics-document")).not.toBeInTheDocument();
        expect(screen.getByTestId("test-child")).not.toBeInTheDocument();
      });
    });

    test("display error message after reject fetching projects", () => {
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;
      mockedGetProjects.mockRejectedValueOnce(
        new Error("Unable to get projects!")
      );

      renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>
      );

      waitFor(() => {
        expect(mockedGetProjects).toBeCalled();
        expect(ErrorNotification).toHaveBeenCalledWith(
          /Unable to get projects!/i
        );
      });
    });

    test("update store w/ Failed status error message after reject fetching projects", () => {
      const mockedGetProjects = projectServiceMock.getProjects as vi.Mock;
      mockedGetProjects.mockRejectedValueOnce(
        new Error("Unable to get projects!")
      );

      const { store } = renderWithContext(
        <Dashboard>
          <div data-testid="test-child"></div>
        </Dashboard>
      );

      waitFor(() => {
        expect(mockedGetProjects).toBeCalled();
        expect(store.getState().projects.status).toEqual("Failed");
        expect(store.getState().projects.error).toEqual(
          "Unable to get projects!"
        );
      });
    });
  });
});
