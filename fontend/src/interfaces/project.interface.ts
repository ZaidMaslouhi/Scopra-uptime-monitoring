import { Github } from "./github.interface";

interface Project {
  name: string;
  id: string;
  selected?: boolean;
  timestamp?: number;
  github: Github | null;
}

export { Project };
