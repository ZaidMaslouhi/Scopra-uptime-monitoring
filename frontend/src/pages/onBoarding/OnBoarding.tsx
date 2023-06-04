import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/ui/FormInput/FormInput";
import Logo from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import { Project } from "../../interfaces/project.interface";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../components/ui/toasts/toasts";
import { addProject } from "../../store/slices/projects.slice";
import { UserInfo } from "../../interfaces/auth.interface";
import { selectUserState } from "../../store/slices/auth.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/react-redux-hooks";

type FieldValues = {
  projectName: string;
};

function OnBoarding() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserState).user as UserInfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleCreateProject: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    try {
      setLoading(true);
      const project: Project = {
        id: "",
        name: data.projectName,
        selected: true,
        // github: null,
      };
      await dispatch(addProject({ user, project, isDefault: true }));
      navigate("/monitors");
      SuccessNotification("New project created.");
    } catch (_) {
      ErrorNotification("Error: Unable to create a new project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen p-8 bg-slate-100 flex flex-col justify-between">
      <section className="w-full flex justify-center">
        <img src={Logo.toString()} alt="logo" className="w-60" />
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
            <button
              type="submit"
              className="mt-2 py-2 px-5 bg-slate-700 font-normal text-lg text-white rounded-md shadow-2xl duration-300 hover:shadow-none hover:translate-y-1 "
            >
              {loading ? "Loading..." : "Create a new project"}
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
