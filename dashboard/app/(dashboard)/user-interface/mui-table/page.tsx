"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ArrowDown, ArrowUp } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { SourceFooter } from "@/components/ui/source-footer";

type Dessert = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  history?: { date: string; customer: string; amount: number }[];
};

const DESSERTS: Dessert[] = [
  {
    name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4,
    history: [
      { date: "2026-04-21", customer: "Anonymous", amount: 3 },
      { date: "2026-04-23", customer: "James W.",  amount: 1 },
    ],
  },
  {
    name: "Ice cream sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3,
    history: [
      { date: "2026-04-20", customer: "Ava R.", amount: 2 },
    ],
  },
  { name: "Eclair",      calories: 262, fat: 16,  carbs: 24, protein: 6   },
  { name: "Cupcake",     calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16,  carbs: 49, protein: 3.9 },
];

const SORTING_DESSERTS: Dessert[] = [
  { name: "Frozen yoghurt",     calories: 159, fat: 6,   carbs: 24, protein: 4   },
  { name: "Ice cream sandwich", calories: 237, fat: 9,   carbs: 37, protein: 4.3 },
  { name: "Eclair",             calories: 262, fat: 16,  carbs: 24, protein: 6   },
  { name: "Cupcake",            calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Marshmallow",        calories: 318, fat: 0,   carbs: 81, protein: 2   },
  { name: "Gingerbread",        calories: 356, fat: 16,  carbs: 49, protein: 3.9 },
  { name: "Donut",              calories: 452, fat: 25,  carbs: 51, protein: 4.9 },
  { name: "Honeycomb",          calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
  { name: "Jelly Bean",         calories: 375, fat: 0,   carbs: 94, protein: 0   },
  { name: "Lollipop",           calories: 392, fat: 0.2, carbs: 98, protein: 0   },
  { name: "Nougat",             calories: 360, fat: 19,  carbs: 9,  protein: 37  },
  { name: "Oreo",               calories: 437, fat: 18,  carbs: 63, protein: 4   },
  { name: "KitKat",             calories: 518, fat: 26,  carbs: 65, protein: 7   },
];

type Country = { name: string; iso: string; pop: number; size: number; density: number };

const COUNTRIES: Country[] = [
  { name: "India",          iso: "IN", pop: 1324171354, size: 3287263, density: 402.82 },
  { name: "China",          iso: "CN", pop: 1403500365, size: 9596961, density: 146.24 },
  { name: "Italy",          iso: "IT", pop: 60483973,   size: 301340,  density: 200.72 },
  { name: "United States",  iso: "US", pop: 327167434,  size: 9833520, density: 33.27  },
  { name: "Canada",         iso: "CA", pop: 37602103,   size: 9984670, density: 3.77   },
  { name: "Australia",      iso: "AU", pop: 25475400,   size: 7692024, density: 3.31   },
  { name: "Germany",        iso: "DE", pop: 83019200,   size: 357578,  density: 232.17 },
  { name: "Ireland",        iso: "IE", pop: 4857000,    size: 70273,   density: 69.12  },
  { name: "Mexico",         iso: "MX", pop: 126577691,  size: 1972550, density: 64.17  },
  { name: "Japan",          iso: "JP", pop: 126317000,  size: 377973,  density: 334.20 },
  { name: "France",         iso: "FR", pop: 67391582,   size: 643801,  density: 119.00 },
  { name: "United Kingdom", iso: "UK", pop: 67215293,   size: 242495,  density: 270.70 },
  { name: "Russia",         iso: "RU", pop: 146599183,  size: 17098246,density: 8.40   },
  { name: "Nigeria",        iso: "NG", pop: 200963599,  size: 923768,  density: 217.40 },
  { name: "Brazil",         iso: "BR", pop: 210147125,  size: 8515767, density: 25.40  },
];

const fmt = (n: number) => n.toLocaleString();

function ExampleCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="panel overflow-hidden gap-0 py-0">
      <CardHeader className="px-5 py-3.5 border-b" style={{ borderColor: "var(--t-border)" }}>
        <CardTitle className="t-text font-semibold text-sm">{title}</CardTitle>
        {description && <CardDescription className="t-text-40 text-xs mt-0.5">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">
        {children}
      </CardContent>
    </Card>
  );
}

function BasicTable({ dense = false }: { dense?: boolean }) {
  const cellPad = dense ? "py-1.5" : "py-3";
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dessert (100g serving)</TableHead>
          <TableHead className="text-right">Calories</TableHead>
          <TableHead className="text-right">Fat&nbsp;(g)</TableHead>
          <TableHead className="text-right">Carbs&nbsp;(g)</TableHead>
          <TableHead className="text-right">Protein&nbsp;(g)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DESSERTS.map((d) => (
          <TableRow key={d.name}>
            <TableCell className={cellPad}>{d.name}</TableCell>
            <TableCell className={`${cellPad} text-right`}>{d.calories}</TableCell>
            <TableCell className={`${cellPad} text-right`}>{d.fat}</TableCell>
            <TableCell className={`${cellPad} text-right`}>{d.carbs}</TableCell>
            <TableCell className={`${cellPad} text-right`}>{d.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StickyHeaderTable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const start = page * pageSize;
  const visible = COUNTRIES.slice(start, start + pageSize);
  const totalPages = Math.ceil(COUNTRIES.length / pageSize);

  return (
    <div>
      <div className="max-h-[420px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10" style={{ backgroundColor: "var(--t-surface-2)" }}>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ISO Code</TableHead>
              <TableHead className="text-right">Population</TableHead>
              <TableHead className="text-right">Size&nbsp;(km²)</TableHead>
              <TableHead className="text-right">Density</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((c) => (
              <TableRow key={c.iso}>
                <TableCell className="py-2.5">{c.name}</TableCell>
                <TableCell className="py-2.5">{c.iso}</TableCell>
                <TableCell className="py-2.5 text-right">{fmt(c.pop)}</TableCell>
                <TableCell className="py-2.5 text-right">{fmt(c.size)}</TableCell>
                <TableCell className="py-2.5 text-right">{c.density.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className="flex items-center justify-end gap-4 px-3 py-2"
        style={{ borderTop: "1px solid var(--t-border)" }}
      >
        <div className="flex items-center gap-2">
          <Label htmlFor="sticky-page-size" className="t-text-50 text-xs font-normal">
            Rows per page:
          </Label>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => { setPageSize(Number(v)); setPage(0); }}
          >
            <SelectTrigger id="sticky-page-size" size="sm" className="h-7 px-2 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25].map((s) => (
                <SelectItem key={s} value={String(s)}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="t-text-60 text-xs">
          {start + 1}–{Math.min(start + pageSize, COUNTRIES.length)} of {COUNTRIES.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="t-text-60 t-hover px-2 py-1 rounded disabled:opacity-40"
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="t-text-60 t-hover px-2 py-1 rounded disabled:opacity-40"
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

function CollapsibleTable() {
  const [open, setOpen] = useState<string | null>(DESSERTS[0]?.name ?? null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10" />
          <TableHead>Dessert (100g serving)</TableHead>
          <TableHead className="text-right">Calories</TableHead>
          <TableHead className="text-right">Fat&nbsp;(g)</TableHead>
          <TableHead className="text-right">Carbs&nbsp;(g)</TableHead>
          <TableHead className="text-right">Protein&nbsp;(g)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DESSERTS.map((d) => {
          const isOpen = open === d.name;
          const hasHistory = (d.history ?? []).length > 0;
          return (
            <Fragment key={d.name}>
              <TableRow>
                <TableCell className="py-2">
                  {hasHistory && (
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : d.name)}
                      className="t-text-60 t-hover-2 rounded p-0.5"
                      aria-label={isOpen ? "Collapse row" : "Expand row"}
                    >
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  )}
                </TableCell>
                <TableCell className="py-2.5">{d.name}</TableCell>
                <TableCell className="py-2.5 text-right">{d.calories}</TableCell>
                <TableCell className="py-2.5 text-right">{d.fat}</TableCell>
                <TableCell className="py-2.5 text-right">{d.carbs}</TableCell>
                <TableCell className="py-2.5 text-right">{d.protein}</TableCell>
              </TableRow>
              {isOpen && hasHistory && (
                <TableRow>
                  <TableCell colSpan={6} className="py-3 px-6" style={{ backgroundColor: "var(--t-surface-2)" }}>
                    <div className="t-text-70 text-sm font-semibold mb-2">Order history</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">Total price ($)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {d.history!.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="py-1.5">{row.date}</TableCell>
                            <TableCell className="py-1.5">{row.customer}</TableCell>
                            <TableCell className="py-1.5 text-right">{row.amount}</TableCell>
                            <TableCell className="py-1.5 text-right">{(row.amount * d.calories * 0.05).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

function SpanningTable() {
  const lines = [
    { desc: "Paperclips (Box)", qty: 100, unit: 1.15 },
    { desc: "Paper (Case)",     qty: 10,  unit: 45.99 },
    { desc: "Waste Basket",     qty: 2,   unit: 17.99 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={3} className="text-center">Details</TableHead>
          <TableHead colSpan={1} className="text-right">Price</TableHead>
        </TableRow>
        <TableRow>
          <TableHead>Desc</TableHead>
          <TableHead className="text-right">Qty.</TableHead>
          <TableHead className="text-right">Unit</TableHead>
          <TableHead className="text-right">Sum</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lines.map((l) => (
          <TableRow key={l.desc}>
            <TableCell className="py-2.5">{l.desc}</TableCell>
            <TableCell className="py-2.5 text-right">{l.qty}</TableCell>
            <TableCell className="py-2.5 text-right">{l.unit.toFixed(2)}</TableCell>
            <TableCell className="py-2.5 text-right">{(l.qty * l.unit).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="py-2.5 text-right t-text-60">Subtotal</TableCell>
          <TableCell className="py-2.5 text-right t-text font-medium">{subtotal.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-2.5 t-text-60">Tax</TableCell>
          <TableCell colSpan={2} className="py-2.5 text-right t-text-60">7 %</TableCell>
          <TableCell className="py-2.5 text-right t-text font-medium">{tax.toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="py-2.5 text-right t-text font-semibold">Total</TableCell>
          <TableCell className="py-2.5 text-right t-text font-semibold">{total.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function CustomizedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow style={{ backgroundColor: "var(--t-accent)" }}>
          <TableHead className="text-white">Dessert (100g serving)</TableHead>
          <TableHead className="text-right text-white">Calories</TableHead>
          <TableHead className="text-right text-white">Fat&nbsp;(g)</TableHead>
          <TableHead className="text-right text-white">Carbs&nbsp;(g)</TableHead>
          <TableHead className="text-right text-white">Protein&nbsp;(g)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DESSERTS.map((d, idx) => (
          <TableRow
            key={d.name}
            style={{ backgroundColor: idx % 2 === 1 ? "var(--t-surface-2)" : undefined }}
          >
            <TableCell className="py-2.5">{d.name}</TableCell>
            <TableCell className="py-2.5 text-right">{d.calories}</TableCell>
            <TableCell className="py-2.5 text-right">{d.fat}</TableCell>
            <TableCell className="py-2.5 text-right">{d.carbs}</TableCell>
            <TableCell className="py-2.5 text-right">{d.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type SortKey = keyof Omit<Dessert, "history">;
type SortDir = "asc" | "desc";

function SortingSelectingTable() {
  const [sortKey, setSortKey] = useState<SortKey>("calories");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const sorted = useMemo(() => {
    const arr = [...SORTING_DESSERTS];
    arr.sort((a, b) => {
      const av = a[sortKey] as number | string;
      const bv = b[sortKey] as number | string;
      const cmp = typeof av === "number" ? (av - (bv as number)) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [sortKey, sortDir]);

  const start = page * pageSize;
  const visible = sorted.slice(start, start + pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  const headerClick = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const SortHead = ({ k, label, alignRight }: { k: SortKey; label: string; alignRight?: boolean }) => (
    <TableHead className={alignRight ? "text-right" : ""}>
      <button
        type="button"
        onClick={() => headerClick(k)}
        className={`inline-flex items-center gap-1 t-text-70 hover:t-text ${alignRight ? "ml-auto" : ""}`}
      >
        {label}
        {sortKey === k && (
          sortDir === "asc"
            ? <ArrowUp   className="w-3 h-3" />
            : <ArrowDown className="w-3 h-3" />
        )}
      </button>
    </TableHead>
  );

  const allChecked = visible.every((r) => selected.has(r.name));
  const someChecked = visible.some((r) => selected.has(r.name));

  const toggleAll = () => {
    const next = new Set(selected);
    if (allChecked) visible.forEach((r) => next.delete(r.name));
    else visible.forEach((r) => next.add(r.name));
    setSelected(next);
  };

  const toggleOne = (name: string) => {
    const next = new Set(selected);
    if (next.has(name)) next.delete(name); else next.add(name);
    setSelected(next);
  };

  return (
    <div>
      {selected.size > 0 && (
        <div
          className="px-5 py-2.5 text-sm"
          style={{ backgroundColor: "var(--t-accent-soft)", color: "var(--t-accent-text)" }}
        >
          {selected.size} selected
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allChecked ? true : someChecked ? "indeterminate" : false}
                onCheckedChange={toggleAll}
                aria-label="Select all rows on this page"
              />
            </TableHead>
            <SortHead k="name"     label="Dessert (100g serving)" />
            <SortHead k="calories" label="Calories"  alignRight />
            <SortHead k="fat"      label="Fat (g)"   alignRight />
            <SortHead k="carbs"    label="Carbs (g)" alignRight />
            <SortHead k="protein"  label="Protein (g)" alignRight />
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((d) => (
            <TableRow key={d.name} data-state={selected.has(d.name) ? "selected" : undefined}>
              <TableCell className="py-2.5">
                <Checkbox
                  checked={selected.has(d.name)}
                  onCheckedChange={() => toggleOne(d.name)}
                  aria-label={`Select ${d.name}`}
                />
              </TableCell>
              <TableCell className="py-2.5">{d.name}</TableCell>
              <TableCell className="py-2.5 text-right">{d.calories}</TableCell>
              <TableCell className="py-2.5 text-right">{d.fat}</TableCell>
              <TableCell className="py-2.5 text-right">{d.carbs}</TableCell>
              <TableCell className="py-2.5 text-right">{d.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        className="flex items-center justify-end gap-4 px-3 py-2"
        style={{ borderTop: "1px solid var(--t-border)" }}
      >
        <span className="t-text-50 text-xs">Rows per page: {pageSize}</span>
        <span className="t-text-60 text-xs">
          {start + 1}–{Math.min(start + pageSize, sorted.length)} of {sorted.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="t-text-60 t-hover px-2 py-1 rounded disabled:opacity-40"
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="t-text-60 t-hover px-2 py-1 rounded disabled:opacity-40"
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MuiTablePage() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <ExampleCard title="Basic Table">
        <div className="px-5 py-4">
          <BasicTable />
        </div>
      </ExampleCard>

      <ExampleCard title="Dense Table" description="More compact row spacing for data-heavy views.">
        <div className="px-5 py-4">
          <BasicTable dense />
        </div>
      </ExampleCard>

      <ExampleCard title="Sticky Header" description="Header sticks to the top of the scroll container.">
        <div className="px-5 py-4">
          <StickyHeaderTable />
        </div>
      </ExampleCard>

      <ExampleCard title="Collapsible Table" description="Expand rows to reveal nested order history.">
        <div className="px-5 py-4">
          <CollapsibleTable />
        </div>
      </ExampleCard>

      <ExampleCard title="Spanning Table" description="Cells span multiple columns and rows.">
        <div className="px-5 py-4">
          <SpanningTable />
        </div>
      </ExampleCard>

      <ExampleCard title="Customized Table" description="Branded header with zebra stripes.">
        <div className="px-5 py-4">
          <CustomizedTable />
        </div>
      </ExampleCard>

      <ExampleCard title="Sorting & Selecting" description="Sort by any column and select rows with bulk indicator.">
        <div className="px-5 py-4">
          <SortingSelectingTable />
        </div>
      </ExampleCard>

      <SourceFooter className="col-span-full">
        Layouts mirror common{" "}
        <a className="t-accent-text underline" href="https://mui.com/material-ui/react-table/" target="_blank" rel="noopener noreferrer">
          Material UI table
        </a>{" "}
        demos; markup uses this app&apos;s{" "}
        <code className="px-1 py-0.5 rounded t-surface-2 t-text-60 text-[11px]">Table</code> components (shadcn-style) and{" "}
        <a className="t-accent-text underline" href="https://www.radix-ui.com/primitives/docs/components/checkbox" target="_blank" rel="noopener noreferrer">
          Radix Checkbox
        </a>
        .
      </SourceFooter>
    </div>
  );
}
