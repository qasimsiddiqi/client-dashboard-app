"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project, ProjectStatus } from "../lib/types";
import { updateProjectStatus } from "../lib/api";

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
};

const statusOptions: ProjectStatus[] = ["todo", "in-progress", "done"];

const ProjectCard = ({ project }: ProjectCardProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newStatus: ProjectStatus) =>
      updateProjectStatus(project.id, newStatus),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previousProjects = queryClient.getQueryData<Project[]>([
        "projects",
      ]);

      queryClient.setQueryData<Project[]>(["projects"], (oldProjects) => {
        if (!oldProjects) return oldProjects;
        return oldProjects.map((p) =>
          p.id === project.id
            ? { ...p, status: newStatus, updatedAt: new Date().toISOString() }
            : p,
        );
      });

      return { previousProjects };
    },
    onError: (err, newStatus, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(
          ["projects"],
          context.previousProjects,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ProjectStatus;
    mutation.mutate(newStatus);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        {/* Left side - Project info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {project.title}
            </h3>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[project.status]}`}
            >
              {project.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-2">Client: {project.client}</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            Last updated: {new Date(project.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Right side - Status dropdown */}
        <div className="flex flex-col items-end gap-2">
          <label className="text-xs text-gray-500 font-medium">
            Change Status
          </label>
          <select
            value={project.status}
            onChange={handleStatusChange}
            disabled={mutation.isPending}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {mutation.isPending && (
            <span className="text-xs text-blue-500">Updating...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
