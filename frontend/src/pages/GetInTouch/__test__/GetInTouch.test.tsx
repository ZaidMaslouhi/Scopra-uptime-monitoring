import { Mock, vi, test } from "vitest";
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import GetInTouch from "../GetInTouch";
import * as mockSubscribeService from "../../../services/subscription.service";
import { renderWithContext } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

vi.mock("../../../services/subscription.service");
vi.mock("../../../services/auth.service");

describe("GetInTouch", () => {
  test("renders the form and aside section", () => {
    renderWithContext(<GetInTouch />);

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

  test("Submit the form", async () => {
    const mockSubscribtion = mockSubscribeService.subscribe as Mock;
    mockSubscribtion.mockResolvedValue(null);
    const handleSubmit = vi.fn();

    renderWithContext(<GetInTouch />);

    formSubmit(handleSubmit);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(mockSubscribtion).toHaveBeenCalled();
    });
  });

  test("displays the success message", async () => {
    const mockSubscribtion = mockSubscribeService.subscribe as Mock;
    mockSubscribtion.mockResolvedValue(true);
    const handleSubmit = vi.fn();

    renderWithContext(<GetInTouch />);

    formSubmit(handleSubmit);

    waitFor(() => {
      const successMessage = screen.getByText(/We will be in touch/i);
      expect(successMessage).toBeInTheDocument();
      expect(successMessage.parentElement).toHaveClass(
        "border-green-200 bg-green-50 text-green-700"
      );
    });
  });

  test("should display the error message", async () => {
    const mockSubscribtion = mockSubscribeService.subscribe as Mock;
    mockSubscribtion.mockRejectedValueOnce({});

    renderWithContext(<GetInTouch />);

    waitFor(() => {
      const errorMessage = screen.getByText(/something went wrong/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.parentElement).toHaveClass(
        "border-red-200 bg-red-50 text-red-700"
      );
    });
  });
});

function formSubmit(handleSubmit: Mock) {
  const emailInput = screen.getByRole("textbox");
  const notifButton = screen.getByRole("button", { name: /notify me/i });
  const form = emailInput.closest("form") as HTMLFormElement;
  form.onsubmit = handleSubmit;
  userEvent.type(emailInput, "test@example.com");
  userEvent.click(notifButton);
}
