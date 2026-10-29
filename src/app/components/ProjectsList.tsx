"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../lib/api";
import { useProjectStore } from "../store/useProjectStore";
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const filterStatus = useProjectStore((state) => state.filterStatus);

  const filteredProjects =
    filterStatus === "all"
      ? projects
      : projects.filter((project) => project.status === filterStatus);

  // Loading & Error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Track and manage your client projects in real-time
      </p>

      {/* Filters */}
      <ProjectFilters />

      {/* Project Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredProjects.length} project
        {filteredProjects.length !== 1 ? "s" : ""}
      </p>

      {/* Project Cards */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No projects found with the selected filter.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
