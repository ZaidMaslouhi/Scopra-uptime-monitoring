import React, { useEffect } from "react";
import MonitorsList from "../../components/ui/monitors/MonitorsList";
import LoadingAnimation from "../../components/ui/loading/LoadingAnimation";
import { ErrorNotification } from "../../components/ui/toasts/toasts";
import { UserInfo } from "../../interfaces/auth.interface";
import { Project } from "../../interfaces/project.interface";
import { selectUserState } from "../../store/slices/auth.slice";
import NoMonitors from "../../components/ui/monitors/NoMonitors";
import {
  getAllMonitors,
  selectMonitorsState,
} from "../../store/slices/monitors.slice";
import {
  selectCurrentProject,
  selectProjectsState,
} from "../../store/slices/projects.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/react-redux-hooks";
import { sendWebSocketMessage } from "../../store/slices/websocket.actions";

function Monitors() {
  const user = useAppSelector(selectUserState).user as UserInfo;
  const projects = useAppSelector(selectProjectsState);
  const project: Project = useAppSelector(selectCurrentProject) as Project;
  const monitors = useAppSelector(selectMonitorsState);
  const dispatch = useAppDispatch();

  const fetchMonitors = async (userInfo: UserInfo, project: Project) => {
    try {
      await dispatch(
        getAllMonitors({ userId: userInfo.id, projectId: project.id })
      ).then((result) => {
        const tasks = (result.payload as any).monitors.map(
          (monitor: any) => monitor.monitor.taskId
        );
        dispatch(sendWebSocketMessage(tasks));
      });
    } catch (error) {
      ErrorNotification((error as Error).message);
    }
  };

  useEffect(() => {
    if (projects.status === "Succeeded" && projects.projects.length > 0) {
      fetchMonitors(user, project);
    }
  }, [project]);

  if (monitors.status === "Pending") return <LoadingAnimation />;
  if (monitors.status === "Failed")
    return (
      <div className="h-full flex justify-center items-center">
        <p>{monitors.error}</p>
      </div>
    );

  return monitors.monitors.length > 0 ? (
    <MonitorsList monitors={monitors.monitors} />
  ) : (
    <NoMonitors />
  );
}

export default Monitors;
