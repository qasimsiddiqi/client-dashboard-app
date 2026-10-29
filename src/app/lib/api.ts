import { Project, ProjectStatus } from "./types";

let projects: Project[] = [
  {
    id: "1",
    title: "Healthcare Platform Redesign",
    client: "MediCare Inc.",
    status: "in-progress",
    description:
      "Complete redesign of the multi-tenant healthcare web and mobile platform with real-time notifications and geo-fencing features.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Paint Industry Project Manager",
    client: "ColorWorks Ltd.",
    status: "todo",
    description:
      "Multi-tenant project management system for a paint manufacturing company with PDF report generation.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "SwiftServe Mobile App",
    client: "ServiceHub",
    status: "done",
    description:
      "Cross-platform mobile application that allows service vendors to create profiles and manage appointments.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Client Dashboard Portal",
    client: "TechNova",
    status: "in-progress",
    description:
      "Internal client-facing dashboard for tracking project status, progress, and real-time updates.",
    updatedAt: new Date().toISOString(),
  },
];

// Simulating a network delay

const delay = (ms: number = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------
// API Functions
// ----------------------------

// get all projects
export const getProjects = async (): Promise<Project[]> => {
  await delay();
  return [...projects];
};

// update project status
export const updateProjectStatus = async (
  id: string,
  status: ProjectStatus,
): Promise<Project> => {
  await delay(400); // added a custom shorter delay

  const projectIndex = projects.findIndex((item) => item.id === id);

  if (projectIndex === -1) {
    throw new Error(`Project with id ${id} not found`);
  }

  const updatedProject: Project = {
    ...projects[projectIndex],
    status,
    updatedAt: new Date().toISOString(),
  };

  projects[projectIndex] = updatedProject;

  return updatedProject;
};
