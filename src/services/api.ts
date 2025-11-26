import type { Project } from "../types";

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Project 01",
    date: "01.07",
    imageUrl: "/images/projects/Fixed-image-2.jpg",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    id: 2,
    title: "Project 02",
    date: "24.06",
    imageUrl: "/images/projects/Fixed-image-6.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Project 03",
    date: "18.06",
    imageUrl: "/images/projects/Fixed-image-3.jpg",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    id: 4,
    title: "Project 04",
    date: "01.06",
    imageUrl: "/images/projects/Fixed-image-5.jpg",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 5,
    title: "Project 05",
    date: "15.05",
    imageUrl: "/images/projects/Fixed-image-7.jpg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    title: "Project 06",
    date: "08.05",
    imageUrl: "/images/projects/Fixed-image-4.jpg",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  },
];

/**
 * Fetches all projects from the mock API
 *
 * @returns Promise resolving to array of projects
 */
export async function fetchProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Return a copy to prevent mutations
  return [...mockProjects];
}

/**
 * Fetches a single project by ID
 *
 * @param id - Project ID to fetch
 * @returns Promise resolving to project or undefined if not found
 */
export async function fetchProjectById(
  id: number
): Promise<Project | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return mockProjects.find((project) => project.id === id);
}
