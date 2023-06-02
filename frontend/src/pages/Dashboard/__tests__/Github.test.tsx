import { Mock, vi } from "vitest";
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import Github from "../Github";
import * as mockGithubService from "../../../services/github.service";
import {
  getStateWithGithubRepo,
  getStateWithProjects,
  getStoreWithState,
  renderWithContext,
} from "../../../utils/test-utils";
import { GithubRepo } from "../../../interfaces/GithubRepo.interface";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../interfaces/project.interface";
import userEvent from "@testing-library/user-event";
import { ErrorNotification } from "../../../components/ui/toasts/toasts";

vi.mock("../../../services/github.service");
vi.mock("../../../components/ui/toasts/toasts");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

const mockGithubRepo: GithubRepo = {
  commits: [
    {
      id: "1",
      message: "commit 1",
      url: "/",
      committer: { name: "jhon", avatar_url: "", date: "2023-03-15T22:29:28Z" },
    },
  ],
  issues: [
    {
      id: "1",
      number: 1,
      title: "issue 1",
      url: "/",
      user: { name: "jhon", avatar_url: "", date: "2023-03-15T22:29:28Z" },
    },
  ],
  pullRequests: [
    {
      id: "1",
      number: 1,
      title: "pull request 1",
      url: "/",
      user: { name: "jhon", avatar_url: "", date: "2023-03-15T22:29:28Z" },
    },
  ],
};
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

describe("Github component", () => {
  test("Renders loading animation while github repo in pending status", () => {
    const state = getStateWithGithubRepo(
      {
        commits: [],
        issues: [],
        pullRequests: [],
      },
      "Pending"
    );

    renderWithContext(<Github />, state);

    waitFor(async () => {
      await expect(screen.getByRole("graphics-document")).toBeInTheDocument();
    });
  });

  test("dispaly github repo cards with content", async () => {
    const GithubState = getStateWithGithubRepo(
      { ...mockGithubRepo },
      "Succeeded"
    );
    const store = getStoreWithState({
      ...GithubState,
      projects: {
        ...GithubState.projects,
        projects: [...mockedProjectsList],
      },
    });

    renderWithContext(<Github />, store.getState());

    waitFor(async () => {
      mockGithubRepo.commits?.forEach((value) => {
        expect(screen.getByText(value.message)).toBeInTheDocument();
      });
      mockGithubRepo.issues?.forEach((value) => {
        expect(screen.getByText(value.title)).toBeInTheDocument();
      });
      mockGithubRepo.pullRequests?.forEach((value) => {
        expect(screen.getByText(value.title)).toBeInTheDocument();
      });
    });
  });

  test("dispaly no github repo message w/ sync github repo button", () => {
    const state = getStateWithProjects([
      { ...mockedProjectsList[0], github: null },
    ]);

    renderWithContext(<Github />, state);

    waitFor(async () => {
      expect(
        screen.getByText("Your project does not linked to a github repo yet")
      ).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Sync with github")).toBeInTheDocument();
    });
  });

  test("Redirect to settings page", () => {
    const state = getStateWithProjects([
      { ...mockedProjectsList[0], github: null },
    ]);

    renderWithContext(<Github />, state);

    waitFor(async () => {
      userEvent.click(screen.getByText("Sync with github"));
      expect(useNavigate).toBeCalledWith("/settings");
    });
  });

  test("should display error message", () => {
    const mockGetCommit = mockGithubService.getCommits as Mock;
    mockGetCommit.mockRejectedValueOnce(
      new Error("Unable to get repository informations!")
    );
    const GithubState = getStateWithGithubRepo(
      { ...mockGithubRepo },
      "Succeeded"
    );
    const mockStore = getStoreWithState({
      ...GithubState,
      projects: {
        ...GithubState.projects,
        projects: [...mockedProjectsList],
      },
    });

    renderWithContext(<Github />, mockStore.getState());

    waitFor(async () => {
      await expect(mockGetCommit).toBeCalled();
      await expect(
        screen.getByText("Unable to get repository informations!")
      ).toBeInTheDocument();
    });
  });

  test("dispaly toast/notification error message", () => {
    const mockGetCommit = mockGithubService.getCommits as Mock;
    mockGetCommit.mockRejectedValueOnce(
      new Error("Unable to get repository informations!")
    );
    const GithubState = getStateWithGithubRepo(
      { ...mockGithubRepo },
      "Succeeded"
    );
    const mockStore = getStoreWithState({
      ...GithubState,
      projects: {
        ...GithubState.projects,
        projects: [...mockedProjectsList],
      },
    });

    renderWithContext(<Github />, mockStore.getState());

    waitFor(async () => {
      expect(mockGetCommit).toBeCalled();
      expect(ErrorNotification).toHaveBeenCalledWith("Unable to get monitors!");
    });
  });
});
