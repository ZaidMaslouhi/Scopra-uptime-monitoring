import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import projectsSlice from "./projects.slice";
import monitorsSlice from "./monitors.slice";
import githubRepoSlice from "./githubRepo.slice";

export default combineReducers({
  auth: authSlice,
  projects: projectsSlice,
  monitors: monitorsSlice,
  githubRepo: githubRepoSlice,
});
