import React, { useState } from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import AddProjectModal from "./AddProjectModal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Project } from "../../../interfaces/project.interface";
import {
  selectCurrentProject,
  selectProjectsState,
  setCurrentProject,
} from "../../../store/slices/projects.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/react-redux-hooks";

function ProjectsButton() {
  const [showModal, setShowModal] = useState(false);
  const projects = useAppSelector(selectProjectsState);
  const currentProject = useAppSelector(selectCurrentProject) as Project;
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setShowModal(false);
  };

  const selectProject = (projectId: string) => {
    dispatch(setCurrentProject({ id: projectId }));
  };

  return (
    <>
      {projects.projects.length > 0 && (
        <div className="max-w-xs w-52  relative text-center">
          {showModal ? <AddProjectModal onClose={closeModal} /> : null}
          <button
            name="projects"
            id="projects"
            className="mx-auto py-2 px-6 text-xl font-semibold flex items-center rounded-full duration-100 cursor-pointer text-slate-700 border-2 border-slate-700 peer"
          >
            <span>{currentProject.name}</span>
            <HiOutlineChevronUpDown className="inline ml-auto mr-0 text-slate-800" />
          </button>
          <ul className="w-5/6 bg-slate-50 border border-slate-300 rounded-lg hidden overflow-hidden shadow-lg absolute right-2/4 translate-x-1/2 peer-hover:block hover:block">
            {projects.projects.map((project: Project) => {
              if (!project.selected)
                return (
                  <li
                    className={`${project.id} px-6 py-4 text-md font-medium text-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-300`}
                    key={project.id}
                    onClick={() => selectProject(project.id)}
                  >
                    {project.name}
                  </li>
                );
            })}
            <li
              className="px-6 py-4 text-md font-medium text-slate-800 flex gap-2 items-center justify-center cursor-pointer hover:bg-slate-300"
              key="addProject"
              onClick={() => setShowModal(true)}
            >
              <IoIosAddCircleOutline />
              <p className="text-sm font-thin">New Project</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProjectsButton;
