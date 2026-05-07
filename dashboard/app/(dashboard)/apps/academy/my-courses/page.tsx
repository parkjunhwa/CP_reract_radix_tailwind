"use client";

import { useState } from "react";
import { Search, BookOpen, Clock, Users, Star, Play, Lock, CheckCircle2 } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type CourseStatus = "in_progress" | "completed" | "not_started";

interface Course {
  id: string; title: string; instructor: string; category: string;
  progress: number; status: CourseStatus; duration: string;
  lessons: number; completedLessons: number; rating: number;
  students: number; thumbnail: string; level: "Beginner" | "Intermediate" | "Advanced";
}

const COURSES: Course[] = [
  { id: "c1", title: "Luxury Brand Management Fundamentals", instructor: "Dr. Elaine Morrison", category: "Business", progress: 72, status: "in_progress", duration: "24h 30m", lessons: 48, completedLessons: 35, rating: 4.9, students: 842, thumbnail: "💎", level: "Intermediate" },
  { id: "c2", title: "Fine Art Valuation & Appraisal", instructor: "Prof. Jean-Claude Vidal", category: "Arts", progress: 100, status: "completed", duration: "18h 45m", lessons: 36, completedLessons: 36, rating: 4.8, students: 631, thumbnail: "🎨", level: "Advanced" },
  { id: "c3", title: "Watch Complications Masterclass", instructor: "Mr. Heinrich Braun", category: "Horology", progress: 45, status: "in_progress", duration: "32h 15m", lessons: 64, completedLessons: 29, rating: 4.9, students: 519, thumbnail: "⌚", level: "Advanced" },
  { id: "c4", title: "Rare Wine Investment Strategy", instructor: "Ms. Isabelle Fontaine", category: "Spirits", progress: 0, status: "not_started", duration: "14h 20m", lessons: 28, completedLessons: 0, rating: 4.7, students: 487, thumbnail: "🍷", level: "Intermediate" },
  { id: "c5", title: "Haute Couture: History & Design", instructor: "Ms. Akari Nakamura", category: "Fashion", progress: 88, status: "in_progress", duration: "20h 00m", lessons: 40, completedLessons: 35, rating: 4.8, students: 412, thumbnail: "👗", level: "Beginner" },
  { id: "c6", title: "Gemology & Precious Stones", instructor: "Dr. Priya Sharma", category: "Jewelry", progress: 0, status: "not_started", duration: "28h 10m", lessons: 56, completedLessons: 0, rating: 4.9, students: 324, thumbnail: "💍", level: "Advanced" },
];

const statusConfig: Record<CourseStatus, { label: string; cls: string }> = {
  in_progress:  { label: "In Progress", cls: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  completed:    { label: "Completed",   cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  not_started:  { label: "Not Started", cls: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

const levelColor: Record<string, string> = {
  Beginner:     "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced:     "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function MyCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CourseStatus | "all">("all");

  const filtered = COURSES.filter((c) =>
    (filter === "all" || c.status === filter) &&
    (!search || c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total: COURSES.length,
    inProgress: COURSES.filter(c => c.status === "in_progress").length,
    completed: COURSES.filter(c => c.status === "completed").length,
    notStarted: COURSES.filter(c => c.status === "not_started").length,
  };

  return (
    <div className="space-y-3 pb-0">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Courses", value: stats.total, color: "text-violet-400" },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-400" },
          { label: "Completed", value: stats.completed, color: "text-emerald-400" },
          { label: "Not Started", value: stats.notStarted, color: "text-slate-400" },
        ].map((s) => (
          <div key={s.label} className="panel p-4">
            <p className={cn("font-bold text-3xl", s.color)}>{s.value}</p>
            <p className="t-text-40 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="panel">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <Form.Root className="flex-1 min-w-[200px]">
            <Form.Field name="search">
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                <Search className="w-3.5 h-3.5 t-text-30" />
                <Form.Control asChild>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses or instructors…"
                    aria-label="Search courses"
                    className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                  />
                </Form.Control>
              </div>
            </Form.Field>
          </Form.Root>
          <div className="flex gap-1">
            {(["all", "in_progress", "completed", "not_started"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn("px-3 h-9 rounded-lg text-xs font-medium transition-colors capitalize",
                  filter === f ? "text-white" : "t-text-40 hover:t-text-80 border")}
                style={filter === f ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course) => {
            const { label, cls } = statusConfig[course.status];
            return (
              <div key={course.id} className="rounded-xl border transition-colors hover:border-[var(--t-border-2)]" style={{ backgroundColor: "var(--luxe-sidebar-2)", borderColor: "var(--t-border)" }}>
                <div className="h-32 rounded-t-xl flex items-center justify-center text-5xl" style={{ backgroundColor: "var(--t-hover)" }}>
                  {course.thumbnail}
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="t-text-80 text-sm font-semibold leading-tight">{course.title}</h4>
                    <Badge className={cn("text-[10px] px-2 border shrink-0", cls)}>{label}</Badge>
                  </div>
                  <p className="t-text-40 text-xs">{course.instructor}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn("text-[10px] px-2 border", levelColor[course.level])}>{course.level}</Badge>
                    <span className="t-text-30 text-[10px]">·</span>
                    <div className="flex items-center gap-1 t-text-40 text-[10px]">
                      <Clock className="w-3 h-3" />{course.duration}
                    </div>
                    <span className="t-text-30 text-[10px]">·</span>
                    <div className="flex items-center gap-1 t-text-40 text-[10px]">
                      <BookOpen className="w-3 h-3" />{course.lessons} lessons
                    </div>
                  </div>
                  {course.status !== "not_started" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="t-text-40">{course.completedLessons}/{course.lessons} lessons</span>
                        <span className="t-text-60 font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3 h-3" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="t-text-30">({course.students.toLocaleString()})</span>
                    </div>
                    <button
                      className={cn("flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                        course.status === "completed"
                          ? "t-text-40 border"
                          : "text-white"
                      )}
                      style={course.status !== "completed" ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
                    >
                      {course.status === "completed"
                        ? <><CheckCircle2 className="w-3 h-3" /> Review</>
                        : course.status === "not_started"
                        ? <><Lock className="w-3 h-3" /> Start</>
                        : <><Play className="w-3 h-3" /> Continue</>
                      }
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
