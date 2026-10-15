"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  FileText,
  Loader2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { apiFetch, getErrorMessage } from "@/lib/api";
import type { Category } from "@/types/category";

// ── Resource type from the backend ────────────────────────────────────────────
// Adjust field names if the backend returns a different shape.
type Resource = {
  id: string;
  title: string;
  description?: string;
  type?: string;
  level?: string;
  duration?: string;
  image?: string;
  category?: string;
};

const filters = ["All", "Guides", "Tutorials", "Documentation"];

function ResourcesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [category, setCategory] = useState<Category | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!categoryId) {
      // Use a microtask so state updates don't happen synchronously in the
      // effect body, which would violate react-hooks/set-state-in-effect.
      Promise.resolve().then(() => {
        setLoading(false);
        setError("No category selected. Please navigate from the Categories page.");
      });
      return;
    }

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch category detail and its resources in parallel
        const [catRes, resRes] = await Promise.all([
          apiFetch(`/categories/${categoryId}`),
          apiFetch(`/categories/${categoryId}/resources`),
        ]);

        if (!catRes.ok) {
          const msg = await getErrorMessage(catRes);
          throw new Error(msg);
        }
        const catData: Category = await catRes.json();
        setCategory(catData);

        if (resRes.ok) {
          const resData: Resource[] = await resRes.json();
          setResources(resData);
        } else {
          // Resources endpoint not yet available or returned empty — not fatal
          console.warn("[ResourcesPage] resources endpoint returned:", resRes.status);
          setResources([]);
        }
      } catch (err) {
        console.error("[ResourcesPage] load error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load category data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [categoryId]);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      (resource.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (resource.description ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (resource.type ?? "").toLowerCase() ===
        activeFilter.slice(0, -1).toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white px-5 py-5 font-roboto md:px-7 lg:px-8">

      {/* HEADER */}
      <div className="mb-6">

        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-blue-600"
          title="Go back"
        >
          <ArrowLeft size={17} />
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <span className="text-[11px] font-semibold text-blue-600">
              KNOWLEDGE CENTER
            </span>

            <h1 className="mt-1 text-2xl font-semibold text-slate-800">
              {loading
                ? "Loading…"
                : category
                ? `${category.name} Resources`
                : "Resources"}
            </h1>

            <p className="mt-1 text-[13px] text-gray-500">
              {category
                ? `Explore guides, tutorials and documentation for ${category.name} development.`
                : "Explore guides, tutorials and documentation."}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 sm:flex">
            <BookOpen size={16} className="text-blue-600" />

            <span className="text-[12px] font-semibold text-slate-700">
              {loading ? "…" : resources.length} Resources
            </span>
          </div>

        </div>
      </div>


      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={22} className="animate-spin text-indigo-400" />
          <span className="ml-2 text-[13px] text-gray-400">
            Loading resources…
          </span>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center">
          <p className="text-[13px] font-semibold text-red-600">{error}</p>
          <p className="mt-1 text-[11px] text-gray-400">
            Make sure the backend is running, then try again.
          </p>
        </div>
      )}

      {/* CONTENT */}
      {!loading && !error && (
        <>
          {/* SEARCH + SORT */}
          <div className="mb-5 flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-[12px] text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[11px] font-semibold text-gray-600 hover:bg-indigo-50"
            >
              <SlidersHorizontal size={14} />
              Latest
            </button>

            <button
              type="button"
              className="h-10 rounded-xl bg-blue-600 px-4 text-[11px] font-semibold text-white hover:bg-blue-700"
            >
              + Add Resources
            </button>

          </div>


          {/* FILTERS */}
          <div className="mb-6 flex flex-wrap gap-2">

            {filters.map((filter) => (

              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                {filter}
              </button>

            ))}

          </div>


          {/* RESOURCE COUNT */}
          <div className="mb-3 flex items-center justify-between">

            <h2 className="text-[14px] font-semibold text-slate-700">
              Available Resources
            </h2>

            <span className="text-[11px] font-medium text-gray-400">
              {filteredResources.length} results
            </span>

          </div>


          {/* RESOURCE LIST */}
          <div className="flex flex-col gap-3">

            {filteredResources.map((resource) => (

              <div
                key={resource.id}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:border-indigo-100 hover:shadow-md sm:flex-row sm:items-center"
              >

                {/* IMAGE */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-50 p-2">
                  {resource.image ? (
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      width={46}
                      height={46}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <FileText size={24} className="text-indigo-300" />
                  )}
                </div>


                {/* RESOURCE CONTENT */}
                <div className="min-w-0 flex-1">

                  <div className="mb-1.5 flex flex-wrap items-center gap-2">

                    {resource.type && (
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-semibold text-indigo-600">
                        {resource.type}
                      </span>
                    )}

                    {resource.level && (
                      <span className="text-[10px] text-gray-400">
                        {resource.level}
                      </span>
                    )}

                  </div>

                  <h3 className="text-[14px] font-semibold text-slate-700 transition group-hover:text-blue-600">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="mt-1 max-w-3xl text-[11px] leading-5 text-gray-500">
                      {resource.description}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-4">

                    {resource.category && (
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <BookOpen size={11} />
                        {resource.category}
                      </span>
                    )}

                    {resource.duration && (
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock size={11} />
                        {resource.duration}
                      </span>
                    )}

                  </div>

                </div>


                {/* VIEW BUTTON */}
                <button
                  type="button"
                  className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold text-blue-600 transition hover:bg-indigo-50"
                >
                  <Eye size={13} />
                  View Resource
                </button>

              </div>

            ))}


            {/* EMPTY STATE */}
            {filteredResources.length === 0 && (

              <div className="rounded-2xl border border-dashed border-gray-200 py-14 text-center">

                <FileText
                  size={24}
                  className="mx-auto mb-3 text-gray-300"
                />

                <h3 className="text-[13px] font-semibold text-slate-700">
                  No resources found
                </h3>

                <p className="mt-1 text-[11px] text-gray-400">
                  {resources.length === 0
                    ? "This category has no resources yet."
                    : "Try searching with a different keyword."}
                </p>

              </div>

            )}

          </div>
        </>
      )}

    </div>
  );
}

// ── Page wrapper — required so useSearchParams works inside Suspense ──────────
export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 size={22} className="animate-spin text-indigo-400" />
        </div>
      }
    >
      <ResourcesContent />
    </Suspense>
  );
}