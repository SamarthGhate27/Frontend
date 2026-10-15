"use client";

import Image from "next/image";
import { ArrowLeft, Clock, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

// ── Type for a recently-added resource ────────────────────────────────────────
// When the backend exposes a /resources/recent (or similar) endpoint,
// import apiFetch from "@/lib/api" and replace MOCK_RESOURCES below with
// a real useEffect fetch, just like the other pages in this folder.
export type RecentResource = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image: string;
  added: string;
  type: string;
};

// ── TEMPORARY: isolated mock data ─────────────────────────────────────────────
// Replace this array with a real API call once the backend exposes the endpoint.
// Do NOT spread this data into the category API — it is completely separate.
const MOCK_RECENT_RESOURCES: RecentResource[] = [
  {
    id: 1,
    title: "Getting Started with React",
    description:
      "Learn the fundamentals of React and understand how to build modern user interfaces.",
    category: "Frontend",
    image: "/images/frontend.png",
    added: "2 hours ago",
    type: "Guide",
  },
  {
    id: 2,
    title: "Node.js Backend Fundamentals",
    description:
      "Understand backend development using Node.js, APIs and server-side concepts.",
    category: "Backend",
    image: "/images/backend.png",
    added: "5 hours ago",
    type: "Documentation",
  },
  {
    id: 3,
    title: "Database Design Basics",
    description:
      "Learn database design, relationships and important database concepts.",
    category: "Database",
    image: "/images/database.png",
    added: "Yesterday",
    type: "Guide",
  },
  {
    id: 4,
    title: "Introduction to Machine Learning",
    description:
      "A beginner-friendly introduction to machine learning concepts and applications.",
    category: "AI & ML",
    image: "/images/aiml.png",
    added: "Yesterday",
    type: "Tutorial",
  },
  {
    id: 5,
    title: "Cloud Computing Essentials",
    description:
      "Explore the fundamentals of cloud computing, services and deployment models.",
    category: "Cloud Computing",
    image: "/images/cloud.png",
    added: "2 days ago",
    type: "Documentation",
  },
  {
    id: 6,
    title: "Introduction to DevOps",
    description:
      "Understand DevOps practices, development workflows and continuous delivery.",
    category: "DevOps",
    image: "/images/devops.png",
    added: "3 days ago",
    type: "Guide",
  },
];

export default function RecentlyAddedPage() {
  const router = useRouter();

  // TODO: Replace MOCK_RECENT_RESOURCES with a real API call when the backend
  // exposes an endpoint such as GET /resources/recent.
  // Example:
  //   const [recentResources, setRecentResources] = useState<RecentResource[]>([]);
  //   useEffect(() => {
  //     apiFetch("/resources/recent")
  //       .then(r => r.ok ? r.json() : [])
  //       .then(setRecentResources)
  //       .catch(console.error);
  //   }, []);
  const recentResources = MOCK_RECENT_RESOURCES;

  return (
    <div className="min-h-screen bg-white px-5 py-5 font-roboto md:px-7 lg:px-8">

      {/* HEADER */}
      <div className="mb-7">

        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-blue-600"
          title="Go back"
        >
          <ArrowLeft size={17} />
        </button>

        <span className="text-[11px] font-semibold text-blue-600">
          KNOWLEDGE CENTER
        </span>

        <div className="mt-1 flex items-end justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Recently Added
            </h1>

            <p className="mt-1 text-[13px] text-gray-500">
              Explore the latest resources added to the Knowledge Center.
            </p>
          </div>

          <span className="hidden rounded-xl bg-indigo-50 px-4 py-2 text-[11px] font-semibold text-indigo-600 sm:block">
            {recentResources.length} New Resources
          </span>

        </div>
      </div>


      {/* RECENT RESOURCES */}
      <div className="flex flex-col gap-3">

        {recentResources.map((resource) => (

          <div
            key={resource.id}
            className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:border-indigo-100 hover:shadow-md sm:flex-row sm:items-center"
          >

            {/* IMAGE */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-50 p-2">
              <Image
                src={resource.image}
                alt={resource.title}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>


            {/* RESOURCE DETAILS */}
            <div className="min-w-0 flex-1">

              <div className="mb-1 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-semibold text-indigo-600">
                  {resource.category}
                </span>

                <span className="text-[10px] font-medium text-gray-400">
                  {resource.type}
                </span>

              </div>

              <h2 className="text-[14px] font-semibold text-slate-700 transition group-hover:text-blue-600">
                {resource.title}
              </h2>

              <p className="mt-1 max-w-2xl text-[11px] leading-5 text-gray-500">
                {resource.description}
              </p>

            </div>


            {/* RIGHT SIDE */}
            <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end">

              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock size={12} />

                <span className="text-[10px] font-medium">
                  {resource.added}
                </span>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold text-blue-600 transition hover:bg-indigo-50"
              >
                <Eye size={13} />
                View Resource
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}