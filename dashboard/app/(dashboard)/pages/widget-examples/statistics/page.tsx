"use client";

import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: "$28.4M", change: +14.2, icon: DollarSign, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "New Orders",    value: "4,823",  change: +8.7,  icon: ShoppingCart, color: "text-sky-400",    bg: "bg-sky-500/10" },
  { label: "Active Clients",value: "1,247",  change: +22.5, icon: Users,        color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Avg. Order",    value: "$5,882", change: +4.1,  icon: Package,      color: "text-amber-400",   bg: "bg-amber-500/10" },
  { label: "Win Rate",      value: "34.2%",  change: +3.1,  icon: Award,        color: "text-rose-400",    bg: "bg-rose-500/10" },
  { label: "Auth. Time",    value: "2.4d",   change: -0.3,  icon: Clock,        color: "text-teal-400",    bg: "bg-teal-500/10" },
];

const horizontal = [
  { label: "Patek Philippe Nautilus", sold: 24, pct: 82, revenue: "$3.41M" },
  { label: "Richard Mille RM 011",   sold: 18, pct: 68, revenue: "$3.87M" },
  { label: "Cartier Diamond Bracelet",sold: 41, pct: 55, revenue: "$2.79M" },
  { label: "Rolex Daytona White Gold",sold: 67, pct: 44, revenue: "$3.48M" },
];

const stacked = [
  { label: "New Clients",    value: 284, pct: 23, color: "#7c3aed" },
  { label: "Returning",      value: 891, pct: 71, color: "#0ea5e9" },
  { label: "At-Risk",        value: 72,  pct: 6,  color: "#f59e0b" },
];

export default function StatisticsWidgetsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-sm mb-4">KPI Cards — Horizontal</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {stats.map(s => {
            const Icon = s.icon;
            const up = s.change >= 0;
            return (
              <div key={s.label} className="panel p-4 flex flex-col gap-2.5">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s.bg)}>
                  <Icon className={cn("w-4 h-4", s.color)} />
                </div>
                <div>
                  <p className="t-text-30 text-[10px] uppercase tracking-wide">{s.label}</p>
                  <p className="t-text font-bold text-lg leading-tight">{s.value}</p>
                  <div className={cn("flex items-center gap-0.5 text-[10px] font-semibold mt-0.5", up ? "text-emerald-400" : "text-red-400")}>
                    {up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {up ? "+" : ""}{s.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Top Products by Revenue</h3>
          <div className="space-y-4">
            {horizontal.map(p => (
              <div key={p.label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="t-text-60 text-xs truncate max-w-[60%]">{p.label}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="t-text-40 text-[10px]">{p.sold} sold</span>
                    <span className="t-text font-semibold text-xs">{p.revenue}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${p.pct}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Client Segmentation</h3>
          <div className="space-y-4">
            {stacked.map(s => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="t-text-60 text-xs">{s.label}</span>
                    <span className="t-text-40 text-xs">{s.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                  </div>
                </div>
                <span className="t-text font-bold text-sm w-10 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-3" style={{ borderColor: "var(--t-border)" }}>
            {[["Total Clients", "1,247"], ["Avg. LTV", "$89K"], ["Churn Rate", "4.2%"]].map(([k, v]) => (
              <div key={k} className="text-center">
                <p className="t-text font-bold text-base">{v}</p>
                <p className="t-text-30 text-[10px] mt-0.5">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
