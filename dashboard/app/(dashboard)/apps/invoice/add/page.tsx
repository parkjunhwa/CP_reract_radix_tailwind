"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface LineItem { description: string; qty: number; unitPrice: number }

export default function InvoiceAddPage() {
  const [items, setItems] = useState<LineItem[]>([
    { description: "Patek Philippe Nautilus 5711/1A", qty: 1, unitPrice: 142000 },
  ]);

  const addItem = () => setItems([...items, { description: "", qty: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string | number) =>
    setItems(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.unitPrice, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="space-y-4 pb-4 max-w-3xl">
      <div className="panel p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="t-text font-bold text-lg">New Invoice</h2>
            <p className="t-text-40 text-xs mt-0.5">Draft — not sent</p>
          </div>
          <div className="text-right">
            <p className="t-text-30 text-xs">Invoice #</p>
            <p className="t-text font-mono font-bold">INV-5001</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="t-text-40 text-xs font-semibold uppercase tracking-wide">From</p>
            <div className="space-y-2">
              {["Company Name", "Address", "City, Country", "Email"].map((ph) => (
                <input key={ph} placeholder={ph}
                  className="w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 transition-colors focus:border-[var(--t-accent)]"
                  style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}
                  defaultValue={ph === "Company Name" ? "LUXE Commerce Inc." : ph === "Address" ? "1 Fifth Avenue, Suite 100" : ph === "City, Country" ? "New York, USA" : ph === "Email" ? "billing@luxe.com" : ""} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="t-text-40 text-xs font-semibold uppercase tracking-wide">Bill To</p>
            <div className="space-y-2">
              {["Client Name", "Address", "City, Country", "Email"].map((ph) => (
                <input key={ph} placeholder={ph}
                  className="w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 transition-colors focus:border-[var(--t-accent)]"
                  style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          {[["Invoice Date", "2026-05-07"], ["Due Date", "2026-05-21"]].map(([label, val]) => (
            <div key={label} className="space-y-1.5">
              <label className="t-text-40 text-xs font-medium">{label}</label>
              <input type="date" defaultValue={val}
                className="w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 transition-colors focus:border-[var(--t-accent)]"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
            </div>
          ))}
        </div>

        {/* Line items */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-medium t-text-30 uppercase tracking-wide px-1">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input value={item.description} onChange={e => updateItem(i, "description", e.target.value)} placeholder="Item description"
                className="col-span-6 h-9 px-3 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 focus:border-[var(--t-accent)]"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
              <input type="number" value={item.qty} min={1} onChange={e => updateItem(i, "qty", Number(e.target.value))}
                className="col-span-2 h-9 px-3 rounded-lg border text-xs outline-none text-center t-text-70 focus:border-[var(--t-accent)]"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
              <input type="number" value={item.unitPrice} onChange={e => updateItem(i, "unitPrice", Number(e.target.value))}
                className="col-span-2 h-9 px-3 rounded-lg border text-xs outline-none text-right t-text-70 focus:border-[var(--t-accent)]"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
              <div className="col-span-1 text-right t-text font-semibold text-xs">{fmt(item.qty * item.unitPrice)}</div>
              <button onClick={() => removeItem(i)} className="col-span-1 flex justify-center t-text-30 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-1.5 text-xs t-text-40 hover:t-text-70 transition-colors mt-2">
            <Plus className="w-3.5 h-3.5" /> Add line item
          </button>
        </div>

        {/* Totals */}
        <div className="border-t pt-4 ml-auto w-64 space-y-2" style={{ borderColor: "var(--t-border)" }}>
          {[["Subtotal", subtotal], ["Tax (8%)", tax]].map(([label, val]) => (
            <div key={label as string} className="flex justify-between text-xs">
              <span className="t-text-40">{label}</span>
              <span className="t-text-60">{fmt(val as number)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold pt-2 border-t" style={{ borderColor: "var(--t-border)" }}>
            <span className="t-text">Total</span>
            <span className="t-text">{fmt(total)}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="t-text-40 text-xs font-medium">Notes</label>
          <textarea rows={3} placeholder="Payment terms, thank you note…"
            className="w-full px-3 py-2 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 resize-none focus:border-[var(--t-accent)]"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}>
            Save Draft
          </button>
          <button className="h-9 px-4 rounded-lg text-white text-xs font-medium transition-colors hover:opacity-90" style={{ backgroundColor: "var(--t-accent)" }}>
            Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
