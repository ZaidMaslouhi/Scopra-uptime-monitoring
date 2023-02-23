import React, { useState } from "react";
import FormInput from "../../components/input/FormInput/FormInput";
import { ErrorNotification } from "../../components/toasts/toasts";
import { useForm } from "react-hook-form";
import {
  getBranches,
  getCommits,
  getPullRequests,
} from "../../services/github.service";
import { CommitsCard } from "../../components/github/CommitsCard";
import { BranchesCard } from "../../components/github/BranchesCard";
import { PullRequestsCard } from "../../components/github/PullRequestsCard";
import { GoMarkGithub } from "react-icons/go";

function Github() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);

  const handleForm = async (values) => {
    try {
      setLoading(true);
      const results = await Promise.all([
        getCommits(values),
        getBranches(values),
        getPullRequests(values),
      ]);

      setCommits(results[0]);
      setBranches(results[1]);
      setPullRequests(results[2]);
    } catch (error) {
      ErrorNotification("Error: Unable to sync with Github.");
      ErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="w-full h-full px-12 flex flex-col flex-1 gap-20 overflow-auto ">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="w-9/12 py-4 px-8 text-center flex justify-center bg-white rounded-2xl shadow-2xl"
        >
          <div className="text-slate-700 flex items-center">
            <GoMarkGithub className="inline mr-16 text-4xl" />
            <kbd className="mr-2 text-xl text-slate-800">
              https://github.com/
            </kbd>
            <div className="flex items-end">
              <FormInput
                label=""
                id="Owner"
                placeholder="Owner"
                ref={register("owner", {
                  required: "You should enter the owner!",
                })}
                errorMessage={errors.owner?.message}
              />
            </div>
            <kbd className="mx-2 text-2xl text-slate-800">/</kbd>
            <div className="flex items-end">
              <FormInput
                label=""
                id="Repo"
                placeholder="Repository name"
                ref={register("repo", {
                  required: "You should enter the repo name!",
                })}
                errorMessage={errors.owner?.message}
              />
            </div>
          </div>
          <div className="ml-8 flex items-center">
            <button
              type="submit"
              className="px-6 py-2 text-xl text-white bg-slate-700 rounded-2xl shadow-lg border-2 border-slate-700 duration-300 hover:bg-transparent hover:text-slate-700 hover:shadow-2xl hover:-translate-y-1"
            >
              Sync
            </button>
          </div>
        </form>
      </div>
      <section className="flex flex-1 content-start pb-16">
        <div className="w-full h-fit flex flex-1 gap-6 content-start">
          {/* Last 5 commits */}
          <CommitsCard loading={loading} commits={commits} />
          {/* Repository Branches */}
          <BranchesCard loading={loading} branches={branches} />
          {/* Pull Requests */}
          <PullRequestsCard loading={loading} pullRequests={pullRequests} />
        </div>
      </section>
    </article>
  );
}

export default Github;
