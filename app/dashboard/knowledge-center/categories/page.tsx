"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, ImagePlus, Loader2 } from "lucide-react";
import { apiFetch, getErrorMessage } from "@/lib/api";
import type { Category } from "@/types/category";

// A small rotating palette so the cards still get varied background colours
// even when the data comes from the API.
const BG_PALETTE = [
  "bg-indigo-50",
  "bg-green-50",
  "bg-purple-50",
  "bg-yellow-50",
  "bg-orange-50",
  "bg-sky-50",
  "bg-pink-50",
  "bg-teal-50",
];

function cardBg(index: number): string {
  return BG_PALETTE[index % BG_PALETTE.length];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch("/categories");
        if (!res.ok) {
          const msg = await getErrorMessage(res);
          throw new Error(msg);
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("[CategoriesPage] fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load categories."
        );
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white px-5 py-5 font-roboto md:px-7 lg:px-8">

      {/* HEADER */}
      <div className="mb-7 flex items-center justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">

            <Link
              href="/dashboard/knowledge-center"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-white text-slate-600 transition hover:bg-indigo-50 hover:text-blue-600"
            >
              <ArrowLeft size={15} />
            </Link>

            <span className="text-[11px] font-semibold text-blue-600">
              KNOWLEDGE CENTER
            </span>

          </div>

          <h1 className="text-2xl font-semibold text-slate-800">
            Categories
          </h1>

          <p className="mt-1 text-[13px] text-gray-500">
            Explore all available learning categories.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 sm:flex">
          <BookOpen size={16} className="text-blue-600" />

          <span className="text-[12px] font-semibold text-slate-700">
            {loading ? "…" : categories.length} Categories
          </span>
        </div>

      </div>


      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={22} className="animate-spin text-indigo-400" />
          <span className="ml-2 text-[13px] text-gray-400">
            Loading categories…
          </span>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center">
          <p className="text-[13px] font-semibold text-red-600">{error}</p>
          <p className="mt-1 text-[11px] text-gray-400">
            Make sure the backend is running and try refreshing.
          </p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && categories.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-400">
            <ImagePlus size={20} />
          </div>
          <p className="text-[13px] font-semibold text-slate-700">
            No categories yet
          </p>
          <p className="mt-1 text-[11px] text-gray-400">
            Categories added from the Add Category page will appear here.
          </p>
        </div>
      )}

      {/* CATEGORY GRID */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {categories.map((category, index) => (

            <Link
              key={category.id}
              href={`/dashboard/knowledge-center/categories/resources?categoryId=${category.id}`}
              className={`${cardBg(index)} group rounded-2xl p-4 transition duration-200 hover:-translate-y-1 hover:shadow-md`}
            >

              {/* IMAGE */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                {category.image?.url ? (
                  <Image
                    src={category.image.url}
                    alt={category.name}
                    width={42}
                    height={42}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <ImagePlus size={22} className="text-gray-300" />
                )}
              </div>


              {/* CATEGORY INFO */}
              <h2 className="text-[15px] font-semibold text-slate-700">
                {category.name}
              </h2>

              <p className="mt-1 font-dmserif text-[12px] font-semibold text-gray-500">
                {category.resourceCount}+ resources
              </p>


              {/* EXPLORE */}
              <div className="mt-5 flex items-center justify-between">

                <span className="text-[11px] font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
                  Explore
                </span>

                <span className="text-[11px] font-medium text-gray-400">
                  Knowledge Center
                </span>

              </div>

            </Link>

          ))}

        </div>
      )}

    </div>
  );
}