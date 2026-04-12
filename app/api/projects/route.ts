import { NextRequest, NextResponse } from "next/server";
import { queryProjects } from "@/lib/projects";
import type { ProjectCategory, ProjectSort } from "@/types/project";

const CATEGORIES: (ProjectCategory | "all")[] = [
  "all",
  "frontend",
  "backend",
  "mobile",
  "desktop",
];

const SORTS: ProjectSort[] = ["id", "title-asc", "title-desc"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "9");

  const cat = searchParams.get("category") || "all";
  const category = (
    CATEGORIES.includes(cat as ProjectCategory | "all") ? cat : "all"
  ) as ProjectCategory | "all";

  const q = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "id";
  const sort = SORTS.includes(sortParam as ProjectSort)
    ? (sortParam as ProjectSort)
    : "id";

  const result = queryProjects({
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 9,
    category,
    q,
    sort,
  });

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
