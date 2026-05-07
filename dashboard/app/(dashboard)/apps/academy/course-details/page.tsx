"use client";

import { Clock, BookOpen, Users, Star, Play, Award, CheckCircle2, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const curriculum = [
  { section: "Module 1: Foundations of Luxury", lessons: [
    { title: "History of Luxury Brands", duration: "28m", done: true },
    { title: "Psychology of Luxury Consumers", duration: "34m", done: true },
    { title: "Brand Positioning Strategies", duration: "41m", done: true },
    { title: "The Luxury Pyramid Model", duration: "22m", done: false },
  ]},
  { section: "Module 2: Brand Identity & Communication", lessons: [
    { title: "Visual Identity in Luxury", duration: "38m", done: false },
    { title: "Storytelling & Heritage", duration: "45m", done: false },
    { title: "Digital vs. Traditional Marketing", duration: "52m", done: false },
  ]},
  { section: "Module 3: Distribution & Retail", lessons: [
    { title: "Omnichannel Luxury Retail", duration: "36m", done: false },
    { title: "Flagship Store Experience", duration: "29m", done: false },
    { title: "E-commerce in Luxury Markets", duration: "43m", done: false },
  ]},
];

const instructor = {
  name: "Dr. Elaine Morrison", title: "Professor of Luxury Management", avatar: "EM",
  rating: 4.95, students: 1820, courses: 12,
  bio: "Dr. Morrison holds a PhD from HEC Paris and has consulted for LVMH, Richemont, and Kering across 3 continents.",
};

export default function CourseDetailsPage() {
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const doneLessons = curriculum.reduce((acc, m) => acc + m.lessons.filter(l => l.done).length, 0);
  const progress = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div className="space-y-3 pb-0">
      {/* Hero */}
      <div className="panel p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-36 rounded-xl flex items-center justify-center text-6xl flex-shrink-0" style={{ backgroundColor: "var(--t-hover)" }}>💎</div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-[10px] px-2 border bg-amber-500/10 text-amber-500 border-amber-500/20">Intermediate</Badge>
              <Badge className="text-[10px] px-2 border bg-violet-500/10 text-violet-500 border-violet-500/20">Business</Badge>
            </div>
            <h1 className="t-text font-bold text-xl">Luxury Brand Management Fundamentals</h1>
            <p className="t-text-40 text-sm leading-relaxed">Master the art and science behind the world's most iconic luxury brands. Learn positioning, heritage storytelling, distribution strategies, and modern digital transformation in the luxury sector.</p>
            <div className="flex flex-wrap items-center gap-4 text-xs t-text-40">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /><span className="font-semibold text-amber-400">4.9</span><span>(842 ratings)</span></div>
              <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><span>1,820 students</span></div>
              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>24h 30m total</span></div>
              <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /><span>{totalLessons} lessons</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Curriculum */}
        <div className="xl:col-span-2 space-y-3">
          <div className="panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="t-text font-semibold text-sm">Course Curriculum</h2>
              <span className="t-text-40 text-xs">{doneLessons}/{totalLessons} completed</span>
            </div>
            <Progress value={progress} className="h-1.5 mb-4" />
            <div className="space-y-3">
              {curriculum.map((mod, mi) => (
                <div key={mi}>
                  <h3 className="t-text-60 text-xs font-semibold mb-2">{mod.section}</h3>
                  <div className="space-y-1">
                    {mod.lessons.map((lesson, li) => (
                      <div key={li} className="flex items-center gap-3 px-3 py-2.5 rounded-lg t-hover transition-colors">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          {lesson.done
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            : mi === 0 && li === 3
                            ? <Play className="w-3.5 h-3.5 text-violet-400" />
                            : <Lock className="w-3.5 h-3.5 t-text-20" />
                          }
                        </div>
                        <span className={cn("flex-1 text-xs", lesson.done ? "t-text-60 line-through" : "t-text-70")}>{lesson.title}</span>
                        <span className="t-text-30 text-[10px]">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-3">
          {/* Progress card */}
          <div className="panel p-5 space-y-3">
            <h3 className="t-text font-semibold text-sm">Your Progress</h3>
            <div className="text-center">
              <p className="t-text font-bold text-4xl">{progress}%</p>
              <p className="t-text-40 text-xs mt-1">Course completion</p>
            </div>
            <Progress value={progress} className="h-2" />
            <button
              className="w-full h-10 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--t-accent)" }}
            >
              <Play className="w-4 h-4" /> Continue Learning
            </button>
            {progress === 100 && (
              <button className="w-full h-10 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors t-text-60"
                style={{ borderColor: "var(--t-border-2)" }}>
                <Award className="w-4 h-4 text-amber-400" /> Download Certificate
              </button>
            )}
          </div>

          {/* Instructor card */}
          <div className="panel p-5 space-y-3">
            <h3 className="t-text font-semibold text-sm">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {instructor.avatar}
              </div>
              <div>
                <p className="t-text-80 text-sm font-semibold">{instructor.name}</p>
                <p className="t-text-40 text-xs">{instructor.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs t-text-40">
              <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /><span>{instructor.rating}</span></div>
              <div className="flex items-center gap-1"><Users className="w-3 h-3" /><span>{instructor.students.toLocaleString()}</span></div>
              <div className="flex items-center gap-1"><BookOpen className="w-3 h-3" /><span>{instructor.courses} courses</span></div>
            </div>
            <p className="t-text-40 text-xs leading-relaxed">{instructor.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
