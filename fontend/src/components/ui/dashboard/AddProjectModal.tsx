import React from "react";
import FormInput from "../FormInput/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorNotification, SuccessNotification } from "../toasts/toasts";
import { Project } from "../../../interfaces/project.interface";
import {
  addProject,
} from "../../../store/slices/projects.slice";
import { selectUserState } from "../../../store/slices/auth.slice";
import { UserInfo } from "../../../interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/react-redux-hooks";

type FieldValues = {
  projectName: string;
  githubOwner?: string;
  githubRepo?: string;
};

function AddProjectModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserState).user as UserInfo;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const closeModal = () => {
    reset();
    onClose();
  };

  const handleModalForm: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    try {
      const project: Project = {
        id: "",
        name: data.projectName,
        github: {
          owner: data.githubOwner ?? "",
          repository: data.githubRepo ?? "",
        },
        timestamp: Date.now(),
        selected: false,
      };

      await dispatch(addProject({ user, project }));

      closeModal();
      SuccessNotification("New project created.");
    } catch (_) {
      ErrorNotification("Error: Unable to create a new project.");
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Create new Project</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-slate-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => closeModal()}
              >
                <span className="bg-transparent text-slate-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleModalForm)}>
              <div className="relative p-6 flex-auto text-left">
                <FormInput
                  label="Project Name"
                  id="projectName"
                  placeholder="Your new project name"
                  inputref={register("projectName", {
                    required: "You should give a name to your new project!",
                    minLength: {
                      value: 3,
                      message:
                        "The project name must contain at least 3 letters.",
                    },
                    maxLength: {
                      value: 15,
                      message: "The project name should not pass 15 letters.",
                    },
                  })}
                  errorMessage={errors.projectName?.message?.toString()}
                />
                <div className="flex items-stretch gap-8">
                  <div className="flex-1">
                    <FormInput
                      label="Github Owner"
                      id="githubOwner"
                      placeholder="Enter the github owner"
                      inputref={register("githubOwner")}
                      errorMessage={errors.githubOwner?.message?.toString()}
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="Github Repository"
                      id="githubRepo"
                      placeholder="Enter the github repository"
                      inputref={register("githubRepo")}
                      errorMessage={errors.githubRepo?.message?.toString()}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-700 bg-gray-100 font-lato font-semibold text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="reset"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
                <button
                  className="bg-slate-700 text-white active:bg-slate-900 font-lato font-bold text-sm px-6 py-3 rounded shadow-lg hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default AddProjectModal;
