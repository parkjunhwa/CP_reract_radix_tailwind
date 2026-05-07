"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  ComposedChart, Scatter, ScatterChart,
  PieChart, Pie,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  Treemap, FunnelChart, Funnel, LabelList,
  ReferenceLine, ReferenceArea, Brush,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

const TOOLTIP_STYLE = {
  backgroundColor: "var(--luxe-sidebar-2)",
  border: "1px solid var(--t-border-2)",
  borderRadius: 8,
  fontSize: 12,
};
const AXIS_TICK = { fontSize: 10, fill: "var(--t-text-40)" };

const monthly = [
  { month: "Jan", revenue: 2.1, orders: 320, avg: 6562, target: 2.5 },
  { month: "Feb", revenue: 2.4, orders: 420, avg: 5714, target: 2.7 },
  { month: "Mar", revenue: 2.8, orders: 380, avg: 7368, target: 3.0 },
  { month: "Apr", revenue: 3.2, orders: 560, avg: 5714, target: 3.4 },
  { month: "May", revenue: 2.9, orders: 490, avg: 5918, target: 3.5 },
  { month: "Jun", revenue: 4.1, orders: 710, avg: 5775, target: 4.0 },
  { month: "Jul", revenue: 3.8, orders: 650, avg: 5846, target: 4.2 },
  { month: "Aug", revenue: 5.0, orders: 850, avg: 5882, target: 4.6 },
  { month: "Sep", revenue: 4.4, orders: 780, avg: 5641, target: 5.0 },
  { month: "Oct", revenue: 6.2, orders: 1020, avg: 6078, target: 5.6 },
  { month: "Nov", revenue: 5.8, orders: 940, avg: 6170, target: 6.2 },
  { month: "Dec", revenue: 9.4, orders: 1560, avg: 6026, target: 8.5 },
];

const stackedRegions = [
  { quarter: "Q1", americas: 2.4, emea: 1.6, apac: 1.0, mena: 0.5, latam: 0.3 },
  { quarter: "Q2", americas: 3.1, emea: 2.1, apac: 1.4, mena: 0.7, latam: 0.4 },
  { quarter: "Q3", americas: 4.0, emea: 2.6, apac: 1.9, mena: 0.9, latam: 0.5 },
  { quarter: "Q4", americas: 6.3, emea: 4.1, apac: 3.0, mena: 1.4, latam: 0.7 },
];
const REGION_COLORS = ["#7c3aed", "#10b981", "#0ea5e9", "#f59e0b", "#ec4899"];
const REGION_KEYS: Array<keyof (typeof stackedRegions)[number]> = ["americas", "emea", "apac", "mena", "latam"];

const scatterData = [
  { price: 52000, margin: 42, units: 80, name: "Rolex Daytona" },
  { price: 98000, margin: 37, units: 60, name: "AP Royal Oak" },
  { price: 142000, margin: 37, units: 35, name: "Patek Nautilus" },
  { price: 215000, margin: 35, units: 18, name: "Richard Mille" },
  { price: 68000, margin: 44, units: 55, name: "Cartier Diamond" },
  { price: 12500, margin: 52, units: 240, name: "Van Cleef Alhambra" },
  { price: 175000, margin: 46, units: 22, name: "Chanel HJ Set" },
  { price: 4800, margin: 54, units: 320, name: "Petrus 2010" },
  { price: 195000, margin: 44, units: 14, name: "Fabergé Egg" },
  { price: 42000, margin: 50, units: 90, name: "Bvlgari Serpenti" },
  { price: 22000, margin: 59, units: 160, name: "Dior Couture" },
  { price: 28000, margin: 43, units: 110, name: "JLC Reverso" },
];

const treemapData = [
  { name: "Watches", size: 38, fill: "#7c3aed" },
  { name: "Jewelry", size: 27, fill: "#f59e0b" },
  { name: "Fashion", size: 18, fill: "#ec4899" },
  { name: "Art", size: 11, fill: "#0ea5e9" },
  { name: "Spirits", size: 6, fill: "#10b981" },
];

const funnelData = [
  { name: "Visitors", value: 24800, fill: "#7c3aed" },
  { name: "Leads", value: 8420, fill: "#8b5cf6" },
  { name: "Qualified", value: 3180, fill: "#a78bfa" },
  { name: "Proposals", value: 1240, fill: "#c4b5fd" },
  { name: "Closed", value: 284, fill: "#ddd6fe" },
];

const radarData = [
  { skill: "Acquisition", actual: 85, target: 92 },
  { skill: "Retention", actual: 78, target: 88 },
  { skill: "Margin", actual: 72, target: 80 },
  { skill: "Velocity", actual: 88, target: 85 },
  { skill: "Brand", actual: 91, target: 95 },
  { skill: "Service", actual: 84, target: 90 },
];

const radialData = [
  { name: "Watches", value: 84, fill: "#7c3aed" },
  { name: "Jewelry", value: 72, fill: "#f59e0b" },
  { name: "Fashion", value: 58, fill: "#ec4899" },
  { name: "Art", value: 46, fill: "#0ea5e9" },
  { name: "Spirits", value: 38, fill: "#10b981" },
];

const pieData = [
  { name: "Watches", value: 38, color: "#7c3aed" },
  { name: "Jewelry", value: 27, color: "#f59e0b" },
  { name: "Fashion", value: 18, color: "#ec4899" },
  { name: "Art", value: 11, color: "#0ea5e9" },
  { name: "Spirits", value: 6, color: "#10b981" },
];

function PanelTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-3">
      <h3 className="t-text font-semibold text-sm">{title}</h3>
      <p className="t-text-30 text-xs mt-0.5">{desc}</p>
    </div>
  );
}

