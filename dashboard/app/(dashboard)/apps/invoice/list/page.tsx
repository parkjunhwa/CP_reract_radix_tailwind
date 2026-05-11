"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users, FileText, CheckCircle2, CircleOff, Search, Plus, Eye, Pencil, MoreHorizontal,
  Send, Download, ArrowUpDown,
} from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { InvoiceStatusPill } from "@/components/invoice-status-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INVOICES, fmtMoney, initials, type Invoice, type InvoiceStatus,
} from "@/lib/invoices";

const STATUS_FILTERS: ("All" | InvoiceStatus)[] = [
  "All", "Paid", "Sent", "Draft", "Downloaded", "Past Due", "Partial Payment",
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

type SortKey = "id" | "total" | "issuedDate" | "balance";
type SortDir = "asc" | "desc";

function compareInvoices(a: Invoice, b: Invoice, key: SortKey, dir: SortDir) {
  const mult = dir === "asc" ? 1 : -1;
  if (key === "id") return (Number(a.id) - Number(b.id)) * mult;
  if (key === "total") return (a.total - b.total) * mult;
  if (key === "balance") return (a.balance - b.balance) * mult;
  return (Date.parse(a.issuedDate) - Date.parse(b.issuedDate)) * mult;
}

export default function InvoiceListPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("All");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVOICES.filter((inv) => {
      if (statusFilter !== "All" && inv.invoiceStatus !== statusFilter) return false;
      if (!q) return true;
      return [inv.id, inv.name, inv.company, inv.companyEmail].some((v) => v.toLowerCase().includes(q));
    }).sort((a, b) => compareInvoices(a, b, sortKey, sortDir));
  }, [query, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const stats = useMemo(() => {
    const clients = new Set(INVOICES.map((i) => i.companyEmail)).size;
    const paid = INVOICES.filter((i) => i.invoiceStatus === "Paid").reduce((s, i) => s + i.total, 0);
    const unpaid = INVOICES.filter((i) => i.balance > 0).reduce((s, i) => s + i.balance, 0);
    return [
      { label: "Clients", value: clients.toString(), icon: Users, color: "text-violet-500 bg-violet-500/15" },
      { label: "Invoices", value: INVOICES.length.toString(), icon: FileText, color: "text-sky-500 bg-sky-500/15" },
      { label: "Paid", value: fmtMoney(paid), icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/15" },
      { label: "Unpaid", value: fmtMoney(unpaid), icon: CircleOff, color: "text-amber-500 bg-amber-500/15" },
    ] as const;
  }, []);

  const onSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-3 pb-0">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="panel p-4 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="t-text font-bold text-xl">{value}</p>
              <p className="t-text-40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="panel">
        <Form.Root className="flex flex-wrap items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--t-border)" }}>
          <Form.Field name="query" className="flex-1 min-w-[220px]">
            <div
              className="flex items-center gap-2 h-9 px-3 rounded-lg border"
              style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}
            >
              <Search className="w-3.5 h-3.5 t-text-30" />
              <Form.Control asChild>
                <Input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search by id, client or company…"
                  className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                  aria-label="Search invoices"
                />
              </Form.Control>
            </div>
          </Form.Field>

          <Form.Field name="statusFilter">
            <Select
              value={statusFilter}
              onValueChange={(v) => { setStatusFilter(v as typeof statusFilter); setPage(1); }}
            >
              <SelectTrigger className="h-9 text-xs" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTERS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Form.Field>

          <Form.Field name="pageSize">
            <Select
              value={String(pageSize)}
              onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}
            >
              <SelectTrigger className="h-9 text-xs" aria-label="Rows per page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Form.Field>

          <Link href="/apps/invoice/add">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
              <Plus className="w-3.5 h-3.5" /> New invoice
            </Button>
          </Link>
        </Form.Root>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[920px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                <SortableTh label="#" onClick={() => onSort("id")} active={sortKey === "id"} dir={sortDir} className="w-20" />
                <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Client</th>
                <SortableTh label="Total" onClick={() => onSort("total")} active={sortKey === "total"} dir={sortDir} align="right" />
                <SortableTh label="Issued" onClick={() => onSort("issuedDate")} active={sortKey === "issuedDate"} dir={sortDir} />
                <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">Status</th>
                <SortableTh label="Balance" onClick={() => onSort("balance")} active={sortKey === "balance"} dir={sortDir} align="right" />
                <th className="text-right text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center t-text-30 text-xs">No invoices match your filters.</td>
                </tr>
              )}
              {pageRows.map((inv) => {
                return (
                  <tr key={inv.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/apps/invoice/preview/${inv.id}`}
                        className="text-violet-500 hover:underline text-xs font-mono font-semibold"
                      >
                        #{inv.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold shrink-0", inv.avatarColor)}>
                          {initials(inv.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="t-text-70 text-xs font-medium truncate">{inv.name}</p>
                          <p className="t-text-30 text-[10px] truncate">{inv.companyEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right t-text-70 text-xs font-semibold">{fmtMoney(inv.total)}</td>
                    <td className="px-5 py-3.5 t-text-50 text-xs">{inv.issuedDate}</td>
                    <td className="px-5 py-3.5">
                      <InvoiceStatusPill status={inv.invoiceStatus} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {inv.balance > 0 ? (
                        <span className="text-amber-500 text-xs font-semibold">{fmtMoney(inv.balance)}</span>
                      ) : inv.balance < 0 ? (
                        <span className="text-emerald-500 text-xs font-semibold">+{fmtMoney(Math.abs(inv.balance))}</span>
                      ) : (
                        <span className="inline-flex h-5 items-center rounded-4xl border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/apps/invoice/preview/${inv.id}`}>
                          <Button variant="ghost" size="icon-sm" aria-label="Preview"><Eye className="w-3.5 h-3.5" /></Button>
                        </Link>
                        <Link href={`/apps/invoice/edit/${inv.id}`}>
                          <Button variant="ghost" size="icon-sm" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuItem><Download className="w-3.5 h-3.5" /> Download PDF</DropdownMenuItem>
                            <DropdownMenuItem><Send className="w-3.5 h-3.5" /> Resend</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400 focus:text-red-400">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t" style={{ borderColor: "var(--t-border)" }}>
          <p className="t-text-40 text-xs">
            Showing <span className="t-text-70 font-medium">{pageRows.length}</span> of <span className="t-text-70 font-medium">{filtered.length}</span> invoices
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="t-text-50 text-xs px-2">Page {safePage} / {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableTh({
  label, onClick, active, dir, align = "left", className,
}: { label: string; onClick: () => void; active: boolean; dir: SortDir; align?: "left" | "right"; className?: string }) {
  return (
    <th className={cn("text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3", className)}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 hover:t-text-70 transition-colors w-full",
          align === "right" && "justify-end",
          active && "t-text-70",
        )}
      >
        {label}
        <ArrowUpDown
          className={cn("w-3 h-3 opacity-40", active && "opacity-100", active && dir === "desc" && "rotate-180 transition-transform")}
        />
      </button>
    </th>
  );
}
