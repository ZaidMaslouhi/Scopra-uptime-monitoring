import React from "react";
import AddMonitorModal from "./AddMonitorModal";

function NoMonitors() {
  return (
    <article className="w-full h-full flex flex-col flex-1 justify-center items-center">
      <p className="text-md text-gray-500 mb-4">You have no monitor yet.</p>
      <AddMonitorModal
        buttonContent="Create a new monitor"
        className="py-3 px-5 bg-slate-700 text-xl text-white rounded-md shadow-2xl duration-150 hover:shadow-none"
      />
    </article>
  );
}

export default NoMonitors;