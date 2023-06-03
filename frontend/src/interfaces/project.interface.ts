import { Github } from "./github.interface";

export interface Project {
  name: string;
  id: string;
  selected: boolean;
  // github: Github | null;
}

export const isProject = (project: Project | unknown): project is Project => {
  return (project as Project).id !== undefined;
};
