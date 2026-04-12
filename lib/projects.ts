import projectsJson from "@/data/projects.json";
import type { Project, ProjectCategory, ProjectSort } from "@/types/project";

const ALL = projectsJson as Project[];

export function getAllProjects(): Project[] {
  return ALL;
}

export function getPublishedProjects(): Project[] {
  return ALL.filter((p) => p.published);
}

export function getLivePreviewCount(): number {
  return getPublishedProjects().filter(
    (p) => p.previewUrl && p.previewUrl !== "/"
  ).length;
}

export function getPublishedCount(): number {
  return getPublishedProjects().length;
}

function matchesCategory(p: Project, category: ProjectCategory | "all"): boolean {
  if (category === "all") return true;
  return p.categories.includes(category);
}

function matchesSearch(p: Project, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const hay = `${p.title} ${p.description} ${p.stack.join(" ")}`.toLowerCase();
  return hay.includes(s);
}

function sortProjects(list: Project[], sort: ProjectSort): Project[] {
  const next = [...list];
  switch (sort) {
    case "title-asc":
      next.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      next.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "id":
    default:
      next.sort((a, b) => a.id - b.id);
  }
  return next;
}

export interface ProjectsQuery {
  page?: number;
  pageSize?: number;
  category?: ProjectCategory | "all";
  q?: string;
  sort?: ProjectSort;
}

export interface ProjectsResult {
  items: Project[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function queryProjects(opts: ProjectsQuery): ProjectsResult {
  const pageSize = Math.min(Math.max(opts.pageSize ?? 9, 1), 48);
  const page = Math.max(opts.page ?? 1, 1);
  const category = opts.category ?? "all";
  const q = opts.q ?? "";
  const sort = opts.sort ?? "id";

  let list = getPublishedProjects().filter((p) => matchesCategory(p, category));
  list = list.filter((p) => matchesSearch(p, q));
  list = sortProjects(list, sort);

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const items = list.slice(start, start + pageSize);

  return {
    items,
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}
