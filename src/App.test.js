import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  afterEach(cleanup);

  test("renders the GetInTouch page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const getInTouch = screen.getByRole("heading", {
      name: /get in touch/i,
    });
    const notFoundText = screen.queryByText(/404 not found/i);

    expect(getInTouch).toBeInTheDocument();
    expect(notFoundText).not.toBeInTheDocument();
  });

  test("renders the NotFound page for invalid routes", () => {
    render(
      <MemoryRouter initialEntries={["/invalid"]}>
        <App />
      </MemoryRouter>
    );

    const notFoundText = screen.getByText(/404 not found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
