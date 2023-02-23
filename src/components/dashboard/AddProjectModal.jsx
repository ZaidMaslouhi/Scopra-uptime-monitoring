import React, { useContext } from "react";
import FormInput from "../input/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { ErrorNotification, SuccessNotification } from "../toasts/toasts";
import PropTypes from "prop-types";
import { newProject } from "../../services/project.service";
import { getCurrentUser } from "../../services/auth.service";
import { ProjectsContext } from "../../context/ProjectsContext";

function AddProjectModal({ onClose }) {
  const { setProjects } = useContext(ProjectsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => {
    reset();
    onClose();
  };

  const handleModalForm = async (value) => {
    try {
      const project = {
        name: value.projectName,
        timestamp: Date.now(),
      };
      const currentUser = getCurrentUser();
      const newProjectId = await newProject(currentUser, project);
      setProjects((previousProjects) => [
        ...previousProjects,
        { ...project, id: newProjectId, selected: false },
      ]);
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
              <h3 className="text-3xl font-semibold">Create new Monitor</h3>
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
                  ref={register("projectName", {
                    required: "You should give a name to your new project!",
                    minLength: {
                      value: 3,
                      message:
                        "The project name must contain at least 3 letters.",
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "The project name should not pass 15 letters.",
                    },
                  })}
                  errorMessage={errors.projectName?.message}
                />
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

AddProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddProjectModal;
