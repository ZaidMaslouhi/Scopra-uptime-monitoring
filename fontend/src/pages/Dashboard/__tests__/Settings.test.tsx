import React from "react";
import { screen, waitFor } from "@testing-library/react";
import ProjectSettings from "../ProjectSettings";
import { Project } from "../../../interfaces/project.interface";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import * as projectServiceMock from "../../../services/project.service";
import {
  SuccessNotification,
  comfirmationToast,
} from "../../../components/ui/toasts/toasts";
import {
  getStateWithProjects,
  renderWithContext,
} from "../../../utils/test-utils";

jest.mock("../../../services/project.service");
jest.mock("../../../components/ui/toasts/toasts");
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
const mockedProjectsList: Project[] = [
  {
    id: "1",
    name: "project 1",
    selected: true,
    github: { owner: "foo", repository: "bar" },
  },
  {
    id: "2",
    name: "project 2",
    selected: false,
    github: null,
  },
];

describe("Settings component", () => {
  test("Renders with selected projec name & github repository", () => {
    const state = getStateWithProjects([...mockedProjectsList]);

    renderWithContext(<ProjectSettings />, state);

    waitFor(() => {
      expect(screen.getByPlaceholderText("Project name").nodeValue).toEqual(
        mockedProjectsList[0].name
      );
      expect(screen.getByPlaceholderText("Github owner").nodeValue).toEqual(
        mockedProjectsList[0].github?.owner
      );
      expect(
        screen.getByPlaceholderText("Github repository").nodeValue
      ).toEqual(mockedProjectsList[0].github?.repository);
    });
  });

  describe("Delete Project", () => {
    test("display comfirmation modal", async () => {
      const state = getStateWithProjects([...mockedProjectsList]);

      renderWithContext(<ProjectSettings />, state);

      waitFor(async () => {
        userEvent.click(screen.getByText("Delete project"));
        expect(comfirmationToast).toBeCalledTimes(1);
      });
    });

    test("Remove selected project and dispaly other project", async () => {
      const mockRemoveProject = projectServiceMock.removeProject as jest.Mock;
      mockRemoveProject.mockResolvedValueOnce({});
      const state = getStateWithProjects([...mockedProjectsList]);

      await renderWithContext(<ProjectSettings />, state);

      waitFor(() => {
        expect(screen.getByPlaceholderText("Project name").nodeValue).toEqual(
          mockedProjectsList[1].name
        );
        expect(screen.getByPlaceholderText("Github owner").nodeValue).toEqual(
          mockedProjectsList[1].github?.owner
        );
        expect(
          screen.getByPlaceholderText("Github repository").nodeValue
        ).toEqual(mockedProjectsList[1].github?.repository);
        expect(SuccessNotification).lastCalledWith(
          "Project deleted successfully!"
        );
      });
    });

    test("Navigate to welcome page", async () => {
      const mockRemoveProject = projectServiceMock.removeProject as jest.Mock;
      mockRemoveProject.mockResolvedValueOnce({});
      const state = getStateWithProjects([...mockedProjectsList]);

      await renderWithContext(<ProjectSettings />, state);

      waitFor(async () => {
        userEvent.click(screen.getByRole("button", { name: "Delete project" }));
        userEvent.click(screen.getByRole("button", { name: "Delete Project" }));
        expect(useNavigate).toBeCalledWith("/welcome");
        expect(SuccessNotification).lastCalledWith(
          "Project deleted successfully!"
        );
      });
    });
  });

  describe("Update project", () => {
    test("Should change the updated project infromation", () => {
      const state1 = getStateWithProjects([...mockedProjectsList]);

      renderWithContext(<ProjectSettings />, state1);

      waitFor(() => {
        expect(screen.getByPlaceholderText("Project name").nodeValue).toEqual(
          mockedProjectsList[0].name
        );
        expect(screen.getByPlaceholderText("Github owner").nodeValue).toEqual(
          mockedProjectsList[0].github?.owner
        );
      });

      const updatedprojects = [
        {
          ...mockedProjectsList[0],
          github: { owner: "jane", repository: "bar" },
        },
      ] as Project[];
      const state2 = getStateWithProjects(updatedprojects);
      renderWithContext(<ProjectSettings />, state2);

      waitFor(() => {
        expect(screen.getByPlaceholderText("Project name").nodeValue).toEqual(
          mockedProjectsList[0].name
        );
        expect(screen.getByPlaceholderText("Github owner").nodeValue).toEqual(
          mockedProjectsList[0].github?.owner
        );
        expect(
          screen.getByPlaceholderText("Github repository").nodeValue
        ).toEqual(mockedProjectsList[0].github?.repository);
      });
    });
  });
});
