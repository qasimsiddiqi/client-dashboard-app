export type ProjectStatus = "todo" | "in-progress" | "done";

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  status: ProjectStatus;
  updatedAt: string;
}
