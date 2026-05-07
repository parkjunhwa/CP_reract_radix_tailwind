"use client";

import { kpiData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, BarChart2, Percent, UserPlus, RefreshCcw } from "lucide-react";

interface KpiCardProps {
  title: string; value: string; change: number; period: string;
  icon: React.ElementType; prefix?: string; suffix?: string; accent: string;
}

function KpiCard({ title, value, change, period, icon: Icon, prefix, suffix, accent }: KpiCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="panel relative overflow-hidden p-5 flex flex-col gap-4 h-full min-h-0 hover:t-border-2 transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="t-text-40 text-xs font-medium tracking-wide uppercase">{title}</p>
          <p className="t-text font-bold mt-1 tracking-tight text-2xl">
            {prefix}{value}{suffix}
          </p>
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", accent)}>
          <Icon className="w-5 h-5 text-white/80" aria-hidden="true" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        <div className={cn(
          "flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
          isPositive ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" aria-hidden="true" /> : <TrendingDown className="w-3 h-3" aria-hidden="true" />}
          <span>{isPositive ? "+" : ""}{change}%</span>
        </div>
        <span className="t-text-30 text-xs">{period}</span>
      </div>
    </div>
  );
}

export default function KpiCards() {
  const fmt = (v: number) =>
    v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000   ? `${(v / 1_000).toFixed(0)}K`
    : v.toLocaleString();

  const cards: KpiCardProps[] = [
    { title:"Total Revenue",    value:fmt(kpiData.totalRevenue.value),    change:kpiData.totalRevenue.change,    period:kpiData.totalRevenue.period,    icon:DollarSign,   prefix:"$", accent:"bg-violet-600/20" },
    { title:"Total Orders",     value:kpiData.totalOrders.value.toLocaleString(), change:kpiData.totalOrders.change, period:kpiData.totalOrders.period, icon:ShoppingCart,            accent:"bg-emerald-600/20" },
    { title:"Avg. Order Value", value:fmt(kpiData.avgOrderValue.value),   change:kpiData.avgOrderValue.change,   period:kpiData.avgOrderValue.period,   icon:BarChart2,    prefix:"$", accent:"bg-amber-600/20" },
    { title:"Conversion Rate",  value:kpiData.conversionRate.value.toFixed(2), change:kpiData.conversionRate.change, period:kpiData.conversionRate.period, icon:Percent, suffix:"%", accent:"bg-rose-600/20" },
    { title:"New Clients",      value:kpiData.newClients.value.toString(), change:kpiData.newClients.change,     period:kpiData.newClients.period,      icon:UserPlus,               accent:"bg-sky-600/20" },
    { title:"Return Rate",      value:kpiData.returnRate.value.toFixed(1), change:kpiData.returnRate.change,     period:kpiData.returnRate.period,      icon:RefreshCcw,   suffix:"%", accent:"bg-fuchsia-600/20" },
  ];

  return (
    <section aria-label="Key performance indicators" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch auto-rows-fr">
      {cards.map((card) => <KpiCard key={card.title} {...card} />)}
    </section>
  );
}
