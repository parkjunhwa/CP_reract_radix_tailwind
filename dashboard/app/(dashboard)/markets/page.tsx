"use client";

import dynamic from "next/dynamic";
import { TrendingUp, TrendingDown, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const MarketsChart = dynamic(() => import("@/components/markets/MarketsChart"), { ssr: false });

const regions = [
  { name:"North America", countries:["USA","Canada"], revenue:24800000, orders:1842, growth:12.4, share:36.2, status:"active" },
  { name:"Europe",        countries:["UK","France","Switzerland","Italy","Germany"], revenue:18600000, orders:1521, growth:8.7, share:27.2, status:"active" },
  { name:"Asia Pacific",  countries:["Japan","Hong Kong","Singapore","China"], revenue:14200000, orders:1189, growth:31.2, share:20.8, status:"active" },
  { name:"Middle East",   countries:["UAE","Saudi Arabia","Qatar"], revenue:6800000, orders:512, growth:22.8, share:9.9, status:"active" },
  { name:"Latin America", countries:["Spain","Mexico","Brazil"], revenue:2400000, orders:198, growth:5.1, share:3.5, status:"emerging" },
  { name:"Africa",        countries:["Nigeria","South Africa","Egypt"], revenue:1620000, orders:141, growth:41.5, share:2.4, status:"emerging" },
];

const topCities = [
  { city:"New York", country:"USA", revenue:12400000, orders:921 },
  { city:"Hong Kong", country:"HK", revenue:8900000, orders:742 },
  { city:"London", country:"UK", revenue:7800000, orders:654 },
  { city:"Tokyo", country:"JP", revenue:6200000, orders:512 },
  { city:"Paris", country:"FR", revenue:5100000, orders:428 },
  { city:"Geneva", country:"CH", revenue:4800000, orders:384 },
  { city:"Dubai", country:"AE", revenue:4200000, orders:321 },
  { city:"Singapore", country:"SG", revenue:3900000, orders:298 },
];

export default function MarketsPage() {
  const fmt = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`;
  const totalRevenue = regions.reduce((s,r)=>s+r.revenue,0);

  return (
    <div className="space-y-5 pb-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Active Regions", value:"6", icon:Globe, cls:"text-violet-400" },
          { label:"Countries", value:"19", icon:MapPin, cls:"text-sky-400" },
          { label:"Total Revenue", value:fmt(totalRevenue), icon:TrendingUp, cls:"text-emerald-400" },
          { label:"Avg. Growth", value:`+${(regions.reduce((s,r)=>s+r.growth,0)/regions.length).toFixed(1)}%`, icon:TrendingUp, cls:"text-amber-400" },
        ].map(({ label, value, icon: Icon, cls }) => (
          <div key={label} className="rounded-xl border border-white/8 bg-[#0d0d18] p-4 flex items-center gap-3">
            <Icon className={cn("w-5 h-5 flex-shrink-0", cls)} />
            <div>
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2">
          <MarketsChart />
        </div>

        {/* Top cities */}
        <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-white font-semibold text-sm">Top Cities</h3>
            <p className="text-white/30 text-xs mt-0.5">By annual revenue</p>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {topCities.map((c, i) => (
              <div key={c.city} className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-white/25 text-[10px] font-bold flex-shrink-0">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-xs font-medium">{c.city}</p>
                  <p className="text-white/30 text-[11px]">{c.country} · {c.orders} orders</p>
                </div>
                <span className="text-white text-xs font-semibold">{fmt(c.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional breakdown table */}
      <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold text-sm">Regional Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Region","Countries","Revenue","Orders","Growth","Share","Status"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regions.map(r => (
                <tr key={r.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-white/80 text-sm font-medium">{r.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-white/40 text-xs">{r.countries.join(", ")}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-white font-semibold text-sm">{fmt(r.revenue)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-white/60 text-sm">{r.orders.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className={cn("flex items-center gap-1 text-xs font-semibold", r.growth >= 0 ? "text-emerald-400" : "text-red-400")}>
                      {r.growth >= 0 ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
                      +{r.growth}%
                    </div>
                  </td>
                  <td className="px-5 py-3.5 w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={r.share} className="h-1 flex-1 bg-white/5" />
                      <span className="text-white/50 text-xs w-10 text-right">{r.share}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={cn("text-[10px] px-2 border capitalize",
                      r.status==="active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20")}>
                      {r.status}
                    </Badge>
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
