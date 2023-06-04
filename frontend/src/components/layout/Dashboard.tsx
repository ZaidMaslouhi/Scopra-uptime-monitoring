import React, { useEffect } from "react";
import SideBar from "../ui/dashboard/SideBar";
import NavBar from "../ui/dashboard/NavBar";
import LoadingAnimation from "../ui/loading/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../interfaces/auth.interface";
import { selectUserState } from "../../store/slices/auth.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/react-redux-hooks";
import {
  getAllProjects,
  selectProjectsState,
} from "../../store/slices/projects.slice";
import { ErrorNotification } from "../ui/toasts/toasts";
import { connectWebSocket } from "../../store/slices/websocket.actions";

function Dashboard({ children }: { children: React.ReactNode }) {
  const user = useAppSelector(selectUserState);
  const projects = useAppSelector(selectProjectsState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchProjects = async (currentUser: UserInfo) => {
    try {
      await dispatch(getAllProjects({ user: currentUser }));
    } catch (error) {
      ErrorNotification((error as Error).message);
    }
  };

  useEffect(() => {
    fetchProjects(user.user as UserInfo);
    dispatch(connectWebSocket(import.meta.env.VITE_WEBSOCKET_URI as string));
    // return () => {
    //   dispatch(disconnectWebSocket());
    // };
  }, []);

  useEffect(() => {
    if (
      projects.status === "Failed" ||
      (projects.status === "Succeeded" && projects.projects.length <= 0)
    )
      navigate("/welcome");
  }, [projects]);

  return (
    <main className="w-full h-full min-h-screen flex flex-col box-border bg-slate-200 overflow-y-auto overflow-x-hidden">
      <NavBar />
      <section className="mt-24 pt-14 flex flex-1 flex-row overflow-auto">
        <SideBar />
        <main className="w-full h-auto relative px-12 pb-14 flex flex-col flex-1 gap-20 overflow-hidden">
          {projects.status === "Succeeded" ? children : <LoadingAnimation />}
        </main>
      </section>
    </main>
  );
}

export default Dashboard;
