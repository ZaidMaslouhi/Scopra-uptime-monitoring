import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import GetInTouch from "./pages/GetInTouch/GetInTouch";

// jest.mock("./services/subscription.service", () => ({
//   subscribe: jest.fn(),
// }));
// jest.mock("./services/auth.service", () => ({
//   getCurrentUser: jest.fn(),
// }));

describe("App", () => {
//   afterEach(cleanup);

//   test("renders the GetInTouch page by default", () => {
//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     const { container: getInTouchComponent } = render(<GetInTouch />);

//     expect(getInTouchComponent).toBeInTheDocument();
//   });

  test("renders the NotFound page for invalid routes", () => {
    const { container: notFoundComponent } = render(
      <MemoryRouter initialEntries={["/invalid"]}>
        <App />
      </MemoryRouter>
    );

    const notFoundText = screen.getByText(/404 not found/i);

    expect(notFoundComponent).toBeInTheDocument();
    expect(notFoundText).toBeInTheDocument();
  });
});
