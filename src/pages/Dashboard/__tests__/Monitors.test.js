import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Monitors from "../Monitors";
import { ProjectsContext } from "../../../context/ProjectsContext";

jest.mock("../../../services/monitor.service", () => ({
  getMonitors: jest.fn().mockResolvedValue([
    { id: 1, name: "Monitor 1", endpoint: "/" },
    { id: 2, name: "Monitor 2", endpoint: "/" },
  ]),
}));

jest.mock("../../../services/auth.service", () => ({
  getCurrentUser: jest.fn().mockReturnValue({ uid: 123 }),
}));

// jest.mock("../../../context/ProjectsContext", () => ({
//   ProjectsContext: {
//     Consumer: ({ children }) =>
//       children({
//         projects: [
//           { id: 1, name: "Project 1", selected: false },
//           { id: 2, name: "Project 2", selected: true },
//         ],
//       }),
//   },
// }));

const projects = [
  { id: 1, name: "Project 1", selected: false },
  { id: 2, name: "Project 2", selected: true },
];

describe("Monitors component", () => {
  it("renders loading animation when monitors are being fetched", async () => {
    render(
      <ProjectsContext.Provider value={{ projects, setProjects: jest.fn() }}>
        <Monitors />
      </ProjectsContext.Provider>
    );
    expect(screen.getByRole("graphics-document")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("loading-animation")).not.toBeInTheDocument()
    );
  });

  it("renders no monitors message when no monitors are available", () => {
    render(
      <ProjectsContext.Provider
        value={{ projects: projects, setProjects: jest.fn() }}
      >
        <Monitors />
      </ProjectsContext.Provider>
    );
    waitFor(() =>
      expect(screen.getByText(/You have no monitor yet./i)).toBeInTheDocument()
    );
  });

  it("renders monitors when monitors are available", () => {
    render(
      <ProjectsContext.Provider
        value={{ projects: projects, setProjects: jest.fn() }}
      >
        <Monitors />
      </ProjectsContext.Provider>
    );
    waitFor(() => expect(screen.findByText("Monitor 1")).toBeInTheDocument());
  });

  it("opens add monitor modal when new monitor button is clicked", () => {
    render(
      <ProjectsContext.Provider
        value={{ projects: projects, setProjects: jest.fn() }}
      >
        <Monitors />
      </ProjectsContext.Provider>
    );
    waitFor(() => {
      expect(screen.findByText("Monitor 1")).toBeInTheDocument();
      expect(screen.getByText("Add Monitor")).toBeInTheDocument();
    });
  });
});
