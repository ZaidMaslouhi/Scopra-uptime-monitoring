import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import loadingAnimation from "../../assets/lotties/loading.json";
import { GoGitBranch } from "react-icons/go";

export function BranchesCard({ loading, branches }) {
  return (
    <div className="w-1/3 flex flex-col grow-1 justify-between bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Repository Branches
      </h3>
      <section className="h-full overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Lottie
              role="graphics-document"
              animationData={loadingAnimation}
              loop={true}
              className="w-64 h-64"
            />
          </div>
        ) : branches.length == 0 ? (
          <p className="flex flex-1 justify-center items-center">
            No Branches to show.
          </p>
        ) : (
          branches.map((branch) => {
            return (
              <div key={branch.name} className="mb-3">
                <a
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 flex items-center gap-2"
                >
                  <GoGitBranch className="inline text-4xl text-slate-600" />
                  <p className="text-md font-semibold text-slate-800">
                    {branch.name}
                  </p>
                </a>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
BranchesCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  branches: PropTypes.array.isRequired,
};
