"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Search, Download, Plus, ChevronLeft, ChevronRight,
  ArrowUpDown, MoreHorizontal, CheckCircle2, Clock,
  XCircle, Loader2,
} from "lucide-react";

type Status = "completed" | "processing" | "pending" | "cancelled";

interface Order {
  id: string; customer: string; avatar: string; product: string;
  category: string; amount: number; status: Status;
  date: string; region: string; paymentMethod: string;
}

const ALL_ORDERS: Order[] = [
  { id:"ORD-7821", customer:"James Worthington", avatar:"JW", product:"Patek Philippe Nautilus 5711", category:"Luxury Watches", amount:142000, status:"completed", date:"2026-05-06", region:"New York", paymentMethod:"Wire Transfer" },
  { id:"ORD-7820", customer:"Sofia Marchetti", avatar:"SM", product:"Cartier Diamond Necklace", category:"Fine Jewelry", amount:89500, status:"processing", date:"2026-05-06", region:"Milan", paymentMethod:"Bank Transfer" },
  { id:"ORD-7819", customer:"Robert Chen", avatar:"RC", product:"Richard Mille RM 011", category:"Luxury Watches", amount:215000, status:"completed", date:"2026-05-05", region:"Hong Kong", paymentMethod:"Wire Transfer" },
  { id:"ORD-7818", customer:"Alexandra von Stein", avatar:"AV", product:"Hermès Birkin 35 Crocodile", category:"Premium Fashion", amount:32000, status:"pending", date:"2026-05-05", region:"Paris", paymentMethod:"Bank Transfer" },
  { id:"ORD-7817", customer:"Marcus Thompson", avatar:"MT", product:"Audemars Piguet Royal Oak", category:"Luxury Watches", amount:98000, status:"completed", date:"2026-05-04", region:"London", paymentMethod:"Wire Transfer" },
  { id:"ORD-7816", customer:"Yuki Tanaka", avatar:"YT", product:"Chanel Haute Joaillerie Set", category:"Fine Jewelry", amount:175000, status:"processing", date:"2026-05-04", region:"Tokyo", paymentMethod:"Bank Transfer" },
  { id:"ORD-7815", customer:"Elena Petrov", avatar:"EP", product:"Vintage Bordeaux Collection", category:"Rare Spirits", amount:28500, status:"cancelled", date:"2026-05-03", region:"Geneva", paymentMethod:"Wire Transfer" },
  { id:"ORD-7814", customer:"Carlos Ruiz", avatar:"CR", product:"Rolex Daytona White Gold", category:"Luxury Watches", amount:52000, status:"completed", date:"2026-05-03", region:"Madrid", paymentMethod:"Bank Transfer" },
  { id:"ORD-7813", customer:"Isabelle Fontaine", avatar:"IF", product:"Van Cleef & Arpels Set", category:"Fine Jewelry", amount:320000, status:"completed", date:"2026-05-02", region:"Paris", paymentMethod:"Wire Transfer" },
  { id:"ORD-7812", customer:"William Hargreaves", avatar:"WH", product:"Bugatti Sculpture Limited", category:"Art & Collectibles", amount:485000, status:"processing", date:"2026-05-02", region:"London", paymentMethod:"Wire Transfer" },
  { id:"ORD-7811", customer:"Mei Lin", avatar:"ML", product:"Graff Pink Diamond Ring", category:"Fine Jewelry", amount:850000, status:"completed", date:"2026-05-01", region:"Singapore", paymentMethod:"Wire Transfer" },
  { id:"ORD-7810", customer:"Henrik Larsson", avatar:"HL", product:"Porsche 911 GT3 Scale Model", category:"Art & Collectibles", amount:18500, status:"pending", date:"2026-05-01", region:"Stockholm", paymentMethod:"Bank Transfer" },
  { id:"ORD-7809", customer:"Fatima Al-Rashid", avatar:"FA", product:"Bvlgari Serpenti Bracelet", category:"Fine Jewelry", amount:42000, status:"completed", date:"2026-04-30", region:"Dubai", paymentMethod:"Wire Transfer" },
  { id:"ORD-7808", customer:"Giovanni Esposito", avatar:"GE", product:"Ferrari 250 GTO Miniature", category:"Art & Collectibles", amount:75000, status:"cancelled", date:"2026-04-30", region:"Rome", paymentMethod:"Bank Transfer" },
  { id:"ORD-7807", customer:"Priya Sharma", avatar:"PS", product:"Jaeger-LeCoultre Reverso", category:"Luxury Watches", amount:28000, status:"completed", date:"2026-04-29", region:"Mumbai", paymentMethod:"Wire Transfer" },
  { id:"ORD-7806", customer:"Dmitri Volkov", avatar:"DV", product:"Fabergé Imperial Egg Replica", category:"Art & Collectibles", amount:195000, status:"completed", date:"2026-04-29", region:"Moscow", paymentMethod:"Wire Transfer" },
  { id:"ORD-7805", customer:"Amara Osei", avatar:"AO", product:"Chopard Happy Diamonds", category:"Fine Jewelry", amount:38000, status:"processing", date:"2026-04-28", region:"Lagos", paymentMethod:"Wire Transfer" },
  { id:"ORD-7804", customer:"Chloe Dubois", avatar:"CD", product:"Dior Haute Couture Gown", category:"Premium Fashion", amount:22000, status:"completed", date:"2026-04-28", region:"Lyon", paymentMethod:"Bank Transfer" },
];

