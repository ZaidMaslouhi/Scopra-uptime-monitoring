import React, { useEffect } from "react";
import { BiInfinite } from "react-icons/bi";

function Usage() {

  useEffect(() => {
    console.log("Usage");
  }, []);

  
  return (
    <section className="w-full h-full">
      <div className="w-full flex items-center">
        <p className="text-xl font-semibold">
          A summary of the usage on your account.
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-8">
        {/* Monitors */}
        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Monitors</p>
            <p className="text-lg font-semibold">5/15</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${33}%` }}
            ></div>
          </div>
        </div>
        {/* Status Pages */}
        <div className="flex flex-col gap-2 w-1/2">
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
        <div className="flex flex-col gap-2 w-1/2">
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
        <div className="flex flex-col gap-2 w-1/2">
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
        <div className="flex flex-col gap-2 w-1/2">
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
        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Projects</p>
            <p className="text-lg font-semibold">
              1/
              <BiInfinite className="inline ml-1" />
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-slate-600 h-2.5 rounded-full"
              style={{ width: `${1}%` }}
            ></div>
          </div>
        </div>
        {/*  */}
      </div>
    </section>
  );
}

export default Usage;
