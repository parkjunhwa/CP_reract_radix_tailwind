"use client";

import { BookOpen, Users, Award, TrendingUp, TrendingDown, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { label: "Total Courses", value: "248", change: +12, icon: BookOpen, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Active Students", value: "4,891", change: +18.4, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "Certificates Issued", value: "1,283", change: +22.1, icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Avg. Completion", value: "68%", change: +4.3, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const enrollmentData = [
  { month: "Jan", students: 280 },
  { month: "Feb", students: 340 },
  { month: "Mar", students: 420 },
  { month: "Apr", students: 380 },
  { month: "May", students: 490 },
  { month: "Jun", students: 560 },
  { month: "Jul", students: 510 },
  { month: "Aug", students: 620 },
  { month: "Sep", students: 710 },
  { month: "Oct", students: 680 },
  { month: "Nov", students: 750 },
  { month: "Dec", students: 830 },
];

const popularCourses = [
  { name: "Luxury Brand Management", students: 842, completion: 74, rating: 4.9, category: "Business" },
  { name: "Fine Art Valuation & Appraisal", students: 631, completion: 68, rating: 4.8, category: "Arts" },
  { name: "Watch Complications Masterclass", students: 519, completion: 81, rating: 4.9, category: "Horology" },
  { name: "Rare Wine Investment", students: 487, completion: 72, rating: 4.7, category: "Spirits" },
  { name: "Haute Couture Fundamentals", students: 412, completion: 65, rating: 4.8, category: "Fashion" },
];

const instructors = [
  { name: "Dr. Elaine Morrison", courses: 12, students: 1820, rating: 4.95, avatar: "EM" },
  { name: "Prof. Jean-Claude Vidal", courses: 8, students: 1230, rating: 4.92, avatar: "JV" },
  { name: "Ms. Akari Nakamura", courses: 15, students: 2100, rating: 4.88, avatar: "AN" },
];

const avatarColors = ["from-violet-500 to-purple-700", "from-sky-500 to-blue-700", "from-amber-500 to-orange-700"];

export default function AcademyDashboardPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.change >= 0;
          return (
            <div key={k.label} className="panel p-4 flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", k.bg)}>
                <Icon className={cn("w-5 h-5", k.color)} aria-hidden="true" />
              </div>
              <div>
                <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
                <p className="t-text font-bold text-xl">{k.value}</p>
                <div className={cn("flex items-center gap-0.5 text-xs font-semibold mt-0.5", positive ? "text-emerald-400" : "text-red-400")}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {positive ? "+" : ""}{k.change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Monthly Enrollments</h3>
          <p className="t-text-30 text-xs mb-4">New student enrollments per month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="students" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Top Instructors</h3>
          <div className="space-y-4">
            {instructors.map((ins, i) => (
              <div key={ins.name} className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-full bg-gradient-to-br text-white text-xs font-bold flex items-center justify-center flex-shrink-0", avatarColors[i])}>
                  {ins.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="t-text-70 text-xs font-medium truncate">{ins.name}</p>
                  <p className="t-text-40 text-[10px]">{ins.courses} courses · {ins.students.toLocaleString()} students</p>
                </div>
                <div className="flex items-center gap-0.5 text-xs text-amber-400 font-semibold flex-shrink-0">
                  <Star className="w-3 h-3" />
                  {ins.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Popular Courses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Course", "Category", "Students", "Completion", "Rating"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {popularCourses.map((c) => (
                <tr key={c.name} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <td className="px-5 py-3.5">
                    <span className="t-text-70 text-xs font-medium">{c.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full border bg-violet-500/10 text-violet-400 border-violet-500/20">{c.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 t-text-30" />
                      <span className="t-text-50 text-xs">{c.students.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 w-36">
                    <div className="flex items-center gap-2">
                      <Progress value={c.completion} className="h-1.5 flex-1" />
                      <span className="t-text-50 text-xs w-8">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3 h-3" />
                      {c.rating}
                    </div>
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
