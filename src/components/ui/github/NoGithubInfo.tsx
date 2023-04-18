import React from "react";
import { useNavigate } from "react-router-dom";

function NoGithubInfo() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 flex-col gap-3 justify-center items-center">
      <p className="text-sm font-light">
        Your project does not linked to a github repo yet.
      </p>
      <button
        type="submit"
        className="py-2 px-5 bg-slate-700 font-normal text-lg text-white rounded-md shadow-2xl duration-300 hover:shadow-none hover:translate-y-1 "
        onClick={() => navigate("/settings")}
      >
        Sync with github
      </button>
    </section>
  );
}

export default NoGithubInfo;
