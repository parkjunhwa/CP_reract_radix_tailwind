"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categoryData } from "@/lib/data";

type ChartTooltipPayloadItem = {
  name?: string;
  value?: number | string;
};
type ChartTooltipProps = {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
};

const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="panel-2 px-4 py-3 shadow-xl rounded-xl" style={{ borderColor:"var(--t-border-2)" }}>
      <p className="t-text font-semibold text-sm">{payload[0]?.name}</p>
      <p className="t-text-50 text-xs mt-0.5">{payload[0]?.value}% of revenue</p>
    </div>
  );
};

export default function CategoryChart() {
  return (
    <section aria-label="Revenue by category donut chart" className="panel p-5 flex flex-col gap-4">
      <div>
        <h3 className="t-text font-semibold text-sm">Revenue by Category</h3>
        <p className="t-text-30 text-xs mt-0.5">Share of revenue (YTD)</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 shrink-0" role="img" aria-label="Revenue by category donut chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={42} outerRadius={60} paddingAngle={3} dataKey="value" stroke="none">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-bold text-base leading-tight t-text">5</span>
            <span className="text-[10px] t-text-40">Categories</span>
          </div>
        </div>
        <ul className="flex-1 flex flex-col gap-2.5" aria-label="Category list">
          {categoryData.map(item => (
            <li key={item.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} aria-hidden="true" />
              <span className="t-text-50 text-xs flex-1 leading-none">{item.name}</span>
              <span className="t-text text-xs font-semibold">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
