"use client";

import dynamic from "next/dynamic";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Charts = dynamic(() => import("@/components/analytics/AnalyticsCharts"), { ssr: false });

const metrics = [
  { label:"Revenue Growth", value:"14.2%", change:+2.1, period:"vs prior year", positive:true },
  { label:"New Client Acquisition", value:"284", change:+22.5, period:"vs prior year", positive:true },
  { label:"Avg. Transaction Value", value:"$117K", change:+4.1, period:"vs prior year", positive:true },
  { label:"Return Rate", value:"1.2%", change:-0.3, period:"vs prior year", positive:true },
  { label:"Conversion Rate", value:"3.42%", change:-0.8, period:"vs prior year", positive:false },
  { label:"Repeat Purchase Rate", value:"68%", change:+5.4, period:"vs prior year", positive:true },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 pb-6">
      {/* Metric row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="rounded-xl border border-white/8 bg-[#0d0d18] p-4 flex flex-col gap-3">
            <p className="text-white/40 text-[11px] uppercase tracking-wide">{m.label}</p>
            <p className="text-white font-bold text-2xl">{m.value}</p>
            <div className={cn("flex items-center gap-1 text-xs font-semibold", m.positive ? "text-emerald-400" : "text-red-400")}>
              {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {m.change > 0 ? "+" : ""}{m.change}%
              <span className="text-white/25 font-normal ml-1">{m.period}</span>
            </div>
          </div>
        ))}
      </div>

      <Charts />

      {/* Insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title:"Top Revenue Month", value:"December 2025", detail:"$9.4M — 834 orders", color:"text-violet-400" },
          { title:"Best-Selling Category", value:"Luxury Watches", detail:"$10.76M · 38% of total revenue", color:"text-amber-400" },
          { title:"Fastest Growing Region", value:"Asia Pacific", detail:"+31% YoY · Singapore leads", color:"text-emerald-400" },
        ].map(ins => (
          <div key={ins.title} className="rounded-xl border border-white/8 bg-[#0d0d18] p-5 flex flex-col gap-2">
            <p className="text-white/40 text-xs uppercase tracking-wide">{ins.title}</p>
            <p className={cn("font-bold text-lg", ins.color)}>{ins.value}</p>
            <p className="text-white/40 text-xs">{ins.detail}</p>
            <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 mt-1">
              View details <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
