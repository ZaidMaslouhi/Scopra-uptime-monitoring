import React from "react";
import Lottie from "lottie-react";
import Logo from "../../assets/icons/logo.svg";

function SingleForm({
  children,
  image,
}: {
  children: React.ReactNode;
  image: unknown;
}) {
  return (
    <main className="h-screen flex items-center justify-center bg-slate-200">
      <article className="w-3/4 md:w-1/2 2xl:w-5/12 h-4/5 rounded-2xl overflow-hidden shadow-2xl flex bg-white bg-opacity-90 backdrop-blur-lg drop-shadow-lg">
        <section className="w-full md:w-1/2 h-full py-4 md:py-8 px-5 md:pl-10 md:pr-8 flex flex-col justify-between 2xl:justify-evenly overflow-auto">
          <section className="mt-3 flex justify-center md:justify-start">
            <img
              src={Logo.toString()}
              alt="scopra logo"
              className="w-1/2 md:w-2/3 2xl:w-1/2"
            />
          </section>
          {children}
          <footer>
            <p className="mt-auto mb-0 text-xs text-center text-gray-500">
              &copy; made in 🇲🇦 with 💓😀 {new Date().getFullYear()}.
            </p>
          </footer>
        </section>
        <aside className="hidden md:flex w-1/2 items-center h-auto shadow-lg overflow-hidden rounded-2xl m-6 bg-slate-200">
          <Lottie animationData={image} loop={true} />
        </aside>
      </article>
    </main>
  );
}

export default SingleForm;
