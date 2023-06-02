import { Mock, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as githubServiceMock from "../../../services/github.service";
import githubRepoSlice, { getRepoContent } from "../githubRepo.slice";
import {
  getStateWithGithubRepo,
  getStoreWithState,
} from "../../../utils/test-utils";
import { toCommit } from "../../../interfaces/commit.interface";
import { toIssue } from "../../../interfaces/issue.interface";
import { toPullRequest } from "../../../interfaces/pullRequest.interface";

vi.mock("../../../services/github.service");
const mockStore = configureStore([thunk])();
const mockGithubRepoData = [
  [
    {
      sha: "1",
      html_url: "/",
      committer: {
        avatar_url: "/",
      },
      commit: {
        message: "commit 1",
        committer: {
          date: "2023-03-15T22:29:28Z",
          name: "jhon",
        },
      },
    },
  ],
  [
    {
      id: "1",
      html_url: "/",
      title: "issue 1",
      number: "1",
      created_at: "2023-03-15T22:29:28Z",
      user: {
        login: "john",
        avatar_url: "",
      },
    },
  ],
  [
    {
      id: "1",
      html_url: "/",
      title: "issue 1",
      number: "1",
      created_at: "2023-03-15T22:29:28Z",
      user: {
        login: "john",
        avatar_url: "",
      },
    },
  ],
];

describe("Github Repo Slice", () => {
  afterEach(() => {
    mockStore.clearActions();
  });

  test("should return the initial state when dispach an empty action", () => {
    const initialState = getStateWithGithubRepo({
      commits: [],
      issues: [],
      pullRequests: [],
    });
    const action = { type: "" };
    const result = githubRepoSlice(initialState.githubRepo, action);

    expect(result).toStrictEqual({
      content: {
        commits: [],
        issues: [],
        pullRequests: [],
      },
      status: "Idle",
      error: null,
    });
  });

  describe("Thunks with mocked dipatch and redux store", () => {
    describe("getRepoContent", () => {
      test("should return object of github repo content", async () => {
        const mockedGetCommits = githubServiceMock.getCommits as Mock;
        const mockedGetIssues = githubServiceMock.getIssues as Mock;
        const mockedGetPullRequests =
          githubServiceMock.getPullRequests as Mock;
        mockedGetCommits.mockResolvedValueOnce(mockGithubRepoData[0]);
        mockedGetIssues.mockResolvedValueOnce(mockGithubRepoData[1]);
        mockedGetPullRequests.mockResolvedValueOnce(mockGithubRepoData[2]);

        await mockStore.dispatch(
          getRepoContent({
            owner: "jhon-doe",
            repository: "foo",
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("githubRepo/getRepoContent/pending");
        expect(actions[1].type).toEqual("githubRepo/getRepoContent/fulfilled");
        mockGithubRepoData[0].map((commit, index) => {
          expect(actions[1].payload.commits[index]).toEqual(toCommit(commit));
        });
        mockGithubRepoData[1].map((issue, index) => {
          expect(actions[1].payload.issues[index]).toEqual(toIssue(issue));
        });
        mockGithubRepoData[2].map((pullRequest, index) => {
          expect(actions[1].payload.pullRequests[index]).toEqual(
            toPullRequest(pullRequest)
          );
        });
      });

      test("should return error message", async () => {
        const mockedGetCommits = githubServiceMock.getCommits as Mock;
        mockedGetCommits.mockRejectedValueOnce(
          new Error("Unable to get repository informations!")
        );

        await mockStore.dispatch(
          getRepoContent({
            owner: "jhon-doe",
            repository: "foo",
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("githubRepo/getRepoContent/pending");
        expect(actions[1].type).toEqual("githubRepo/getRepoContent/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual(
          "Unable to get repository informations!"
        );
      });
    });
  });

  describe("Thunks with associated reducer methods / with full redux store", () => {
    describe("getRepoContent", () => {
      test("should return the repository content with success status", async () => {
        const mockedGetCommits = githubServiceMock.getCommits as Mock;
        const mockedGetIssues = githubServiceMock.getIssues as Mock;
        const mockedGetPullRequests =
          githubServiceMock.getPullRequests as Mock;
        mockedGetCommits.mockResolvedValueOnce(mockGithubRepoData[0]);
        mockedGetIssues.mockResolvedValueOnce(mockGithubRepoData[1]);
        mockedGetPullRequests.mockResolvedValueOnce(mockGithubRepoData[2]);

        const store = getStoreWithState();
        await store.dispatch(
          getRepoContent({
            owner: "jhon-doe",
            repository: "foo",
          })
        );

        const commits = mockGithubRepoData[0].map((commit) => toCommit(commit));
        const issues = mockGithubRepoData[1].map((issue) => toIssue(issue));
        const pullRequests = mockGithubRepoData[2].map((pullRequest) =>
          toPullRequest(pullRequest)
        );

        expect(store.getState().githubRepo).toEqual({
          content: {
            commits,
            issues,
            pullRequests,
          },
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedGetCommits = githubServiceMock.getCommits as Mock;
        mockedGetCommits.mockRejectedValueOnce(
          new Error("Unable to get repository informations!")
        );

        const store = getStoreWithState();
        await store.dispatch(
          getRepoContent({
            owner: "jhon-doe",
            repository: "foo",
          })
        );

        expect(store.getState().githubRepo).toEqual({
          content: {
            commits: [],
            issues: [],
            pullRequests: [],
          },
          status: "Failed",
          error: "Unable to get repository informations!",
        });
      });
    });
  });
});
