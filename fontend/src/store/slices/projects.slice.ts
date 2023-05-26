import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { UserInfo } from "../../interfaces/auth.interface";
import { Project } from "../../interfaces/project.interface";
import {
  addNewProject,
  getProjects,
  removeProject,
  updateProject,
} from "../../services/project.service";
import { RootState } from "../store";

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (payload: { user: UserInfo }) => {
    const { user } = payload;
    const doc = await getProjects(user);
    
    const projects: Project[] = [];
    if (doc.docs.length > 0) {
      doc.docs.map((project) => {
        projects.push({ ...project.data(), id: project.id } as Project);
      });
    }
    return projects;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (payload: { user: UserInfo; project: Project }) => {
    const { user, project } = payload;
    const newProjectId = await addNewProject(user, project);
    return { ...project, id: newProjectId.id };
  }
);

export const updateProjectInfo = createAsyncThunk(
  "projects/updateProjectInfo",
  async (payload: { user: UserInfo; project: Project }) => {
    const { user, project } = payload;
    await updateProject(user, project);
    return { ...project };
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (payload: { user: UserInfo; project: Project }) => {
    const { user, project } = payload;
    await removeProject(user, project);
    return { ...project };
  }
);

interface ProjectsState {
  projects: Project[];
  status: "Idle" | "Pending" | "Succeeded" | "Failed";
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: "Idle",
  error: null,
};

const projctsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      const exist = state.projects.filter(
        (project: Project) => project.id === action.payload.id
      );
      if (exist.length > 0) {
        state.projects.map((project) => {
          if (project.id === action.payload.id) project.selected = true;
          else project.selected = false;
        });
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Projects
    builder.addCase(getAllProjects.pending, (state: ProjectsState) => {
      state.status = "Pending";
    });
    builder.addCase(
      getAllProjects.fulfilled,
      (state: ProjectsState, action) => {
        state.projects = action.payload;
        state.status = "Succeeded";
      }
    );
    builder.addCase(getAllProjects.rejected, (state: ProjectsState) => {
      state.error = "Unable to get projects!";
      state.status = "Failed";
    });
    // Store Project
    builder.addCase(addProject.pending, (state: ProjectsState) => {
      state.status = "Pending";
    });
    builder.addCase(addProject.fulfilled, (state: ProjectsState, action) => {
      state.projects.push(action.payload);
      state.status = "Succeeded";
    });
    builder.addCase(addProject.rejected, (state: ProjectsState) => {
      state.error = "Unable to add new project!";
      state.status = "Failed";
    });
    // Update Project
    builder.addCase(updateProjectInfo.pending, (state: ProjectsState) => {
      state.status = "Pending";
    });
    builder.addCase(
      updateProjectInfo.fulfilled,
      (state: ProjectsState, action) => {
        const projects = state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return { ...project, ...action.payload };
          }
          return project;
        });
        state.projects = [...projects];
        state.status = "Succeeded";
      }
    );
    builder.addCase(updateProjectInfo.rejected, (state: ProjectsState) => {
      state.status = "Failed";
    });
    // Delete Project
    builder.addCase(deleteProject.pending, (state: ProjectsState) => {
      state.status = "Pending";
    });
    builder.addCase(deleteProject.fulfilled, (state: ProjectsState, action) => {
      const projects: Project[] = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
      state.projects = [...projects];
      if (state.projects.length > 0) state.projects[0].selected = true;
      state.status = "Succeeded";
    });
    builder.addCase(deleteProject.rejected, (state: ProjectsState) => {
      state.error = "Unable to delete project!";
      state.status = "Failed";
    });
  },
});

export const selectProjectsState = (state: RootState): ProjectsState =>
  state.projects;

// export const selectCurrentProject = (state: RootState) => {
// return state.projects.projects.length > 0
//   ? state.projects.projects.find((project) => project.selected === true)
//   : [];
// };

export const selectCurrentProject = createSelector(
  (state: RootState) => state.projects.projects,
  (projects: Project[]) => {
    if (projects.length > 0)
      return projects.find((project) => project.selected === true);
    else return [];
  }
);

export const { setCurrentProject } = projctsSlice.actions;

export default projctsSlice.reducer;
