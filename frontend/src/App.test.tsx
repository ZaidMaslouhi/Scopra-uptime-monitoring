import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import GetInTouch from "./pages/GetInTouch/GetInTouch";
import { renderWithContext } from "./utils/test-utils";

describe("App", () => {
  test("renders the GetInTouch page by default", () => {
    renderWithContext(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    waitFor(async () => {
      const { container: getInTouchComponent } = await renderWithContext(
        <GetInTouch />
      );

      expect(getInTouchComponent).toBeInTheDocument();
    });
  });

  test("renders the NotFound page for invalid routes", () => {
    const { container: notFoundComponent } = renderWithContext(
      <MemoryRouter initialEntries={["/invalid"]}>
        <App />
      </MemoryRouter>
    );

    waitFor(() => {
      const notFoundText = screen.getByText(/404 not found/i);

      expect(notFoundComponent).toBeInTheDocument();
      expect(notFoundText).toBeInTheDocument();
    });
  });
});
