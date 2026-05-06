"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#13131f] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white/40 text-xs mb-1 font-medium">{label}</p>
        <p className="text-white font-semibold text-sm">{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

export default function OrdersBarChart() {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-white font-semibold text-sm">Monthly Orders</h3>
        <p className="text-white/30 text-xs mt-0.5">Volume by month · 2025</p>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={14}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)", radius: 4 }} />
            <Bar dataKey="orders" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
