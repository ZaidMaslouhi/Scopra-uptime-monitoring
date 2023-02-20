import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../services/auth.service";
import { getProjects } from "../services/project.service";
import { ProjectsContext } from "../context/ProjectsContext";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import { ErrorNotification } from "../components/toasts/toasts";
import SideBar from "../components/dashboard/SideBar";
import NavBar from "../components/dashboard/NavBar";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (user) => {
    try {
      setLoading(true);
      const doc = await getProjects(user);
      if(!doc.docs.length) navigate('/welcome');
      let projectsList = [];
      doc.docs.map((project, index) => {
        projectsList = [
          ...projectsList,
          { ...project.data(), id: project.id, selected: index === 0 },
        ];
      });
      setProjects(projectsList);
    } catch (_) {
      ErrorNotification("Error: Unable to get projects.");
      navigate('/welcome');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    fetchProjects(user);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
          <main className="w-full h-screen flex flex-col box-border bg-slate-200 overflow-hidden">
            <NavBar />
            <section className="pt-14 flex flex-1 flex-row overflow-hidden">
              <SideBar />
              {children}
            </section>
          </main>
        </ProjectsContext.Provider>
      )}
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
