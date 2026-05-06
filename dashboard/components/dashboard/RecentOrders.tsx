"use client";

import { recentOrders, OrderStatus } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  processing: { label: "Processing", className: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const avatarColors = [
  "from-violet-500 to-purple-700",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-700",
  "from-sky-500 to-blue-700",
  "from-rose-500 to-pink-700",
  "from-fuchsia-500 to-purple-700",
  "from-cyan-500 to-teal-700",
];

export default function RecentOrders() {
  const formatAmount = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Orders</h3>
          <p className="text-white/30 text-xs mt-0.5">Latest transactions today</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
          View all
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">
                Order
              </th>
              <th className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-3 py-3 hidden md:table-cell">
                Client
              </th>
              <th className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-3 py-3">
                Product
              </th>
              <th className="text-right text-[11px] font-medium text-white/25 uppercase tracking-wider px-3 py-3">
                Amount
              </th>
              <th className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-3 py-3 hidden lg:table-cell">
                Region
              </th>
              <th className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => {
              const { label, className } = statusConfig[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  {/* Order ID */}
                  <td className="px-5 py-3.5">
                    <span className="text-white/60 text-xs font-mono group-hover:text-violet-400 transition-colors">
                      {order.id}
                    </span>
                  </td>
                  {/* Client */}
                  <td className="px-3 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-7 h-7 flex-shrink-0">
                        <AvatarFallback
                          className={cn(
                            "bg-gradient-to-br text-white text-[10px] font-semibold",
                            avatarColors[i % avatarColors.length]
                          )}
                        >
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white/70 text-xs font-medium truncate max-w-[120px]">
                        {order.customer}
                      </span>
                    </div>
                  </td>
                  {/* Product */}
                  <td className="px-3 py-3.5">
                    <span className="text-white/60 text-xs truncate max-w-[160px] block">{order.product}</span>
                  </td>
                  {/* Amount */}
                  <td className="px-3 py-3.5 text-right">
                    <span className="text-white text-sm font-semibold">{formatAmount(order.amount)}</span>
                  </td>
                  {/* Region */}
                  <td className="px-3 py-3.5 hidden lg:table-cell">
                    <span className="text-white/40 text-xs">{order.region}</span>
                  </td>
                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <Badge className={cn("text-[10px] px-2 py-0.5 font-medium border", className)}>
                      {label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
