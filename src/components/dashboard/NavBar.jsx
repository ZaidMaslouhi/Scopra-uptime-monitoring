import React from "react";
import ProjectsButton from "./ProjectsButton";
import logo from "../../assets/images/logo.svg";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userSignOut } from "../../services/auth.service";
import { ErrorNotification } from "../toasts/toasts";

function NavBar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      userSignOut();
      navigate("/login");
    } catch (_) {
      ErrorNotification("Error occurred during logout.");
    }
  };
  return (
    <nav className="w-full h-24 px-12 py-5 bg-white shadow-xl rounded-b-3xl flex justify-between items-center">
      <section className="h-4/5 flex flex-1">
        <img src={logo} alt="scopra logo" />
      </section>
      <section className="flex items-center">
        <ProjectsButton />
        <div>
          <RxAvatar className="text-3xl text-slate-700 mx-8 cursor-pointer" />
        </div>
        <FiLogOut
          className="inline text-3xl text-slate-700 cursor-pointer"
          onClick={handleSignOut}
        />
      </section>
    </nav>
  );
}

export default NavBar;
