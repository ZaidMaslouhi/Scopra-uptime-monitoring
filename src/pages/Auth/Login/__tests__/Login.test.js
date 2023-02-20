import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import {
  signInEmailPassword,
  signOnGoogle,
} from "../../../../services/auth.service";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: "Link",
}));

jest.mock("../../../../services/auth.service", () => ({
  signOnGoogle: jest.fn(),
  signInEmailPassword: jest.fn(),
}));

describe("Login", () => {
  it("renders correctly", () => {
    useNavigate.mockImplementation(() => jest.fn());
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  describe("Handles sign on with Google", () => {
    it("handles sign on with Google correctly", () => {
      useNavigate.mockImplementation(() => jest.fn());
      render(<Login />);
      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);
      expect(signOnGoogle).toHaveBeenCalled();
    });

    it("redirect to monitors page  after sign on with Google correctly", () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      render(<Login />);
      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);
      waitFor(() => expect(navigate).toBeCalledWith("/monitors"));
    });

    it("display error message after the login with Google failed", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      signOnGoogle.mockRejectedValue({
        message: "message error",
      });
      const { container } = render(<Login />);
      const signOnGoogleButton = screen.getByText("Or sign on with Google");
      fireEvent.click(signOnGoogleButton);
      waitFor(() =>
        expect(
          container.getElementsByClassName("text-red-700")
        ).toBeInTheDocument()
      );
    });
  });

  describe("Handles login with email and password", () => {
    it("handles login with email and password correctly", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      signInEmailPassword.mockResolvedValue();
      render(<Login />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);
      waitFor(() =>
        expect(() => signInEmailPassword).toHaveBeenCalledWith({
          email: "test@test.com",
          password: "Password123",
        })
      );
    });

    it("redirect to the dashboard after login with email and password correctly", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      signInEmailPassword.mockResolvedValue();
      render(<Login />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);
      waitFor(() => expect(navigate).toBeCalledWith("/monitors"));
    });

    it("display error message after login with email and password failed", async () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      signInEmailPassword.mockRejectedValue({
        message: "message error",
      });
      const { container } = render(<Login />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

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
