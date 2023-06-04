import React from "react";
import {
  deleteProject,
  selectCurrentProject,
  selectProjectsState,
  setCurrentProject,
  updateProjectInfo,
} from "../../store/slices/projects.slice";
import { selectUserState } from "../../store/slices/auth.slice";
import { Project } from "../../interfaces/project.interface";
import { UserInfo } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/ui/FormInput/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ErrorNotification,
  IConfirmationModal,
  SuccessNotification,
  comfirmationToast,
} from "../../components/ui/toasts/toasts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/react-redux-hooks";

type FieldValues = {
  projectName: string;
  githubOwner?: string;
  githubRepository?: string;
};

function ProjectSettings() {
  const user = useAppSelector(selectUserState).user as UserInfo;
  const selectedProject = useAppSelector(selectCurrentProject) as Project;
  const projects = useAppSelector(selectProjectsState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      projectName: selectedProject.name,
      // githubOwner: selectedProject.github?.owner || "",
      // githubRepository: selectedProject.github?.repository || "",
    },
  });

  const onDeleteProject = async (userInfo: UserInfo, project: Project) => {
    if (selectedProject.selected) {
      ErrorNotification("Default project cannot be deleted.");
      return null;
    }
    const message: IConfirmationModal = {
      title: "Delete Project",
      body: "You will lose all of your project related data. this action cannot be undone!",
      ButtonText: "Delete Project",
      onConfirm: () => {
        dispatch(deleteProject({ user: userInfo, project }));
        if (projects.projects.length > 0) {
          dispatch(setCurrentProject({ id: projects.projects[0].id }));
        } else {
          navigate("/welcome");
        }
        SuccessNotification("Project deleted successfully!");
      },
    };
    comfirmationToast(message);
  };

  const handleProjectSettings: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    try {
      const project: Project = {
        ...selectedProject,
        name: data.projectName,
        // github: {
        //   owner: data.githubOwner || "",
        //   repository: data.githubRepository || "",
        // },
      };
      await dispatch(updateProjectInfo({ user: user, project }));
      SuccessNotification(`${data.projectName} project updated successfully!`);
    } catch (_) {
      ErrorNotification(`Unable to update project information!`);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-4xl text-slate-800 font-semibold font-lato">
        Project Settings
      </h2>
      <section className="w-full p-12 flex flex-col gap-4 bg-white rounded-2xl shadow-2xl overflow-y-auto">
        <form onSubmit={handleSubmit(handleProjectSettings)}>
          <div className="flex gap-4 items-center">
            <div className="w-1/3">
              <p className="text-lg font-medium">Project Name</p>
              <p className="text-sm font-light">Name your project</p>
            </div>
            <FormInput
              type="text"
              id="projectName"
              placeholder="Project name"
              inputref={register("projectName", {
                required: "You should give a name to your new project!",
                minLength: {
                  value: 3,
                  message: "The project name must contain at least 3 letters.",
                },
                maxLength: {
                  value: 15,
                  message: "The project name should not pass 15 letters.",
                },
              })}
              errorMessage={errors.projectName?.message?.toString()}
            />
          </div>

          <hr className="my-6" />

          <div className="flex gap-4 items-center">
            <div className="w-1/3">
              <p className="text-lg font-medium">Github Owner</p>
            </div>
            <FormInput
              type="text"
              id="githubOwner"
              placeholder="Github owner"
              inputref={register("githubOwner")}
              errorMessage={errors.githubOwner?.message?.toString()}
            />
          </div>

          <hr className="my-6" />

          <div className="flex gap-4 items-center">
            <div className="w-1/3">
              <p className="text-lg font-medium">Github Repository</p>
            </div>
            <FormInput
              type="text"
              id="githubRepository"
              placeholder="Github repository"
              inputref={register("githubRepository")}
              errorMessage={errors.githubRepository?.message?.toString()}
            />
          </div>

          <hr className="my-6" />

          <div className="flex gap-4 items-center">
            <div className="w-1/3">
              <p className="text-lg font-medium">Delete project</p>
              <p className="text-sm font-light">
                To delete a project, you must move or delete all resources
                within it. Default project cannot be deleted.
              </p>
            </div>
            <button
              type="button"
              className="py-2 px-9 bg-red-400 text-white text-lg rounded-lg disabled:bg-red-300"
              onClick={() => onDeleteProject(user, selectedProject)}
            >
              Delete Project
            </button>
          </div>

          <hr className="my-6" />

          <div className="flex gap-4 items-center">
            <div className="w-1/3"></div>
            <button
              type="submit"
              className="py-2 px-5 bg-slate-700 font-normal text-lg text-white rounded-md shadow-2xl duration-300 hover:shadow-none hover:translate-y-1"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default ProjectSettings;
