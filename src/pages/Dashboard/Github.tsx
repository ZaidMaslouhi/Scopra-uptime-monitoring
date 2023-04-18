import React, { useEffect } from "react";
import { ErrorNotification } from "../../components/ui/toasts/toasts";
import NoGithubInfo from "../../components/ui/github/NoGithubInfo";
import GithubInfo from "../../components/ui/github/GithubInfo";
import LoadingAnimation from "../../components/ui/loading/LoadingAnimation";
import { Project } from "../../interfaces/project.interface";
import {
  getRepoContent,
  selectRepoContent,
} from "../../store/slices/githubRepo.slice";
import { selectCurrentProject } from "../../store/slices/projects.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/react-redux-hooks";

function Github() {
  const project = useAppSelector(selectCurrentProject) as Project;
  const githubRepo = useAppSelector(selectRepoContent);
  const dispatch = useAppDispatch();

  const fetchGithubInfo = async () => {
    try {
      if (!project.github) return null;
      await dispatch(getRepoContent(project.github));
    } catch (error) {
      ErrorNotification((error as Error).message);
    }
  };

  useEffect(() => {
    fetchGithubInfo();
  }, [project]);

  if (githubRepo.status === "Pending") return <LoadingAnimation />;
  if (githubRepo.status === "Failed")
    return (
      <div className="h-full flex justify-center items-center">
        <p>{githubRepo.error}</p>
      </div>
    );

  return !project.github ? (
    <NoGithubInfo />
  ) : (
    <GithubInfo repoContent={githubRepo.content} />
  );
}

export default Github;
