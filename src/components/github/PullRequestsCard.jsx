import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import loadingAnimation from "../../assets/lotties/loading.json";

export function PullRequestsCard({ loading, pullRequests }) {
  return (
    <div className="w-1/3 flex flex-col grow-1 justify-between bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Pull Requests</h3>
      {loading ? (
        <div className="flex justify-center items-center">
          <Lottie
            role="graphics-document"
            animationData={loadingAnimation}
            loop={true}
            className="w-64 h-64"
          />
        </div>
      ) : pullRequests.length == 0 ? (
        <p className="flex flex-1 justify-center items-center">
          No Pull Requests to show.
        </p>
      ) : (
        pullRequests.map((pullRequest) => {
          return (
            <div key={pullRequest.name} className="mb-3">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="py-2 flex items-center gap-2"
              >
                <p>{pullRequest.name}</p>
              </a>
            </div>
          );
        })
      )}
    </div>
  );
}
PullRequestsCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  pullRequests: PropTypes.array.isRequired,
};
