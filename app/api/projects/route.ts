import { NextRequest, NextResponse } from "next/server";
import { queryProjects } from "@/lib/projects";
import type { ProjectCategory, ProjectSort } from "@/types/project";

const CATEGORIES: (ProjectCategory | "all")[] = [
  "all",
  "web",
  "api",
  "backend",
  "mobile",
  "desktop",
];

const SORTS: ProjectSort[] = [
  "date-desc",
  "date-asc",
  "title-asc",
  "title-desc",
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const featuredOnly = searchParams.get("featuredOnly") === "true";
  const featuredLimit = Math.min(
    Math.max(Number(searchParams.get("featuredLimit") || "3"), 1),
    12
  );

  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "9");

  const cat = searchParams.get("category") || "all";
  const category = (
    CATEGORIES.includes(cat as ProjectCategory | "all") ? cat : "all"
  ) as ProjectCategory | "all";

  const q = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "date-desc";
  const sort = SORTS.includes(sortParam as ProjectSort)
    ? (sortParam as ProjectSort)
    : "date-desc";

  const excludeFeatured =
    searchParams.get("excludeFeatured") !== "false";

  const result = queryProjects({
    featuredOnly,
    featuredLimit,
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 9,
    category,
    q,
    sort,
    excludeFeatured: featuredOnly ? false : excludeFeatured,
  });

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
