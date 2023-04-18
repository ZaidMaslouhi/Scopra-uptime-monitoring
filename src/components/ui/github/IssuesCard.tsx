import React from "react";
import { GoIssueOpened } from "react-icons/go";
import { Issue } from "../../../interfaces/issue.interface";

export function IssuesCard({ issues }: { issues: Issue[] }) {
  return (
    <div className="w-1/3 flex flex-col grow-1 justify-between bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Repository Issues
      </h3>
      <section className="h-full overflow-auto">
        {issues.length == 0 ? (
          <p className="flex flex-1 justify-center items-center">
            No Issues to show.
          </p>
        ) : (
          issues.map((issue) => {
            return (
              <div key={issue.id} className="mb-3">
                <a
                  href={issue.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 flex items-start gap-2"
                >
                  <GoIssueOpened className="inline text-3xl text-slate-600" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={issue.user.avatar_url}
                          alt="commiter avatar"
                          className="rounded-full w-5"
                        />
                        <p className="text-sm text-slate-500">
                          {issue.user.name}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-sm text-slate-500">
                          {
                            new Date(issue.user.date)
                              .toISOString()
                              .split("T")[0]
                          }
                        </p>
                      </div>
                    </div>
                    <p className="text-md font-semibold text-slate-800">
                      {`${issue.title} #${issue.number}`}
                    </p>
                  </div>
                </a>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
