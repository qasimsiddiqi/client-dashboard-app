import { create } from "zustand";
import { ProjectStatus } from "../lib/types";

interface ProjectStore {
  // states
  filterStatus: ProjectStatus | "all";

  // actions
  setFilterStatus: (status: ProjectStatus | "all") => void;
  resetFilters: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  filterStatus: "all",
  setFilterStatus: (status) => set({ filterStatus: status }),
  resetFilters: () => set({ filterStatus: "all" }),
}));
