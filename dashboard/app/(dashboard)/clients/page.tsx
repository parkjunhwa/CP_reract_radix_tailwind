"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatCompactUsd } from "@/lib/utils";
import { Search, Plus, Crown, TrendingUp, Users, Star, Mail, Phone, MoreHorizontal } from "lucide-react";

type Tier = "platinum" | "gold" | "silver" | "bronze";

interface Client {
  id: string; name: string; avatar: string; email: string; phone: string;
  country: string; city: string; tier: Tier; totalSpent: number;
  orders: number; avgOrder: number; lastOrder: string; joinDate: string; status: "active" | "inactive";
}

const CLIENTS: Client[] = [
  { id:"CLT-001", name:"James Worthington III", avatar:"JW", email:"j.worthington@priv.com", phone:"+1 212 555 0192", country:"USA", city:"New York", tier:"platinum", totalSpent:1240000, orders:28, avgOrder:44285, lastOrder:"2026-05-06", joinDate:"2019-03-12", status:"active" },
  { id:"CLT-002", name:"Sofia Marchetti-Rossi", avatar:"SM", email:"s.marchetti@luxury.it", phone:"+39 02 555 0187", country:"Italy", city:"Milan", tier:"platinum", totalSpent:892000, orders:19, avgOrder:46947, lastOrder:"2026-05-06", joinDate:"2020-07-22", status:"active" },
  { id:"CLT-003", name:"Robert Chen", avatar:"RC", email:"robert.chen@hk.finance", phone:"+852 2555 0143", country:"Hong Kong", city:"Central", tier:"gold", totalSpent:675000, orders:14, avgOrder:48214, lastOrder:"2026-05-05", joinDate:"2021-01-15", status:"active" },
  { id:"CLT-004", name:"Alexandra von Stein", avatar:"AV", email:"a.vonstein@privatbank.ch", phone:"+41 22 555 0174", country:"Switzerland", city:"Geneva", tier:"gold", totalSpent:548000, orders:22, avgOrder:24909, lastOrder:"2026-05-05", joinDate:"2020-11-08", status:"active" },
  { id:"CLT-005", name:"Yuki Tanaka", avatar:"YT", email:"y.tanaka@artcollect.jp", phone:"+81 3 5555 0198", country:"Japan", city:"Tokyo", tier:"gold", totalSpent:421000, orders:11, avgOrder:38272, lastOrder:"2026-05-04", joinDate:"2022-02-28", status:"active" },
  { id:"CLT-006", name:"Marcus Thompson", avatar:"MT", email:"m.thompson@citylaw.uk", phone:"+44 20 7555 0162", country:"UK", city:"London", tier:"gold", totalSpent:385000, orders:17, avgOrder:22647, lastOrder:"2026-05-04", joinDate:"2021-09-14", status:"active" },
  { id:"CLT-007", name:"Isabelle Fontaine", avatar:"IF", email:"i.fontaine@mode.fr", phone:"+33 1 4555 0131", country:"France", city:"Paris", tier:"silver", totalSpent:245000, orders:31, avgOrder:7903, lastOrder:"2026-05-02", joinDate:"2022-06-01", status:"active" },
  { id:"CLT-008", name:"Carlos Ruiz Alvarado", avatar:"CR", email:"c.ruiz@bancoiberia.es", phone:"+34 91 555 0149", country:"Spain", city:"Madrid", tier:"silver", totalSpent:189000, orders:12, avgOrder:15750, lastOrder:"2026-05-03", joinDate:"2023-01-10", status:"active" },
  { id:"CLT-009", name:"Mei Lin Zhang", avatar:"ML", email:"meilin@sgfinance.com", phone:"+65 6555 0178", country:"Singapore", city:"Orchard", tier:"platinum", totalSpent:1850000, orders:41, avgOrder:45121, lastOrder:"2026-05-01", joinDate:"2018-08-20", status:"active" },
  { id:"CLT-010", name:"Fatima Al-Rashid", avatar:"FA", email:"f.alrashid@dxb.ae", phone:"+971 4 555 0165", country:"UAE", city:"Dubai", tier:"gold", totalSpent:520000, orders:16, avgOrder:32500, lastOrder:"2026-04-30", joinDate:"2021-04-05", status:"active" },
  { id:"CLT-011", name:"Henrik Larsson", avatar:"HL", email:"h.larsson@nordic.se", phone:"+46 8 555 0183", country:"Sweden", city:"Stockholm", tier:"silver", totalSpent:128000, orders:9, avgOrder:14222, lastOrder:"2026-05-01", joinDate:"2023-03-17", status:"inactive" },
  { id:"CLT-012", name:"Dmitri Volkov", avatar:"DV", email:"d.volkov@moscfinance.ru", phone:"+7 495 555 0152", country:"Russia", city:"Moscow", tier:"gold", totalSpent:410000, orders:8, avgOrder:51250, lastOrder:"2026-04-29", joinDate:"2022-10-12", status:"active" },
  { id:"CLT-013", name:"Priya Sharma", avatar:"PS", email:"priya.s@mumbai.in", phone:"+91 22 555 0196", country:"India", city:"Mumbai", tier:"silver", totalSpent:95000, orders:7, avgOrder:13571, lastOrder:"2026-04-29", joinDate:"2023-07-22", status:"active" },
  { id:"CLT-014", name:"Amara Osei", avatar:"AO", email:"a.osei@lagos.ng", phone:"+234 1 555 0171", country:"Nigeria", city:"Lagos", tier:"bronze", totalSpent:62000, orders:5, avgOrder:12400, lastOrder:"2026-04-28", joinDate:"2024-01-08", status:"active" },
  { id:"CLT-015", name:"Giovanni Esposito", avatar:"GE", email:"g.esposito@roma.it", phone:"+39 06 555 0147", country:"Italy", city:"Rome", tier:"bronze", totalSpent:48500, orders:4, avgOrder:12125, lastOrder:"2026-04-30", joinDate:"2024-02-14", status:"inactive" },
];

