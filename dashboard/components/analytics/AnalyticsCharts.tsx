"use client";

import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month:"Jan", watches:1800000, jewelry:980000, fashion:420000, art:320000 },
  { month:"Feb", watches:1600000, jewelry:880000, fashion:380000, art:290000 },
  { month:"Mar", watches:2100000, jewelry:1200000, fashion:510000, art:410000 },
  { month:"Apr", watches:1900000, jewelry:1050000, fashion:460000, art:350000 },
  { month:"May", watches:2400000, jewelry:1350000, fashion:580000, art:450000 },
  { month:"Jun", watches:2700000, jewelry:1500000, fashion:650000, art:520000 },
  { month:"Jul", watches:2500000, jewelry:1400000, fashion:610000, art:490000 },
  { month:"Aug", watches:2900000, jewelry:1600000, fashion:700000, art:560000 },
  { month:"Sep", watches:3100000, jewelry:1750000, fashion:750000, art:610000 },
  { month:"Oct", watches:2950000, jewelry:1680000, fashion:720000, art:580000 },
  { month:"Nov", watches:3500000, jewelry:1950000, fashion:860000, art:690000 },
  { month:"Dec", watches:4100000, jewelry:2300000, fashion:1000000, art:810000 },
];

const retentionData = [
  { month:"Jan", rate:64 }, { month:"Feb", rate:61 }, { month:"Mar", rate:67 },
  { month:"Apr", rate:65 }, { month:"May", rate:69 }, { month:"Jun", rate:72 },
  { month:"Jul", rate:70 }, { month:"Aug", rate:74 }, { month:"Sep", rate:76 },
  { month:"Oct", rate:73 }, { month:"Nov", rate:78 }, { month:"Dec", rate:80 },
];

const fmtM = (v: number) => `$${(v/1_000_000).toFixed(1)}M`;

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

const TIP = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="panel-2 px-4 py-3 shadow-xl rounded-xl" style={{ borderColor: "var(--t-border-2)" }}>
      <p className="t-text-40 text-xs mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="t-text-50 capitalize">{p.name}:</span>
          <span className="t-text font-semibold">
            {typeof p.value === "number" && p.value > 10000 ? fmtM(p.value) : `${p.value}%`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Stacked area by category */}
      <div className="lg:col-span-2 panel p-5">
        <h3 className="t-text font-semibold text-sm mb-1">Revenue by Category</h3>
        <p className="t-text-30 text-xs mb-4">Monthly breakdown · 2025</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top:4, right:4, bottom:0, left:0 }}>
              <defs>
                {[
                  { id:"watches", color:"#7c3aed" },
                  { id:"jewelry", color:"#f59e0b" },
                  { id:"fashion", color:"#ec4899" },
                  { id:"art",     color:"#0ea5e9" },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke="var(--t-chart-grid)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:11 }} tickFormatter={fmtM} width={48} />
              <Tooltip content={<TIP />} cursor={{ stroke:"var(--t-border-2)", strokeWidth:1 }} />
              <Area type="monotone" dataKey="art"     stroke="#0ea5e9" strokeWidth={1.5} fill="url(#art)"     dot={false} stackId="a" />
              <Area type="monotone" dataKey="fashion"  stroke="#ec4899" strokeWidth={1.5} fill="url(#fashion)" dot={false} stackId="a" />
              <Area type="monotone" dataKey="jewelry"  stroke="#f59e0b" strokeWidth={1.5} fill="url(#jewelry)" dot={false} stackId="a" />
              <Area type="monotone" dataKey="watches"  stroke="#7c3aed" strokeWidth={2}   fill="url(#watches)" dot={false} stackId="a" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-3">
          {[["Watches","#7c3aed"],["Jewelry","#f59e0b"],["Fashion","#ec4899"],["Art","#0ea5e9"]].map(([l,c]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />
              <span className="t-text-40 text-xs">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Retention line */}
      <div className="panel p-5">
        <h3 className="t-text font-semibold text-sm mb-1">Client Retention</h3>
        <p className="t-text-30 text-xs mb-4">Monthly repeat rate · 2025</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retentionData} margin={{ top:4, right:4, bottom:0, left:0 }}>
              <CartesianGrid vertical={false} stroke="var(--t-chart-grid)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:10 }} domain={[55, 85]} tickFormatter={v => `${v}%`} width={36} />
              <Tooltip content={<TIP />} cursor={{ stroke:"var(--t-border-2)", strokeWidth:1 }} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, fill: "#10b981", stroke: "var(--t-surface)", strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block rounded" />
            <span className="t-text-40 text-xs">Retention %</span>
          </div>
          <div className="ml-auto text-right">
            <p className="text-emerald-400 font-semibold text-sm">80%</p>
            <p className="t-text-30 text-[11px]">Dec peak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
