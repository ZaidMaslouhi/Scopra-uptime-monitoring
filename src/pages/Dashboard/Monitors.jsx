import React, { useContext, useEffect, useState } from "react";
import LoadingAnimation from "../../components/loading/LoadingAnimation";
import MonitorCard from "../../components/monitors/MonitorCard";
import AddMonitorModal from "../../components/monitors/AddMonitorModal";
import NoMonitors from "../../components/monitors/NoMonitors";
import { getMonitors } from "../../services/monitor.service";
import { getCurrentUser } from "../../services/auth.service";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ProjectsContext } from "../../context/ProjectsContext";
import { MonitorsContext } from "../../context/MonitorsContext";
import { ErrorNotification } from "../../components/toasts/toasts";

function Monitors() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projects } = useContext(ProjectsContext);
  const user = getCurrentUser();

  const fetchMonitors = async (user, project) => {
    try {
      setLoading(true);
      const doc = await getMonitors(user, project);
      setMonitors([]);
      doc.forEach((monitor) => {
        setMonitors((prevMonitor) => [
          ...prevMonitor,
          { ...monitor.data(), id: monitor.id },
        ]);
      });
    } catch (_) {
      ErrorNotification("Error: Unable to get monitors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentProject = projects.find((project) => project.selected);
    fetchMonitors(user, currentProject);
  }, [projects]);

  return (
    <MonitorsContext.Provider value={{ monitors, setMonitors }}>
      <article className="w-full h-full px-12 flex flex-1 gap-6 flex-wrap content-start">
        {loading ? (
          <LoadingAnimation />
        ) : monitors.length > 0 ? (
          <>
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
              className="h-48 w-1/3 xl:w-1/4 2xl:w-1/5 flex gap-4 justify-center items-center bg-white px-8 py-6 rounded-2xl shadow-2xl"
            />
          </>
        ) : (
          <NoMonitors />
        )}
      </article>
    </MonitorsContext.Provider>
  );
}

export default Monitors;
