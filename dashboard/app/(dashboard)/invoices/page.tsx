"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, Plus, Download, FileText, Clock, CheckCircle2, XCircle, Send, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

type InvStatus = "paid" | "sent" | "overdue" | "draft";

interface Invoice {
  id: string; client: string; issuedDate: string; dueDate: string;
  amount: number; status: InvStatus; items: number; currency: string;
}

const INVOICES: Invoice[] = [
  { id:"INV-2026-0142", client:"James Worthington III", issuedDate:"2026-05-01", dueDate:"2026-05-31", amount:142000, status:"sent",    items:1, currency:"USD" },
  { id:"INV-2026-0141", client:"Mei Lin Zhang",         issuedDate:"2026-04-28", dueDate:"2026-05-28", amount:850000, status:"paid",    items:3, currency:"USD" },
  { id:"INV-2026-0140", client:"Robert Chen",           issuedDate:"2026-04-25", dueDate:"2026-05-25", amount:215000, status:"paid",    items:1, currency:"HKD" },
  { id:"INV-2026-0139", client:"Sofia Marchetti",       issuedDate:"2026-04-20", dueDate:"2026-05-20", amount:89500,  status:"overdue", items:2, currency:"EUR" },
  { id:"INV-2026-0138", client:"Fatima Al-Rashid",      issuedDate:"2026-04-15", dueDate:"2026-05-15", amount:42000,  status:"paid",    items:1, currency:"AED" },
  { id:"INV-2026-0137", client:"Marcus Thompson",       issuedDate:"2026-04-10", dueDate:"2026-05-10", amount:98000,  status:"paid",    items:1, currency:"GBP" },
  { id:"INV-2026-0136", client:"Alexandra von Stein",   issuedDate:"2026-04-05", dueDate:"2026-05-05", amount:32000,  status:"overdue", items:2, currency:"CHF" },
  { id:"INV-2026-0135", client:"Yuki Tanaka",           issuedDate:"2026-04-01", dueDate:"2026-04-30", amount:175000, status:"paid",    items:4, currency:"JPY" },
  { id:"INV-2026-0134", client:"Carlos Ruiz Alvarado",  issuedDate:"2026-03-28", dueDate:"2026-04-27", amount:52000,  status:"paid",    items:1, currency:"EUR" },
  { id:"INV-2026-0133", client:"Dmitri Volkov",         issuedDate:"2026-03-20", dueDate:"2026-04-19", amount:195000, status:"paid",    items:2, currency:"USD" },
  { id:"INV-2026-0132", client:"Isabelle Fontaine",     issuedDate:"2026-03-15", dueDate:"2026-04-14", amount:320000, status:"paid",    items:5, currency:"EUR" },
  { id:"INV-2026-0131", client:"Henrik Larsson",        issuedDate:"2026-03-10", dueDate:"2026-04-09", amount:18500,  status:"overdue", items:1, currency:"SEK" },
  { id:"INV-2026-0130", client:"Priya Sharma",          issuedDate:"2026-03-05", dueDate:"2026-04-04", amount:28000,  status:"paid",    items:1, currency:"USD" },
  { id:"INV-2026-0129", client:"Amara Osei",            issuedDate:"2026-02-28", dueDate:"2026-03-30", amount:38000,  status:"paid",    items:2, currency:"USD" },
  { id:"INV-2026-0128", client:"William Hargreaves",    issuedDate:"2026-02-20", dueDate:"2026-03-22", amount:485000, status:"paid",    items:1, currency:"GBP" },
  { id:"INV-2026-0127", client:"Chloe Dubois",          issuedDate:"2026-02-15", dueDate:"2026-03-17", amount:22000,  status:"draft",   items:1, currency:"EUR" },
  { id:"INV-2026-0126", client:"Giovanni Esposito",     issuedDate:"2026-02-10", dueDate:"2026-03-12", amount:75000,  status:"draft",   items:2, currency:"EUR" },
];

const STATUS_CFG: Record<InvStatus, { label:string; icon:React.ElementType; cls:string }> = {
  paid:    { label:"Paid",    icon:CheckCircle2, cls:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  sent:    { label:"Sent",    icon:Send,         cls:"bg-sky-500/10 text-sky-400 border-sky-500/20" },
  overdue: { label:"Overdue", icon:Clock,        cls:"bg-red-500/10 text-red-400 border-red-500/20" },
  draft:   { label:"Draft",   icon:FileText,     cls:"bg-white/5 text-white/40 border-white/10" },
};

const PAGE_SIZE = 8;

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvStatus | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    INVOICES.filter(inv =>
      (statusFilter === "all" || inv.status === statusFilter) &&
      (!search || inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.client.toLowerCase().includes(search.toLowerCase()))
    ), [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);
  const totalPaid = INVOICES.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0);
  const totalOverdue = INVOICES.filter(i=>i.status==="overdue").reduce((s,i)=>s+i.amount,0);
  const totalSent = INVOICES.filter(i=>i.status==="sent").reduce((s,i)=>s+i.amount,0);

  return (
    <div className="space-y-5 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Total Invoices", value:INVOICES.length, sub:"all time", cls:"text-violet-400" },
          { label:"Paid", value:fmt(totalPaid), sub:`${INVOICES.filter(i=>i.status==="paid").length} invoices`, cls:"text-emerald-400" },
          { label:"Awaiting Payment", value:fmt(totalSent), sub:"sent & pending", cls:"text-sky-400" },
          { label:"Overdue", value:fmt(totalOverdue), sub:`${INVOICES.filter(i=>i.status==="overdue").length} invoices`, cls:"text-red-400" },
        ].map(({ label, value, sub, cls }) => (
          <div key={label} className="rounded-xl border border-white/8 bg-[#0d0d18] p-4">
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{label}</p>
            <p className={cn("font-bold text-xl", cls)}>{value}</p>
            <p className="text-white/25 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/5 border border-white/8 flex-1">
            <Search className="w-3.5 h-3.5 text-white/30" />
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search invoice ID or client…"
              className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none" />
          </div>
          <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value as InvStatus|"all");setPage(1);}}
            className="h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-white/60 text-xs outline-none">
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
          </select>
          <button className="h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white text-xs flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button className="h-9 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs flex items-center gap-1.5 font-medium">
            <Plus className="w-3.5 h-3.5" /> New Invoice
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Invoice #","Client","Issued","Due Date","Items","Amount","Currency","Status",""].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map(inv => {
                const { label, icon: Icon, cls } = STATUS_CFG[inv.status];
                const overdue = inv.status === "overdue";
                return (
                  <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-white/60 group-hover:text-violet-400 transition-colors">{inv.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white/70 text-xs font-medium">{inv.client}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white/40 text-xs">{inv.issuedDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-xs", overdue ? "text-red-400 font-semibold" : "text-white/40")}>{inv.dueDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white/40 text-xs">{inv.items} item{inv.items>1?"s":""}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white font-semibold text-sm">{fmt(inv.amount)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white/30 text-xs font-mono">{inv.currency}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border flex items-center gap-1 w-fit", cls)}>
                        <Icon className="w-2.5 h-2.5" />{label}
                      </Badge>
                    </td>
                    <td className="px-3 py-3.5">
                      <button className="text-white/20 hover:text-white/70 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/5">
          <span className="text-white/30 text-xs">Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
              className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
              <button key={p} onClick={()=>setPage(p)}
                className={cn("w-8 h-8 rounded-lg text-xs font-medium", page===p?"bg-violet-600 text-white":"text-white/40 hover:text-white hover:bg-white/5")}>
                {p}
              </button>
            ))}
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages||totalPages===0}
              className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
