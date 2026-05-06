"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, Download, ArrowUpRight, ArrowDownLeft, RefreshCcw, DollarSign, CreditCard, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type TxType = "credit" | "debit" | "refund";
type TxStatus = "settled" | "pending" | "failed";

interface Transaction {
  id: string; date: string; time: string; client: string;
  description: string; type: TxType; status: TxStatus;
  amount: number; method: string; ref: string;
}

const TXS: Transaction[] = [
  { id:"TXN-0542", date:"2026-05-06", time:"14:32", client:"James Worthington", description:"ORD-7821 · Patek Philippe", type:"credit", status:"settled", amount:142000, method:"Wire Transfer", ref:"WT-20260506-001" },
  { id:"TXN-0541", date:"2026-05-06", time:"11:18", client:"Sofia Marchetti",   description:"ORD-7820 · Cartier Necklace", type:"credit", status:"pending", amount:89500, method:"Bank Transfer", ref:"BT-20260506-002" },
  { id:"TXN-0540", date:"2026-05-05", time:"16:45", client:"Robert Chen",       description:"ORD-7819 · Richard Mille", type:"credit", status:"settled", amount:215000, method:"Wire Transfer", ref:"WT-20260505-001" },
  { id:"TXN-0539", date:"2026-05-05", time:"09:22", client:"System",            description:"Refund ORD-7812 partial", type:"refund",  status:"settled", amount:12000,  method:"Wire Transfer", ref:"RF-20260505-001" },
  { id:"TXN-0538", date:"2026-05-04", time:"15:10", client:"Yuki Tanaka",       description:"ORD-7816 · Chanel Set", type:"credit", status:"settled", amount:175000, method:"Bank Transfer", ref:"BT-20260504-001" },
  { id:"TXN-0537", date:"2026-05-04", time:"13:05", client:"Marcus Thompson",   description:"ORD-7817 · Audemars Piguet", type:"credit", status:"settled", amount:98000, method:"Wire Transfer", ref:"WT-20260504-002" },
  { id:"TXN-0536", date:"2026-05-03", time:"10:48", client:"Carlos Ruiz",       description:"ORD-7814 · Rolex Daytona", type:"credit", status:"settled", amount:52000, method:"Bank Transfer", ref:"BT-20260503-001" },
  { id:"TXN-0535", date:"2026-05-03", time:"08:30", client:"System",            description:"Platform Fee – April", type:"debit",  status:"settled", amount:8500,   method:"Auto-debit", ref:"FEE-20260503-001" },
  { id:"TXN-0534", date:"2026-05-02", time:"17:22", client:"William Hargreaves",description:"ORD-7812 · Bugatti Sculpture", type:"credit", status:"settled", amount:485000, method:"Wire Transfer", ref:"WT-20260502-001" },
  { id:"TXN-0533", date:"2026-05-01", time:"14:15", client:"Mei Lin Zhang",     description:"ORD-7811 · Graff Diamond Ring", type:"credit", status:"settled", amount:850000, method:"Wire Transfer", ref:"WT-20260501-001" },
  { id:"TXN-0532", date:"2026-05-01", time:"09:00", client:"System",            description:"Refund ORD-7815 full", type:"refund",  status:"settled", amount:28500,  method:"Wire Transfer", ref:"RF-20260501-001" },
  { id:"TXN-0531", date:"2026-04-30", time:"16:30", client:"Fatima Al-Rashid",  description:"ORD-7809 · Bvlgari Bracelet", type:"credit", status:"settled", amount:42000, method:"Wire Transfer", ref:"WT-20260430-001" },
  { id:"TXN-0530", date:"2026-04-30", time:"11:45", client:"Giovanni Esposito", description:"ORD-7808 · Ferrari Miniature", type:"credit", status:"failed",  amount:75000, method:"Bank Transfer", ref:"BT-20260430-001" },
  { id:"TXN-0529", date:"2026-04-29", time:"14:20", client:"Priya Sharma",      description:"ORD-7807 · JL Reverso", type:"credit", status:"settled", amount:28000, method:"Wire Transfer", ref:"WT-20260429-001" },
  { id:"TXN-0528", date:"2026-04-29", time:"10:05", client:"Dmitri Volkov",     description:"ORD-7806 · Fabergé Egg", type:"credit", status:"settled", amount:195000, method:"Wire Transfer", ref:"WT-20260429-002" },
];

