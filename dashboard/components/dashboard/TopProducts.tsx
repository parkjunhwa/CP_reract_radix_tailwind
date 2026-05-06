"use client";

import { topProducts } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function TopProducts() {
  const maxRevenue = Math.max(...topProducts.map((p) => p.revenue));

  const formatCurrency = (v: number) =>
    v >= 1_000_000
      ? `$${(v / 1_000_000).toFixed(2)}M`
      : `$${(v / 1_000).toFixed(0)}K`;

  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h3 className="text-white font-semibold text-sm">Top Products</h3>
          <p className="text-white/30 text-xs mt-0.5">By annual revenue</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
          Catalog
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {topProducts.map((product, i) => {
          const pct = Math.round((product.revenue / maxRevenue) * 100);
          const isPositive = product.trend >= 0;

          return (
            <div
              key={product.id}
              className="px-5 py-4 flex flex-col gap-2.5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/25 text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-white/80 text-sm font-medium leading-tight truncate group-hover:text-white transition-colors">
                      {product.name}
                    </p>
                    <p className="text-white/30 text-[11px] mt-0.5">{product.category}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-white font-semibold text-sm">{formatCurrency(product.revenue)}</p>
                  <div className={cn(
                    "flex items-center justify-end gap-0.5 text-[11px] font-semibold mt-0.5",
                    isPositive ? "text-emerald-400" : "text-red-400"
                  )}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? "+" : ""}{product.trend}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <Progress
                  value={pct}
                  className="h-1 flex-1 bg-white/5"
                  style={
                    { "--progress-color": "#7c3aed" } as React.CSSProperties
                  }
                />
                <div className="flex gap-3 text-[11px] text-white/30 flex-shrink-0">
                  <span>{product.sold} sold</span>
                  <span className={cn(product.stock <= 2 ? "text-red-400" : "text-white/30")}>
                    {product.stock} left
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
