import React from "react";
import { BiInfinite } from "react-icons/bi";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../utils/hooks/react-redux-hooks";

function Usage() {
  const projects = useAppSelector((state: RootState) => state.projects);
  const monitors = useAppSelector((state: RootState) => state.monitors);

  return (
    <section className="w-full h-full">
      <div className="w-full flex items-center">
        <p className="text-xl font-semibold">
          A summary of the usage on your account.
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-wrap gap-10">
        {/* Monitors */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Monitors</p>
            <p className="text-lg font-semibold">
              {monitors.monitors.length}/15
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${(monitors.monitors.length / 15) * 100}%` }}
            ></div>
          </div>
        </div>
        {/* Status Pages */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Status Pages</p>
            <p className="text-lg font-semibold">0/1</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${0}%` }}
            ></div>
          </div>
        </div>
        {/* Teammates */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Teammates</p>
            <p className="text-lg font-semibold">1/3</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${33}%` }}
            ></div>
          </div>
        </div>
        {/* SMS credits */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">SMS credits</p>
            <p className="text-lg font-semibold">20/20</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${100}%` }}
            ></div>
          </div>
        </div>
        {/* Status page subscribers */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Status page subscribers</p>
            <p className="text-lg font-semibold">0/10</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${0}%` }}
            ></div>
          </div>
        </div>
        {/* Projects */}
        <div className="w-full flex flex-col basis-5/12 gap-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Projects</p>
            <p className="text-lg font-semibold">
              {projects.projects.length}/
              <BiInfinite className="inline ml-1" />
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `2%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Usage;
