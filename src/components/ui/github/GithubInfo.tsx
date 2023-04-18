import React from "react";
import { CommitsCard } from "./CommitsCard";
import { IssuesCard } from "./IssuesCard";
import { PullRequestsCard } from "./PullRequestsCard";
import { GithubRepo } from "../../../interfaces/GithubRepo.interface";

function GithubInfo({ repoContent }: { repoContent: GithubRepo }) {
  return (
    <section className="flex flex-1 content-start pb-16">
      <div className="w-full h-fit flex flex-1 gap-6 content-start">
        {/* Commits */}
        <CommitsCard commits={repoContent.commits ?? []} />
        {/* Issues */}
        <IssuesCard issues={repoContent.issues ?? []} />
        {/* Pull Requests */}
        <PullRequestsCard pullRequests={repoContent.pullRequests ?? []} />
      </div>
    </section>
  );
}

export default GithubInfo;
