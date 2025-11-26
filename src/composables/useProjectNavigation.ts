/**
 * Composable for managing project navigation and selection state
 */

import { ref, computed, type Ref, type ComputedRef } from "vue";
import type { ProjectId, Project } from "../types";
import { ANIMATION_DURATIONS } from "../constants/animation";

interface UseProjectNavigationReturn {
  selectedProjectId: Ref<ProjectId>;
  isAnimating: Ref<boolean>;
  isDetailViewOpen: ComputedRef<boolean>;
  openProject: (id: number) => void;
  closeProject: () => void;
  getSelectedProject: (projects: Project[]) => Project | undefined;
}

/**
 * Composable hook for managing project selection and navigation state
 *
 * @returns Object containing navigation state and control functions
 */
export function useProjectNavigation(): UseProjectNavigationReturn {
  const selectedProjectId = ref<ProjectId>(null);
  const isAnimating = ref<boolean>(false);

  /**
   * Computed property to check if detail view is open
   */
  const isDetailViewOpen = computed(() => selectedProjectId.value !== null);

  /**
   * Opens a project detail view
   *
   * @param id - ID of the project to open
   */
  const openProject = (id: number): void => {
    if (isAnimating.value) return;

    isAnimating.value = true;
    selectedProjectId.value = id;

    setTimeout(() => {
      isAnimating.value = false;
    }, ANIMATION_DURATIONS.TOTAL_OPEN);
  };

  /**
   * Closes the currently open project detail view
   */
  const closeProject = (): void => {
    if (isAnimating.value) return;

    isAnimating.value = true;
    selectedProjectId.value = null;

    setTimeout(() => {
      isAnimating.value = false;
    }, ANIMATION_DURATIONS.TOTAL_CLOSE);
  };

  /**
   * Gets the currently selected project from the projects array
   *
   * @param projects - Array of all projects
   * @returns Selected project or undefined if none selected
   */
  const getSelectedProject = (projects: Project[]): Project | undefined => {
    if (selectedProjectId.value === null) return undefined;
    return projects.find((p) => p.id === selectedProjectId.value);
  };

  return {
    selectedProjectId,
    isAnimating,
    isDetailViewOpen,
    openProject,
    closeProject,
    getSelectedProject,
  };
}
