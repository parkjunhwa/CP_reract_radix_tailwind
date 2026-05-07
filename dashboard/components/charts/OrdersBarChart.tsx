"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueData } from "@/lib/data";

type ChartTooltipPayloadItem = {
  value?: number | string;
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
      <p className="t-text-40 text-xs mb-1 font-medium">{label}</p>
      <p className="t-text font-semibold text-sm">{payload[0]?.value} orders</p>
    </div>
  );
};

export default function OrdersBarChart() {
  const gridColor = "var(--t-chart-grid)";
  const tickColor = "var(--t-chart-tick)";
  const barTop = "var(--t-accent)";
  const barBottom = "var(--t-accent-h)";

  return (
    <section aria-label="Monthly orders bar chart" className="panel flex h-full min-h-0 flex-1 flex-col gap-4 p-5">
      <div>
        <h3 className="t-text font-semibold text-sm">Monthly Orders</h3>
        <p className="t-text-30 text-xs mt-0.5">Orders by month · 2025</p>
      </div>
      <div className="min-h-44 w-full flex-1" role="img" aria-label="2025 monthly orders bar chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top:4, right:4, bottom:0, left:0 }} barSize={14}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor={barTop}    stopOpacity={0.9} />
                <stop offset="100%" stopColor={barBottom} stopOpacity={0.45} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:tickColor, fontSize:11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill:tickColor, fontSize:11 }} width={36} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill:"var(--t-hover)", radius:4 }} />
            <Bar dataKey="orders" fill="url(#barGrad)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
