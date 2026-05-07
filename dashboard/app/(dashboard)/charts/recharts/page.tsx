"use client";

import {
  ComposedChart, Bar, Line, Area, Scatter, ScatterChart,
  Treemap, FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

const TOOLTIP_STYLE = { backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 };

const composedData = [
  { month: "Jan", revenue: 2.1, orders: 320, avg: 6562 },
  { month: "Feb", revenue: 2.4, orders: 420, avg: 5714 },
  { month: "Mar", revenue: 2.8, orders: 380, avg: 7368 },
  { month: "Apr", revenue: 3.2, orders: 560, avg: 5714 },
  { month: "May", revenue: 2.9, orders: 490, avg: 5918 },
  { month: "Jun", revenue: 4.1, orders: 710, avg: 5775 },
  { month: "Jul", revenue: 3.8, orders: 650, avg: 5846 },
  { month: "Aug", revenue: 5.0, orders: 850, avg: 5882 },
  { month: "Sep", revenue: 4.4, orders: 780, avg: 5641 },
  { month: "Oct", revenue: 6.2, orders: 1020, avg: 6078 },
  { month: "Nov", revenue: 5.8, orders: 940, avg: 6170 },
  { month: "Dec", revenue: 9.4, orders: 1560, avg: 6026 },
];

const scatterData = [
  { price: 52000, margin: 42, name: "Rolex Daytona" },
  { price: 98000, margin: 37, name: "AP Royal Oak" },
  { price: 142000, margin: 37, name: "Patek Nautilus" },
  { price: 215000, margin: 35, name: "Richard Mille" },
  { price: 68000, margin: 44, name: "Cartier Diamond" },
  { price: 12500, margin: 52, name: "Van Cleef Alhambra" },
  { price: 175000, margin: 46, name: "Chanel HJ Set" },
  { price: 4800, margin: 54, name: "Petrus 2010" },
  { price: 195000, margin: 44, name: "Fabergé Egg" },
  { price: 42000, margin: 50, name: "Bvlgari Serpenti" },
  { price: 22000, margin: 59, name: "Dior Couture" },
  { price: 28000, margin: 43, name: "JLC Reverso" },
];

const treemapData = [
  { name: "Luxury Watches", size: 38, fill: "#7c3aed" },
  { name: "Fine Jewelry", size: 27, fill: "#f59e0b" },
  { name: "Premium Fashion", size: 18, fill: "#ec4899" },
  { name: "Art & Collectibles", size: 11, fill: "#0ea5e9" },
  { name: "Rare Spirits", size: 6, fill: "#10b981" },
];

const funnelData = [
  { name: "Website Visitors", value: 24800, fill: "#7c3aed" },
  { name: "Leads Generated", value: 8420, fill: "#8b5cf6" },
  { name: "Qualified Leads", value: 3180, fill: "#a78bfa" },
  { name: "Proposals Sent", value: 1240, fill: "#c4b5fd" },
  { name: "Deals Closed", value: 284, fill: "#ddd6fe" },
];

export default function RechartsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-sm mb-1">Recharts Examples</h2>
        <p className="t-text-40 text-xs">Advanced chart types using Recharts — composed, scatter, treemap, funnel.</p>
      </div>

      {/* Composed Chart */}
      <div className="panel p-5">
        <h3 className="t-text font-semibold text-sm mb-1">Composed Chart</h3>
        <p className="t-text-30 text-xs mb-4">Combines bars (orders), area (revenue), and line (avg. order value)</p>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={composedData}>
            <defs>
              <linearGradient id="recharts-rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Orders" opacity={0.7} />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#recharts-rev)" strokeWidth={2} name="Revenue ($M)" />
            <Line yAxisId="right" type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2} dot={false} name="Avg Value ($)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Scatter Chart */}
        <div className="xl:col-span-2 panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Scatter Chart — Price vs Margin</h3>
          <p className="t-text-30 text-xs mb-4">Each point represents a product — price on X, margin % on Y</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="price" type="number" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v}`} name="Price" />
              <YAxis dataKey="margin" type="number" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${v}%`} name="Margin" />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ strokeDasharray: "3 3" }}
                formatter={(v, name) => {
                  const n = Number(v ?? 0);
                  const key = String(name);
                  return [
                    key === "margin" ? `${n}%` : `$${n.toLocaleString()}`,
                    key === "price" ? "Price" : "Margin",
                  ] as const;
                }} />
              <Scatter data={scatterData} fill="#7c3aed" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel Chart */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Funnel Chart</h3>
          <p className="t-text-30 text-xs mb-4">Sales funnel from visitors to closed deals</p>
          <ResponsiveContainer width="100%" height={220}>
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
        <h3 className="t-text font-semibold text-sm mb-1">Treemap — Revenue Share by Category</h3>
        <p className="t-text-30 text-xs mb-4">Area proportional to revenue contribution</p>
        <ResponsiveContainer width="100%" height={200}>
          <Treemap data={treemapData} dataKey="size" nameKey="name" aspectRatio={4 / 3}
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
    </div>
  );
}
