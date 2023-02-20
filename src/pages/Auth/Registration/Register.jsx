import React, { useState } from "react";
import InitLayout from "../../../layouts/InitLayout";
import registerationLottie from "../../../assets/lotties/registeration-lottie.json";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import OauthButton from "../../../components/auth/OauthButton/OauthButton";
import FormInput from "../../../components/input/FormInput/FormInput";
import { useForm } from "react-hook-form";
import {
  signOnGoogle,
  registerWithEmailAndPassword,
} from "../../../services/auth.service";

function Register() {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  watch(() => setAuthError(""));

  const handleSignUpGoogle = () => signOnGoogle();

  const handleRegistration = async (values) => {
    try {
      setLoading(true);
      await registerWithEmailAndPassword({
        email: values.email,
        password: values.password,
      });
      setInterval(() => {
        navigate("/welcome");
      }, 2000);
    } catch ({ message }) {
      const msg = message
        .slice(message.indexOf("/") + 1, message.lastIndexOf(")"))
        .replaceAll("-", " ")
        .toUpperCase();
      setAuthError(`Unable to store your profile information: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InitLayout image={registerationLottie}>
      <header className="my-4 2xl:my-0">
        <h2 className="text-xl 2xl:text-4xl font-semibold text-slate-900 text-center md:text-left">
          Sign up and get started today! 😉
        </h2>
      </header>
      <section>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <FormInput
            label="Email"
            id="Email"
            type="email"
            placeholder="Enter Email"
            errorMessage={errors.email?.message}
            ref={register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          <FormInput
            label="Password"
            id="Password"
            type="password"
            placeholder="Enter Password"
            errorMessage={errors.password?.message}
            ref={register("password", {
              required: "Password is required",
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                message:
                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
              },
            })}
          />
          <div className="flex my-4 mx-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="accent-slate-700 outline-none"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="text-slate-900 text-xs ml-2">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-center text-white text-sm bg-slate-800 border-2 border-slate-800 font-semibold block w-full rounded-md mt-3 px-4 py-2 shadow-lg ease-in transition-all duration-200 outline-none hover:bg-transparent hover:text-slate-800 hover:-translate-y-1 hover:shadow-2xl"
          >
            {loading ? "Loading..." : "Create an account"}
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
          handleClick={handleSignUpGoogle}
          routeTo="/monitors"
        />
        <div className="mt-6">
          <p className="text-xs text-center text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-slate-900">
              Sign in now
            </Link>
          </p>
        </div>
      </section>
    </InitLayout>
  );
}

export default Register;
