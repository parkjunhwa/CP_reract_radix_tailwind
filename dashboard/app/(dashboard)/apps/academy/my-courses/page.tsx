"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, BookOpen, Clock, Star, Play, Lock, CheckCircle2, GraduationCap } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type CourseStatus = "in_progress" | "completed" | "not_started";

interface Course {
  id: string;
  title: string;
  instructor: string;
  path: string;
  progress: number;
  status: CourseStatus;
  duration: string;
  lessons: number;
  completedLessons: number;
  rating: number;
  learners: number;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const COURSES: Course[] = [
  {
    id: "c1",
    title: "Retail clienteling & service excellence",
    instructor: "Learning design — Retail L&D",
    path: "Certification",
    progress: 72,
    status: "in_progress",
    duration: "12h 30m",
    lessons: 36,
    completedLessons: 26,
    rating: 4.8,
    learners: 1840,
    thumbnail: "🎓",
    level: "Intermediate",
  },
  {
    id: "c2",
    title: "New hire onboarding — LUXE standards",
    instructor: "People & culture",
    path: "Onboarding",
    progress: 100,
    status: "completed",
    duration: "6h 15m",
    lessons: 22,
    completedLessons: 22,
    rating: 4.9,
    learners: 3200,
    thumbnail: "📋",
    level: "Beginner",
  },
  {
    id: "c3",
    title: "Product knowledge: watches & complications",
    instructor: "Merchandising academy",
    path: "Product",
    progress: 38,
    status: "in_progress",
    duration: "9h 45m",
    lessons: 28,
    completedLessons: 11,
    rating: 4.7,
    learners: 920,
    thumbnail: "⌚",
    level: "Advanced",
  },
  {
    id: "c4",
    title: "Compliance — AML & client screening",
    instructor: "Legal & compliance",
    path: "Compliance",
    progress: 0,
    status: "not_started",
    duration: "4h 00m",
    lessons: 14,
    completedLessons: 0,
    rating: 4.6,
    learners: 4100,
    thumbnail: "⚖️",
    level: "Intermediate",
  },
  {
    id: "c5",
    title: "Visual merchandising playbook",
    instructor: "Retail operations",
    path: "Retail ops",
    progress: 55,
    status: "in_progress",
    duration: "5h 20m",
    lessons: 18,
    completedLessons: 10,
    rating: 4.5,
    learners: 640,
    thumbnail: "🪟",
    level: "Beginner",
  },
  {
    id: "c6",
    title: "Leadership essentials for floor managers",
    instructor: "Management academy",
    path: "Leadership",
    progress: 0,
    status: "not_started",
    duration: "8h 00m",
    lessons: 20,
    completedLessons: 0,
    rating: 4.8,
    learners: 510,
    thumbnail: "👥",
    level: "Intermediate",
  },
];

const statusConfig: Record<CourseStatus, { label: string; cls: string }> = {
  in_progress: { label: "In progress", cls: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
  completed: { label: "Completed", cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  not_started: { label: "Not started", cls: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

const levelColor: Record<string, string> = {
  Beginner: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

const pathColor: Record<string, string> = {
  Certification: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Onboarding: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Product: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Compliance: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  "Retail ops": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Leadership: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20",
};

function CourseCard({ course }: { course: Course }) {
  const { label, cls } = statusConfig[course.status];
  const detailHref = "/apps/academy/course-details";

  return (
    <div
      className="rounded-xl border transition-colors hover:border-[color:var(--t-border-2)]"
      style={{ backgroundColor: "var(--luxe-sidebar-2)", borderColor: "var(--t-border)" }}
    >
      <Link href={detailHref} className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/40">
        <div className="flex h-28 items-center justify-center rounded-t-xl text-4xl" style={{ backgroundColor: "var(--t-hover)" }}>
          {course.thumbnail}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h4 className="t-text-80 min-w-0 flex-1 text-sm font-semibold leading-tight underline-offset-2 group-hover:underline">{course.title}</h4>
            <Badge className={cn("pointer-events-none shrink-0 border px-2 text-[10px]", cls)}>{label}</Badge>
          </div>
          <p className="t-text-40 text-xs">{course.instructor}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn("pointer-events-none border px-2 text-[10px]", pathColor[course.path] ?? "bg-slate-500/10 text-slate-500 border-slate-500/20")}>
              {course.path}
            </Badge>
            <Badge className={cn("pointer-events-none border px-2 text-[10px]", levelColor[course.level])}>{course.level}</Badge>
            <span className="t-text-30 text-[10px]">·</span>
            <div className="flex items-center gap-1 t-text-40 text-[10px]">
              <Clock className="h-3 w-3 shrink-0" />
              {course.duration}
            </div>
            <span className="t-text-30 text-[10px]">·</span>
            <div className="flex items-center gap-1 t-text-40 text-[10px]">
              <BookOpen className="h-3 w-3 shrink-0" />
              {course.lessons} lessons
            </div>
          </div>
          {course.status !== "not_started" && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="t-text-40">
                  {course.completedLessons}/{course.lessons} lessons
                </span>
                <span className="t-text-60 font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          )}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="h-3 w-3 shrink-0" />
              <span className="font-semibold">{course.rating}</span>
              <span className="t-text-30">({course.learners.toLocaleString()})</span>
            </div>
            <span
              className={cn(
                "pointer-events-none inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
                course.status === "completed" ? "t-text-40 border" : "text-white",
              )}
              style={course.status !== "completed" ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
            >
              {course.status === "completed" ? (
                <>
                  <CheckCircle2 className="h-3 w-3" /> Review
                </>
              ) : course.status === "not_started" ? (
                <>
                  <Lock className="h-3 w-3" /> Open
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" /> Continue
                </>
              )}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function MyCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CourseStatus | "all">("all");

  const filtered = COURSES.filter(
    (c) =>
      (filter === "all" || c.status === filter) &&
      (!search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase()) ||
        c.path.toLowerCase().includes(search.toLowerCase())),
  );

  const stats = {
    total: COURSES.length,
    inProgress: COURSES.filter((c) => c.status === "in_progress").length,
    completed: COURSES.filter((c) => c.status === "completed").length,
    notStarted: COURSES.filter((c) => c.status === "not_started").length,
  };

  return (
    <div className="space-y-3 pb-0">
      <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="t-text-40 text-[10px] font-semibold uppercase tracking-wider">My curriculum</p>
            <h2 className="t-text font-semibold text-sm">Assigned programs &amp; electives</h2>
            <p className="t-text-30 mt-0.5 max-w-xl text-xs leading-relaxed">
              Paths are assigned by your manager and HR. Completion feeds the{" "}
              <Link href="/dashboards/academy" className="t-accent-text font-medium underline">
                Academy dashboard
              </Link>{" "}
              for reporting.
            </p>
          </div>
        </div>
        <Link
          href="/dashboards/academy"
          className="inline-flex h-9 shrink-0 items-center rounded-lg border px-3 text-xs font-medium t-text-70 transition-colors hover:bg-[color:var(--t-hover)]"
          style={{ borderColor: "var(--t-border-2)" }}
        >
          Org overview
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Assigned", value: stats.total, color: "text-violet-400" },
          { label: "In progress", value: stats.inProgress, color: "text-amber-400" },
          { label: "Completed", value: stats.completed, color: "text-emerald-400" },
          { label: "Not started", value: stats.notStarted, color: "text-slate-400" },
        ].map((s) => (
          <div key={s.label} className="panel p-4">
            <p className={cn("text-3xl font-bold", s.color)}>{s.value}</p>
            <p className="t-text-40 mt-1 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="flex flex-wrap items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--t-border)" }}>
          <Form.Root className="min-w-[200px] flex-1">
            <Form.Field name="search">
              <div className="flex h-9 items-center gap-2 rounded-lg border px-3" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                <Search className="h-3.5 w-3.5 t-text-30" />
                <Form.Control asChild>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search programs, path, or owner…"
                    aria-label="Search programs"
                    className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                  />
                </Form.Control>
              </div>
            </Form.Field>
          </Form.Root>
          <div className="flex flex-wrap gap-1">
            {(["all", "in_progress", "completed", "not_started"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "h-9 rounded-lg px-3 text-xs font-medium capitalize transition-colors",
                  filter === f ? "text-white" : "t-text-40 hover:t-text-80 border",
                )}
                style={filter === f ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="t-text-50 px-5 py-10 text-center text-sm">No programs match these filters.</p>
        )}
      </div>
    </div>
  );
}
