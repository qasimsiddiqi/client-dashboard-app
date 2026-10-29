"use client";

import { ProjectStatus } from "../lib/types";
import { useProjectStore } from "../store/useProjectStore";

const FILTERS: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "To-DO", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "done" },
];

const ProjectFilters = () => {
  const filterStatus = useProjectStore((state) => state.filterStatus);
  const setFilterStatus = useProjectStore((state) => state.setFilterStatus);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map((filter) => {
        const isActive = filterStatus === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => setFilterStatus(filter.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
