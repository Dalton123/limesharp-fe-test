export interface Project {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
}

export type ProjectId = number | null;
export interface AnimationState {
  isAnimating: boolean;
  selectedId: ProjectId;
}
