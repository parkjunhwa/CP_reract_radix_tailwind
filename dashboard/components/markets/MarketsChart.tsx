"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { region:"N. America", revenue:24.8, color:"#7c3aed" },
  { region:"Europe",     revenue:18.6, color:"#8b5cf6" },
  { region:"Asia Pac",   revenue:14.2, color:"#a78bfa" },
  { region:"Mid. East",  revenue:6.8,  color:"#c4b5fd" },
  { region:"LatAm",      revenue:2.4,  color:"#ddd6fe" },
  { region:"Africa",     revenue:1.6,  color:"#ede9fe" },
];

type ChartTooltipPayloadItem = {
  value?: number | string;
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
      <p className="t-text-40 text-xs mb-1">{label}</p>
      <p className="t-text font-semibold text-sm">${payload[0].value}M revenue</p>
    </div>
  );
};

export default function MarketsChart() {
  return (
    <div className="panel p-5 h-full">
      <h3 className="t-text font-semibold text-sm mb-1">Revenue by Region</h3>
      <p className="t-text-30 text-xs mb-4">Annual figures in USD millions</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top:4, right:4, bottom:0, left:0 }} barSize={36}>
            <CartesianGrid vertical={false} stroke="var(--t-chart-grid)" />
            <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill:"var(--t-chart-tick)", fontSize:11 }} tickFormatter={v=>`$${v}M`} width={44} />
            <Tooltip content={<TIP />} cursor={{ fill:"var(--t-hover)", radius:4 }} />
            <Bar dataKey="revenue" radius={[6,6,0,0]}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