const statusConfig: Record<Status, { label: string; icon: React.ElementType; cls: string }> = {
  completed:  { label:"Completed",  icon:CheckCircle2, cls:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  processing: { label:"Processing", icon:Loader2,      cls:"bg-violet-500/10 text-violet-400 border-violet-500/20" },
  pending:    { label:"Pending",    icon:Clock,        cls:"bg-amber-500/10 text-amber-400 border-amber-500/20" },
  cancelled:  { label:"Cancelled",  icon:XCircle,      cls:"bg-red-500/10 text-red-400 border-red-500/20" },
};

const AVATARS = [
  "from-violet-500 to-purple-700","from-emerald-500 to-teal-700","from-amber-500 to-orange-700",
  "from-sky-500 to-blue-700","from-rose-500 to-pink-700","from-fuchsia-500 to-purple-700",
  "from-cyan-500 to-teal-700","from-indigo-500 to-violet-700","from-lime-500 to-green-700",
];

const PAGE_SIZE = 8;

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ALL_ORDERS.filter((o) => {
      const matchSearch = !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.product.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);

  const counts = useMemo(() => ({
    all: ALL_ORDERS.length,
    completed: ALL_ORDERS.filter(o => o.status === "completed").length,
    processing: ALL_ORDERS.filter(o => o.status === "processing").length,
    pending: ALL_ORDERS.filter(o => o.status === "pending").length,
    cancelled: ALL_ORDERS.filter(o => o.status === "cancelled").length,
  }), []);

  return (
    <div className="space-y-4 pb-4">
      {/* Stat summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["completed","processing","pending","cancelled"] as Status[]).map((s) => {
          const cfg = statusConfig[s];
          const Icon = cfg.icon;
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => { setStatusFilter(statusFilter === s ? "all" : s); setPage(1); }}
              className={cn(
                "panel flex items-center gap-3 p-4 transition-all text-left",
                active
                  ? "t-border-2"
                  : "hover:t-border-2"
              )}
              style={active ? { boxShadow: "0 0 0 3px var(--t-accent-soft)" } : undefined}
            >
              <Icon className={cn("w-4 h-4", cfg.cls.split(" ")[1])} aria-hidden="true" />
              <div>
                <p className="t-text font-bold text-lg leading-none">{counts[s]}</p>
                <p className="t-text-40 text-xs mt-0.5 capitalize">{s}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Table card */}
      <div className="panel">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div
            className="flex-1 flex items-center gap-2 h-9 px-3 rounded-lg border transition-colors"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}
          >
            <Search className="w-3.5 h-3.5 flex-shrink-0 t-text-30" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by order ID, client or product…"
              className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as Status | "all"); setPage(1); }}
            className="h-9 px-3 rounded-lg border text-xs outline-none transition-colors text-[color:var(--t-text-70)]"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}
          >
            <option value="all">All status ({counts.all})</option>
            <option value="completed">Completed ({counts.completed})</option>
            <option value="processing">Processing ({counts.processing})</option>
            <option value="pending">Pending ({counts.pending})</option>
            <option value="cancelled">Cancelled ({counts.cancelled})</option>
          </select>
          <button
            className="h-9 px-3 rounded-lg border text-xs flex items-center gap-1.5 transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-60)" }}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" /> Export
          </button>
          <button
            className="h-9 px-3 rounded-lg text-white text-xs flex items-center gap-1.5 transition-colors font-medium"
            style={{ backgroundColor: "var(--t-accent)" }}
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" /> New Order
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Order ID","Client","Product","Category","Amount","Region","Date","Status",""].map((h, i) => (
                  <th key={i} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3 first:pl-5 last:w-10">
                    {h && <span className="flex items-center gap-1">{h}{i < 7 && <ArrowUpDown className="w-3 h-3" aria-hidden="true" />}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((order, i) => {
                const { label, icon: Icon, cls } = statusConfig[order.status];
                return (
                  <tr
                    key={order.id}
                    className="transition-colors group"
                    style={{ borderBottom: "1px solid var(--t-border)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "var(--t-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs t-text-50 group-hover:t-accent-text transition-colors">{order.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="w-7 h-7 flex-shrink-0">
                          <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-semibold", AVATARS[i % AVATARS.length])}>
                            {order.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="t-text-70 text-xs font-medium truncate max-w-[130px]">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 max-w-[160px]">
                      <span className="t-text-60 text-xs truncate block">{order.product}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{order.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text font-semibold text-sm">{fmt(order.amount)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{order.region}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{order.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 py-0.5 font-medium border flex items-center gap-1 w-fit", cls)}>
                        <Icon className="w-2.5 h-2.5" aria-hidden="true" />{label}
                      </Badge>
                    </td>
                    <td className="px-3 py-3.5">
                      <button className="t-text-30 hover:t-text-70 transition-colors" aria-label="More actions">
                        <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="t-text-30 text-xs">
            {filtered.length === 0 ? "No results" : `Showing ${(page-1)*PAGE_SIZE+1}–${Math.min(page*PAGE_SIZE, filtered.length)} of ${filtered.length} orders`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: "transparent", borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                  page === p ? "text-white" : ""
                )}
                style={page === p
                  ? { backgroundColor: "var(--t-accent)" }
                  : { backgroundColor: "transparent", color: "var(--t-text-50)" }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p+1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: "transparent", borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}
            >
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
