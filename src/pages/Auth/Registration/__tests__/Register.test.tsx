/* eslint-disable no-unused-vars */
import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import Register from "../Register";
import { useNavigate } from "react-router-dom";
import { renderWithContext } from "../../../../utils/test-utils";
import * as mockAuthService from "../../../../services/auth.service";

jest.mock("../../../../services/auth.service");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(),
}));

describe("Registration component", () => {
  describe("Handles sign on with Google", () => {
    test("handles sign on with Google correctly", () => {
      const mockSignGoogle = mockAuthService.signOnGoogle as jest.Mock;

      renderWithContext(<Register />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      });
      waitFor(() => {
        expect(mockSignGoogle).toHaveBeenCalled();
      });
    });

    test("redirect to the welcome page after sign on with Google correctly", () => {
      const mockSignGoogle = mockAuthService.signOnGoogle as jest.Mock;
      mockSignGoogle.mockResolvedValueOnce({});

      renderWithContext(<Register />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      });

      waitFor(() => {
        expect(useNavigate).toBeCalledWith("/monitors");
      });
    });

    test("display error message after registration with Google failed", () => {
      const mockSignGoogle = mockAuthService.signOnGoogle as jest.Mock;
      mockSignGoogle.mockRejectedValue(new Error("Unable to signin!"));

      renderWithContext(<Register />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      });

      waitFor(() => {
        expect(screen.getByText("Unable to signin!")).toHaveClass(
          "text-red-700"
        );
      });
    });
  });

  describe("Handles sign up with email and password", () => {
    test("handles registration with email and password correctly", () => {
      const mockRegisterService =
        mockAuthService.registerWithEmailAndPassword as jest.Mock;
      mockRegisterService.mockResolvedValueOnce({});

      renderWithContext(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      userEvent.type(emailInput, "jhon@doe.com");
      userEvent.type(passwordInput, "Foo-Bar-Baz");
      userEvent.click(submitButton);

      waitFor(async () => {
        await expect(() => mockRegisterService).toHaveBeenCalledWith({
          email: "jhon@doe.com",
          password: "Foo-Bar-Baz",
        });
      });
    });

    test("redirect to the welcome after registration with email and password correctly", () => {
      const mockRegisterService =
        mockAuthService.registerWithEmailAndPassword as jest.Mock;
      mockRegisterService.mockResolvedValueOnce({});

      renderWithContext(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      userEvent.type(emailInput, "jhon@doe.com");
      userEvent.type(passwordInput, "Foo-Bar-Baz");
      userEvent.click(submitButton);

      waitFor(async () => {
        await expect(useNavigate).toBeCalledWith("/welcome");
      });
    });

    test("display error message after registration with email and password failed", () => {
      const mockRegisterService =
        mockAuthService.registerWithEmailAndPassword as jest.Mock;
      mockRegisterService.mockRejectedValue(
        new Error("Unable to register new user!")
      );

      renderWithContext(<Register />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Create an account");

      userEvent.type(emailInput, "jhon@doe.com");
      userEvent.type(passwordInput, "Foo-Bar-Baz");
      userEvent.click(submitButton);

      waitFor(async () => {
        await expect(
          screen.getByText("Unable to register new user!")
        ).toHaveClass("text-red-700");
      });
    });
  });
});
