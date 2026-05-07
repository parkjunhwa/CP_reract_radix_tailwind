"use client";

import { topCustomers } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatCompactUsd } from "@/lib/utils";
import { ArrowUpRight, Crown } from "lucide-react";

const tierConfig = {
  platinum: { label:"Platinum", cls:"bg-violet-500/10 text-violet-500 border-violet-500/20" },
  gold:     { label:"Gold",     cls:"bg-amber-500/10 text-amber-500 border-amber-500/20" },
  silver:   { label:"Silver",  cls:"bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
};

const AV_COLORS = [
  "from-violet-500 to-purple-700","from-rose-500 to-pink-700",
  "from-sky-500 to-blue-700","from-amber-500 to-orange-700","from-emerald-500 to-teal-700",
];

export default function TopClients() {
  return (
    <section aria-label="Top clients list" className="panel flex h-full min-h-0 w-full flex-col">
      <div className="flex shrink-0 items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid var(--t-border)" }}>
        <div>
          <h2 className="t-text font-semibold text-sm">Top Clients</h2>
          <p className="t-text-30 text-xs mt-0.5">By lifetime value</p>
        </div>
        <a href="/clients" className="flex items-center gap-1 text-xs t-accent-text hover:opacity-80 font-medium">
          View all <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>

      <ol className="flex min-h-0 flex-1 flex-col divide-y overflow-y-auto" style={{ "--tw-divide-opacity":1 } as React.CSSProperties}>
        {topCustomers.map((client, i) => {
          const { label, cls } = tierConfig[client.tier];
          return (
            <li key={client.id} className="px-5 py-3.5 flex items-center gap-3 t-hover transition-colors cursor-pointer group" style={{ borderColor:"var(--t-border)" }}>
              <div className="relative flex-shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-semibold", AV_COLORS[i % AV_COLORS.length])}>
                    {client.avatar}
                  </AvatarFallback>
                </Avatar>
                {i === 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <Crown className="w-2.5 h-2.5 text-white" aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="t-text-80 text-sm font-medium leading-tight truncate group-hover:t-text transition-colors">
                  {client.name}
                </p>
                <p className="t-text-30 text-[11px] truncate mt-0.5">{client.email}</p>
              </div>
              <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                <span className="t-text font-semibold text-sm">{formatCompactUsd(client.totalSpent)}</span>
                <Badge className={cn("text-[10px] px-1.5 py-0 border font-medium", cls)}>{label}</Badge>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
