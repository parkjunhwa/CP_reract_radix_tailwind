"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { SourceFooter } from "@/components/ui/source-footer";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, name: "Patek Philippe Nautilus 5711", category: "Luxury Watches", price: 142000, stock: 3, status: "low_stock", region: "New York" },
  { id: 2, name: "Richard Mille RM 011", category: "Luxury Watches", price: 215000, stock: 2, status: "low_stock", region: "Hong Kong" },
  { id: 3, name: "Cartier Diamond Bracelet 8ct", category: "Fine Jewelry", price: 68000, stock: 8, status: "active", region: "Paris" },
  { id: 4, name: "Hermès Birkin 35 Crocodile", category: "Premium Fashion", price: 85000, stock: 1, status: "low_stock", region: "London" },
  { id: 5, name: "Rolex Daytona White Gold", category: "Luxury Watches", price: 52000, stock: 6, status: "active", region: "Geneva" },
  { id: 6, name: "Van Cleef Alhambra Necklace", category: "Fine Jewelry", price: 12500, stock: 14, status: "active", region: "Milan" },
  { id: 7, name: "Audemars Piguet Royal Oak 41", category: "Luxury Watches", price: 98000, stock: 4, status: "active", region: "New York" },
  { id: 8, name: "Chanel Haute Joaillerie Set", category: "Fine Jewelry", price: 175000, stock: 0, status: "out_of_stock", region: "Tokyo" },
  { id: 9, name: "Petrus 2010 Magnum Collection", category: "Rare Spirits", price: 4800, stock: 24, status: "active", region: "Geneva" },
  { id: 10, name: "Fabergé Imperial Easter Egg", category: "Art & Collectibles", price: 195000, stock: 2, status: "low_stock", region: "Moscow" },
  { id: 11, name: "Bvlgari Serpenti Viper Bracelet", category: "Fine Jewelry", price: 42000, stock: 9, status: "active", region: "Dubai" },
  { id: 12, name: "Dior Haute Couture Ball Gown", category: "Premium Fashion", price: 22000, stock: 3, status: "low_stock", region: "Paris" },
  { id: 13, name: "Jaeger-LeCoultre Reverso", category: "Luxury Watches", price: 28000, stock: 7, status: "active", region: "Mumbai" },
  { id: 14, name: "Chopard Happy Diamonds Set", category: "Fine Jewelry", price: 38000, stock: 5, status: "active", region: "Lagos" },
  { id: 15, name: "Bugatti Sculpture Limited", category: "Art & Collectibles", price: 485000, stock: 1, status: "low_stock", region: "London" },
];

type SortDir = "asc" | "desc" | null;
interface SortState { col: string; dir: SortDir }

