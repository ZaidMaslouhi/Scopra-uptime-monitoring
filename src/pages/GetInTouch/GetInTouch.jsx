import React, { useState } from "react";
import { subscribe } from "../../services/subscription.service";
import CopyRightsFooter from "../../components/getInTouch/CopyRightsFooter";
import MessageReponse from "../../components/getInTouch/MessageReponse";
import AsideSection from "../../components/getInTouch/AsideSection";

function GetInTouch() {
  const [response, setResponse] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target["email"].value;
    const subscriber = {
      email,
      username: email.split("@")[0],
      timestamp: Date.now(),
    };

    subscribe(subscriber)
      .then(() => {
        setResponse({
          message: `Thank you ${subscriber.username} for your interest. We will be in touch!`,
          style: "border-green-200 bg-green-50 text-green-700",
        });
      })
      .catch(() => {
        setResponse({
          message: `Sorry ${subscriber.username}, something went wrong! please try again later.`,
          style: "border-red-200 bg-red-50 text-red-700",
        });
      });
  };

  return (
    <main className="h-screen flex items-center justify-center bg-slate-200">
      <section className="w-2/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl flex bg-white bg-opacity-90 backdrop-blur-lg drop-shadow-lg">
        <article className="w-full md:w-1/2 h-full py-12 px-5 md:pl-10 md:pr-5 flex flex-col justify-around ">
          <header>
            <h1 className="text-4xl font-bold text-slate-800 text-center md:text-left">
              Get In Touch
            </h1>
            <h2 className="text-lg font-thin text-slate-800 text-center md:text-left">
              The Next Big Thing Is Here!
            </h2>
          </header>
          {Object.keys(response).length != 0 ? (
            <MessageReponse
              message={response.message}
              className={response.style}
            />
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <p className="text-sm font-extralight mb-1 text-center md:text-left">
                Get an electronic mail when it&apos;s ready
              </p>
              <label
                htmlFor="email"
                className="w-full block text-center md:text-left"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email Adress"
                  className="text-sm border-2 border-slate-200 p-2 mb-4 outline-none rounded-md w-3/4"
                  required
                />
                <button className="py-2 px-4 bg-slate-600 text-white text-sm rounded-2xl shadow-lg shadow-slate-400 transition-all ease-linear duration-200 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 ">
                  Notify me
                </button>
              </label>
            </form>
          )}
          <CopyRightsFooter />
        </article>
        <AsideSection />
      </section>
    </main>
  );
}

export default GetInTouch;
