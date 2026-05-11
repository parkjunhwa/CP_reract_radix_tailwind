"use client";

import { TrendingUp, TrendingDown, Users, Target, Phone, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Total Leads", value: "2,847", change: +12.4, icon: Users, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Win Rate", value: "34.2%", change: +3.1, icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Calls Made", value: "1,293", change: -2.8, icon: Phone, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "Pipeline Value", value: "$4.8M", change: +18.7, icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const earningsData = [
  { month: "Jan", revenue: 2.1, target: 2.5 },
  { month: "Feb", revenue: 3.2, target: 2.8 },
  { month: "Mar", revenue: 2.8, target: 3.0 },
  { month: "Apr", revenue: 4.1, target: 3.5 },
  { month: "May", revenue: 3.7, target: 3.8 },
  { month: "Jun", revenue: 5.2, target: 4.0 },
  { month: "Jul", revenue: 4.8, target: 4.5 },
  { month: "Aug", revenue: 6.1, target: 5.0 },
  { month: "Sep", revenue: 5.4, target: 5.2 },
  { month: "Oct", revenue: 7.2, target: 5.5 },
  { month: "Nov", revenue: 6.8, target: 6.0 },
  { month: "Dec", revenue: 9.4, target: 6.5 },
];

const radarData = [
  { subject: "Sales", A: 85, B: 68 },
  { subject: "Marketing", A: 72, B: 80 },
  { subject: "Support", A: 90, B: 75 },
  { subject: "Tech", A: 65, B: 88 },
  { subject: "HR", A: 78, B: 70 },
  { subject: "Finance", A: 88, B: 65 },
];

const salesByCountry = [
  { country: "United States", revenue: "$2.4M", share: 34, flag: "🇺🇸" },
  { country: "United Kingdom", revenue: "$1.1M", share: 16, flag: "🇬🇧" },
  { country: "France", revenue: "$890K", share: 13, flag: "🇫🇷" },
  { country: "Japan", revenue: "$760K", share: 11, flag: "🇯🇵" },
  { country: "Switzerland", revenue: "$640K", share: 9, flag: "🇨🇭" },
  { country: "Others", revenue: "$1.2M", share: 17, flag: "🌍" },
];

const projects = [
  { name: "Enterprise Deal - APAC", stage: "Negotiation", value: "$420K", prob: 80, color: "text-emerald-400" },
  { name: "Portfolio Expansion", stage: "Proposal", value: "$185K", prob: 55, color: "text-amber-400" },
  { name: "Strategic Partnership", stage: "Discovery", value: "$730K", prob: 30, color: "text-sky-400" },
  { name: "Platform Renewal", stage: "Closed Won", value: "$290K", prob: 100, color: "text-violet-400" },
];

const recentActivities = [
  { time: "9:14 AM", icon: "📞", text: "Call with Marcus Thompson completed", sub: "Deal value: $98K" },
  { time: "Yesterday", icon: "✉️", text: "Proposal sent to Sofia Marchetti", sub: "Enterprise tier — Milan" },
  { time: "Yesterday", icon: "✅", text: "Deal closed with Yuki Tanaka", sub: "$175K — Tokyo" },
  { time: "2 days ago", icon: "📅", text: "Meeting scheduled with Dmitri Volkov", sub: "Strategy review — Moscow" },
  { time: "2 days ago", icon: "🔔", text: "Follow-up reminder for Elena Petrov", sub: "Luxury spirits portfolio" },
];

export default function CRMPage() {
  return (
    <div className="space-y-3 pb-0">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.change >= 0;
          return (
            <div key={k.label} className="panel p-4 flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", k.bg)}>
                <Icon className={cn("w-5 h-5", k.color)} aria-hidden="true" />
              </div>
              <div>
                <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
                <p className="t-text font-bold text-xl leading-tight">{k.value}</p>
                <div className={cn("flex items-center gap-0.5 text-xs font-semibold mt-0.5", positive ? "text-emerald-400" : "text-red-400")}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {positive ? "+" : ""}{k.change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Earnings chart */}
        <div className="xl:col-span-2 panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Earnings vs Target</h3>
          <p className="t-text-30 text-xs mb-4">Monthly revenue ($ millions)</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={earningsData} margin={{ top: 8, right: 8, left: 4, bottom: 8 }}>
              <defs>
                <linearGradient id="crm-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} interval={0} />
              <YAxis width={36} tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#crm-rev)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="4 2" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart — legend outside SVG so axis labels (e.g. Tech) never overlap Q1/Q2 */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Department Performance</h3>
          <p className="t-text-30 text-xs mb-3">Q1 vs Q2 score</p>
          <div className="h-[200px] w-full sm:h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={radarData}
                cx="50%"
                cy="50%"
                outerRadius="58%"
                margin={{ top: 16, right: 20, bottom: 16, left: 20 }}
              >
                <PolarGrid stroke="var(--t-border)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "var(--t-text-40)" }}
                  tickLine={false}
                />
                <Radar name="Q1" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.25} strokeWidth={1.5} />
                <Radar name="Q2" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 text-xs t-text-50" style={{ borderColor: "var(--t-border)" }}>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-4 shrink-0 rounded-sm bg-[#7c3aed]" aria-hidden />
              <span className="t-text-60 font-medium">Q1</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-4 shrink-0 rounded-sm bg-[#10b981]" aria-hidden />
              <span className="t-text-60 font-medium">Q2</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Sales by country */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Sales by Countries</h3>
          <div className="space-y-3">
            {salesByCountry.map((c) => (
              <div key={c.country} className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="t-text-70 text-xs truncate">{c.country}</span>
                    <span className="t-text-40 text-xs ml-2">{c.share}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400" style={{ width: `${c.share}%` }} />
                  </div>
                </div>
                <span className="t-text-50 text-xs text-right w-14 flex-shrink-0">{c.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active projects pipeline */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Pipeline Deals</h3>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.name} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="t-text-70 text-xs truncate max-w-[160px]">{p.name}</span>
                  <span className="t-text font-semibold text-xs ml-2">{p.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400" style={{ width: `${p.prob}%` }} />
                  </div>
                  <span className={cn("text-[10px] font-medium w-16 flex-shrink-0", p.color)}>{p.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity timeline */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Activity Timeline</h3>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--t-border)" }} />
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="relative flex gap-3">
                  <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center text-base leading-none bg-white">
             
                    {a.icon}
                  </div>
                  <div>
                    <p className="t-text-70 text-xs font-medium">{a.text}</p>
                    <p className="t-text-40 text-[10px] mt-0.5">{a.sub}</p>
                    <p className="t-text-20 text-[10px] mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
