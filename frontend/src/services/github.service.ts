import { doc, setDoc } from "firebase/firestore";
import { database } from "../config/firebase.config";
import { UserInfo } from "../interfaces/auth.interface";
import { Github } from "../interfaces/github.interface";
import { Project } from "../interfaces/project.interface";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_API_KEY,
});

export const updateProjectGithubRepo = async (
  user: UserInfo,
  project: Project
) => {
  const ref = doc(database, `user/${user.id}/projects`, project.id);
  return await setDoc(ref, { ...project });
};

export const getCommits = async ({ owner, repository }: Github) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/commits?per_page=5",
    {
      owner: owner,
      repo: repository,
    }
  );
  return response.data;
};

export const getIssues = async ({ owner, repository }: Github) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/issues?per_page=5",
    {
      owner: owner,
      repo: repository,
    }
  );
  return response.data;
};

export const getPullRequests = async ({ owner, repository }: Github) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls?per_page=5",
    {
      owner: owner,
      repo: repository,
    }
  );
  return response.data;
};
