import React from "react";
import { VscGitCommit } from "react-icons/vsc";
import { Commit } from "../../../interfaces/commit.interface";

export function CommitsCard({ commits }: { commits: Commit[] }) {
  return (
    <div className="w-1/3 flex flex-col grow-1 justify-between bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Commits</h3>
      {commits.length == 0 ? (
        <p className="flex flex-1 justify-center items-center">
          No Commits to show.
        </p>
      ) : (
        commits.map((commit) => {
          return (
            <div key={commit.id} className="mb-3">
              <a
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                className="py-2 flex items-start gap-2"
              >
                <VscGitCommit className="inline text-4xl text-slate-600" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={commit.committer.avatar_url}
                        alt="commiter avatar"
                        className="rounded-full w-5"
                      />
                      <p className="text-sm text-slate-500">
                        {commit.committer.name}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-sm text-slate-500">
                        {
                          new Date(commit.committer.date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-slate-800">
                    {commit.message}
                  </p>
                </div>
              </a>
            </div>
          );
        })
      )}
    </div>
  );
}
