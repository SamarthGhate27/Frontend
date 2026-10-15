"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";

import {useRouter} from "next/navigation"


export default function KnowledgeCenter() {

  const router = useRouter();
  return (
    <>
    <div className="flex">

      <div className="left">

        <div className="pt-3" >
          <div className="ml-5 lg:w-235  lg:h-55 mr-5 bg-indigo-50 p-4 rounded-2xl">

          <div className="lg:w-75 font-serif ">
            <div className="font-serif font-semibold text-slate-800 text-2xl pb-1 font-roboto ">Knowledge Center </div>
            <div className="text-[14px] text-gray-600">  Find guides, tutorials, documentation, FAQs and learning resources to help you grow.</div>

          <Field className="pt-6">
            <ButtonGroup className="gap-2">
              <Input id="input-button-group" placeholder="Type to search..." className="bg-white border-black "/>
              <Button className="bg-blue-600 text-white font-mono hover:bg-blue-700 hover:cursor-pointer text-[11px]">Search</Button>
            </ButtonGroup>
          </Field>
        </div>

          <div className="flex gap-3 mt-5 ">
            <span className="font-bold fontroboto text-[13px] pt-1">Popular :</span>
            <span className="font-bold font-roboto text-[13px] bg-indigo-200 text-indigo-600 w-26 rounded-2xl h-7 pt-1"><center>React</center></span>
            <span className="font-bold font-roboto text-[13px] bg-indigo-200 text-indigo-600 w-26 rounded-2xl h-7 pt-1"><center>Next.js</center></span>
            <span className="font-bold font-roboto text-[13px] bg-indigo-200 text-indigo-600 w-26 rounded-2xl h-7 pt-1"><center>Tailwind CSS</center></span>
            <span className="font-bold font-roboto text-[13px] bg-indigo-200 text-indigo-600 w-26 rounded-2xl h-7 pt-1"><center>JavaScript</center></span>
            <span className="font-bold fontrobotof text-[13px] bg-indigo-200 text-indigo-600 w-26 rounded-2xl h-7 pt-1 "><center>DBMS</center></span>
            
          </div>
          
        </div>

        <div className="ml-5 mt-2 lg:w-235  lg:h-50 mr-5  p-4 rounded-2xl">
          <div className="flex justify-between">
            <h1 className="font-semibold font-roboto">Explore by Category</h1>

            <Link  href="/dashboard/knowledge-center/categories" className="cursor-pointer">
            <div className="text-[10px] text-blue-700 font-bold font-dmserif mt-1 ">View all</div>
            
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 h-auto justify-between w-full max-w-7xl:w-full mx-auto px-4 text-white lg:h-auto">

            <Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/frontend.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-bold pl-1 mt-2 font-roboto text-[13px] ">Frontend</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-green-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/backend.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Backend</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-purple-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/database.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Database</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-yellow-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/aiml.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">AI & ML</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/cloud.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-bold pl-1 mt-2 font-roboto text-[13px]">Cloud Computing</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-green-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/devops.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">DevOps</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>

<Link href="/dashboard/knowledge-center/categories/resources">
  <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
    <div className="flex">
      <img src="/images/cyber-security.png" alt="" width={40} height={40} className="m-2 mt-2"/>
      <div>
        <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Cyber Security</h1>
        <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
      </div>
    </div>
  </div>
</Link>
            {/* <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/frontend.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-bold pl-1 mt-2 font-roboto text-[13px] ">Frontend</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/backend.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Backend</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/database.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Database</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/aiml.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">AI & ML</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/cloud.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-bold pl-1 mt-2 font-roboto text-[13px]">Cloud Computing</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1 ">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/devops.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">DevOps</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 h-14 w-45 mt-5 rounded-2xl">
              <div className="flex">
                <img src="/images/cyber-security.png" alt="" width={40} height={40} className="m-2 mt-2"/>
                <div>
                  <h1 className="text-slate-700 font-semibold pl-1 mt-2 font-roboto text-[13px]">Cyber Security</h1>
                  <span className="text-gray-500 font-dmserif text-[12px] font-semibold pl-1">76+ recources</span>
                </div>
              </div>
            </div> */}
            <div className="h-12 w-45 mt-5 ">
               <button className="text-[12px] text-black bg-mist-200 h-12 w-45  rounded-xl cursor-pointer font-semibold  
                font-roboto"  onClick={() =>
                router.push("/dashboard/knowledge-center/add-category")
                }>+ Add Category
                </button>
            </div>
            
          </div>
          
        </div>
        <div className="w-230 lg:min-h-57  ml-5 flex gap-4">
          <div className="bg-white h-55 w-md mt-1 rounded-xl border shadow shadow-gray-200">
             <div className="flex justify-between p-2 mb-1">
            <h1 className="font-semibold font-roboto">Recently added</h1>
                <Link
                 href="/dashboard/knowledge-center/recently-added"
                >
                  <span className="text-[12px] text-blue-700 font-bold font-roboto mt-1 cursor-pointer">View all</span>
                
                </Link>

          </div>
           <Recents />
           <Recents />
           <Recents />
           <Recents />
           <Recents />
          </div>
          <div className="bg-white min-h-55 w-md mt-1 rounded-xl  border shadow shadow-gray-200">
             <div className="flex justify-between pl-2 pt-2 mb-1">
            <h1 className="font-semibold font-roboto">Frequently asked questions</h1>
            <span className="text-[10px] text-blue-700 font-bold font-mono mt-1 pr-2">View all</span>
          </div>

            <div className="flex flex-col">
              <Dropdown />
              <Dropdown />
              <Dropdown />
              <Dropdown />
              <Dropdown />
            </div>
          
          </div>
        </div>

        
      </div>
      </div>

      <div className="h-full">

        <div className=" h-110 w-80 rounded-2xl shadow">
          <div className="flex justify-between pl-3 pt-3 mb-1">
            <h1 className="font-semibold font-roboto">Popular Resources</h1>
            <span className="text-[12px] text-blue-700 font-bold font-mono mt-2 pr-2 font-roboto">View all</span>
          </div>

          <div>
            <PopularResources />
          </div>


        </div>

        <div className="h-50 w-80  mt-4 rounded-xl shadow">

          <div className="flex justify-between pl-2 pt-2 mb-1">
            <h1 className="font-semibold font-roboto">Learning Path</h1>
            <span className="text-[10px] text-blue-700 font-bold font-mono mt-2 pr-2">View all</span>
          </div>

          <LearningPath />
        </div>
      </div>


      
    </div>

    </>
    
    
  );
}


