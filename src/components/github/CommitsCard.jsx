import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import loadingAnimation from "../../assets/lotties/loading.json";
import { VscGitCommit } from "react-icons/vsc";

export function CommitsCard({ loading, commits }) {
  return (
    <div className="w-1/3 flex flex-col grow-1 justify-between bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Last 5 Commits</h3>
      {loading ? (
        <div className="flex justify-center items-center">
          <Lottie
            role="graphics-document"
            animationData={loadingAnimation}
            loop={true}
            className="w-64 h-64"
          />
        </div>
      ) : commits.length == 0 ? (
        <p className="flex flex-1 justify-center items-center">
          No Commits to show.
        </p>
      ) : (
        commits.map((commit) => {
          return (
            <div key={commit.sha} className="mb-3">
              <a
                href={commit.commit.url}
                target="_blank"
                rel="noreferrer"
                className="py-2 flex items-center gap-2"
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
                        {commit.commit.committer.name}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-sm text-slate-500">
                        {
                          new Date(commit.commit.committer.date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-slate-800">
                    {commit.commit.message}
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
CommitsCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  commits: PropTypes.array.isRequired,
};
