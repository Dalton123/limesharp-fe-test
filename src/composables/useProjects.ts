import { ref, type Ref } from "vue";
import type { Project } from "../types";
import { fetchProjects } from "../services/api";

interface UseProjectsReturn {
  projects: Ref<Project[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  loadProjects: () => Promise<void>;
}

/**
 * Composable hook for fetching and managing projects
 *
 * @returns Object containing projects array, loading state, error state, and load function
 */
export function useProjects(): UseProjectsReturn {
  const projects = ref<Project[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const loadProjects = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      projects.value = await fetchProjects();
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    loadProjects,
  };
}