export function Recents(){
  return(
    <>
    
      <div className="w-md flex justify-between pl-2 pt-2 ">
        <div className="flex">
          <img src="/images/file-text.png" alt="" height={25} width={22} />
          <p className="text-[13px] text-gray-800 font-jakarta font-bold pl-1 pt-1">Understanding useState in React </p>
        </div>

        <span  className="text-[12px] text-gray-600 font-roboto pr-1 font-semibold pt-1">2 days ago</span>

      </div>
    </>
  )

}



import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-md">
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
      >
        <span className="fotn-jakarta font-bold">How do i enroll?</span>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-slate-200 bg-white p-1 shadow-md">
          <button className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-slate-100 font-jakarta font-bold">
            Frontend Development
          </button>

          <button className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-slate-100 font-jakarta font-bold">
            Backend Development
          </button>

          <button className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-slate-100 font-jakarta font-bold">
            Database
          </button>

          <button className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-slate-100 font-jakarta font-bold">
            AI & Machine Learning
          </button>
        </div>
      )}
    </div>
  );
}





import {
  Eye,
  Star,
} from "lucide-react";

const resources = [
  {
    title: "JavaScript Interview Questions and Answers",
    image: "/images/javascript.png",
    rating: "4.8",
    views: "12.4K",
    ratingStars: 4,
  },
  {
    title: "React.js Complete Guide for Beginners",
    image: "/images/react.png",
    rating: "4.7",
    views: "9.8K",
    ratingStars: 4,
  },
  {
    title: "Next.js 14 App Router Explained",
    image: "/images/nextjs.png",
    rating: "4.6",
    views: "7.6K",
    ratingStars: 4,
  },
  {
    title: "System Design Basics for Beginners",
    image: "/images/system-design.png",
    rating: "4.5",
    views: "6.1K",
    ratingStars: 3,
  },
  {
    title: "Tailwind CSS Cheat Sheet & Examples",
    image: "/images/tailwind.png",
    rating: "4.7",
    views: "5.3K",
    ratingStars: 4,
  },
];

