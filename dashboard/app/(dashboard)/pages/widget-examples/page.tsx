"use client";

import { useState } from "react";
import {
  Archive,
  Award,
  Bell,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Package,
  Plus,
  RefreshCcw,
  Share2,
  ShoppingCart,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  Users,
  Wallet,
  Edit,
} from "lucide-react";

import { cn } from "@/lib/utils";

const statCards = [
  { title: "Total Revenue", value: "$28.4M", sub: "vs last month", icon: Wallet, color: "text-violet-500", bg: "bg-violet-500/10" },
  { title: "New Clients", value: "284", sub: "+22.5% growth", icon: Users, color: "text-sky-500", bg: "bg-sky-500/10" },
  { title: "Orders", value: "4,823", sub: "this month", icon: Package, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Avg. Rating", value: "4.86", sub: "from 842 reviews", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "Notifications", value: "12", sub: "unread messages", icon: Bell, color: "text-rose-500", bg: "bg-rose-500/10" },
  { title: "Auth. Time", value: "2.4d", sub: "average duration", icon: Clock, color: "text-teal-500", bg: "bg-teal-500/10" },
  { title: "Badges Earned", value: "18", sub: "team achievements", icon: Award, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10" },
  { title: "Growth Rate", value: "14.2%", sub: "year over year", icon: TrendingUp, color: "text-lime-500", bg: "bg-lime-500/10" },
];

const kpis = [
  { label: "Total Revenue", value: "$28.4M", change: 14.2, icon: Wallet, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "New Orders", value: "4,823", change: 8.7, icon: ShoppingCart, color: "text-sky-500", bg: "bg-sky-500/10" },
  { label: "Active Clients", value: "1,247", change: 22.5, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Avg. Order", value: "$5,882", change: 4.1, icon: Package, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Win Rate", value: "34.2%", change: 3.1, icon: Award, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "Auth. Time", value: "2.4d", change: -0.3, icon: Clock, color: "text-teal-500", bg: "bg-teal-500/10" },
];

const products = [
  { label: "Patek Philippe Nautilus", sold: 24, pct: 82, width: "w-[82%]", revenue: "$3.41M" },
  { label: "Richard Mille RM 011", sold: 18, pct: 68, width: "w-[68%]", revenue: "$3.87M" },
  { label: "Cartier Diamond Bracelet", sold: 41, pct: 55, width: "w-[55%]", revenue: "$2.79M" },
  { label: "Rolex Daytona White Gold", sold: 67, pct: 44, width: "w-[44%]", revenue: "$3.48M" },
];

const leaderboard = [
  { name: "James Worthington", region: "New York", revenue: "$4.2M", pct: 88, width: "w-[88%]" },
  { name: "Sofia Marchetti", region: "Milan", revenue: "$3.1M", pct: 72, width: "w-[72%]" },
  { name: "Robert Chen", region: "Hong Kong", revenue: "$2.8M", pct: 65, width: "w-[65%]" },
  { name: "Yuki Tanaka", region: "Tokyo", revenue: "$2.4M", pct: 58, width: "w-[58%]" },
];

const segments = [
  { label: "New Clients", value: 284, pct: 23, width: "w-[23%]", color: "bg-violet-500" },
  { label: "Returning", value: 891, pct: 71, width: "w-[71%]", color: "bg-sky-500" },
  { label: "At-Risk", value: 72, pct: 6, width: "w-[6%]", color: "bg-amber-500" },
];

const actionIcons = [Download, Share2, Edit, Copy, Trash2, ExternalLink, RefreshCcw, Upload, Archive, Plus];

const toggleItems = [
  { id: 1, name: "Patek Philippe Nautilus" },
  { id: 2, name: "Richard Mille RM 011" },
  { id: 3, name: "Cartier Diamond Set" },
];

export default function WidgetExamplesPage() {
  const [starred, setStarred] = useState(new Set([1, 3]));
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="t-text text-sm font-semibold">Widget Examples</h2>
            <p className="t-text-40 mt-1 text-xs">Stats, KPI, progress, leaderboard, and action widgets using lucide-react icons only.</p>
          </div>
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-500">
            Lucide icons
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="panel flex items-center gap-3 p-4">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", card.bg)}>
                  <Icon className={cn("h-5 w-5", card.color)} />
                </div>
                <div className="min-w-0">
                  <p className="t-text truncate text-xl font-bold">{card.value}</p>
                  <p className="t-text-30 truncate text-[10px]">{card.title}</p>
                  <p className="t-text-30 truncate text-[10px]">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel p-5">
        <h3 className="t-text mb-4 text-sm font-semibold">KPI Cards</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {kpis.map((stat) => {
            const Icon = stat.icon;
            const up = stat.change >= 0;
            return (
              <div key={stat.label} className="panel flex flex-col gap-2.5 p-4">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", stat.bg)}>
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </div>
                <div>
                  <p className="t-text-30 text-[10px] uppercase tracking-wide">{stat.label}</p>
                  <p className="t-text text-lg font-bold leading-tight">{stat.value}</p>
                  <div className={cn("mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold", up ? "text-emerald-500" : "text-red-500")}>
                    {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {up ? "+" : ""}{stat.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <div className="panel p-5">
          <h3 className="t-text mb-4 text-sm font-semibold">Top Products by Revenue</h3>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.label}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="t-text-60 max-w-[60%] truncate text-xs">{product.label}</span>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="t-text-40 text-[10px]">{product.sold} sold</span>
                    <span className="t-text text-xs font-semibold">{product.revenue}</span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-(--t-border)">
                  <div className={cn("h-full rounded-full bg-linear-to-r from-violet-500 to-violet-300 transition-all", product.width)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="t-text mb-4 text-sm font-semibold">Top Sales Reps</h3>
          <div className="space-y-3">
            {leaderboard.map((rep, index) => (
              <div key={rep.name} className="flex items-center gap-3">
                <span className="t-text-30 w-4 shrink-0 text-xs">#{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex justify-between">
                    <span className="t-text-70 truncate text-xs font-medium">{rep.name}</span>
                    <span className="t-text text-xs font-semibold">{rep.revenue}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-(--t-border)">
                    <div className={cn("h-full rounded-full bg-violet-500", rep.width)} />
                  </div>
                  <p className="t-text-30 mt-1 text-[10px]">{rep.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <div className="panel p-5">
          <h3 className="t-text mb-4 text-sm font-semibold">Client Segmentation</h3>
          <div className="space-y-3">
            {segments.map((segment) => (
              <div key={segment.label} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="mb-1.5 flex justify-between">
                    <span className="t-text-60 text-xs">{segment.label}</span>
                    <span className="t-text-40 text-xs">{segment.value}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-(--t-border)">
                    <div className={cn("h-full rounded-full", segment.color, segment.width)} />
                  </div>
                </div>
                <span className="t-text w-10 text-right text-sm font-bold">{segment.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-(--t-border) pt-4">
            {[["Total Clients", "1,247"], ["Avg. LTV", "$89K"], ["Churn Rate", "4.2%"]].map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="t-text text-base font-bold">{value}</p>
                <p className="t-text-30 mt-0.5 text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="panel space-y-3 p-5">
            <h3 className="t-text text-sm font-semibold">Action Icon Buttons</h3>
            <div className="flex flex-wrap gap-2">
              {actionIcons.map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Widget action ${index + 1}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--t-border-2) t-text-40 transition-colors hover:bg-(--t-hover) hover:t-text-70"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="panel space-y-3 p-5">
            <h3 className="t-text text-sm font-semibold">Interactive Toggles</h3>
            <div className="space-y-3">
              {toggleItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg bg-(--t-hover) p-3">
                  <span className="t-text-60 text-xs font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStarred((current) => {
                        const next = new Set(current);
                        if (next.has(item.id)) next.delete(item.id);
                        else next.add(item.id);
                        return next;
                      })}
                      className={cn("rounded-md p-1.5 transition-colors", starred.has(item.id) ? "text-amber-500" : "t-text-30 hover:text-amber-500")}
                      aria-label={`Toggle star for ${item.name}`}
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLiked((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}
                      className={cn("rounded-md p-1.5 transition-colors", liked.includes(item.id) ? "text-violet-500" : "t-text-30 hover:text-violet-500")}
                      aria-label={`Toggle alert for ${item.name}`}
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
