"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { apiFetch, getErrorMessage } from "@/lib/api";
import type { Category } from "@/types/category";

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function AddCategoryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [categoryName, setCategoryName] = useState("");
  const [resourceCount, setResourceCount] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isEditing = editingId !== null;

  // ── Fetch categories on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function loadCategories() {
      setLoadingCategories(true);
      setFetchError(null);
      try {
        const res = await apiFetch("/categories");
        if (!res.ok) {
          const msg = await getErrorMessage(res);
          throw new Error(msg);
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("[AddCategory] fetch error:", err);
        setFetchError(
          err instanceof Error ? err.message : "Failed to load categories."
        );
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  // ── Revoke old object URLs to prevent memory leaks ─────────────────────────
  function revokePreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      revokePreviewUrl();
    };
  }, []);

  // ── Form helpers ───────────────────────────────────────────────────────────
  const resetForm = () => {
    setCategoryName("");
    setResourceCount("");
    revokePreviewUrl();
    setImagePreview("");
    setImageFile(null);
    setEditingId(null);
    setFormError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFormError("Only PNG, JPG/JPEG, or WEBP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be smaller than 5 MB.");
      return;
    }

    revokePreviewUrl();
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setImageFile(file);
    setImagePreview(url);
    setFormError(null);
  };

  // ── Validate form ──────────────────────────────────────────────────────────
  function validateForm(): string | null {
    if (!categoryName.trim()) return "Category name is required.";
    const count = Number(resourceCount);
    if (resourceCount === "" || isNaN(count) || !Number.isInteger(count) || count < 0) {
      return "Resource count must be a non-negative integer.";
    }
    if (!isEditing && !imageFile) return "An image is required when creating a category.";
    return null;
  }

  // ── Submit (create or update) ──────────────────────────────────────────────
  const handleSubmit = async () => {
    setFormError(null);
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", categoryName.trim());
      formData.append("resourceCount", resourceCount);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEditing) {
        // ── UPDATE ──────────────────────────────────────────────────────────
        const res = await apiFetch(`/categories/${editingId}`, {
          method: "PATCH",
          body: formData,
        });
        if (!res.ok) {
          const msg = await getErrorMessage(res);
          throw new Error(msg);
        }
        const updated: Category = await res.json();
        setCategories((prev) =>
          prev.map((cat) => (cat.id === updated.id ? updated : cat))
        );
      } else {
        // ── CREATE ──────────────────────────────────────────────────────────
        const res = await apiFetch("/categories", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const msg = await getErrorMessage(res);
          throw new Error(msg);
        }
        const created: Category = await res.json();
        setCategories((prev) => [...prev, created]);
      }

      resetForm();
    } catch (err) {
      console.error("[AddCategory] submit error:", err);
      setFormError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setResourceCount(String(category.resourceCount));
    // For an existing Cloudinary URL, just show it; no object URL needed
    revokePreviewUrl();
    setImagePreview(category.image?.url ?? "");
    setImageFile(null);
    setFormError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleteError(null);
    setDeleting(true);
    try {
      const res = await apiFetch(`/categories/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await getErrorMessage(res);
        throw new Error(msg);
      }
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
      if (editingId === deleteId) {
        resetForm();
      }
      setDeleteId(null);
    } catch (err) {
      console.error("[AddCategory] delete error:", err);
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete category."
      );
    } finally {
      setDeleting(false);
    }
  };

  const isSubmitDisabled =
    submitting || !categoryName.trim() || resourceCount === "";

  return (
    <div className="min-h-screen bg-white px-5 py-5 font-roboto md:px-7 lg:px-8">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-white text-slate-600 transition hover:bg-indigo-50 hover:text-blue-600"
            >
              <ArrowLeft size={15} />
            </button>

            <span className="text-[11px] font-semibold text-blue-600">
              KNOWLEDGE CENTER
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-slate-800">
            Add Categories
          </h1>

          <p className="mt-1 text-[13px] text-gray-500">
            Create and manage knowledge center categories.
          </p>
        </div>

        <div className="flex h-10 items-center gap-2 rounded-xl bg-indigo-50 px-4">
          <ImagePlus size={16} className="text-blue-600" />

          <span className="text-[12px] font-semibold text-slate-700">
            {categories.length} Categories
          </span>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="mb-7 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 md:p-6">
        <form action="">
          <div className="mb-5">
            <h2 className="text-[16px] font-semibold text-slate-800">
              {isEditing ? "Edit Category" : "Create New Category"}
            </h2>

            <p className="mt-1 text-[12px] text-gray-500">
              {isEditing
                ? "Update the category information below."
                : "Add a new category to your Knowledge Center."}
            </p>
          </div>

          {/* FORM ERROR */}
          {formError && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">

            {/* LEFT FORM */}
            <div className="space-y-5">

              {/* CATEGORY NAME */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-slate-700">
                  Category Name
                </label>

                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Frontend Development"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[13px] text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* RESOURCE COUNT */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-slate-700">
                  Number of Resources
                </label>

                <input
                  type="number"
                  min="0"
                  value={resourceCount}
                  onChange={(e) => setResourceCount(e.target.value)}
                  placeholder="e.g. 76"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-[13px] text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-[10px] text-gray-400">
                  Enter the current number of resources available.
                </p>
              </div>

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-slate-700">
                  Category Image{isEditing ? " (optional to change)" : ""}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-24 w-full items-center justify-center gap-3 rounded-xl border border-dashed border-indigo-200 bg-white text-gray-500 transition hover:border-blue-400 hover:bg-indigo-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-blue-600">
                    <Upload size={17} />
                  </div>

                  <div className="text-left">
                    <p className="text-[12px] font-semibold text-slate-700">
                      Upload category image
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      PNG, JPG or WEBP (max 5 MB)
                    </p>
                  </div>
                </button>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-[12px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      {isEditing ? "Saving..." : "Adding..."}
                    </>
                  ) : isEditing ? (
                    <>
                      <Check size={15} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Add Category
                    </>
                  )}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={submitting}
                    className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-[12px] font-semibold text-slate-600 transition hover:bg-gray-50"
                  >
                    <X size={15} />
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* IMAGE PREVIEW */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-4">
              <p className="mb-3 text-[11px] font-semibold text-slate-700">
                Image Preview
              </p>

              <div className="flex min-h-[190px] items-center justify-center rounded-xl bg-indigo-50">
                {imagePreview ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
                    <Image
                      src={imagePreview}
                      alt="Category preview"
                      fill
                      className="object-contain p-3"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-400">
                      <ImagePlus size={20} />
                    </div>

                    <p className="text-[11px] font-medium text-gray-500">
                      No image selected
                    </p>
                  </div>
                )}
              </div>

              {imageFile && (
                <p className="mt-3 truncate text-[10px] text-gray-400">
                  {imageFile.name}
                </p>
              )}
            </div>
          </div>

        </form>
      </div>



      {/* EXISTING CATEGORIES */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-slate-800">
              Existing Categories
            </h2>

            <p className="mt-1 text-[11px] text-gray-500">
              Edit or remove categories already available.
            </p>
          </div>

          <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-semibold text-indigo-600 sm:block">
            {categories.length} total
          </span>
        </div>

        {loadingCategories ? (
          <div className="flex items-center justify-center py-14">
            <Loader2 size={22} className="animate-spin text-indigo-400" />
            <span className="ml-2 text-[13px] text-gray-400">
              Loading categories…
            </span>
          </div>
        ) : fetchError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center">
            <p className="text-[13px] font-semibold text-red-600">
              {fetchError}
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              Make sure the backend is running and try refreshing.
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-400">
              <ImagePlus size={20} />
            </div>

            <p className="text-[13px] font-semibold text-slate-700">
              No categories available
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Create your first category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 p-2">
                    {category.image?.url ? (
                      <Image
                        src={category.image.url}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain"
                        unoptimized
                      />
                    ) : (
                      <ImagePlus size={20} className="text-indigo-300" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-semibold text-slate-700">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-[11px] font-medium text-gray-400">
                      {category.resourceCount}+ resources
                    </p>
                  </div>
                </div>

                <div className="ml-2 flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(category)}
                    title="Edit category"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-indigo-50 hover:text-blue-600"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(category.id)}
                    title="Remove category"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Trash2 size={18} />
            </div>

            <h3 className="text-[15px] font-semibold text-slate-800">
              Remove category?
            </h3>

            <p className="mt-1.5 text-[12px] leading-5 text-gray-500">
              This category will be permanently removed. This action cannot be
              undone.
            </p>

            {deleteError && (
              <p className="mt-3 text-[11px] font-medium text-red-600">
                {deleteError}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setDeleteId(null);
                  setDeleteError(null);
                }}
                disabled={deleting}
                className="h-9 rounded-lg border border-gray-200 px-4 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex h-9 items-center gap-1.5 rounded-lg bg-red-500 px-4 text-[11px] font-semibold text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Removing…
                  </>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}