import { Mock, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Project } from "../../../interfaces/project.interface";
import * as projectServiceMock from "../../../services/project.service";
import {
  getStateWithProjects,
  getStoreWithState,
} from "../../../utils/test-utils";
import projectsReducer, {
  addProject,
  deleteProject,
  getAllProjects,
  selectCurrentProject,
  setCurrentProject,
  updateProjectInfo,
} from "../projects.slice";

vi.mock("../../../services/project.service");
const mockStore = configureStore([thunk])();
const mockProjectsData = [
  { id: "1", data: () => ({ name: "Project 1" }) },
  { id: "2", data: () => ({ name: "Project 2" }) },
  { id: "3", data: () => ({ name: "Project 3" }) },
];
const mockedProjectsList = [
  {
    id: "1",
    name: "project 1",
    selected: true,
    github: { owner: "foo", repository: "bar" },
  },
  {
    id: "2",
    name: "project 2",
    selected: false,
    github: null,
  },
];
const mockUser = {
  uid: "foo",
  email: "jhon@gmail.com",
  username: "",
  photoURL: "",
  phoneNumber: "",
};

describe("Projects Slice", () => {
  afterEach(() => {
    mockStore.clearActions();
  });

  test("should return the initial state when dispach an empty action", () => {
    const initialState = getStateWithProjects([]);
    const action = { type: "" };
    const result = projectsReducer(initialState.projects, action);

    expect(result).toStrictEqual({
      projects: [],
      status: "Idle",
      error: null,
    });
  });

  describe("Projects action creators", () => {
    test("should change the default selected project state", () => {
      const state = getStateWithProjects([...mockedProjectsList]);
      const store = getStoreWithState(state);
      store.dispatch(setCurrentProject({ ...mockedProjectsList[1] }));

      expect(store.getState().projects).toStrictEqual({
        projects: [
          { ...mockedProjectsList[0], selected: false },
          { ...mockedProjectsList[1], selected: true },
        ],
        status: "Idle",
        error: null,
      });
    });

    test("should return the same state when dispach setCurrentProject with missing project id ", () => {
      const state = getStateWithProjects([...mockedProjectsList]);
      const store = getStoreWithState(state);
      store.dispatch(setCurrentProject({ id: "3" }));

      expect(store.getState().projects).toStrictEqual({
        projects: [...mockedProjectsList],
        status: "Idle",
        error: null,
      });
    });
  });

  describe("Thunks with mocked redux store ", () => {
    describe("getAllProjects", () => {
      test("should return list of projects", async () => {
        const mockedGetProjects = projectServiceMock.getProjects as Mock;
        mockedGetProjects.mockResolvedValueOnce({
          docs: [...mockProjectsData],
        });

        await mockStore.dispatch(getAllProjects({ user: mockUser }) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/getAllProjects/pending");
        expect(actions[1].type).toEqual("projects/getAllProjects/fulfilled");
        expect(actions[1].payload).toHaveLength(3);
        mockProjectsData.forEach((project, index) => {
          expect(actions[1].payload[index]).toStrictEqual({
            ...project.data(),
            id: project.id,
          });
        });
      });

      test("should return empty list", async () => {
        const mockedGetProjects = projectServiceMock.getProjects as Mock;
        mockedGetProjects.mockResolvedValueOnce({ docs: [] });

        await mockStore.dispatch(getAllProjects({ user: mockUser }) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toHaveLength(0);
        expect(actions[0].type).toEqual("projects/getAllProjects/pending");
        expect(actions[1].type).toEqual("projects/getAllProjects/fulfilled");
      });

      test("should return error message", async () => {
        const mockedGetProjects = projectServiceMock.getProjects as Mock;
        mockedGetProjects.mockRejectedValueOnce(
          new Error("Unable to get projects!")
        );

        await mockStore.dispatch(getAllProjects({ user: mockUser }) as never);
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toBeUndefined();
        expect(actions[0].type).toEqual("projects/getAllProjects/pending");
        expect(actions[1].type).toEqual("projects/getAllProjects/rejected");
        expect(actions[1].error.message).toEqual("Unable to get projects!");
      });
    });

    describe("addProject", () => {
      test("should return new project object ", async () => {
        const mockedAddProject = projectServiceMock.addNewProject as Mock;
        mockedAddProject.mockResolvedValueOnce({ id: "123456789" });
        const mockNewProject: Project = {
          name: "Project 1",
          id: "",
          github: null
        };

        await mockStore.dispatch(
          addProject({ user: mockUser, project: mockNewProject }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/addProject/pending");
        expect(actions[1].type).toEqual("projects/addProject/fulfilled");
        expect(actions[1].payload).toStrictEqual({
          name: "Project 1",
          id: "123456789",
        });
      });

      test("should return error message", async () => {
        const mockedAddProject = projectServiceMock.addNewProject as Mock;
        mockedAddProject.mockRejectedValueOnce(
          new Error("Unable to add new project!")
        );
        const mockNewProject: Project = {
          id: "foo",
          name: "Project 1",
          github: null
        };

        await mockStore.dispatch(
          addProject({ user: mockUser, project: mockNewProject }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[1].payload).toBeUndefined();
        expect(actions[0].type).toEqual("projects/addProject/pending");
        expect(actions[1].type).toEqual("projects/addProject/rejected");
        expect(actions[1].error.message).toEqual("Unable to add new project!");
      });
    });

    describe("updateProjectInfo", () => {
      test("should return updated project", async () => {
        const mockedUpdateProject = projectServiceMock.updateProject as Mock;
        mockedUpdateProject.mockResolvedValueOnce({});

        await mockStore.dispatch(
          updateProjectInfo({
            user: mockUser,
            project: { ...mockedProjectsList[0], name: "project 3" },
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/updateProjectInfo/pending");
        expect(actions[1].type).toEqual("projects/updateProjectInfo/fulfilled");
        expect(actions[1].payload).toStrictEqual({
          ...mockedProjectsList[0],
          name: "project 3",
        });
      });

      test("should return error message", async () => {
        const mockedAddProject = projectServiceMock.updateProject as Mock;
        mockedAddProject.mockRejectedValueOnce(
          new Error("Unable to update new project!")
        );

        await mockStore.dispatch(
          updateProjectInfo({
            user: { uid: "123", email: "john@gmail.com" },
            project: mockedProjectsList[0],
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/updateProjectInfo/pending");
        expect(actions[1].type).toEqual("projects/updateProjectInfo/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual(
          "Unable to update new project!"
        );
      });
    });

    describe("deleteProject", () => {
      test("should return the deleted project object", async () => {
        const mockedRemovedProject = projectServiceMock.removeProject as Mock;
        mockedRemovedProject.mockResolvedValueOnce({});

        await mockStore.dispatch(
          deleteProject({
            user: mockUser,
            project: { ...mockedProjectsList[0] },
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/deleteProject/pending");
        expect(actions[1].type).toEqual("projects/deleteProject/fulfilled");
        expect(actions[1].payload).toStrictEqual({ ...mockedProjectsList[0] });
      });

      test("should return error message", async () => {
        const mockedRemovedProject = projectServiceMock.removeProject as Mock;
        mockedRemovedProject.mockRejectedValueOnce(
          new Error("Unable to delete thie project!")
        );

        await mockStore.dispatch(
          deleteProject({
            user: { uid: "123", email: "john@gmail.com" },
            project: { ...mockedProjectsList[0] },
          }) as never
        );
        const actions = mockStore.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual("projects/deleteProject/pending");
        expect(actions[1].type).toEqual("projects/deleteProject/rejected");
        expect(actions[1].payload).toBeUndefined();
        expect(actions[1].error.message).toEqual(
          "Unable to delete thie project!"
        );
      });
    });
  });

  describe("Thunks with associated reducer methods / with full redux store", () => {
    describe("getAllProjects", () => {
      test("should return list of projects with success status", async () => {
        const mockedGetProjects = projectServiceMock.getProjects as Mock;
        mockedGetProjects.mockResolvedValueOnce({ docs: mockProjectsData });
        const store = getStoreWithState();

        await store.dispatch(getAllProjects({ user: mockUser }));

        expect(store.getState().projects).toEqual({
          projects: [
            { name: "Project 1", id: "1" },
            { name: "Project 2", id: "2" },
            { name: "Project 3", id: "3" },
          ],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedGetProjects = projectServiceMock.getProjects as Mock;
        mockedGetProjects.mockRejectedValueOnce(
          new Error("Unable to get projects!")
        );

        const store = getStoreWithState();
        await store.dispatch(getAllProjects({ user: mockUser }));

        expect(store.getState().projects).toEqual({
          projects: [],
          status: "Failed",
          error: "Unable to get projects!",
        });
      });
    });

    describe("addProject", () => {
      test("should add the new project to the projects state with success status", async () => {
        const mockedAddProject = projectServiceMock.addNewProject as Mock;
        mockedAddProject.mockResolvedValueOnce({ id: "3" });

        const state = getStateWithProjects([...mockedProjectsList]);
        const store = getStoreWithState(state);
        expect(store.getState().projects).toEqual({
          projects: [...mockedProjectsList],
          status: "Idle",
          error: null,
        });

        const mockNewProject: Project = {
          id: "3",
          name: "project 3",
          github: null
        };
        await store.dispatch(
          addProject({
            user: mockUser,
            project: mockNewProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [...mockedProjectsList, { name: "project 3", id: "3" }],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedAddProject = projectServiceMock.addNewProject as Mock;
        mockedAddProject.mockRejectedValueOnce(
          new Error("Unable to add new project!")
        );

        const state = getStateWithProjects([...mockedProjectsList]);
        const store = getStoreWithState(state);
        const mockNewProject: Project = {
          id: "3",
          name: "project 3",
          github: null
        };
        await store.dispatch(
          addProject({
            user: mockUser,
            project: mockNewProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [...mockedProjectsList],
          status: "Failed",
          error: "Unable to add new project!",
        });
      });
    });

    describe("updateProjectInfo", () => {
      test("should push the updated project to the projects state with success status", async () => {
        const mockedUpdatedProject = projectServiceMock.updateProject as Mock;
        mockedUpdatedProject.mockResolvedValueOnce({});

        const state = getStateWithProjects([...mockedProjectsList]);
        const store = getStoreWithState(state);

        const mockUpdatedProject: Project = {
          id: "1",
          name: "project 2",
          github: null
        };
        await store.dispatch(
          updateProjectInfo({
            user: mockUser,
            project: mockUpdatedProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [
            { ...mockedProjectsList[0], name: mockUpdatedProject.name },
            { ...mockedProjectsList[1] },
          ],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedAddProject = projectServiceMock.addNewProject as Mock;
        mockedAddProject.mockRejectedValueOnce(
          new Error("Unable to add new project!")
        );

        const store = getStoreWithState();
        const mockNewProject: Project = {
          id: "2",
          name: "project 2",
          github: null
        };
        await store.dispatch(
          addProject({
            user: mockUser,
            project: mockNewProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [],
          status: "Failed",
          error: "Unable to add new project!",
        });
      });
    });

    describe("deleteProject", () => {
      test("should remove the given project from the projects list state with success status", async () => {
        const mockedRemovedProject = projectServiceMock.removeProject as Mock;
        mockedRemovedProject.mockResolvedValueOnce({});

        const state = getStateWithProjects([...mockedProjectsList]);
        const store = getStoreWithState(state);

        const mockRemovedProject: Project = { ...mockedProjectsList[0] };
        await store.dispatch(
          deleteProject({
            user: mockUser,
            project: mockRemovedProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [{ ...mockedProjectsList[1], selected: true }],
          status: "Succeeded",
          error: null,
        });
      });

      test("should return error message with failed status", async () => {
        const mockedRemovedProject = projectServiceMock.removeProject as Mock;
        mockedRemovedProject.mockRejectedValueOnce(
          new Error("Unable to delete project!")
        );

        const store = getStoreWithState();
        const mockRemovedProject: Project = mockedProjectsList[0];
        await store.dispatch(
          deleteProject({
            user: { uid: "foo", email: "john@gmail.com" },
            project: mockRemovedProject,
          })
        );

        expect(store.getState().projects).toEqual({
          projects: [],
          status: "Failed",
          error: "Unable to delete project!",
        });
      });
    });
  });

  describe("Selectors", () => {
    describe("selectCurrentProject", () => {
      test("should return empty array if no projects exist", () => {
        const state = getStateWithProjects([]);
        const result = selectCurrentProject(state);

        expect(result).toHaveLength(0);
      });

      test("should return the selected project", () => {
        const state = getStateWithProjects(mockedProjectsList);
        const result = selectCurrentProject(state);

        mockedProjectsList.forEach((project) => {
          if (project.selected) expect(result).toEqual(project);
          else expect(result).not.toEqual(project);
        });
      });

      test("should not compute again with the same state", () => {
        const state1 = getStateWithProjects(mockedProjectsList);
        selectCurrentProject.resetRecomputations();
        selectCurrentProject(state1);
        selectCurrentProject(state1);
        selectCurrentProject(state1);
        expect(selectCurrentProject.recomputations()).toEqual(0);
      });

      test("should recompute with new state", () => {
        const state1 = getStateWithProjects(mockedProjectsList);
        selectCurrentProject.resetRecomputations();
        selectCurrentProject(state1);
        selectCurrentProject(state1);
        selectCurrentProject(state1);
        expect(selectCurrentProject.recomputations()).toEqual(0);

        const mockProjects2 = [
          { ...mockedProjectsList[0], selected: true },
          { ...mockedProjectsList[1], selected: false },
        ];
        const state2 = getStateWithProjects(mockProjects2);
        selectCurrentProject(state2);
        expect(selectCurrentProject.recomputations()).toEqual(1);
      });
    });
  });
});
