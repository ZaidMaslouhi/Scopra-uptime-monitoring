import React, { useState } from "react";
import { subscribe } from "../../services/subscription.service";
import MessageReponse from "../../components/getInTouch/MessageReponse/MessageReponse";
import stayTunedLottie from "../../assets/lotties/stay-tuned-lottie.json";
import InitLayout from "../../layouts/InitLayout";
import FormInput from "../../components/input/FormInput/FormInput";
import { useForm } from "react-hook-form";

function GetInTouch() {
  const [response, setResponse] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubscriber = async (value) => {
    const subscriber = {
      email: value.email,
      username: value.email.split("@")[0],
      timestamp: Date.now(),
    };
    try {
      await subscribe(subscriber);
      setResponse({
        message: `Thank you ${subscriber.username} for your interest. We will be in touch!`,
        style: "border-green-200 bg-green-50 text-green-700",
      });
    } catch (_) {
      setResponse({
        message: `Sorry ${subscriber.username}, something went wrong! please try again later.`,
        style: "border-red-200 bg-red-50 text-red-700",
      });
    }
  };

  return (
    <InitLayout image={stayTunedLottie}>
      <section>
        <header className="my-4 2xl:mt-0 2xl:mb-6">
          <h1 className="mb-2 text-xl 2xl:text-4xl font-semibold text-slate-900 text-center md:text-left">
            The next big thing is Here!
          </h1>
          <h2 className="text-md 2xl:text-xl font-thin text-slate-800 text-center md:text-left">
            Get an electronic mail when it&apos;s ready
          </h2>
        </header>
        {Object.keys(response) != 0 ? (
          <MessageReponse
            message={response.message}
            className={response.style}
          />
        ) : (
          <form onSubmit={handleSubmit(handleSubscriber)} className="text-center sm:text-left">
            <FormInput
              label="Email"
              id="Email"
              type="email"
              placeholder="Enter Email"
              className="text-xs border-2 border-slate-200 p-2 mr-2 outline-none rounded-md w-3/4"
              ref={register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
              errorMessage={errors.email?.message}
            />
            <button className="py-2 px-4 bg-slate-600 text-white text-sm rounded-2xl shadow-lg shadow-slate-400 transition-all ease-linear duration-200 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 ">
              Notify me
            </button>
          </form>
        )}
      </section>
    </InitLayout>
  );
}

export default GetInTouch;
