import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorNotification, SuccessNotification } from "../toasts/toasts";
import ComingSoon from "../dashboard/ComingSoon";
import FormInput from "../FormInput/FormInput";
import { UserInfo } from "../../../interfaces/auth.interface";
import {
  selectUserState,
  updateUserInfo,
} from "../../../store/slices/auth.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/react-redux-hooks";
import {
  selectProjectsState,
  setCurrentProject,
} from "../../../store/slices/projects.slice";
import { Project } from "../../../interfaces/project.interface";

type FieldValues = {
  receiveReport: boolean;
  email: string;
  fullName: string;
  phoneNumber: string;
  defaultProject: string;
  smsAutoRecharge: boolean;
};

function General() {
  const user = useAppSelector(selectUserState).user as UserInfo;
  const projects = useAppSelector(selectProjectsState).projects as Project[];
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      receiveReport: false,
      email: user?.email || "",
      fullName: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      defaultProject: user?.defaultProject || "",
      smsAutoRecharge: false,
    },
  });

  const handleAccountSettings: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    try {
      const accountInfo: UserInfo = {
        ...user,
        id: user.id,
        username: data.fullName,
        phoneNumber: data.phoneNumber,
        defaultProject: data.defaultProject,
      };

      await dispatch(updateUserInfo(accountInfo)).then((response) => {
        if (response.payload) {
          const data = response.payload as any;
          dispatch(setCurrentProject(data.user.defaultProject));
        }
      });

      SuccessNotification(`Account information updated successfully!`);
    } catch (_) {
      ErrorNotification(`Unable to update account information!`);
    }
  };

  return (
    <section className="w-full h-full">
      <form onSubmit={handleSubmit(handleAccountSettings)}>
        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">Email Address</p>
            <p className="text-sm font-light">
              You will receive an email to comfirm your new address when change
              it.
            </p>
          </div>
          <div className="w-80">
            <FormInput
              type="email"
              id="email"
              placeholder="Enter your new email address"
              readOnly
              inputref={register("email")}
              errorMessage={errors.email?.message?.toString()}
            />
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">Full Name</p>
          </div>
          <div className="w-80">
            <FormInput
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              inputref={register("fullName")}
              errorMessage={errors.fullName?.message?.toString()}
            />
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">Phone Number</p>
            <p className="text-sm font-light">
              Your phone number prefixed with your country code to receive SMS
              alerts.
            </p>
          </div>
          <div className="w-80">
            <FormInput
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              inputref={register("phoneNumber")}
              errorMessage={errors.phoneNumber?.message?.toString()}
            />
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">Default Project</p>
            <p className="text-sm font-light">
              Select a project to be select by default.
            </p>
          </div>
          <div className="w-80">
            <select
              id="defaultProject"
              {...register("defaultProject", { required: true })}
              className="w-full block p-3 bg-slate-200 text-gray-800 text-sm rounded-md outline-none"
            >
              {projects.length &&
                projects.map((project) => {
                  return (
                    <option
                      key={project.id}
                      defaultValue={user.defaultProject}
                      value={project.id}
                    >
                      {project.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <hr className="my-6" />
        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">SMS Auto Recharge</p>
            <p className="text-sm font-light">
              Set automatic 5$ recharge of 20 SMS credit when they fall down to
              0.
            </p>
          </div>
          <div className="flex gap-8 items-center">
            <FormInput
              type="checkbox"
              id="smsAutoRecharge"
              disabled
              inputref={register("smsAutoRecharge")}
              errorMessage={errors.smsAutoRecharge?.message?.toString()}
            />
            <ComingSoon />
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex gap-4 items-center">
          <div className="w-1/3">
            <p className="text-lg font-medium">
              Do you want to receive the weekly report?
            </p>
          </div>
          <div className="flex gap-8 items-center">
            <FormInput
              type="checkbox"
              id="receiveReport"
              disabled
              inputref={register("receiveReport")}
              errorMessage={errors.receiveReport?.message?.toString()}
            />
            <ComingSoon />
          </div>
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
  );
}

export default General;
