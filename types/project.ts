export type ProjectCategory =
  | "web"
  | "api"
  | "backend"
  | "mobile"
  | "desktop";

export type ProjectSort =
  | "date-desc"
  | "date-asc"
  | "title-asc"
  | "title-desc";

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
