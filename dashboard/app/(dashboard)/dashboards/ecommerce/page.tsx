"use client";

import {
  ShoppingBag, DollarSign, Users, Package, TrendingUp, TrendingDown, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Revenue (MTD)", value: "$842K", change: +14.2, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Orders", value: "12,480", change: +6.8, icon: ShoppingBag, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Customers", value: "94.2K", change: +9.1, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "Avg. Basket", value: "$67.40", change: -1.4, icon: Package, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const revenueTrend = [
  { week: "W1", revenue: 118, orders: 2100 },
  { week: "W2", revenue: 132, orders: 2280 },
  { week: "W3", revenue: 156, orders: 2510 },
  { week: "W4", revenue: 168, orders: 2680 },
  { week: "W5", revenue: 191, orders: 2820 },
  { week: "W6", revenue: 204, orders: 3010 },
  { week: "W7", revenue: 219, orders: 3140 },
  { week: "W8", revenue: 237, orders: 3290 },
];

const categoryMix = [
  { category: "Luxury Accessories", pct: 32 },
  { category: "Watches & Jewelry", pct: 24 },
  { category: "Apparel", pct: 18 },
  { category: "Footwear", pct: 14 },
  { category: "Home & Deco", pct: 12 },
];

const topSkus = [
  { sku: "LX-ORBIT-01", name: "Orbital Titanium Chrono", price: "$12,450", units: 84, rating: 4.9 },
  { sku: "LX-SILK-22", name: "Hand-bound Silk Scarf, Kyoto", price: "$890", units: 312, rating: 4.7 },
  { sku: "LX-LEATHER-09", name: "Heritage Weekender", price: "$2,190", units: 156, rating: 4.8 },
  { sku: "LX-CRYSTAL-44", name: "Crystal Stemware (set of 6)", price: "$640", units: 420, rating: 4.6 },
  { sku: "LX-GOLD-77", name: "18K Minimal Hoop Earrings", price: "$4,980", units: 67, rating: 4.95 },
];

export default function EcommerceDashboardPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.change >= 0;
          return (
            <div key={k.label} className="panel p-4 flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", k.bg)}>
                <Icon className={cn("w-5 h-5", k.color)} aria-hidden="true" />
              </div>
              <div>
                <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
                <p className="t-text font-bold text-xl leading-tight">{k.value}</p>
                <div className={cn("flex items-center gap-0.5 text-xs font-semibold mt-0.5", positive ? "text-emerald-400" : "text-red-400")}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {positive ? "+" : ""}{k.change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Revenue & Orders</h3>
          <p className="t-text-30 text-xs mb-4">Last 8 weeks · revenue ($K) vs. order volume</p>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={revenueTrend}>
              <defs>
                <linearGradient id="ecom-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#ecom-rev)" strokeWidth={2} name="Revenue ($K)" />
              <Bar yAxisId="right" dataKey="orders" fill="#10b981" opacity={0.35} radius={[4, 4, 0, 0]} name="Orders" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-4">Category mix</h3>
          <div className="space-y-3">
            {categoryMix.map((c) => (
              <div key={c.category} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="t-text-70 text-xs truncate">{c.category}</span>
                    <span className="t-text-40 text-xs ml-2">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Top products</h3>
          <p className="t-text-30 text-xs mt-0.5">Static demo data — mirrors full-version eCommerce dashboard scope.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["SKU", "Product", "Price", "Units", "Rating"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topSkus.map((p) => (
                <tr key={p.sku} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="text-[10px] font-mono">{p.sku}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text-70 text-xs font-medium">{p.name}</span>
                  </td>
                  <td className="px-5 py-3.5 t-text-50 text-xs font-semibold">{p.price}</td>
                  <td className="px-5 py-3.5 t-text-50 text-xs">{p.units.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3 h-3" />
                      {p.rating}
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
