/* eslint-disable no-unused-vars */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "../Register";
import { useNavigate } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signOnGoogle,
} from "../../../../services/auth.service";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(),
}));

jest.mock("../../../../services/auth.service", () => ({
  signOnGoogle: jest.fn(),
  registerWithEmailAndPassword: jest.fn(),
}));

describe("Registration", () => {
  it("renders correctly", () => {
    useNavigate.mockImplementation(() => jest.fn());

    const { container } = render(<Register />);

    waitFor(() => expect(container).toBeInTheDocument());
  });

  describe("Handles sign on with Google", () => {
    it("handles sign on with Google correctly", () => {
      useNavigate.mockImplementation(() => jest.fn());

      render(<Register />);

      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);

      waitFor(() => expect(signOnGoogle).toHaveBeenCalled());
    });

    it("redirect to the welcome page after sign on with Google correctly", () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);

      render(<Register />);

      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);

      waitFor(() => expect(navigate).toBeCalledWith("/welcome"));
    });

    it("display error message after registration with Google failed", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      signOnGoogle.mockRejectedValue({
        message: "message error",
      });

      const { container } = render(<Register />);

      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);

      waitFor(() =>
        expect(
          container.getElementsByClassName("text-red-700")
        ).toBeInTheDocument()
      );
    });
  });

  describe("Handles sign up with email and password", () => {
    it("handles registration with email and password correctly", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      registerWithEmailAndPassword.mockResolvedValue();

      render(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);

      waitFor(() =>
        expect(() => registerWithEmailAndPassword).toHaveBeenCalledWith({
          email: "test@test.com",
          password: "Password123",
        })
      );
    });

    it("redirect to the welcome after registration with email and password correctly", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      registerWithEmailAndPassword.mockResolvedValue();

      render(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);

      waitFor(() => expect(navigate).toBeCalledWith("/welcome"));
    });

    it("display error message after registration with email and password failed", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      registerWithEmailAndPassword.mockRejectedValue({
        message: "message error",
      });

      const { container } = render(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);

      waitFor(() =>
        expect(
          container.getElementsByClassName("text-red-700")
        ).toBeInTheDocument()
      );
    });
  });
});
