import { vi } from 'vitest';
import React from "react";
import { render, screen } from "@testing-library/react";
import SingleForm from "../SingleForm";

vi.mock("lottie-react", () => vi.fn());
const image = {};
const children = <div>children components</div>;

describe("InitLayout", () => {
  test("renders the children prop", () => {
    render(<SingleForm image={image}>{children}</SingleForm>);
    expect(screen.getByText(/children components/i)).toBeInTheDocument();
  });

  test("renders the Scopra logo", () => {
    render(<SingleForm image={image}>{children}</SingleForm>);
    expect(screen.getByAltText("scopra logo")).toBeInTheDocument();
  });

  test("renders the Lottie animation", () => {
    render(<SingleForm image={image}>{children}</SingleForm>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
