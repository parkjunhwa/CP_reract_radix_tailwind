"use client";

import { TrendingUp, TrendingDown, ShoppingCart, Package, Users, DollarSign, Star, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const kpis = [
  { label: "Total Revenue", value: "$28.4M", change: +14.2, icon: DollarSign, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Total Orders", value: "4,823", change: +8.7, icon: ShoppingCart, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "Products Sold", value: "12,491", change: +11.3, icon: Package, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "New Customers", value: "284", change: +22.5, icon: Users, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Avg. Rating", value: "4.86", change: +0.12, icon: Star, color: "text-rose-400", bg: "bg-rose-500/10" },
  { label: "Return Rate", value: "1.2%", change: -0.3, icon: RefreshCcw, color: "text-teal-400", bg: "bg-teal-500/10" },
];

const revenueData = [
  { month: "Jan", revenue: 1.8, orders: 320 },
  { month: "Feb", revenue: 2.4, orders: 420 },
  { month: "Mar", revenue: 2.1, orders: 380 },
  { month: "Apr", revenue: 3.2, orders: 560 },
  { month: "May", revenue: 2.9, orders: 490 },
  { month: "Jun", revenue: 4.1, orders: 710 },
  { month: "Jul", revenue: 3.8, orders: 650 },
  { month: "Aug", revenue: 5.0, orders: 850 },
  { month: "Sep", revenue: 4.4, orders: 780 },
  { month: "Oct", revenue: 6.2, orders: 1020 },
  { month: "Nov", revenue: 5.8, orders: 940 },
  { month: "Dec", revenue: 9.4, orders: 1560 },
];

const categoryData = [
  { name: "Luxury Watches", value: 38, color: "#7c3aed" },
  { name: "Fine Jewelry", value: 27, color: "#f59e0b" },
  { name: "Premium Fashion", value: 18, color: "#ec4899" },
  { name: "Art & Collectibles", value: 11, color: "#0ea5e9" },
  { name: "Rare Spirits", value: 6, color: "#10b981" },
];

const topProducts = [
  { name: "Patek Philippe Nautilus", orders: 24, revenue: "$3.41M", trend: +18.4 },
  { name: "Richard Mille RM 011", orders: 18, revenue: "$3.87M", trend: +22.1 },
  { name: "Cartier Diamond Tennis Bracelet", orders: 41, revenue: "$2.79M", trend: +11.3 },
  { name: "Rolex Daytona White Gold", orders: 67, revenue: "$3.48M", trend: +8.9 },
  { name: "Van Cleef Alhambra Necklace", orders: 89, revenue: "$1.11M", trend: +15.7 },
];

export default function EcommerceDashboardPage() {
  return (
    <div className="space-y-4 pb-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.change >= 0;
          return (
            <div key={k.label} className="panel p-4 flex flex-col gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", k.bg)}>
                <Icon className={cn("w-4 h-4", k.color)} aria-hidden="true" />
              </div>
              <div>
                <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
                <p className="t-text font-bold text-xl leading-tight">{k.value}</p>
                <div className={cn("flex items-center gap-0.5 text-xs font-semibold mt-0.5", positive ? "text-emerald-400" : "text-red-400")}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {positive ? "+" : ""}{k.change}{typeof k.change === "number" && Math.abs(k.change) < 1 ? "" : "%"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue trend */}
        <div className="xl:col-span-2 panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Revenue Trend</h3>
          <p className="t-text-30 text-xs mb-4">Monthly revenue ($ millions) & orders</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} dot={false} name="Revenue ($M)" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={false} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Revenue by Category</h3>
          <p className="t-text-30 text-xs mb-4">Share of total revenue</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="t-text-50 text-xs">{c.name}</span>
                </div>
                <span className="t-text-40 text-xs font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Top Products by Revenue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Product", "Orders", "Revenue", "Trend"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.name} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <td className="px-5 py-3.5">
                    <span className="t-text-70 text-xs font-medium">{p.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text-50 text-xs">{p.orders}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text font-semibold text-sm">{p.revenue}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className={cn("flex items-center gap-1 text-xs font-semibold", p.trend >= 0 ? "text-emerald-400" : "text-red-400")}>
                      {p.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {p.trend >= 0 ? "+" : ""}{p.trend}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
