"use client";

import { recentOrders, OrderStatus } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, Loader2, Clock, XCircle } from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; cls: string; icon: React.ElementType }> = {
  completed:  { label:"Completed",  cls:"bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon:CheckCircle2 },
  processing: { label:"Processing", cls:"bg-violet-500/10 text-violet-500 border-violet-500/20",   icon:Loader2 },
  pending:    { label:"Pending",    cls:"bg-amber-500/10 text-amber-500 border-amber-500/20",       icon:Clock },
  cancelled:  { label:"Cancelled",  cls:"bg-red-500/10 text-red-500 border-red-500/20",             icon:XCircle },
};

const AV_COLORS = [
  "from-violet-500 to-purple-700","from-emerald-500 to-teal-700","from-amber-500 to-orange-700",
  "from-sky-500 to-blue-700","from-rose-500 to-pink-700","from-fuchsia-500 to-purple-700","from-cyan-500 to-teal-700",
];

export default function RecentOrders() {
  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);

  return (
    <section aria-label="Recent orders list" className="panel flex flex-col">
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid var(--t-border)" }}>
        <div>
          <h2 className="t-text font-semibold text-sm">Recent Orders</h2>
          <p className="t-text-30 text-xs mt-0.5">Latest transactions today</p>
        </div>
        <a href="/orders" className="flex items-center gap-1 text-xs t-accent-text hover:opacity-80 transition-opacity font-medium">
          View all <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom:"1px solid var(--t-border)" }}>
              {["Order ID","Client","Product","Amount","Region","Status"].map(h => (
                <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => {
              const { label, cls, icon: Icon } = statusConfig[order.status];
              return (
                <tr key={order.id} className="t-hover transition-colors group" style={{ borderBottom:"1px solid var(--t-border)" }}>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs t-text-50 group-hover:t-accent-text transition-colors">{order.id}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-7 h-7 flex-shrink-0">
                        <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-semibold", AV_COLORS[i % AV_COLORS.length])}>
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="t-text-70 text-xs font-medium truncate max-w-[120px]">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text-60 text-xs truncate max-w-[160px] block">{order.product}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="t-text font-semibold text-sm">{fmt(order.amount)}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="t-text-40 text-xs">{order.region}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={cn("text-[10px] px-2 py-0.5 font-medium border flex items-center gap-1 w-fit", cls)}>
                      <Icon className="w-2.5 h-2.5" aria-hidden="true" />{label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
