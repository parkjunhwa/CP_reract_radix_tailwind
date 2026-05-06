"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { revenueData } from "@/lib/data";
import { TrendingUp } from "lucide-react";

type ChartTooltipPayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
};
type ChartTooltipProps = {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="panel-2 px-4 py-3 shadow-xl rounded-xl" style={{ borderColor:"var(--t-border-2)" }}>
      <p className="t-text-40 text-xs mb-2 font-medium">{label} 2025</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="t-text-50 capitalize">{p.name}:</span>
          <span className="t-text font-semibold">
            ${((Number(p.value) || 0) / 1_000_000).toFixed(2)}M
          </span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueChart() {
  const gridColor = "var(--t-chart-grid)";
  const tickColor = "var(--t-chart-tick)";
  const avgColor = "rgba(245,158,11,0.4)";
  const targetClr = "var(--t-text-20)";
  const accentLine = "var(--t-accent)";
  const avgRevenue = revenueData.reduce((s, d) => s + d.revenue, 0) / revenueData.length;

  return (
    <section aria-label="Revenue vs target chart" className="panel p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h3 className="t-text font-semibold text-sm">Revenue vs Target</h3>
          <p className="t-text-30 text-xs mt-0.5">Annual performance overview · 2025</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
          <span className="text-emerald-500 text-xs font-semibold">+14.2% YoY</span>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {[["Revenue","var(--t-accent)","solid"],["Target","var(--t-text-30)","dashed"],["Average","var(--t-text-40)","dotted"]].map(([l,c,s]) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className={`w-3 h-0.5 rounded-full inline-block ${s === "dashed" ? "opacity-50" : ""}`} style={{ backgroundColor: c, borderStyle: s !== "solid" ? s : undefined }} />
            <span className="t-text-40 text-xs">{l}</span>
          </div>
        ))}
      </div>

      <div className="h-56" role="img" aria-label="2025 monthly revenue and target area chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top:4, right:4, bottom:0, left:0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={accentLine} stopOpacity={0.3} />
                <stop offset="95%" stopColor={accentLine} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={tickColor} stopOpacity={0.08} />
                <stop offset="95%" stopColor={tickColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:tickColor, fontSize:11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill:tickColor, fontSize:11 }} tickFormatter={v=>`$${(v/1_000_000).toFixed(0)}M`} width={48} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke:"var(--t-border-2)", strokeWidth:1 }} />
            <ReferenceLine y={avgRevenue} stroke={avgColor} strokeDasharray="4 4" strokeWidth={1} />
            <Area type="monotone" dataKey="target"  stroke={targetClr} strokeWidth={1.5} strokeDasharray="4 4" fill="url(#tgtGrad)" dot={false} />
            <Area type="monotone" dataKey="revenue" stroke={accentLine} strokeWidth={2} fill="url(#revGrad)" dot={false}
              activeDot={{ r:5, fill:accentLine, stroke:"var(--t-surface)", strokeWidth:2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
