import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Github from "../Github";
import {
  getBranches,
  getCommits,
  getPullRequests,
} from "../../../services/github.service";

jest.mock("../../../services/github.service", () => ({
  getCommits: jest.fn(() => Promise.resolve([])),
  getBranches: jest.fn(() => Promise.resolve([])),
  getPullRequests: jest.fn(() => Promise.resolve([])),
}));

describe("Github component", () => {
  it("renders the input fields", () => {
    render(<Github />);
    const ownerInput = screen.getByPlaceholderText("Owner");
    const repoInput = screen.getByPlaceholderText("Repository name");
    expect(ownerInput).toBeInTheDocument();
    expect(repoInput).toBeInTheDocument();
  });

  it("submits the form with the correct values", () => {
    render(<Github />);
    const ownerInput = screen.getByPlaceholderText("Owner");
    const repoInput = screen.getByPlaceholderText("Repository name");
    const syncButton = screen.getByText("Sync");

    fireEvent.change(ownerInput, { target: { value: "facebook" } });
    fireEvent.change(repoInput, { target: { value: "react" } });
    fireEvent.click(syncButton);

    waitFor(() =>
      expect(getCommits).toHaveBeenCalledWith({
        owner: "facebook",
        repo: "react",
      })
    );
    waitFor(() =>
      expect(getBranches).toHaveBeenCalledWith({
        owner: "facebook",
        repo: "react",
      })
    );
    waitFor(() =>
      expect(getPullRequests).toHaveBeenCalledWith({
        owner: "facebook",
        repo: "react",
      })
    );
  });

  it("displays loading spinners while fetching data", () => {
    render(<Github />);
    const ownerInput = screen.getByPlaceholderText("Owner");
    const repoInput = screen.getByPlaceholderText("Repository name");
    const syncButton = screen.getByText("Sync");
    fireEvent.change(ownerInput, { target: { value: "ownerInput" } });
    fireEvent.change(repoInput, { target: { value: "repo1" } });
    fireEvent.click(syncButton);

    waitFor(() =>
      expect(screen.findAllByRole("graphics-document").length).toBe(3)
    );
  });

  it("displays the fetched data", () => {
    const mockCommits = [
      {
        sha: "123",
        commit: { message: "Commit message", committer: { avatar_url: "#" } },
      },
    ];
    const mockBranches = [{ name: "master", commit: { sha: "123" } }];
    const mockPullRequests = [{ number: 1, title: "Pull request title" }];

    getCommits.mockResolvedValueOnce(mockCommits);
    getBranches.mockResolvedValueOnce(mockBranches);
    getPullRequests.mockResolvedValueOnce(mockPullRequests);

    render(<Github />);
    const ownerInput = screen.getByPlaceholderText("Owner");
    const repoInput = screen.getByPlaceholderText("Repository name");
    const syncButton = screen.getByText("Sync");

    fireEvent.change(ownerInput, { target: { value: "facebook" } });
    fireEvent.change(repoInput, { target: { value: "react" } });
    fireEvent.click(syncButton);

    waitFor(() =>
      expect(
        screen.getByText(mockCommits[0].commit.message)
      ).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.getByText(mockBranches[0].name)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.getByText(mockPullRequests[0].title)).toBeInTheDocument()
    );
  });
});
