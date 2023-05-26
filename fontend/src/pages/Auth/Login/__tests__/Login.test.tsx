import React from "react";
import { screen, waitFor } from "@testing-library/react";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import * as mockAuthService from "../../../../services/auth.service";
import { renderWithContext } from "../../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../services/auth.service");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(),
}));

describe("Login", () => {
  describe("Handles sign on with Google", () => {
    test("handles sign on with Google correctly", () => {
      const mockSignGoogle = mockAuthService.signOnGoogle as jest.Mock;

      renderWithContext(<Login />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      });

      waitFor(() => {
        expect(mockSignGoogle).toHaveBeenCalled();
      });
    });

    test("redirect to monitors page  after sign on with Google correctly", () => {
      renderWithContext(<Login />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      });

      waitFor(() => {
        expect(useNavigate).toBeCalledWith("/monitors");
      });
    });

    test("display error message after the login with Google failed", async () => {
      const mockSignGoogle = mockAuthService.signOnGoogle as jest.Mock;
      mockSignGoogle.mockRejectedValue(new Error("Unable to signin!"));

      renderWithContext(<Login />);

      waitFor(() => {
        const signOnGoogleButton = screen.getByText("Or sign on with Google");
        userEvent.click(signOnGoogleButton);
      })
      ;
      waitFor(() => {
        expect(screen.getByText("Unable to signin!")).toHaveClass(
          "text-red-700"
        );
      });
    });
  });

  describe("Handles login with email and password", () => {
    test("handles login with email and password correctly", async () => {
      const mockLoginService = mockAuthService.signInEmailPassword as jest.Mock;
      mockLoginService.mockResolvedValue({});

      renderWithContext(<Login />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

      userEvent.type(emailInput, "jhon@doe.com");
      userEvent.type(passwordInput, "Foo-Bar-Baz");
      userEvent.click(submitButton);

      waitFor(() =>
        expect(() => mockLoginService).toHaveBeenCalledWith({
          email: "jhon@doe.com",
          password: "FooBarBaz",
        })
      );
    });

    test("redirect to the dashboard after login with email and password correctly", async () => {
      const mockLoginService = mockAuthService.signInEmailPassword as jest.Mock;
      mockLoginService.mockResolvedValue({});

      renderWithContext(<Login />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

      userEvent.type(emailInput, "test@test.com");
      userEvent.type(passwordInput, "Password123");
      userEvent.click(submitButton);

      waitFor(() => expect(useNavigate).toBeCalledWith("/monitors"));
    });

    test("display error message after login with email and password failed", async () => {
      const mockLoginService = mockAuthService.signInEmailPassword as jest.Mock;
      mockLoginService.mockRejectedValue(new Error("Unable to login!"));

      renderWithContext(<Login />);

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByText("Sign in");

      userEvent.type(emailInput, "test@test.com");
      userEvent.type(passwordInput, "Password123");
      userEvent.click(submitButton);

      waitFor(() => {
        expect(screen.getByText("Unable to login!")).toHaveClass(
          "text-red-700"
        );
      });
    });
  });
});
