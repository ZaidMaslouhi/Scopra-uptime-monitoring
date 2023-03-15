import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { getProjects } from "../../services/project.service";
import { ProjectsContext } from "../../context/ProjectsContext";
import DashboardLayout from "../DashboardLayout";
import { ErrorNotification } from "../../components/toasts/toasts";
import { useNavigate } from "react-router-dom";

jest.mock("../../services/project.service");
jest.mock("../../services/auth.service", () => ({
  getCurrentUser: jest.fn(),
}));
jest.mock("../../components/toasts/toasts", () => ({
  ErrorNotification: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  NavLink: jest.fn(),
}));

describe("DashboardLayout", () => {
  const DashboardLayoutComponent = (children, projects) => {
    return render(
      <ProjectsContext.Provider value={{ projects, setProjects: jest.fn() }}>
        <DashboardLayout>{children}</DashboardLayout>
      </ProjectsContext.Provider>
    );
  };

  test("Renders loading animation initially", async () => {
    useNavigate.mockImplementation(() => jest.fn());

    DashboardLayoutComponent(<div data-testid="test-child" />, []);

    await waitFor(() => {
      expect(screen.getByRole("graphics-document")).toBeInTheDocument();
      expect(screen.queryByTestId("test-child")).not.toBeInTheDocument();
    });
  });

  test("Fetches projects and renders child components after loading", () => {
    useNavigate.mockImplementation(() => jest.fn());
    const projects = [
      { id: 1, name: "Project 1", selected: true },
      { id: 2, name: "Project 2", selected: false },
    ];
    getProjects.mockResolvedValue({ docs: projects });

    DashboardLayoutComponent(<div data-testid="test-child" />, []);

    waitFor(() => {
      expect(screen.queryByRole("graphics-document")).not.toBeInTheDocument();
      expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });
  });

  test("Shows error notification if fetchProjects throws an error", () => {
    useNavigate.mockImplementation(() => jest.fn());
    getProjects.mockRejectedValueOnce(new Error("Unable to get projects."));

    DashboardLayoutComponent(<div data-testid="test-child" />, []);

    waitFor(() => {
      expect(ErrorNotification).toHaveBeenCalledWith(
        "Error: Unable to get projects."
      );
    });
  });

  test("Redirect to welcome page if fetchProjects throws an error", () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    getProjects.mockRejectedValueOnce(new Error("Unable to get projects."));

    DashboardLayoutComponent(<div data-testid="test-child" />, []);

    waitFor(() => {
      expect(navigate).toBeCalledWith("/welcome");
    });
  });

  test("Redirect to the welcome page when fetchProjects does not return any projects", () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    getProjects.mockResolvedValue({ docs: [] });

    DashboardLayoutComponent(<div data-testid="test-child" />, []);

    waitFor(() => {
      expect(navigate).toBeCalledWith("/welcome");
    });
  });
});
