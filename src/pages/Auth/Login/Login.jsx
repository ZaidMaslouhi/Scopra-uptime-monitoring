import React from "react";
import InitLayout from "../../../layouts/InitLayout";
import loginLottie from "../../../assets/lotties/Login-lottie.json";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function Login() {
  return (
    <InitLayout image={loginLottie}>
      <header>
        <h2 className="text-3xl font-bold text-slate-900 text-center md:text-left">
          Nice to see you again
        </h2>
      </header>
      <section>
        <form>
          <label htmlFor="email" className="text-slate-900 text-xs mx-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="w-full block p-3 mb-3 bg-slate-200 text-gray-800 text-sm rounded-md outline-none"
          />
          <label htmlFor="password" className="text-slate-900 text-xs mx-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="w-full block p-3 mb-3 bg-slate-200 text-gray-800 text-sm rounded-md outline-none"
          />
          <div className="flex mb-3 mx-2">
            <input
              type="checkbox"
              name="rememberMe"
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
            Sign in
          </button>
        </form>
        <hr className="my-5 bg-slate-900" />
        <button
          type="button"
          className="text-center text-slate-800 border-2 border-slate-800 bg-white font-semibold block w-full rounded-md mt-3 px-4 py-2 shadow-sm transition-all duration-200 outline-none hover:shadow-md"
        >
          <FcGoogle className="inline text-xl mr-1" /> Or sign in with Google
        </button>
        <div className="mt-6">
          <p className="text-xs text-center text-slate-500">
            Dont have an account?{" "}
            <Link to="/register" className="font-bold text-slate-900">
              Sign up now
            </Link>
          </p>
        </div>
      </section>
    </InitLayout>
  );
}

export default Login;