export  function PopularResources() {
  return (
    <div className="w-full lg:w-80 lg:h-100 rounded-xl bg-white">

      {resources.map((resource, index) => (
        <div
          key={index}
          className="flex min-h-8.75 items-center gap-5 border-b border-slate-200 px-3 py-1 last:border-b-0 hover:bg-slate-50"
        >

          {/* Image / Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 font-jakarta">
            <img
              src={resource.image}
              alt={resource.title}
              className="h-10 w-10 object-cover"
            />
          </div>

          {/* Resource information */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">

            {/* Title */}
            <h3 className="max-w-70 text-[14px] font-bold leading-6 text-slate-900 font-jakarta">
              {resource.title}
            </h3>

            {/* Rating */}
            <div className="mt-1 flex items-center gap-2">

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    fill={
                      star <= resource.ratingStars
                        ? "#F5B800"
                        : "transparent"
                    }
                    className={
                      star <= resource.ratingStars
                        ? "text-yellow-500"
                        : "text-slate-400"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-slate-600">
                {resource.rating}
              </span>

            </div>
          </div>

          {/* Views */}
          <div className="flex shrink-0 items-center gap-1 text-slate-500">
            <Eye size={15} strokeWidth={2.8} />

            <span className="text-[12px]">
              {resource.views}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
}




import { Check } from "lucide-react";

const learningPath = [
  {
    number: 1,
    title: "HTML & CSS Basics",
    status: "Complete",
    type: "complete",
  },
  {
    number: 2,
    title: "JavaScript Fundamentals",
    status: "In Progress",
    type: "progress",
  },
  {
    number: 3,
    title: "React.js - Build Real Projects",
    status: "Next Up",
    type: "next",
  },
  {
    number: 4,
    title: "Next.js - Full Stack Development",
    status: "Locked",
    type: "locked",
  },
  {
    number: 5,
    title: "Advanced Topics & Deployment",
    status: "Locked",
    type: "locked",
  },
];

export  function LearningPath() {
  return (
    <div className="w-full rounded-xl bg-white p-2">

      <div className="space-y-0">
        {learningPath.map((item, index) => (
          <div
            key={item.number}
            className="relative flex min-h-11.25 items-start"
          >

            {/* Connecting line */}
            {index !== learningPath.length - 1 && (
              <div
                className={`absolute left-2 top-5.75 h-4.5 border-l-2 border-dashed ${
                  item.type === "complete"
                    ? "border-green-400"
                    : item.type === "progress"
                    ? "border-blue-400"
                    : "border-slate-300"
                }`}
              />
            )}

            {/* Number circle */}
            <div
              className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                item.type === "complete"
                  ? "bg-green-500 text-white"
                  : item.type === "progress"
                  ? "bg-yellow-500 text-white"
                  : item.type === "next"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-300 text-white"
              }`}
            >
              {item.number}
            </div>

            {/* Content */}
            <div className="flex flex-1 items-start justify-between pl-3">

              <div>
                <h3 className="text-[12px] font-semibold text-slate-800">
                  {item.title}
                </h3>

                {/* Complete check */}
                {item.type === "complete" && (
                  <Check
                    size={14}
                    strokeWidth={3}
                    className="mt-1 text-green-600"
                  />
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-1 ">

                {item.type === "complete" && (
                  <>
                    <span className="text-[12px] font-medium text-green-600">
                      Complete
                    </span>
                    <Check
                      size={17}
                      strokeWidth={3}
                      className="text-green-500"
                    />
                  </>
                )}

                {item.type === "progress" && (
                  <>
                    <span className="text-[12px] font-medium text-yellow-500">
                      In Progress
                    </span>
                    <Check
                      size={17}
                      strokeWidth={2}
                      className="text-yellow-500"
                    />
                  </>
                )}

                {item.type === "next" && (
                  <span className="text-sm font-medium text-blue-600">
                    Next Up
                  </span>
                )}

                {item.type === "locked" && (
                  <span className="text-sm font-medium text-slate-500">
                    Locked
                  </span>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}