const TYPE_CFG: Record<TxType, { icon:React.ElementType; cls:string; sign:string }> = {
  credit: { icon:ArrowDownLeft, cls:"text-emerald-400", sign:"+" },
  debit:  { icon:ArrowUpRight,  cls:"text-red-400",     sign:"-" },
  refund: { icon:RefreshCcw,    cls:"text-amber-400",   sign:"~" },
};
const STATUS_CFG: Record<TxStatus, { cls:string }> = {
  settled: { cls:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pending: { cls:"bg-amber-500/10 text-amber-400 border-amber-500/20" },
  failed:  { cls:"bg-red-500/10 text-red-400 border-red-500/20" },
};

const PAGE_SIZE = 8;

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    TXS.filter(tx =>
      (typeFilter === "all" || tx.type === typeFilter) &&
      (!search || tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.client.toLowerCase().includes(search.toLowerCase()) ||
        tx.description.toLowerCase().includes(search.toLowerCase()))
    ), [search, typeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);

  const totalCredits = TXS.filter(t=>t.type==="credit"&&t.status==="settled").reduce((s,t)=>s+t.amount,0);
  const totalDebits  = TXS.filter(t=>t.type==="debit").reduce((s,t)=>s+t.amount,0);
  const totalRefunds = TXS.filter(t=>t.type==="refund").reduce((s,t)=>s+t.amount,0);

  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Total Received", value:fmt(totalCredits), icon:DollarSign, cls:"text-emerald-400" },
          { label:"Fees & Debits",  value:fmt(totalDebits),  icon:CreditCard,  cls:"text-red-400" },
          { label:"Refunds Issued", value:fmt(totalRefunds), icon:RefreshCcw,  cls:"text-amber-400" },
          { label:"Net Volume",     value:fmt(totalCredits-totalDebits-totalRefunds), icon:ArrowDownLeft, cls:"text-violet-400" },
        ].map(({ label, value, icon: Icon, cls }) => (
          <div key={label} className="panel p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--t-input-bg)" }}>
              <Icon className={cn("w-4.5 h-4.5", cls)} aria-hidden="true" />
            </div>
            <div>
              <p className={cn("font-bold text-lg", cls)}>{value}</p>
              <p className="t-text-30 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg border flex-1" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
            <Search className="w-3.5 h-3.5 t-text-30" aria-hidden="true" />
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search transactions…"
              className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
          </div>
          <div className="flex gap-1">
            {(["all","credit","debit","refund"] as const).map(t => (
              <button key={t} onClick={()=>{setTypeFilter(t);setPage(1);}}
                className={cn("px-3 h-9 rounded-lg text-xs font-medium capitalize transition-colors",
                  typeFilter===t ? "text-white" : "t-text-40 hover:t-text-80 hover:bg-[var(--t-hover)] border")}
                style={typeFilter===t ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg border text-xs flex items-center gap-1.5 hover:bg-[var(--t-hover)]"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-60)" }}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" /> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Txn ID","Date / Time","Client","Description","Method","Amount","Status",""].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map(tx => {
                const { icon: Icon, cls, sign } = TYPE_CFG[tx.type];
                return (
                  <tr key={tx.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-[11px] t-text-50">{tx.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="t-text-60 text-xs">{tx.date}</p>
                      <p className="t-text-30 text-[11px]">{tx.time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-70 text-xs">{tx.client}</span>
                    </td>
                    <td className="px-5 py-3.5 max-w-[200px]">
                      <span className="t-text-50 text-xs truncate block">{tx.description}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{tx.method}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Icon className={cn("w-3.5 h-3.5", cls)} aria-hidden="true" />
                        <span className={cn("font-semibold text-sm", cls)}>{sign}{fmt(tx.amount)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border capitalize", STATUS_CFG[tx.status].cls)}>{tx.status}</Badge>
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

        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="t-text-30 text-xs">Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={()=>setPage(p=>Math.max(1,p-1))}
              disabled={page===1}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--t-hover)]"
              style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button
                key={p}
                onClick={()=>setPage(p)}
                className={cn("w-8 h-8 rounded-lg text-xs font-medium", page===p ? "text-white" : "")}
                style={page===p ? { backgroundColor: "var(--t-accent)" } : { color: "var(--t-text-50)" }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
              disabled={page===totalPages||totalPages===0}
              className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--t-hover)]"
              style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}
            >
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