const TIER_CFG: Record<Tier, { label: string; cls: string; icon?: boolean }> = {
  platinum: { label:"Platinum", cls:"bg-violet-500/10 text-violet-300 border-violet-500/20", icon:true },
  gold:     { label:"Gold",     cls:"bg-amber-500/10 text-amber-300 border-amber-500/20" },
  silver:   { label:"Silver",  cls:"bg-[var(--t-input-bg)] t-text-50 border-[color:var(--t-border-2)]" },
  bronze:   { label:"Bronze",  cls:"bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

const AVATARS = ["from-violet-500 to-purple-700","from-emerald-500 to-teal-700","from-amber-500 to-orange-700","from-sky-500 to-blue-700","from-rose-500 to-pink-700","from-fuchsia-500 to-purple-700","from-cyan-500 to-teal-700","from-indigo-500 to-violet-700","from-lime-500 to-green-700","from-red-500 to-rose-700","from-teal-500 to-cyan-700","from-orange-500 to-amber-700","from-blue-500 to-indigo-700","from-green-500 to-emerald-700","from-pink-500 to-rose-700"];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");

  const filtered = useMemo(() =>
    CLIENTS.filter(c =>
      (tierFilter === "all" || c.tier === tierFilter) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()))
    ), [search, tierFilter]);

  const fmtFull = (v: number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(v);

  const totalLTV = CLIENTS.reduce((s,c) => s+c.totalSpent, 0);

  return (
    <div className="space-y-4 pb-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Total Clients", value: CLIENTS.length, sub:"all tiers", icon: Users, color:"text-violet-400" },
          { label:"Platinum Tier", value: CLIENTS.filter(c=>c.tier==="platinum").length, sub:"top spenders", icon: Crown, color:"text-amber-400" },
          { label:"Total LTV", value: formatCompactUsd(totalLTV), sub:"lifetime value", icon: TrendingUp, color:"text-emerald-400" },
          { label:"Active", value: CLIENTS.filter(c=>c.status==="active").length, sub:"last 90 days", icon: Star, color:"text-sky-400" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="panel p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--t-input-bg)" }}>
              <Icon className={cn("w-4.5 h-4.5", color)} aria-hidden="true" />
            </div>
            <div>
              <p className="t-text font-bold text-xl leading-none">{value}</p>
              <p className="t-text-30 text-xs mt-0.5">{label} · {sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg border flex-1" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
            <Search className="w-3.5 h-3.5 t-text-30" aria-hidden="true" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clients…"
              className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
          </div>
          <div className="flex gap-1">
            {(["all","platinum","gold","silver","bronze"] as const).map(t => (
              <button key={t} onClick={() => setTierFilter(t)}
                className={cn("px-3 h-9 rounded-lg text-xs font-medium capitalize transition-colors",
                  tierFilter === t ? "text-white" : "t-text-40 hover:t-text-80 hover:bg-[var(--t-hover)] border")}
                style={tierFilter === t ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs flex items-center gap-1.5 font-medium">
            <Plus className="w-3.5 h-3.5" /> Add Client
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Client","Contact","Location","Tier","Total Spent","Orders","Avg. Order","Last Order","Status",""].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const { label, cls, icon } = TIER_CFG[c.tier];
                return (
                  <tr key={c.id} className="t-hover transition-colors group" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-semibold", AVATARS[i % AVATARS.length])}>
                              {c.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {c.tier === "platinum" && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500/90 flex items-center justify-center">
                              <Crown className="w-2.5 h-2.5 text-white" aria-hidden="true" />
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="t-text-80 text-xs font-medium group-hover:t-text transition-colors">{c.name}</p>
                          <p className="t-text-30 text-[11px]">{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 t-text-40 text-[11px]">
                          <Mail className="w-3 h-3" aria-hidden="true" />{c.email}
                        </div>
                        <div className="flex items-center gap-1 t-text-30 text-[11px]">
                          <Phone className="w-3 h-3" aria-hidden="true" />{c.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="t-text-60 text-xs">{c.city}</p>
                      <p className="t-text-30 text-[11px]">{c.country}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border flex items-center gap-1 w-fit", cls)}>
                        {icon && <Crown className="w-2.5 h-2.5" aria-hidden="true" />}{label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text font-semibold text-sm">{fmtFull(c.totalSpent)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-60 text-sm">{c.orders}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-50 text-xs">{formatCompactUsd(c.avgOrder)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{c.lastOrder}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border", c.status==="active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-[var(--t-input-bg)] t-text-40 border-[color:var(--t-border-2)]")}>
                        {c.status}
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
        <div className="px-5 py-3" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="t-text-30 text-xs">{filtered.length} clients</span>
        </div>
      </div>
    </div>
  );
}
