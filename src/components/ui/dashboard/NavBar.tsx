import React from "react";
import ProjectsButton from "./ProjectsButton";
import logo from "../../../assets/icons/logo.svg";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../toasts/toasts";
import { signOut } from "../../../store/slices/auth.slice";
import { useAppDispatch } from "../../../utils/hooks/react-redux-hooks";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOut());
      navigate("/login");
    } catch (_) {
      ErrorNotification("Error occurred during logout.");
    }
  };

  const navigateToAccount = () => {
    navigate("/account");
  };

  return (
    <nav className="w-full h-24 px-12 py-5 fixed bg-white shadow-xl rounded-b-3xl flex justify-between items-center z-10">
      <section className="h-4/5 flex flex-1">
        <img src={logo.toString()} alt="scopra logo" />
      </section>
      <section className="flex items-center">
        <ProjectsButton />
        <div>
          <RxAvatar
            className="text-3xl text-slate-700 mx-8 cursor-pointer"
            onClick={navigateToAccount}
          />
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
