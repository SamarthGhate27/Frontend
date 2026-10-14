
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Plus,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Lesson = {
  id: number;
  title: string;
  content: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type CourseModule = {
  id: number;
  title: string;
  type: "lessons" | "quiz";
  description: string;
  lessons: Lesson[];
  quizText: string;
  questions: QuizQuestion[];
};

const initialModules: CourseModule[] = [
  {
    id: 1,
    title: "HTML Fundamentals",
    type: "lessons",
    description: "Learn the structure of an HTML document and common elements.",
    lessons: [
      {
        id: 101,
        title: "Introduction to HTML",
        content: `HTML stands for HyperText Markup Language. It defines the structure and meaning of content on a web page.

A basic HTML document contains a doctype declaration, an html element, a head element and a body element.

Example:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>

The <!DOCTYPE html> declaration identifies the document as HTML5. The head contains metadata, while the body contains the page content displayed to users.`,
      },
      {
        id: 102,
        title: "HTML Elements and Attributes",
        content: `HTML elements are the building blocks of a web page. Most elements have an opening tag, content and a closing tag.

Example:

<p>This is a paragraph.</p>
<a href="https://example.com">Visit Example</a>
<img src="photo.jpg" alt="A description of the photo" />

The p element represents a paragraph. The a element creates a hyperlink. The img element embeds an image.

Attributes provide additional information about elements. For example, href specifies a link destination, src specifies an image source, and alt provides alternative text for an image.

Some elements, such as img, are void elements and do not have closing tags.`,
      },
    ],
    quizText: "",
    questions: [],
  },
  {
    id: 2,
    title: "HTML Knowledge Check",
    type: "quiz",
    description: "Test your understanding of the HTML lessons.",
    lessons: [],
    quizText:
      "Create a short quiz based on Module 1: HTML Fundamentals. Cover HTML document structure, elements, attributes, links and images.",
    questions: [],
  },
];

export default function CreateCoursePage() {
  const router = useRouter();

  const [courseTitle, setCourseTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState("");
  const [requirements, setRequirements] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState<CourseModule[]>(initialModules);
  const [message, setMessage] = useState("");

  const updateModule = (
    moduleId: number,
    updates: Partial<CourseModule>
  ) => {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId ? { ...module, ...updates } : module
      )
    );
  };

  const addModule = () => {
    setModules((current) => [
      ...current,
      {
        id: Date.now(),
        title: `New Module ${current.length + 1}`,
        type: "lessons",
        description: "",
        lessons: [
          {
            id: Date.now() + 1,
            title: "New Lesson",
            content: "",
          },
        ],
        quizText: "",
        questions: [],
      },
    ]);
  };

  const removeModule = (moduleId: number) => {
    setModules((current) =>
      current.filter((module) => module.id !== moduleId)
    );
  };

  const addLesson = (moduleId: number) => {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now(),
                  title: `Lesson ${module.lessons.length + 1}`,
                  content: "",
                },
              ],
            }
          : module
      )
    );
  };

  const updateLesson = (
    moduleId: number,
    lessonId: number,
    field: "title" | "content",
    value: string
  ) => {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, [field]: value }
                  : lesson
              ),
            }
          : module
      )
    );
  };

  const removeLesson = (moduleId: number, lessonId: number) => {
    setModules((current) =>
      current.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : module
      )
    );
  };

  const generateQuiz = (moduleId: number) => {
    const sampleQuestions: QuizQuestion[] = [
      {
        id: Date.now(),
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "Hyper Transfer Main Language",
          "Home Tool Markup Language",
        ],
        answer: "HyperText Markup Language",
      },
      {
        id: Date.now() + 1,
        question: "Which element creates a hyperlink?",
        options: ["<p>", "<img>", "<a>", "<h1>"],
        answer: "<a>",
      },
      {
        id: Date.now() + 2,
        question: "Which attribute provides alternative text for an image?",
        options: ["href", "alt", "src", "title"],
        answer: "alt",
      },
    ];

    updateModule(moduleId, { questions: sampleQuestions });
  };

  const handleCreateCourse = () => {
    if (
      !courseTitle.trim() ||
      !shortDescription.trim() ||
      !instructor.trim() ||
      !duration.trim()
    ) {
      setMessage("Please complete the title, description, instructor and duration.");
      return;
    }

    setMessage(
      "Course draft is ready in this page's current state. Backend saving and publishing are not connected yet."
    );
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "text-[12px] font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-white px-5 py-6 font-roboto md:px-7 lg:px-8">
      {/* HEADER */}
      <div className="mb-7 flex items-start justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-indigo-50 hover:text-blue-600"
            aria-label="Go back"
          >
            <ArrowLeft size={17} />
          </button>

          <p className="text-[11px] font-semibold text-blue-600">
            LEARNING / COURSE MANAGEMENT
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-slate-800">
            Create a Course
          </h1>

          <p className="mt-1 text-[13px] text-gray-500">
            Build a structured learning experience for your employees.
          </p>
        </div>

        <span className="hidden items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-[11px] font-semibold text-indigo-600 sm:flex">
          <FileText size={15} />
          Course Draft
        </span>
      </div>

      {/* COURSE OVERVIEW */}
      <section className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600">
            <BookOpen size={19} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-slate-800">
              Course Overview
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Introduce the course and its learning objectives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Course Title *
            <input
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. HTML Fundamentals"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Instructor *
            <input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Enter instructor name"
              className={inputClass}
            />
          </label>

          <label className={`${labelClass} md:col-span-2`}>
            Short Description *
            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Briefly explain what this course covers..."
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            What You'll Learn
            <textarea
              rows={4}
              value={learningOutcomes}
              onChange={(e) => setLearningOutcomes(e.target.value)}
              placeholder={"Understand HTML structure\nCreate links and images"}
              className={inputClass}
            />
            <span className="mt-1 block text-[10px] font-normal text-gray-400">
              Add each learning outcome on a new line.
            </span>
          </label>

          <label className={labelClass}>
            Requirements
            <textarea
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Basic computer knowledge"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Course Duration *
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 2 hours or 3 weeks"
              className={inputClass}
            />
          </label>
        </div>
      </section>

      {/* MODULES */}
      <section className="mb-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[16px] font-semibold text-slate-800">
              Course Modules
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Organize your course into lessons, quizzes or both.
            </p>
          </div>

          <button
            type="button"
            onClick={addModule}
            className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={15} />
            Add Module
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((module, index) => (
            <article
              key={module.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-indigo-50/60 px-4 py-4 md:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[12px] font-bold text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">
                      Module {index + 1}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500">
                      {module.type === "lessons"
                        ? `${module.lessons.length} lessons`
                        : `${module.questions.length} quiz questions`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeModule(module.id)}
                  className="flex h-8 items-center gap-1.5 rounded-lg px-3 text-[10px] font-semibold text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove module ${index + 1}`}
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>

              <div className="space-y-5 p-4 md:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className={labelClass}>
                    Module Title
                    <input
                      value={module.title}
                      onChange={(e) =>
                        updateModule(module.id, { title: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Enter module title"
                    />
                  </label>

                  <label className={labelClass}>
                    Module Type
                    <span className="relative block">
                      <select
                        value={module.type}
                        onChange={(e) =>
                          updateModule(module.id, {
                            type: e.target.value as "lessons" | "quiz",
                          })
                        }
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="lessons">Text Lessons</option>
                        <option value="quiz">Quiz Module</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </span>
                  </label>
                </div>

                <label className={labelClass}>
                  Module Description
                  <textarea
                    rows={2}
                    value={module.description}
                    onChange={(e) =>
                      updateModule(module.id, { description: e.target.value })
                    }
                    placeholder="What will this module cover?"
                    className={inputClass}
                  />
                </label>

                {module.type === "lessons" ? (
                  <div className="space-y-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="rounded-xl border border-gray-200 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-[12px] font-semibold text-slate-700">
                            Lesson {lessonIndex + 1}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              removeLesson(module.id, lesson.id)
                            }
                            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                            aria-label={`Remove lesson ${lessonIndex + 1}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <label className={labelClass}>
                          Lesson Title
                          <input
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(
                                module.id,
                                lesson.id,
                                "title",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="Enter lesson title"
                          />
                        </label>

                        <label className={`${labelClass} mt-4 block`}>
                          Lesson Content
                          <textarea
                            rows={9}
                            value={lesson.content}
                            onChange={(e) =>
                              updateLesson(
                                module.id,
                                lesson.id,
                                "content",
                                e.target.value
                              )
                            }
                            className={`${inputClass} font-mono text-[12px] leading-6`}
                            placeholder="Enter the lesson material here..."
                          />
                          <span className="mt-1 block text-[10px] font-normal text-gray-400">
                            Text and code examples are supported in this prototype.
                          </span>
                        </label>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addLesson(module.id)}
                      className="flex h-10 items-center gap-2 rounded-xl border border-dashed border-indigo-200 px-4 text-[11px] font-semibold text-blue-600 transition hover:bg-indigo-50"
                    >
                      <Plus size={14} />
                      Add Lesson
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className={labelClass}>
                      Quiz Source / Instructions
                      <textarea
                        rows={4}
                        value={module.quizText}
                        onChange={(e) =>
                          updateModule(module.id, {
                            quizText: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="Describe the lesson content the quiz should cover..."
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => generateQuiz(module.id)}
                      className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                    >
                      <WandSparkles size={15} />
                      Generate Sample Quiz
                    </button>

                    {module.questions.length > 0 && (
                      <div className="space-y-3 rounded-xl bg-indigo-50/60 p-4">
                        <p className="text-[12px] font-semibold text-slate-700">
                          Generated Questions ({module.questions.length})
                        </p>

                        {module.questions.map((question, questionIndex) => (
                          <div
                            key={question.id}
                            className="rounded-lg border border-indigo-100 bg-white p-3"
                          >
                            <p className="text-[12px] font-semibold text-slate-700">
                              {questionIndex + 1}. {question.question}
                            </p>
                            <ul className="mt-2 space-y-1">
                              {question.options.map((option) => (
                                <li
                                  key={option}
                                  className={`text-[11px] ${
                                    option === question.answer
                                      ? "font-semibold text-green-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {option === question.answer ? "✓ " : "○ "}
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <p className="text-[10px] text-gray-500">
                          Sample questions are generated locally for demonstration; this button does not call an AI service.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL ASSESSMENT */}
      <section className="mb-6 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
            <CircleHelp size={19} />
          </div>
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold text-slate-800">
              Final Assessment
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-gray-500">
              This section is reserved for the course's final assessment. Questions,
              scoring and completion rules can be configured in a later update.
            </p>
            <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-gray-500">
              Coming in a future update
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] leading-5 text-gray-400">
          Your changes currently remain in browser state and are not saved to a database.
        </p>

        <button
          type="button"
          onClick={handleCreateCourse}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-[12px] font-semibold text-white transition hover:bg-blue-700"
        >
          <CheckCircle2 size={15} />
          Create Course Draft
        </button>
      </div>

      {message && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-[12px] leading-5 text-slate-700"
        >
          {message}
        </div>
      )}
    </main>
  );
}
