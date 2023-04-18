import { RootState } from "../store";
import { Github } from "../../interfaces/github.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GithubRepo } from "../../interfaces/GithubRepo.interface";
import {
  getIssues,
  getCommits,
  getPullRequests,
} from "../../services/github.service";
import { toCommit } from "../../interfaces/commit.interface";
import { toIssue } from "../../interfaces/issue.interface";
import { toPullRequest } from "../../interfaces/pullRequest.interface";

export const getRepoContent = createAsyncThunk(
  "githubRepo/getRepoContent",
  async (projectGithub: Github) => {
    const results = await Promise.all([
      getCommits(projectGithub),
      getIssues(projectGithub),
      getPullRequests(projectGithub),
    ]);

    const commits = results[0].map((commit: unknown) => toCommit(commit));
    const issues = results[1].map((issue: unknown) => toIssue(issue));
    const pullRequests = results[2].map((pullRequest: unknown) =>
      toPullRequest(pullRequest)
    );

    return {
      commits: [...commits],
      issues: [...issues],
      pullRequests: [...pullRequests],
    } as GithubRepo;
  }
);

interface GithubRepoState {
  content: GithubRepo;
  status: "Idle" | "Pending" | "Succeeded" | "Failed";
  error: string | null;
}

const initialState: GithubRepoState = {
  content: {
    commits: [],
    issues: [],
    pullRequests: [],
  },
  status: "Idle",
  error: null,
};

const githubRepoSlice = createSlice({
  name: "githubRepo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Github Repository Content
    builder.addCase(getRepoContent.pending, (state: GithubRepoState) => {
      state.status = "Pending";
    });
    builder.addCase(
      getRepoContent.fulfilled,
      (state: GithubRepoState, action) => {
        state.content = action.payload as GithubRepo;
        state.status = "Succeeded";
      }
    );
    builder.addCase(getRepoContent.rejected, (state: GithubRepoState) => {
      state.error = "Unable to get repository informations!";
      state.status = "Failed";
      state.content = initialState.content;
    });
  },
});

export const selectRepoContent = (state: RootState): GithubRepoState =>
  state.githubRepo;

export default githubRepoSlice.reducer;