export default function RechartsPage() {
  return (
    <div className="space-y-3 pb-0">
      {/* Composed Chart */}
      <div className="panel p-5">
        <PanelTitle title="Composed Chart" desc="Bars + area + line on dual y-axes with reference line" />
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={monthly}>
            <defs>
              <linearGradient id="rc-rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
            <YAxis yAxisId="right" orientation="right" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine yAxisId="left" y={5} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Target", fill: "#f59e0b", fontSize: 10, position: "right" }} />
            <Bar yAxisId="right" dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Orders" opacity={0.7} />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#rc-rev)" strokeWidth={2} name="Revenue ($M)" />
            <Line yAxisId="right" type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2} dot={false} name="Avg ($)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {/* Smooth Area Chart */}
        <div className="panel p-5">
          <PanelTitle title="Area Chart" desc="Smooth area with gradient fill and active dot" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="rc-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Area type="monotone" dataKey="orders" stroke="#10b981" fill="url(#rc-area)" strokeWidth={2} activeDot={{ r: 5, fill: "#10b981" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked bar chart */}
        <div className="panel p-5">
          <PanelTitle title="Stacked Bar Chart" desc="Quarterly revenue stacked by region" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stackedRegions}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="quarter" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {REGION_KEYS.map((k, i) => (
                <Bar
                  key={k}
                  dataKey={k}
                  stackId="region"
                  fill={REGION_COLORS[i]}
                  name={String(k).toUpperCase()}
                  radius={i === REGION_KEYS.length - 1 ? [4, 4, 0, 0] : 0}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart with reference area */}
        <div className="panel p-5">
          <PanelTitle title="Line Chart" desc="Multi-line with reference band highlighting Q4 ramp" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceArea x1="Oct" x2="Dec" fill="#f59e0b" fillOpacity={0.08} label={{ value: "Holiday push", fontSize: 10, fill: "var(--t-text-50)" }} />
              <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} dot={false} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart with custom legend */}
        <div className="panel p-5">
          <PanelTitle title="Pie Chart" desc="Inner radius donut with side legend" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={88} dataKey="value" paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="var(--luxe-sidebar)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${Number(v ?? 0)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-8 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="t-text-50 text-xs flex-1 truncate">{d.name}</span>
                  <span className="t-text font-semibold text-xs">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="panel p-5">
          <PanelTitle title="Radar Chart" desc="Actual vs target across performance dimensions" />
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--t-border)" />
              <PolarAngleAxis dataKey="skill" tick={AXIS_TICK} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--t-text-30)" }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Radar name="Actual" dataKey="actual" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Bar */}
        <div className="panel p-5">
          <PanelTitle title="Radial Bar" desc="Concentric progress rings per category" />
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart innerRadius="20%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={6} />
              <Legend
                iconSize={8}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontSize: 11 }}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${Number(v ?? 0)}%`} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Scatter / Bubble */}
        <div className="xl:col-span-2 panel p-5">
          <PanelTitle title="Bubble Chart" desc="Price (X) vs margin (Y), bubble size = unit sales" />
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis
                dataKey="price"
                type="number"
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`}
                name="Price"
              />
              <YAxis
                dataKey="margin"
                type="number"
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                name="Margin"
              />
              <ZAxis dataKey="units" range={[40, 360]} name="Units" />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(v, name) => {
                  const n = Number(v ?? 0);
                  const key = String(name);
                  if (key === "margin") return [`${n}%`, "Margin"];
                  if (key === "price") return [`$${n.toLocaleString()}`, "Price"];
                  return [n.toLocaleString(), "Units"];
                }}
              />
              <Scatter data={scatterData} fill="#7c3aed" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel */}
        <div className="panel p-5">
          <PanelTitle title="Funnel Chart" desc="Lead → close conversion stages" />
          <ResponsiveContainer width="100%" height={260}>
            <FunnelChart>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                {funnelData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                <LabelList position="right" dataKey="name" style={{ fill: "var(--t-text-40)", fontSize: 10 }} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Treemap */}
      <div className="panel p-5">
        <PanelTitle title="Treemap" desc="Squarified treemap showing revenue share by category" />
        <ResponsiveContainer width="100%" height={220}>
          <Treemap
            data={treemapData}
            dataKey="size"
            nameKey="name"
            aspectRatio={4 / 3}
            content={({ x, y, width, height, name, value, fill }: { x?: number; y?: number; width?: number; height?: number; name?: string; value?: number; fill?: string }) => (
              <g>
                <rect x={x} y={y} width={width} height={height} fill={fill} stroke="var(--luxe-sidebar)" strokeWidth={2} rx={4} />
                {(width ?? 0) > 60 && (height ?? 0) > 30 && (
                  <>
                    <text x={(x ?? 0) + (width ?? 0) / 2} y={(y ?? 0) + (height ?? 0) / 2 - 6} textAnchor="middle" fill="white" fontSize={11} fontWeight={600}>{name}</text>
                    <text x={(x ?? 0) + (width ?? 0) / 2} y={(y ?? 0) + (height ?? 0) / 2 + 10} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={10}>{value}%</text>
                  </>
                )}
              </g>
            )}
          />
        </ResponsiveContainer>
      </div>

      {/* Brushable timeline */}
      <div className="panel p-5">
        <PanelTitle title="Brush + Area" desc="Drag to zoom into a specific time window" />
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="rc-brush" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="orders" stroke="#0ea5e9" fill="url(#rc-brush)" strokeWidth={2} />
            <Brush dataKey="month" height={24} stroke="#0ea5e9" travellerWidth={8} fill="var(--t-input-bg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
