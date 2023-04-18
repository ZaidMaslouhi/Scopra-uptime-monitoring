import React from "react";
import MonitorCard from "./MonitorCard";
import AddMonitorModal from "./AddMonitorModal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Monitor } from "../../../interfaces/monitor.interface";

function MonitorsList({ monitors }: { monitors: Monitor[] }): JSX.Element {
  return (
    <section className="w-full h-full grid grid-cols-4 gap-8 content-start">
      {monitors.map((monitor) => (
        <MonitorCard key={monitor.id} {...monitor} />
      ))}
      <AddMonitorModal
        buttonContent={
          <>
            <IoIosAddCircleOutline className="text-2xl" />
            <p className="text-xl font-thin">New Monitor</p>
          </>
        }
        className="h-48 flex gap-4 justify-center items-center bg-white px-8 py-6 rounded-2xl shadow-2xl"
      />
    </section>
  );
}

export default MonitorsList;
