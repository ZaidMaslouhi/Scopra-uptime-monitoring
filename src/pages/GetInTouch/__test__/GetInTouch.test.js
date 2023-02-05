import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GetInTouch from "../GetInTouch";
import { subscribe } from "../../../services/subscription.service";

jest.mock("../../../services/subscription.service");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn().mockReturnValueOnce([{}, {}]),
}));

describe("GetInTouch", () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });

  it("renders the form and aside section", () => {
    render(<GetInTouch />);

    const animationImage = screen.getByRole("img");
    const getInTouch = screen.getByRole("heading", {
      name: /The next big thing is Here!/i,
    });
    const emailInput = screen.getByRole("textbox");
    const notifButton = screen.getByRole("button", { name: /notify me/i });

    expect(animationImage).toBeInTheDocument();
    expect(getInTouch).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(notifButton).toBeInTheDocument();
  });

  it("submit the form when click the submition button", async () => {
    subscribe.mockResolvedValue(null);
    const handleSubmit = jest.fn();

    render(<GetInTouch />);
    
    const emailInput = screen.getByRole("textbox");
    const notifButton = screen.getByRole("button", { name: /notify me/i });
    const form = emailInput.closest("form");

    form.onsubmit = handleSubmit;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(notifButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(subscribe).toHaveBeenCalled();
    });
  });

  it("displays the success message when the form is submitted successfully", async () => {
    subscribe.mockResolvedValue(true);
    useState.mockReturnValueOnce([
      {
        message: "Thank you test for your interest. We will be in touch!",
        style: "border-green-200 bg-green-50 text-green-700",
      },
      {},
    ]);

    render(<GetInTouch />);

    const successMessage = screen.getByText(
      "Thank you test for your interest. We will be in touch!"
    );
    
    expect(successMessage).toBeInTheDocument();
    expect(successMessage.parentElement).toHaveClass(
      "border-green-200 bg-green-50 text-green-700"
    );
  });

  it("should submit the form and display the error message", async () => {
    subscribe.mockRejectedValue();
    useState.mockReturnValueOnce([
      {
        message: "Sorry test, something went wrong! please try again later.",
        style: "border-red-200 bg-red-50 text-red-700",
      },
      {},
    ]);

    render(<GetInTouch />);

    const errorMessage = screen.getByText(
      "Sorry test, something went wrong! please try again later."
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.parentElement).toHaveClass(
      "border-red-200 bg-red-50 text-red-700"
    );
  });
});
