import React from "react";
import MessageResponse from "../MessageReponse";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

describe("MessageResponse component", () => {
  test("renders the message passed as prop", () => {
    const message = "Example Message";
    const { getByText } = render(<MessageResponse message={message} />);
    expect(getByText(message)).toBeTruthy();
  });

  test("renders with classname passed as prop", () => {
    const message = "Example Message";
    const className = "custom-class";
    const { container } = render(
      <MessageResponse message={message} className={className} />
    );
    expect(container.firstChild.classList.contains(className)).toBeTruthy();
  });

});
