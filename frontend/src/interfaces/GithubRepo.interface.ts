import { Commit } from "./commit.interface";
import { Issue } from "./issue.interface";
import { PullRequest } from "./pullRequest.interface";

interface GithubRepo {
  commits?: Commit[];
  issues?: Issue[];
  pullRequests?: PullRequest[];
}

export { GithubRepo };
