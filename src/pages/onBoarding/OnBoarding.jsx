import React from "react";
import { newProject } from "../../services/project.service";
import { useForm } from "react-hook-form";
import FormInput from "../../components/input/FormInput/FormInput";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth.service";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../components/toasts/toasts";

function OnBoarding() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleCreateProject = async (value) => {
    try {
      const project = {
        name: value.projectName,
        timestamp: Date.now(),
      };
      const currentUser = getCurrentUser();
      await newProject(currentUser, project);
      SuccessNotification("New project created.");
      navigate("/monitors");
    } catch (_) {
      ErrorNotification("Error: Unable to create a new project.");
    }
  };

  return (
    <main className="w-full h-screen p-8 bg-slate-100 flex flex-col justify-between">
      <section className="w-full flex justify-center">
        <img src={logo} alt="logo" className="w-60" />
      </section>
      <section className="h-full w-full flex flex-1 flex-col justify-center items-center text-center px-20 py-14">
        <h1 className="text-5xl font-light text-slate-900">
          👋 Welcome to Scopra!
        </h1>
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">
            You have no projects yet. Let&apos;s create a project.
          </p>
          <form onSubmit={handleSubmit(handleCreateProject)}>
            <FormInput
              className="px-5 py-2 text-center border-2 border-slate-400 rounded-md outline-none"
              type="text"
              placeholder="Project name"
              ref={register("projectName", {
                required: "Please enter the project name!",
              })}
              errorMessage={errors.projectName?.message}
            />
            <button
              type="submit"
              className="py-2 px-5 bg-slate-700 font-normal text-lg text-white rounded-md shadow-2xl duration-300 hover:shadow-none hover:translate-y-1 "
            >
              Create a new project
            </button>
          </form>
        </div>
      </section>
      <footer>
        <p className="mt-auto mb-0 text-xs text-center text-gray-500">
          &copy; made in 🇲🇦 with 💓😀 {new Date().getFullYear()}.
        </p>
      </footer>
    </main>
  );
}

export default OnBoarding;
