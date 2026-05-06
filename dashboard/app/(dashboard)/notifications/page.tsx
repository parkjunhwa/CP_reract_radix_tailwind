"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ShoppingBag, UserPlus, AlertTriangle, CheckCircle2, XCircle,
  Globe, TrendingUp, Package, Bell, BellOff, Trash2, CheckCheck,
} from "lucide-react";

type NType = "order" | "client" | "alert" | "payment" | "system" | "market";

interface Notification {
  id: string; type: NType; title: string; body: string;
  time: string; read: boolean; priority: "high" | "medium" | "low";
}

const INITIAL: Notification[] = [
  { id:"N-001", type:"order",  title:"New high-value order", body:"ORD-7821 · James Worthington · Patek Philippe Nautilus 5711 · $142,000", time:"2 min ago", read:false, priority:"high" },
  { id:"N-002", type:"alert",  title:"Low inventory warning", body:"Hermès Birkin 35 Crocodile — only 1 unit remaining in stock", time:"18 min ago", read:false, priority:"high" },
  { id:"N-003", type:"client", title:"New Platinum client", body:"Mei Lin Zhang has been upgraded to Platinum tier (LTV: $1.85M)", time:"34 min ago", read:false, priority:"medium" },
  { id:"N-004", type:"payment",title:"Payment confirmed", body:"ORD-7819 · Richard Mille RM 011 · $215,000 wire transfer settled", time:"1h ago", read:false, priority:"medium" },
  { id:"N-005", type:"order",  title:"Order cancelled", body:"ORD-7815 · Elena Petrov · Vintage Bordeaux · $28,500 — client requested cancellation", time:"2h ago", read:false, priority:"medium" },
  { id:"N-006", type:"market", title:"New market activated", body:"Middle East region is now live — 3 countries, 2 logistics partners onboarded", time:"3h ago", read:true, priority:"low" },
  { id:"N-007", type:"system", title:"Monthly target exceeded", body:"April 2026 revenue hit $8.1M — 8% above the $7.5M target. Congratulations!", time:"5h ago", read:true, priority:"low" },
  { id:"N-008", type:"alert",  title:"Overdue invoice", body:"INV-2026-0139 · Sofia Marchetti · €89,500 — 5 days overdue", time:"6h ago", read:true, priority:"high" },
  { id:"N-009", type:"client", title:"New client registration", body:"Amara Osei from Lagos, Nigeria joined — first order pending verification", time:"8h ago", read:true, priority:"low" },
  { id:"N-010", type:"system", title:"Scheduled maintenance", body:"Platform maintenance window: May 10, 02:00–04:00 UTC. No downtime expected.", time:"1d ago", read:true, priority:"low" },
  { id:"N-011", type:"payment",title:"Failed payment attempt", body:"ORD-7808 · Giovanni Esposito · €75,000 bank transfer declined by issuing bank", time:"1d ago", read:true, priority:"high" },
  { id:"N-012", type:"order",  title:"Large order processing", body:"ORD-7812 · William Hargreaves · Bugatti Sculpture · $485,000 — awaiting authentication", time:"2d ago", read:true, priority:"medium" },
];

const TYPE_CFG: Record<NType, { icon:React.ElementType; cls:string }> = {
  order:   { icon:ShoppingBag,  cls:"bg-violet-500/15 text-violet-400" },
  client:  { icon:UserPlus,     cls:"bg-sky-500/15 text-sky-400" },
  alert:   { icon:AlertTriangle,cls:"bg-amber-500/15 text-amber-400" },
  payment: { icon:CheckCircle2, cls:"bg-emerald-500/15 text-emerald-400" },
  system:  { icon:Globe,        cls:"bg-white/8 text-white/40" },
  market:  { icon:TrendingUp,   cls:"bg-fuchsia-500/15 text-fuchsia-400" },
};
const PRIORITY_CFG = {
  high:   "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low:    "bg-white/5 text-white/30 border-white/10",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL);
  const [filter, setFilter] = useState<"all" | "unread" | NType>("all");

  const filtered = notifs.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter !== "all") return n.type === filter;
    return true;
  });

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, read:true })));
  const markOne = (id: string) => setNotifs(ns => ns.map(n => n.id===id ? { ...n, read:true } : n));
  const deleteOne = (id: string) => setNotifs(ns => ns.filter(n => n.id !== id));

  return (
    <div className="space-y-5 pb-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(["all","unread","order","client","alert","payment","system","market"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-3 h-8 rounded-lg text-xs font-medium capitalize transition-colors",
                filter===f ? "bg-violet-600 text-white" : "text-white/40 hover:text-white hover:bg-white/5 border border-white/8")}>
              {f}{f==="unread" && unreadCount > 0 && <span className="ml-1.5 bg-violet-400/20 text-violet-300 text-[10px] px-1.5 rounded-full">{unreadCount}</span>}
            </button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAll} className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="rounded-xl border border-white/8 bg-[#0d0d18] divide-y divide-white/[0.04]">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <BellOff className="w-8 h-8 text-white/15" />
            <p className="text-white/30 text-sm">No notifications</p>
          </div>
        )}
        {filtered.map(n => {
          const { icon: Icon, cls } = TYPE_CFG[n.type];
          return (
            <div key={n.id} className={cn("flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group", !n.read && "bg-violet-600/[0.04]")}>
              {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0 mt-2" />}
              {n.read && <span className="w-1.5 h-1.5 flex-shrink-0" />}
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", cls)}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={cn("text-sm font-medium", n.read ? "text-white/60" : "text-white")}>{n.title}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{n.body}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={cn("text-[10px] px-1.5 border", PRIORITY_CFG[n.priority])}>{n.priority}</Badge>
                    <span className="text-white/25 text-[11px]">{n.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {!n.read && (
                  <button onClick={() => markOne(n.id)} title="Mark as read"
                    className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => deleteOne(n.id)} title="Delete"
                  className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
