"use client";

import Link from "next/link";
import { Clock, BookOpen, Users, Star, Play, Award, CheckCircle2, Lock, Calendar, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const curriculum = [
  {
    section: "Module 1 — Clienteling mindset",
    lessons: [
      { title: "What great service looks like in luxury retail", duration: "22m", done: true },
      { title: "Clienteling vs. transactional selling", duration: "18m", done: true },
      { title: "Using CRM notes without sounding robotic", duration: "26m", done: true },
      { title: "Practice: first-touch script (video submit)", duration: "35m", done: false },
    ],
  },
  {
    section: "Module 2 — Discovery & trust",
    lessons: [
      { title: "Open questions and listening cues", duration: "24m", done: false },
      { title: "Handling hesitation without pressure", duration: "30m", done: false },
      { title: "Escalation paths: when to involve a specialist", duration: "16m", done: false },
    ],
  },
  {
    section: "Module 3 — Follow-through & retention",
    lessons: [
      { title: "Post-visit follow-up within 24 hours", duration: "20m", done: false },
      { title: "Client milestones: birthdays, repairs, wish lists", duration: "28m", done: false },
      { title: "Capstone: role-play assessment (manager sign-off)", duration: "40m", done: false },
    ],
  },
];

const instructor = {
  name: "Retail L&D — Program office",
  title: "Certification owner · EMEA retail enablement",
  avatar: "LD",
  rating: 4.85,
  learners: 1840,
  programs: 6,
  bio: "This path is maintained with store managers and CX. Content updates ship quarterly; optional live clinics are announced on the Academy dashboard.",
};

const cohort = {
  name: "EMEA · Spring 2026",
  kickoff: "Apr 7, 2026",
  assessmentDue: "May 30, 2026",
  liveClinic: "Wed weekly · 14:00 CET (optional)",
};

export default function CourseDetailsPage() {
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const doneLessons = curriculum.reduce((acc, m) => acc + m.lessons.filter((l) => l.done).length, 0);
  const progress = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div className="space-y-3 pb-0">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/apps/academy/my-courses"
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium t-text-70 transition-colors hover:bg-[color:var(--t-hover)]"
          style={{ borderColor: "var(--t-border-2)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          My programs
        </Link>
        <Link href="/dashboards/academy" className="t-accent-text text-xs font-medium underline">
          Academy overview
        </Link>
      </div>

      <div className="panel p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-xl text-6xl md:w-48" style={{ backgroundColor: "var(--t-hover)" }}>
            🎓
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="border bg-amber-500/10 px-2 text-[10px] text-amber-500 border-amber-500/20">Certification</Badge>
              <Badge className="border bg-violet-500/10 px-2 text-[10px] text-violet-500 border-violet-500/20">Retail · clienteling</Badge>
            </div>
            <h1 className="t-text text-xl font-bold">Retail clienteling &amp; service excellence</h1>
            <p className="t-text-40 text-sm leading-relaxed">
              Role-based certification for client advisors and floor leads: discovery, trust, CRM hygiene, and follow-up
              that match LUXE service standards. Includes manager sign-off and optional live clinics.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs t-text-40">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400" aria-hidden />
                <span className="font-semibold text-amber-400">4.8</span>
                <span>(peer + manager reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" aria-hidden />
                <span>{instructor.learners.toLocaleString()} learners enrolled</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                <span>~12h 30m total</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                <span>{totalLessons} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          <div className="panel p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="t-text font-semibold text-sm">Syllabus</h2>
              <span className="t-text-40 text-xs">
                {doneLessons}/{totalLessons} complete
              </span>
            </div>
            <Progress value={progress} className="mb-4 h-1.5" />
            <div className="space-y-4">
              {curriculum.map((mod, mi) => (
                <div key={mod.section}>
                  <h3 className="t-text-60 mb-2 text-xs font-semibold">{mod.section}</h3>
                  <div className="space-y-1">
                    {mod.lessons.map((lesson, li) => (
                      <div key={lesson.title} className="t-hover flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                          {lesson.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />
                          ) : mi === 0 && li === 3 ? (
                            <Play className="h-3.5 w-3.5 text-violet-400" aria-hidden />
                          ) : (
                            <Lock className="t-text-20 h-3.5 w-3.5" aria-hidden />
                          )}
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

        <div className="space-y-3">
          <div className="panel space-y-3 p-5">
            <h3 className="t-text font-semibold text-sm">Your progress</h3>
            <div className="text-center">
              <p className="t-text text-4xl font-bold">{progress}%</p>
              <p className="t-text-40 mt-1 text-xs">Path completion</p>
            </div>
            <Progress value={progress} className="h-2" />
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--t-accent)" }}
            >
              <Play className="h-4 w-4" aria-hidden />
              Continue learning
            </button>
            {progress === 100 && (
              <button
                type="button"
                className="t-text-60 flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-xs font-medium transition-colors"
                style={{ borderColor: "var(--t-border-2)" }}
              >
                <Award className="h-4 w-4 text-amber-400" aria-hidden />
                Download certificate
              </button>
            )}
          </div>

          <div className="panel space-y-3 p-5">
            <h3 className="t-text font-semibold text-sm">Cohort &amp; schedule</h3>
            <ul className="space-y-2 text-xs t-text-50">
              <li className="flex gap-2">
                <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" aria-hidden />
                <span>
                  <span className="t-text-60 font-medium">Cohort:</span> {cohort.name}
                </span>
              </li>
              <li>
                <span className="t-text-60 font-medium">Kickoff:</span> {cohort.kickoff}
              </li>
              <li>
                <span className="t-text-60 font-medium">Assessment due:</span> {cohort.assessmentDue}
              </li>
              <li>
                <span className="t-text-60 font-medium">Live clinics:</span> {cohort.liveClinic}
              </li>
            </ul>
          </div>

          <div className="panel space-y-3 p-5">
            <h3 className="t-text font-semibold text-sm">Program owner</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-sm font-bold text-white">
                {instructor.avatar}
              </div>
              <div className="min-w-0">
                <p className="t-text-80 text-sm font-semibold">{instructor.name}</p>
                <p className="t-text-40 text-xs">{instructor.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs t-text-40">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400" aria-hidden />
                <span>{instructor.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" aria-hidden />
                <span>{instructor.learners.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" aria-hidden />
                <span>{instructor.programs} active paths</span>
              </div>
            </div>
            <p className="t-text-40 text-xs leading-relaxed">{instructor.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
