import React, { useState } from "react";
import SingleForm from "../../../components/layout/SingleForm";
import loginLottie from "../../../assets/lotties/login-lottie.json";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import OauthButton from "../../../components/ui/OauthButton/OauthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../components/ui/FormInput/FormInput";
import { UserInfo } from "../../../interfaces/auth.interface";
import { authLogin } from "../../../store/slices/auth.slice";
import { useAppDispatch } from "../../../utils/hooks/react-redux-hooks";

type FieldValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  watch(() => setAuthError(null));

  const handleLogin: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      setLoading(true);
      const user: UserInfo = {
        uid: "",
        email: data.email,
        password: data.password,
      };
      await dispatch(authLogin(user));
      navigate("/monitors");
    } catch (error) {
      if (error instanceof Error) {
        const message: string = error.message;
        message
          .slice(message.indexOf("/") + 1, message.lastIndexOf(")"))
          .replaceAll("-", " ")
          .toUpperCase();
        setAuthError(`Unable to get profile information: ${message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SingleForm image={loginLottie}>
      <header className="my-4 2xl:my-0">
        <h2 className="text-xl 2xl:text-4xl font-semibold text-slate-900 text-center md:text-left">
          Nice to see you again 👋
        </h2>
      </header>
      <section>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormInput
            label="Email"
            id="Email"
            placeholder="Enter Email"
            inputref={register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
            errorMessage={errors.email?.message?.toString()}
          />
          <FormInput
            label="Password"
            id="Password"
            type="password"
            placeholder="Enter Password"
            inputref={register("password", {
              required: "Password is required",
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                message:
                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
              },
            })}
            errorMessage={errors.password?.message?.toString()}
          />
          <div className="flex my-4 mx-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
              id="rememberMe"
              className="accent-slate-700 outline-none"
            />
            <label htmlFor="rememberMe" className="text-slate-900 text-xs ml-2">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-center text-white text-sm bg-slate-800 border-2 border-slate-800 font-semibold block w-full rounded-md mt-3 px-4 py-2 shadow-lg ease-in transition-all duration-200 outline-none hover:bg-transparent hover:text-slate-800 hover:-translate-y-1 hover:shadow-2xl"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
          {authError && (
            <p className="mt-2 text-sm text-center text-red-700 leading-4 block">
              {authError}
            </p>
          )}
        </form>
        <hr className="my-5 bg-slate-900" />
        <OauthButton
          Icon={FcGoogle}
          title="Or sign on with Google"
          routeTo="/monitors"
        />
        <div className="mt-6">
          <p className="text-xs text-center text-slate-500">
            Dont have an account?{" "}
            <Link to="/register" className="font-bold text-slate-900">
              Sign up now
            </Link>
          </p>
        </div>
      </section>
    </SingleForm>
  );
}

export default Login;
