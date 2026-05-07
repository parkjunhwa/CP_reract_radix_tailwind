"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 2.1, orders: 320, clients: 28 },
  { month: "Feb", revenue: 2.4, orders: 420, clients: 34 },
  { month: "Mar", revenue: 2.8, orders: 380, clients: 31 },
  { month: "Apr", revenue: 3.2, orders: 560, clients: 42 },
  { month: "May", revenue: 2.9, orders: 490, clients: 38 },
  { month: "Jun", revenue: 4.1, orders: 710, clients: 51 },
  { month: "Jul", revenue: 3.8, orders: 650, clients: 47 },
  { month: "Aug", revenue: 5.0, orders: 850, clients: 63 },
  { month: "Sep", revenue: 4.4, orders: 780, clients: 58 },
  { month: "Oct", revenue: 6.2, orders: 1020, clients: 74 },
  { month: "Nov", revenue: 5.8, orders: 940, clients: 69 },
  { month: "Dec", revenue: 9.4, orders: 1560, clients: 98 },
];

const radarData = [
  { subject: "Watches", A: 85, B: 72 },
  { subject: "Jewelry", A: 72, B: 85 },
  { subject: "Fashion", A: 64, B: 78 },
  { subject: "Art", A: 78, B: 62 },
  { subject: "Spirits", A: 91, B: 55 },
];

const pieData = [
  { name: "Luxury Watches", value: 38, color: "#7c3aed" },
  { name: "Fine Jewelry", value: 27, color: "#f59e0b" },
  { name: "Premium Fashion", value: 18, color: "#ec4899" },
  { name: "Art & Collectibles", value: 11, color: "#0ea5e9" },
  { name: "Rare Spirits", value: 6, color: "#10b981" },
];

const TOOLTIP_STYLE = { backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 };

const charts = [
  {
    title: "Area Chart — Monthly Revenue",
    desc: "Stacked area chart showing revenue and orders over 12 months",
    element: (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="apex-rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="apex-ord" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#apex-rev)" strokeWidth={2} name="Revenue ($M)" />
          <Area type="monotone" dataKey="orders" stroke="#10b981" fill="url(#apex-ord)" strokeWidth={2} name="Orders" yAxisId={0} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Bar Chart — Quarterly Comparison",
    desc: "Grouped bar chart comparing key metrics across quarters",
    element: (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={[
          { quarter: "Q1", revenue: 7.3, target: 8.3, lastYear: 5.8 },
          { quarter: "Q2", revenue: 10.2, target: 11.3, lastYear: 7.9 },
          { quarter: "Q3", revenue: 13.2, target: 14.7, lastYear: 9.4 },
          { quarter: "Q4", revenue: 22.0, target: 18.5, lastYear: 14.1 },
        ]}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
          <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Actual ($M)" />
          <Bar dataKey="target" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Target ($M)" />
          <Bar dataKey="lastYear" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Last Year ($M)" />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Radar Chart — Performance Metrics",
    desc: "Spider chart comparing sales performance across product categories",
    element: (
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="var(--t-border)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} />
          <Radar name="This Year" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
          <Radar name="Last Year" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </RadarChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Donut Chart — Revenue by Category",
    desc: "Pie chart showing revenue distribution by product category",
    element: (
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="40%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-8 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="t-text-50 text-xs flex-1 truncate">{d.name}</span>
              <span className="t-text font-semibold text-xs">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ApexChartsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-sm mb-1">Chart Examples</h2>
        <p className="t-text-40 text-xs">Interactive charts built with Recharts — mirroring Apex Charts style patterns.</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {charts.map((c) => (
          <div key={c.title} className="panel p-5 space-y-4">
            <div>
              <h3 className="t-text font-semibold text-sm">{c.title}</h3>
              <p className="t-text-30 text-xs mt-0.5">{c.desc}</p>
            </div>
            {c.element}
          </div>
        ))}
      </div>
    </div>
  );
}
