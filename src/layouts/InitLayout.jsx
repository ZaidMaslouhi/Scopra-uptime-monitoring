import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";

function InitLayout({ children, image }) {
  return (
    <main className="h-screen flex items-center justify-center bg-slate-200">
      <article className="w-3/4 md:w-1/2 h-3/4 rounded-2xl overflow-hidden shadow-2xl flex bg-white bg-opacity-90 backdrop-blur-lg drop-shadow-lg">
        <section className="w-full md:w-1/2 h-full py-8 px-5 md:pl-10 md:pr-5 flex flex-col justify-between ">
          {children}
            <footer>
              <p className="mt-auto mb-0 text-xs text-center text-gray-500 md:text-left">
                &copy; made in 🇲🇦 with 💓😀 {new Date().getFullYear()}.
              </p>
            </footer>
        </section>
        <aside className="hidden md:flex w-1/2 items-center h-auto shadow-lg overflow-hidden rounded-2xl m-4 bg-slate-200">
          <Lottie animationData={image} loop={true} />
        </aside>
      </article>
    </main>
  );
}

InitLayout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
};

export default InitLayout;
