export type ProjectCategory =
  | "web"
  | "api"
  | "backend"
  | "mobile"
  | "desktop";

/** `id` = stable order from data (default); title-* = alphabetical */
export type ProjectSort = "id" | "title-asc" | "title-desc";

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  stack: string[];
  gitUrl: string;
  previewUrl: string;
  featured: boolean;
  published: boolean;
  date: string;
}
