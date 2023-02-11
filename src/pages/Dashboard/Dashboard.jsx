import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { getCurrentUser, userSignOut } from "../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiSettings } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { FaWatchmanMonitoring } from "react-icons/fa";
import { SiStatuspal } from "react-icons/si";
import { BsConeStriped } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { getProjects } from "../../services/project.service";

function Dashboard() {
  const sideBarItems = [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: <FiHome />,
    },
    { title: "Monitors", to: "/monitors", icon: <FaWatchmanMonitoring /> },
    { title: "Status Pages", to: "/status", icon: <SiStatuspal /> },
    { title: "Incident", to: "/incident", icon: <BsConeStriped /> },
    { title: "Maintenance", to: "/maintenance", icon: <AiOutlineTool /> },
    { title: "Settings", to: "/settings", icon: <FiSettings /> },
    { title: "Account", to: "/account", icon: <RxAvatar /> },
  ];
  const [projects, setProjects] = useState([]);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      userSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects(user).then((doc) => {
      doc.forEach((project) => {
        setProjects((prevProjects) => [...prevProjects, project.get("name")]);
      });
    });
  }, []);

  return (
    <main className="w-full h-screen flex flex-col box-border bg-slate-200 overflow-hidden">
      <nav className="w-full h-24 px-12 py-5 bg-white shadow-xl rounded-b-3xl flex justify-between items-center overflow-hidden">
        <section className="h-4/5 flex">
          <img src={logo} alt="scopra logo" />
        </section>
        <section className="flex items-center">
          <div>
            {projects.length > 0 && (
              <ul>
                <li className="flex items-center pl-12 my-3 rounded-r-full text-slate-800">
                  <button
                    name="projects"
                    id="projects"
                    className="py-2 px-6 my-3 font-semibold flex items-center rounded-full duration-100 cursor-pointer text-slate-700 border-2 border-slate-700"
                  >
                    <span>{projects[0]}</span>
                    <HiOutlineChevronUpDown className="inline ml-5 text-slate-800" />
                  </button>
                </li>
              </ul>
            )}
          </div>
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
            {sideBarItems.length > 0 &&
              sideBarItems.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-white bg-slate-700 shadow-lg"
                          : "text-slate-800"
                      } flex items-center py-4 pl-12 my-3 rounded-r-full duration-100 cursor-pointer`
                    }
                  >
                    {item.icon}
                    <span className="ml-6">{item.title}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
          {projects.length > 0 && (
            <ul>
              <li className="flex items-center pl-12 my-3 rounded-r-full text-slate-800">
                <button
                  name="projects"
                  id="projects"
                  className="py-2 px-6 my-3 text-xl font-semibold flex items-center rounded-full duration-100 cursor-pointer text-slate-700 border-2 border-slate-700"
                >
                  <span>{projects[0]}</span>
                  <HiOutlineChevronUpDown className="inline ml-5 text-slate-800" />
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
