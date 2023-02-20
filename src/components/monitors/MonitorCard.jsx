import React from "react";
import PropTypes from "prop-types";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { SiAirplayaudio } from "react-icons/si";

function MonitorCard({ name, endpoint }) {
  return (
    <div className="h-48 w-1/3 xl:w-1/4 2xl:w-1/5 flex flex-col grow-1 justify-between gap-2 bg-white px-8 py-6 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center">
        <h3 className="font-lato font-bold text-2xl capitalize text-slate-800">
          {name}
        </h3>
        <div>
          <span>
            <SiAirplayaudio className="text-green-600" />
          </span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <HiOutlineLockClosed className="text-green-600 inline text-lg" />
        <a
          href={endpoint}
          target="_blank"
          className="text-gray-500 font-semibold text-lg"
          rel="noreferrer"
        >
          <p>{endpoint}</p>
        </a>
      </div>
      <div className="flex">
        <div className="flex-1">
          <span className="text-green-500 font-bold">UPTIME</span>
          <p className="text-lg text-gray-900 font-bold">100%</p>
        </div>
        <div className="flex-1">
          <span className="text-md text-gray-700 font-bold">Reponse Time</span>
          <p className="text-lg text-gray-900 font-bold">10ms</p>
        </div>
      </div>
    </div>
  );
}
MonitorCard.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default MonitorCard;