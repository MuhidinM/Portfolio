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
    case "date-asc":
      next.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "date-desc":
      next.sort((a, b) => b.date.localeCompare(a.date));
      break;
    case "title-asc":
      next.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      next.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      next.sort((a, b) => b.date.localeCompare(a.date));
  }
  return next;
}

export interface ProjectsQuery {
  page?: number;
  pageSize?: number;
  category?: ProjectCategory | "all";
  q?: string;
  sort?: ProjectSort;
  /** When true, return only featured items (max `limit`) */
  featuredOnly?: boolean;
  featuredLimit?: number;
  /** Exclude featured projects from paginated grid */
  excludeFeatured?: boolean;
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
  const sort = opts.sort ?? "date-desc";
  const excludeFeatured = opts.excludeFeatured ?? true;

  if (opts.featuredOnly) {
    const limit = opts.featuredLimit ?? 3;
    let list = getPublishedProjects().filter((p) => p.featured);
    list = sortProjects(list, "date-desc");
    const items = list.slice(0, limit);
    return {
      items,
      page: 1,
      pageSize: items.length,
      total: items.length,
      totalPages: 1,
    };
  }

  let list = getPublishedProjects().filter((p) => matchesCategory(p, category));
  list = list.filter((p) => matchesSearch(p, q));
  if (excludeFeatured) {
    list = list.filter((p) => !p.featured);
  }
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