const statusConfig: Record<string, { label: string; cls: string }> = {
  active:       { label: "In Stock",    cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  low_stock:    { label: "Low Stock",   cls: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  out_of_stock: { label: "Out of Stock",cls: "bg-red-500/10 text-red-500 border-red-500/20" },
};

const PAGE_SIZE = 8;

export default function ReactTablePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState>({ col: "price", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    let d = DATA.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));
    if (sort.col && sort.dir) {
      d = [...d].sort((a, b) => {
        const av = (a as Record<string, unknown>)[sort.col];
        const bv = (b as Record<string, unknown>)[sort.col];
        const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }
    return d;
  }, [search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (col: string) => {
    setSort(s => s.col === col ? { col, dir: s.dir === "asc" ? "desc" : s.dir === "desc" ? null : "asc" } : { col, dir: "asc" });
    setPage(1);
  };

  const toggleSelect = (id: number) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allSelected = paged.length > 0 && paged.every(r => selected.has(r.id));
  const toggleAll = () => setSelected(s => { const n = new Set(s); paged.forEach(r => allSelected ? n.delete(r.id) : n.add(r.id)); return n; });

  const fmt = (v: number) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(2)}M` : v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v.toLocaleString()}`;

  const SortIcon = ({ col }: { col: string }) => {
    if (sort.col !== col || !sort.dir) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
    return sort.dir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  const cols = [
    { key: "name", label: "Product" }, { key: "category", label: "Category" },
    { key: "price", label: "Price" }, { key: "stock", label: "Stock" },
    { key: "status", label: "Status" }, { key: "region", label: "Region" },
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-2 pb-0">
      <Card className="panel overflow-hidden gap-0 py-0 lg:col-span-2">
        <CardHeader className="px-5 py-3.5 border-b" style={{ borderColor: "var(--t-border)" }}>
          <CardTitle className="t-text font-semibold text-sm">Interactive React Table</CardTitle>
          <CardDescription className="t-text-40 text-xs mt-0.5">
            Search, sort, select, and paginate a headless-style table layout.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {/* Toolbar */}
          <Form.Root className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <Form.Field name="search" className="flex-1">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
              <Search className="w-3.5 h-3.5 t-text-30" />
              <Form.Control asChild>
                <Input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                />
              </Form.Control>
            </div>
          </Form.Field>
          {selected.size > 0 && (
            <span className="text-xs t-text-40">{selected.size} selected</span>
          )}
          <button className="h-9 px-3 rounded-lg border text-xs flex items-center gap-1.5 t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          </Form.Root>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <th className="w-10 px-5 py-3">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={() => toggleAll()}
                      aria-label="Select all rows"
                    />
                  </th>
                  {cols.map(col => (
                    <th key={col.key} onClick={() => toggleSort(col.key)}
                      className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3 cursor-pointer hover:t-text-60 select-none transition-colors">
                      <div className="flex items-center gap-1.5">{col.label}<SortIcon col={col.key} /></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map(row => {
                  const { label, cls } = statusConfig[row.status];
                  return (
                    <tr key={row.id} className={cn("transition-colors t-hover", selected.has(row.id) && "bg-violet-500/5")} style={{ borderBottom: "1px solid var(--t-border)" }}>
                      <td className="px-5 py-3.5">
                        <Checkbox
                          checked={selected.has(row.id)}
                          onCheckedChange={() => toggleSelect(row.id)}
                          aria-label={`Select row ${row.name}`}
                        />
                      </td>
                      <td className="px-5 py-3.5 max-w-[200px]"><span className="t-text-70 text-xs font-medium truncate block">{row.name}</span></td>
                      <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{row.category}</span></td>
                      <td className="px-5 py-3.5"><span className="t-text font-semibold text-sm">{fmt(row.price)}</span></td>
                    <td className="px-5 py-3.5"><span className={cn("text-xs font-semibold", row.stock === 0 ? "text-red-500" : row.stock <= 3 ? "text-amber-500" : "text-emerald-500")}>{row.stock}</span></td>
                      <td className="px-5 py-3.5"><Badge className={cn("text-[10px] px-2 border", cls)}>{label}</Badge></td>
                      <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{row.region}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid var(--t-border)" }}>
            <span className="t-text-30 text-xs">
              {filtered.length === 0 ? "No results" : `Showing ${(page-1)*PAGE_SIZE+1}–${Math.min(page*PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                aria-label="Previous page"
                onClick={() => setPage(p => Math.max(1, p-1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 transition-colors" style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={cn("w-8 h-8 rounded-lg text-xs font-medium transition-colors", page === p ? "text-white" : "t-text-50")}
                  style={page === p ? { backgroundColor: "var(--t-accent)" } : {}}>
                  {p}
                </button>
              ))}
              <button
                aria-label="Next page"
                onClick={() => setPage(p => Math.min(totalPages, p+1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-30 transition-colors" style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-50)" }}>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="panel overflow-hidden gap-0 py-0">
        <CardHeader className="px-5 py-3.5 border-b" style={{ borderColor: "var(--t-border)" }}>
          <CardTitle className="t-text font-semibold text-sm">Compact Preview</CardTitle>
          <CardDescription className="t-text-40 text-xs mt-0.5">
            A lightweight card for quick scanning (top 5 by current sort).
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Product</th>
                  <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-right text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 5).map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid var(--t-border)" }} className="t-hover">
                    <td className="px-5 py-2.5">
                      <span className="t-text-70 text-xs font-medium truncate block max-w-[240px]">{row.name}</span>
                    </td>
                    <td className="px-5 py-2.5"><span className="t-text-40 text-xs">{row.category}</span></td>
                    <td className="px-5 py-2.5 text-right"><span className="t-text font-semibold text-sm">{fmt(row.price)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="panel overflow-hidden gap-0 py-0">
        <CardHeader className="px-5 py-3.5 border-b" style={{ borderColor: "var(--t-border)" }}>
          <CardTitle className="t-text font-semibold text-sm">Status Badges</CardTitle>
          <CardDescription className="t-text-40 text-xs mt-0.5">
            Example of “table cell as component” using badges and emphasis.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                  <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Product</th>
                  <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Region</th>
                  <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {DATA.slice(0, 6).map((row) => {
                  const { label, cls } = statusConfig[row.status];
                  return (
                    <tr key={row.id} style={{ borderBottom: "1px solid var(--t-border)" }} className="t-hover">
                      <td className="px-5 py-2.5">
                        <span className="t-text-70 text-xs font-medium truncate block max-w-[240px]">{row.name}</span>
                      </td>
                      <td className="px-5 py-2.5"><span className="t-text-40 text-xs">{row.region}</span></td>
                      <td className="px-5 py-2.5"><Badge className={cn("text-[10px] px-2 border", cls)}>{label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SourceFooter className="col-span-full">
        Sorting, filtering, and pagination are implemented with local React state and{" "}
        <a className="t-accent-text underline" href="https://www.radix-ui.com/primitives/docs/components/form" target="_blank" rel="noopener noreferrer">
          Radix UI Form
        </a>
        /{" "}
        <a className="t-accent-text underline" href="https://www.radix-ui.com/primitives/docs/components/checkbox" target="_blank" rel="noopener noreferrer">
          Checkbox
        </a>
        . For headless column APIs see{" "}
        <a className="t-accent-text underline" href="https://tanstack.com/table/latest" target="_blank" rel="noopener noreferrer">
          TanStack Table
        </a>
        .
      </SourceFooter>
    </div>
  );
}
