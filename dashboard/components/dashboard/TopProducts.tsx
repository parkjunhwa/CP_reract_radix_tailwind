"use client";

import { topProducts } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function TopProducts() {
  const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
  const fmt = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : `$${(v/1_000).toFixed(0)}K`;

  return (
    <section aria-label="Top products list" className="panel flex h-full min-h-0 w-full flex-col">
      <div className="flex shrink-0 items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid var(--t-border)" }}>
        <div>
          <h2 className="t-text font-semibold text-sm">Top Products</h2>
          <p className="t-text-30 text-xs mt-0.5">By annual revenue</p>
        </div>
        <a href="/products" className="flex items-center gap-1 text-xs t-accent-text hover:opacity-80 font-medium">
          Catalog <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>

      <ol className="flex min-h-0 flex-1 flex-col overflow-y-auto" style={{ borderTop:"none" }}>
        {topProducts.map((product, i) => {
          const pct = Math.round((product.revenue / maxRevenue) * 100);
          const isPos = product.trend >= 0;
          return (
            <li key={product.id} className="px-5 py-4 flex flex-col gap-2.5 t-hover transition-colors cursor-pointer group" style={{ borderBottom: i < topProducts.length-1 ? "1px solid var(--t-border)" : "none" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md t-surface-2 flex items-center justify-center t-text-30 text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="t-text-80 text-sm font-medium leading-tight truncate group-hover:t-text transition-colors">
                      {product.name}
                    </p>
                    <p className="t-text-30 text-[11px] mt-0.5">{product.category}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="t-text font-semibold text-sm">{fmt(product.revenue)}</p>
                  <div className={cn("flex items-center justify-end gap-0.5 text-[11px] font-semibold mt-0.5",
                    isPos ? "text-emerald-500" : "text-red-500")}>
                    {isPos ? <TrendingUp className="w-3 h-3" aria-hidden="true" /> : <TrendingDown className="w-3 h-3" aria-hidden="true" />}
                    {isPos ? "+" : ""}{product.trend}%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={pct} className="h-1 flex-1 t-surface-2" />
                <div className="flex gap-3 text-[11px] t-text-30 flex-shrink-0">
                  <span>{product.sold} sold</span>
                  <span className={cn(product.stock <= 2 ? "text-red-500" : "t-text-30")}>{product.stock} left</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
