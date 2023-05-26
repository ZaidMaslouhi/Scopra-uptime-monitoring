import React from "react";
import { RootState } from "../store/store";
import rootReducer from "../store/slices/index";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Project } from "../interfaces/project.interface";
import { Monitor } from "../interfaces/monitor.interface";
import { GithubRepo } from "../interfaces/GithubRepo.interface";

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
) {
  const store = getStoreWithState(state);
  const utils = render(<Provider store={store}>{element}</Provider>);
  return { store, ...utils };
}

type StateStatus = "Pending" | "Idle" | "Succeeded" | "Failed";

export function getStateWithProjects(
  projects: Project[],
  status: StateStatus = "Idle"
): RootState {
  const state: RootState = {
    auth: { user: null, status: "Idle", error: null },
    projects: { projects, status, error: null },
    githubRepo: {
      content: {
        commits: [],
        issues: [],
        pullRequests: [],
      },
      status: "Idle",
      error: null,
    },
    monitors: {
      monitors: [],
      status: "Idle",
      error: null,
    },
  };
  return state;
}

export function getStateWithMonitors(
  monitors: Monitor[],
  status: StateStatus = "Idle"
): RootState {
  const state: RootState = {
    auth: { user: null, status: "Idle", error: null },
    projects: { projects: [], status: "Idle", error: null },
    monitors: {
      monitors,
      status,
      error: null,
    },
    githubRepo: {
      content: {
        commits: [],
        issues: [],
        pullRequests: [],
      },
      status: "Idle",
      error: null,
    },
  };
  return state;
}

export function getStateWithGithubRepo(
  GithubRepo: GithubRepo,
  status: StateStatus = "Idle"
): RootState {
  const state: RootState = {
    auth: { user: null, status: "Idle", error: null },
    projects: { projects: [], status: "Idle", error: null },
    monitors: {
      monitors: [],
      status: "Idle",
      error: null,
    },
    githubRepo: {
      content: GithubRepo,
      status,
      error: null,
    },
  };
  return state;
}
