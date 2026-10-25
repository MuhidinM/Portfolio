export type ProjectCategory =
  | "frontend"
  | "api"
  | "backend"
  | "mobile"
  | "desktop";

/** `id` = stable order from data (default); title-* = alphabetical */
export type ProjectSort = "id" | "title-asc" | "title-desc";

/** A short write-up shown in the project folder. */
export interface CaseStudy {
  role: string;
  context: string;
  work: string[];
  outcome: string;
}

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
  caseStudy?: CaseStudy;
}
