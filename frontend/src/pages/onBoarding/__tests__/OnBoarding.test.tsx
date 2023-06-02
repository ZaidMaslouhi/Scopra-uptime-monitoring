import { Mock, vi, expect } from "vitest";
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import OnBoarding from "../OnBoarding";
import * as mockProjectsService from "../../../services/project.service";
import { useNavigate } from "react-router-dom";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../components/ui/toasts/toasts";
import { renderWithContext } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

vi.mock("../../../services/auth.service");
vi.mock("../../../services/project.service");
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("OnBoarding component", () => {
  test("renders project name input and create button", () => {
    renderWithContext(<OnBoarding />);

    expect(screen.getByText(/Welcome to Scopra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Project name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create a new project/i })
    ).toBeInTheDocument();
  });

  test("creates new project on form submission", () => {
    const mockNewProject = mockProjectsService.addNewProject as Mock;
    mockNewProject.mockResolvedValueOnce({});

    renderWithContext(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    userEvent.type(projectNameInput, "Test project Name");
    userEvent.click(createButton);

    waitFor(() => {
      expect(mockNewProject).toBeCalledWith(expect.any(Object), {
        name: "Test project Name",
        timestamp: expect.any(Number),
      });
    });
  });

  test("shows success notification on project creation", () => {
    const mockNewProject = mockProjectsService.addNewProject as Mock;
    mockNewProject.mockResolvedValueOnce({});

    renderWithContext(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    userEvent.type(projectNameInput, "Test project Name");
    userEvent.click(createButton);

    waitFor(() =>
      expect(SuccessNotification).toBeCalledWith("New project created.")
    );
  });

  test("shows error notification on project creation failure", () => {
    const mockNewProject = mockProjectsService.addNewProject as Mock;
    mockNewProject.mockRejectedValueOnce(new Error("Unable to create project"));

    renderWithContext(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    userEvent.type(projectNameInput, "Test project Name");
    userEvent.click(createButton);

    waitFor(() => {
      expect(ErrorNotification).toBeCalledWith(
        "Error: Unable to create a new project."
      );
    });
  });

  test("Navigates to monitor page on form submission", () => {
    const mockNewProject = mockProjectsService.addNewProject as Mock;
    mockNewProject.mockResolvedValueOnce({});

    renderWithContext(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    userEvent.type(projectNameInput, "Test project Name");
    userEvent.click(createButton);

    waitFor(() => expect(useNavigate).toBeCalledWith("/monitors"));
  });
});
