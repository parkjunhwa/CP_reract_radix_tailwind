"use client";

import { topCustomers } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Crown } from "lucide-react";

const tierConfig = {
  platinum: { label: "Platinum", className: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  gold: { label: "Gold", className: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  silver: { label: "Silver", className: "bg-white/5 text-white/40 border-white/10" },
};

const avatarColors = [
  "from-violet-500 to-purple-700",
  "from-rose-500 to-pink-700",
  "from-sky-500 to-blue-700",
  "from-amber-500 to-orange-700",
  "from-emerald-500 to-teal-700",
];

export default function TopClients() {
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(v);

  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h3 className="text-white font-semibold text-sm">Top Clients</h3>
          <p className="text-white/30 text-xs mt-0.5">By lifetime value</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
          All clients
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {topCustomers.map((client, i) => {
          const { label, className } = tierConfig[client.tier];
          return (
            <div
              key={client.id}
              className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarFallback
                    className={cn(
                      "bg-gradient-to-br text-white text-xs font-semibold",
                      avatarColors[i % avatarColors.length]
                    )}
                  >
                    {client.avatar}
                  </AvatarFallback>
                </Avatar>
                {i === 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500/90 flex items-center justify-center">
                    <Crown className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm font-medium leading-tight truncate group-hover:text-white transition-colors">
                  {client.name}
                </p>
                <p className="text-white/30 text-[11px] truncate mt-0.5">{client.email}</p>
              </div>

              <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                <span className="text-white font-semibold text-sm">{formatCurrency(client.totalSpent)}</span>
                <Badge className={cn("text-[10px] px-1.5 py-0 border font-medium", className)}>
                  {label}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
