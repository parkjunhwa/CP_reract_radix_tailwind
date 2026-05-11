"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  BookMarked,
  TrendingUp,
  TrendingDown,
  Calendar,
  Video,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { label: "Active programs", value: "18", delta: "+2 vs. last quarter", positive: true, icon: BookMarked, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Learners enrolled", value: "2,412", delta: "+186 this month", positive: true, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "Certificates (YTD)", value: "892", delta: "+64 vs. prior year", positive: true, icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Avg. lesson completion", value: "76%", delta: "+5 pts vs. Q3", positive: true, icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const enrollmentByMonth = [
  { month: "Jan", enrollments: 142, completions: 118 },
  { month: "Feb", enrollments: 168, completions: 151 },
  { month: "Mar", enrollments: 195, completions: 172 },
  { month: "Apr", enrollments: 181, completions: 169 },
  { month: "May", enrollments: 210, completions: 198 },
  { month: "Jun", enrollments: 236, completions: 221 },
];

const completionTrend = [
  { week: "W1", rate: 62 },
  { week: "W2", rate: 65 },
  { week: "W3", rate: 68 },
  { week: "W4", rate: 71 },
  { week: "W5", rate: 73 },
  { week: "W6", rate: 74 },
  { week: "W7", rate: 75 },
  { week: "W8", rate: 76 },
];

const thisWeek = [
  { title: "Live clinic: objection handling", when: "Wed 14:00 · Zoom", type: "live" as const },
  { title: "Assessment due — AML refresher", when: "Fri 18:00", type: "deadline" as const },
  { title: "Cohort kickoff — Store managers Q2", when: "Mon 09:30 · HQ", type: "cohort" as const },
];

const programs = [
  {
    name: "Retail clienteling & service excellence",
    path: "Certification",
    cohort: "EMEA · Apr 2026",
    completion: 74,
    nps: 52,
  },
  {
    name: "New hire onboarding — LUXE standards",
    path: "Onboarding",
    cohort: "Global · rolling",
    completion: 91,
    nps: 61,
  },
  {
    name: "Product knowledge: watches & complications",
    path: "Product",
    cohort: "APAC · Mar 2026",
    completion: 68,
    nps: 48,
  },
  {
    name: "Compliance — AML & client screening",
    path: "Compliance",
    cohort: "Legal · due May",
    completion: 82,
    nps: 44,
  },
  {
    name: "Visual merchandising playbook",
    path: "Retail ops",
    cohort: "Americas · Jun 2026",
    completion: 55,
    nps: 39,
  },
];

const pathBadge: Record<string, string> = {
  Certification: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Onboarding: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Product: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Compliance: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  "Retail ops": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

const ttStyle = {
  backgroundColor: "var(--luxe-sidebar-2)",
  border: "1px solid var(--t-border-2)",
  borderRadius: 8,
  fontSize: 12,
};

export default function AcademyDashboardPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="t-text-40 text-[10px] font-semibold uppercase tracking-wider">LUXE Academy</p>
          <h2 className="t-text font-semibold text-sm">Learning &amp; enablement overview</h2>
          <p className="t-text-30 text-xs max-w-xl leading-relaxed">
            Cohort programs, certifications, and mandatory training — aligned to retail, clienteling, and compliance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/apps/academy/my-courses"
            className="inline-flex h-9 items-center rounded-lg border px-3 text-xs font-medium transition-colors t-text-70 hover:bg-[color:var(--t-hover)]"
            style={{ borderColor: "var(--t-border-2)" }}
          >
            My learning
          </Link>
          <Link
            href="/apps/academy/course-details"
            className="inline-flex h-9 items-center rounded-lg px-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--t-accent)" }}
          >
            Open sample syllabus
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="panel p-4 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", k.bg)}>
                <Icon className={cn("h-5 w-5", k.color)} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="t-text-40 text-[11px] uppercase tracking-wide truncate">{k.label}</p>
                <p className="t-text font-bold text-xl leading-tight">{k.value}</p>
                <div className={cn("mt-0.5 flex items-center gap-0.5 text-xs font-semibold", k.positive ? "text-emerald-400" : "text-red-400")}>
                  {k.positive ? <TrendingUp className="h-3 w-3 shrink-0" /> : <TrendingDown className="h-3 w-3 shrink-0" />}
                  <span className="truncate">{k.delta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="panel p-5 xl:col-span-2">
          <h3 className="t-text font-semibold text-sm">Enrollments &amp; completions</h3>
          <p className="t-text-30 mb-4 text-xs">Monthly new enrollments vs. lessons marked complete</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enrollmentByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={ttStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="enrollments" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Enrollments" />
              <Bar dataKey="completions" fill="#10b981" radius={[4, 4, 0, 0]} name="Completions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm">This week</h3>
          <p className="t-text-30 mb-4 text-xs">Live sessions, deadlines, and cohort events</p>
          <ul className="space-y-3">
            {thisWeek.map((ev) => (
              <li key={ev.title} className="flex gap-3 rounded-lg border p-3" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--luxe-sidebar-2)" }}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  {ev.type === "live" ? <Video className="h-4 w-4" aria-hidden /> : null}
                  {ev.type === "deadline" ? <ClipboardList className="h-4 w-4" aria-hidden /> : null}
                  {ev.type === "cohort" ? <Calendar className="h-4 w-4" aria-hidden /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="t-text-70 text-xs font-medium leading-snug">{ev.title}</p>
                  <p className="t-text-30 mt-0.5 text-[10px]">{ev.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="panel p-5 xl:col-span-2">
          <h3 className="t-text font-semibold text-sm">Average completion rate</h3>
          <p className="t-text-30 mb-4 text-xs">Rolling 8 weeks — organization-wide lesson completion</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 85]} tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={ttStyle} formatter={(v) => [`${v}%`, "Completion"]} />
              <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} name="Completion %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="panel flex flex-col justify-center p-5">
          <p className="t-text-40 text-xs leading-relaxed">
            Programs are assigned by <span className="t-text-60 font-medium">role</span> and <span className="t-text-60 font-medium">region</span>.
            Managers approve extensions; HRIS sync is out of scope for this demo.
          </p>
          <Link href="/apps/academy/my-courses" className="t-accent-text mt-3 inline-flex text-xs font-medium underline">
            Go to learner catalog →
          </Link>
        </div>
      </div>

      <div className="panel">
        <div className="border-b px-5 py-4" style={{ borderColor: "var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Programs &amp; cohorts</h3>
          <p className="t-text-30 mt-0.5 text-xs">Mandatory paths, certifications, and operational playbooks</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--t-border)" }}>
                {["Program", "Path", "Cohort", "Completion", "NPS"].map((h) => (
                  <th key={h} className="t-text-30 px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.name} className="t-hover border-b transition-colors" style={{ borderColor: "var(--t-border)" }}>
                  <td className="px-5 py-3.5">
                    <span className="t-text-70 text-xs font-medium">{p.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("rounded-full border px-2 py-0.5 text-[10px]", pathBadge[p.path] ?? "bg-slate-500/10 text-slate-500 border-slate-500/20")}>
                      {p.path}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text-50 text-xs">{p.cohort}</span>
                  </td>
                  <td className="w-40 px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Progress value={p.completion} className="h-1.5 flex-1" />
                      <span className="t-text-50 w-8 text-xs">{p.completion}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text-60 text-xs font-semibold tabular-nums">{p.nps}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
