"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Search, Plus, Download, TrendingUp, TrendingDown,
  MoreHorizontal, Package, AlertTriangle, CheckCircle2,
} from "lucide-react";

type Category = "Luxury Watches" | "Fine Jewelry" | "Premium Fashion" | "Art & Collectibles" | "Rare Spirits";

interface Product {
  id: string; name: string; category: Category; sku: string;
  price: number; cost: number; stock: number; maxStock: number;
  sold: number; revenue: number; trend: number; status: "active" | "low_stock" | "out_of_stock";
}

const PRODUCTS: Product[] = [
  { id:"PRD-001", name:"Patek Philippe Nautilus 5711/1A", category:"Luxury Watches", sku:"PP-5711-ST", price:142000, cost:90000, stock:3, maxStock:10, sold:24, revenue:3408000, trend:18.4, status:"low_stock" },
  { id:"PRD-002", name:"Richard Mille RM 011 Felipe Massa", category:"Luxury Watches", sku:"RM-011-TZ", price:215000, cost:140000, stock:2, maxStock:8, sold:18, revenue:3870000, trend:22.1, status:"low_stock" },
  { id:"PRD-003", name:"Cartier Diamond Tennis Bracelet 8ct", category:"Fine Jewelry", sku:"CA-DTB-8CT", price:68000, cost:38000, stock:8, maxStock:20, sold:41, revenue:2788000, trend:11.3, status:"active" },
  { id:"PRD-004", name:"Hermès Birkin 35 Porosus Crocodile", category:"Premium Fashion", sku:"HE-BK35-PC", price:85000, cost:45000, stock:1, maxStock:5, sold:15, revenue:1275000, trend:-3.2, status:"low_stock" },
  { id:"PRD-005", name:"Rolex Daytona White Gold Oysterflex", category:"Luxury Watches", sku:"RO-DT-WG", price:52000, cost:30000, stock:6, maxStock:15, sold:67, revenue:3484000, trend:8.9, status:"active" },
  { id:"PRD-006", name:"Van Cleef & Arpels Alhambra Necklace", category:"Fine Jewelry", sku:"VC-ALH-NKLT", price:12500, cost:6000, stock:14, maxStock:30, sold:89, revenue:1112500, trend:15.7, status:"active" },
  { id:"PRD-007", name:"Audemars Piguet Royal Oak 41mm", category:"Luxury Watches", sku:"AP-RO-41SS", price:98000, cost:62000, stock:4, maxStock:12, sold:31, revenue:3038000, trend:6.4, status:"active" },
  { id:"PRD-008", name:"Chanel Haute Joaillerie Comète Set", category:"Fine Jewelry", sku:"CH-HJ-CSET", price:175000, cost:95000, stock:0, maxStock:4, sold:8, revenue:1400000, trend:-1.8, status:"out_of_stock" },
  { id:"PRD-009", name:"Petrus 2010 Magnum Collection", category:"Rare Spirits", sku:"PE-2010-MAG", price:4800, cost:2200, stock:24, maxStock:60, sold:112, revenue:537600, trend:34.2, status:"active" },
  { id:"PRD-010", name:"Fabergé Imperial Easter Egg Replica", category:"Art & Collectibles", sku:"FB-IEE-LTD", price:195000, cost:110000, stock:2, maxStock:5, sold:7, revenue:1365000, trend:5.1, status:"low_stock" },
  { id:"PRD-011", name:"Bvlgari Serpenti Viper Bracelet", category:"Fine Jewelry", sku:"BV-SV-BRCLT", price:42000, cost:21000, stock:9, maxStock:25, sold:53, revenue:2226000, trend:9.8, status:"active" },
  { id:"PRD-012", name:"Dior Haute Couture Ball Gown", category:"Premium Fashion", sku:"DI-HC-BGOWN", price:22000, cost:9000, stock:3, maxStock:8, sold:19, revenue:418000, trend:-2.4, status:"low_stock" },
];

const CATS: (Category | "All")[] = ["All","Luxury Watches","Fine Jewelry","Premium Fashion","Art & Collectibles","Rare Spirits"];
const CAT_COLOR: Record<Category, string> = {
  "Luxury Watches":    "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Fine Jewelry":      "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Premium Fashion":   "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "Art & Collectibles":"bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Rare Spirits":      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};
const STATUS_CFG = {
  active:       { label:"In Stock",    cls:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  low_stock:    { label:"Low Stock",   cls:"bg-amber-500/10 text-amber-400 border-amber-500/20" },
  out_of_stock: { label:"Out of Stock",cls:"bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [view, setView] = useState<"table" | "grid">("table");

  const filtered = useMemo(() =>
    PRODUCTS.filter(p =>
      (cat === "All" || p.category === cat) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    ), [search, cat]);

  const fmt = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v.toLocaleString()}`;

  return (
    <div className="space-y-5 pb-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Total Products", value: PRODUCTS.length, icon: Package, color:"text-violet-400" },
          { label:"Active Listings", value: PRODUCTS.filter(p=>p.status==="active").length, icon: CheckCircle2, color:"text-emerald-400" },
          { label:"Low Stock Alerts", value: PRODUCTS.filter(p=>p.status==="low_stock").length, icon: AlertTriangle, color:"text-amber-400" },
          { label:"Out of Stock", value: PRODUCTS.filter(p=>p.status==="out_of_stock").length, icon: Package, color:"text-red-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-white/8 bg-[#0d0d18] p-4 flex items-center gap-3">
            <Icon className={cn("w-5 h-5 flex-shrink-0", color)} />
            <div>
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/5 border border-white/8 flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-white/30" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products or SKU…"
              className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none" />
          </div>
          <div className="flex gap-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={cn("px-3 h-9 rounded-lg text-xs font-medium transition-colors",
                  cat === c ? "bg-violet-600 text-white" : "text-white/40 hover:text-white hover:bg-white/5 border border-white/8")}>
                {c}
              </button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="h-9 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs flex items-center gap-1.5 transition-colors font-medium">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Product","SKU","Category","Price","Margin","Stock","Sold","Revenue","Trend","Status",""].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-white/25 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const margin = Math.round(((p.price - p.cost) / p.price) * 100);
                const stockPct = Math.round((p.stock / p.maxStock) * 100);
                const { label, cls } = STATUS_CFG[p.status];
                return (
                  <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3.5">
                      <p className="text-white/80 text-xs font-medium truncate max-w-[200px] group-hover:text-white transition-colors">{p.name}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-[11px] text-white/40">{p.sku}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border", CAT_COLOR[p.category])}>{p.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white text-sm font-semibold">{fmt(p.price)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-emerald-400 text-xs font-semibold">{margin}%</span>
                    </td>
                    <td className="px-5 py-3.5 w-32">
                      <div className="flex items-center gap-2">
                        <Progress value={stockPct} className="h-1 flex-1 bg-white/5" />
                        <span className={cn("text-xs w-5 text-right", p.stock === 0 ? "text-red-400" : p.stock <= 3 ? "text-amber-400" : "text-white/50")}>{p.stock}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white/50 text-xs">{p.sold}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-white text-sm font-semibold">{fmt(p.revenue)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={cn("flex items-center gap-0.5 text-xs font-semibold", p.trend >= 0 ? "text-emerald-400" : "text-red-400")}>
                        {p.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {p.trend >= 0 ? "+" : ""}{p.trend}%
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border", cls)}>{label}</Badge>
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
        <div className="px-5 py-3 border-t border-white/5">
          <span className="text-white/30 text-xs">{filtered.length} products</span>
        </div>
      </div>
    </div>
  );
}
