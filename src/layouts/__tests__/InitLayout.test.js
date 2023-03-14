import React from "react";
import { render, screen } from "@testing-library/react";
import InitLayout from "../InitLayout";

jest.mock("lottie-react", () => jest.fn());

describe("InitLayout", () => {
  const image = {};
  const children = <div>Test Content</div>;

  it("renders the children prop", () => {
    render(<InitLayout image={image}>{children}</InitLayout>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders the Scopra logo", () => {
    render(<InitLayout image={image}>{children}</InitLayout>);
    expect(screen.getByAltText("scopra logo")).toBeInTheDocument();
  });

  it("renders the Lottie animation", () => {
    render(<InitLayout image={image}>{children}</InitLayout>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
