import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OnBoarding from "../OnBoarding";
import { newProject } from "../../../services/project.service";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../components/toasts/toasts";
import { useNavigate } from "react-router-dom";

jest.mock("../../../services/project.service", () => ({
  newProject: jest.fn(),
}));

jest.mock("../../../components/toasts/toasts", () => ({
  successNotification: jest.fn(),
  ErrorNotification: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("OnBoarding component", () => {
  test("renders project name input and create button", () => {
    render(<OnBoarding />);
    expect(screen.getByText(/Welcome to Scopra/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Project name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create a new project/i })
    ).toBeInTheDocument();
  });

  test("creates new project on form submission", async () => {
    newProject.mockResolvedValueOnce();
    render(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    fireEvent.change(projectNameInput, {
      target: { value: "Test project Name" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(newProject).toHaveBeenCalledWith(expect.any(Object), {
        name: "Test project Name",
        timestamp: expect.any(Number),
      });
    });
  });

  test("shows success notification on project creation", async () => {
    newProject.mockResolvedValueOnce();
    render(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    fireEvent.change(projectNameInput, {
      target: { value: "Test project Name" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(SuccessNotification).toHaveBeenCalledWith("New project created.");
    });
  });

  test("shows error notification on project creation failure", async () => {
    newProject.mockRejectedValueOnce(new Error("Unable to create project"));
    render(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    fireEvent.change(projectNameInput, {
      target: { value: "Test project Name" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(ErrorNotification).toHaveBeenCalledWith(
        "Error: Unable to create a new project."
      );
    });
  });

  test("Navigates to monitor page on form submission", async () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    newProject.mockResolvedValueOnce();
    render(<OnBoarding />);

    const projectNameInput = screen.getByPlaceholderText(/Project name/i);
    const createButton = screen.getByRole("button", {
      name: /Create a new project/i,
    });

    fireEvent.change(projectNameInput, {
      target: { value: "Test project Name" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(navigate).toBeCalledWith("/monitors");
    });
  });
});
