import React from "react";
import logo from "../../assets/images/logo.svg";
import { userSignOut } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiSettings } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { BsLightbulb } from "react-icons/bs";
import { RiTempHotLine } from "react-icons/ri";
import { GiElectric } from "react-icons/gi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

function Dashboard() {
  const projects = [];
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      userSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <main className="w-full h-screen flex flex-col box-border bg-slate-200 overflow-hidden">
      <nav className="w-full h-24 px-12 py-5 bg-white shadow-xl rounded-b-3xl flex justify-between items-center overflow-hidden">
        <section className="h-4/5 flex">
          <img src={logo} alt="scopra logo" />
        </section>
        <section className="flex items-center">
          <div>
            <RxAvatar className="text-3xl text-slate-700 mx-8 cursor-pointer" />
          </div>
          <FiLogOut
            className="inline text-3xl text-slate-700 cursor-pointer"
            onClick={handleSignOut}
          />
        </section>
      </nav>
      <section className="pt-14 flex flex-1 flex-row overflow-hidden">
        <aside className="w-1/5 h-full flex flex-col justify-between text-2xl font-lato font-normal overflow-y-auto">
          <ul>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-white bg-slate-700 shadow-lg">
              <FiHome className="mr-6 h-full" />
              Dashboard
            </li>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-slate-800">
              <HiOutlineDeviceMobile className="mr-6 h-full" />
              Devices
            </li>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-slate-800">
              <BsLightbulb className="mr-6 h-full" />
              Lights
            </li>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-slate-800">
              <RiTempHotLine className="mr-6 h-full" />
              Temperature
            </li>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-slate-800">
              <GiElectric className="mr-6 h-full" />
              Electricity
            </li>
            <li className="flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer text-slate-800">
              <FiSettings className="mr-6 h-full" />
              Settings
            </li>
          </ul>
          {projects.length > 0 && (
            <ul>
              <li className="flex items-center pl-12 my-3 rounded-r-full text-slate-800">
                <button
                  name="projects"
                  id="projects"
                  className="py-2 px-6 my-3 flex items-center rounded-full duration-100 cursor-pointer text-slate-700 border-2 border-slate-700"
                >
                  <span className="text-xl font-semibold">{projects[0]}</span>
                  <MdOutlineKeyboardArrowUp className="inline ml-5" />
                </button>
              </li>
            </ul>
          )}
        </aside>
        <article className="w-full h-full flex flex-col flex-1 justify-center items-center">
          <p className="text-md text-gray-500 mb-4">
            You have no projects yet.
          </p>
          <button className="py-3 px-5 bg-slate-700 text-xl text-white rounded-md shadow-2xl duration-150 hover:shadow-none">
            Create a new project
          </button>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
