"use client";

import { kpiData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BarChart2,
  Percent,
  UserPlus,
  RefreshCcw,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
  gradient: string;
  iconBg: string;
}

function KpiCard({ title, value, change, period, icon: Icon, prefix, suffix, gradient, iconBg }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br p-5 flex flex-col gap-4",
      "hover:border-white/15 transition-all duration-200 group",
      gradient
    )}>
      {/* Subtle glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.02] rounded-xl" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/40 text-xs font-medium tracking-wide uppercase">{title}</p>
          <p className="text-white text-2xl font-bold mt-1 tracking-tight">
            {prefix}
            {value}
            {suffix}
          </p>
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon className="w-5 h-5 text-white/80" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className={cn(
          "flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
          isPositive
            ? "text-emerald-400 bg-emerald-500/10"
            : "text-red-400 bg-red-500/10"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}{change}%
        </div>
        <span className="text-white/25 text-xs">{period}</span>
      </div>
    </div>
  );
}

export default function KpiCards() {
  const formatCurrency = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toFixed(1)}M`
      : v >= 1_000
      ? `${(v / 1_000).toFixed(0)}K`
      : v.toLocaleString();

  const cards: KpiCardProps[] = [
    {
      title: "Total Revenue",
      value: formatCurrency(kpiData.totalRevenue.value),
      change: kpiData.totalRevenue.change,
      period: kpiData.totalRevenue.period,
      icon: DollarSign,
      prefix: "$",
      gradient: "from-[#0f0f1a] to-[#13132a]",
      iconBg: "bg-violet-600/20",
    },
    {
      title: "Total Orders",
      value: kpiData.totalOrders.value.toLocaleString(),
      change: kpiData.totalOrders.change,
      period: kpiData.totalOrders.period,
      icon: ShoppingCart,
      gradient: "from-[#0f0f1a] to-[#0f1a13]",
      iconBg: "bg-emerald-600/20",
    },
    {
      title: "Avg. Order Value",
      value: formatCurrency(kpiData.avgOrderValue.value),
      change: kpiData.avgOrderValue.change,
      period: kpiData.avgOrderValue.period,
      icon: BarChart2,
      prefix: "$",
      gradient: "from-[#0f0f1a] to-[#1a130f]",
      iconBg: "bg-amber-600/20",
    },
    {
      title: "Conversion Rate",
      value: kpiData.conversionRate.value.toFixed(2),
      change: kpiData.conversionRate.change,
      period: kpiData.conversionRate.period,
      icon: Percent,
      suffix: "%",
      gradient: "from-[#0f0f1a] to-[#1a0f0f]",
      iconBg: "bg-rose-600/20",
    },
    {
      title: "New Clients",
      value: kpiData.newClients.value.toString(),
      change: kpiData.newClients.change,
      period: kpiData.newClients.period,
      icon: UserPlus,
      gradient: "from-[#0f0f1a] to-[#0f1520]",
      iconBg: "bg-sky-600/20",
    },
    {
      title: "Return Rate",
      value: kpiData.returnRate.value.toFixed(1),
      change: kpiData.returnRate.change,
      period: kpiData.returnRate.period,
      icon: RefreshCcw,
      suffix: "%",
      gradient: "from-[#0f0f1a] to-[#1a0f1a]",
      iconBg: "bg-fuchsia-600/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <KpiCard key={card.title} {...card} />
      ))}
    </div>
  );
}
