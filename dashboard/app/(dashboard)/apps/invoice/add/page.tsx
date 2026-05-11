"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import * as Form from "@radix-ui/react-form";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date("2026-05-07"));
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date("2026-05-21"));
  const invoiceDateStr = useMemo(
    () => (invoiceDate ? invoiceDate.toISOString().slice(0, 10) : ""),
    [invoiceDate],
  );
  const dueDateStr = useMemo(
    () => (dueDate ? dueDate.toISOString().slice(0, 10) : ""),
    [dueDate],
  );

  return (
    <div className="space-y-3 pb-0">
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

        <Form.Root
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            // demo-only: no server submit
          }}
        >
          {/* Parties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="From">
              {[
                ["Company Name", "LUXE Commerce Inc."],
                ["Address", "1 Fifth Avenue, Suite 100"],
                ["City, Country", "New York, USA"],
                ["Email", "billing@luxe.com"],
              ].map(([label, val]) => (
                <FormField key={label} label={label} defaultValue={val} />
              ))}
            </Section>
            <Section title="Bill To">
              <FormField label="Client Name" />
              <FormField label="Address" />
              <FormField label="City, Country" />
              <FormField label="Email" type="email" />
            </Section>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <DateFormField label="Invoice Date" value={invoiceDate} onChange={setInvoiceDate} />
            <DateFormField label="Due Date" value={dueDate} onChange={setDueDate} />
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
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                  placeholder="Item description"
                  className="col-span-6 h-9 text-xs"
                  aria-label="Item description"
                />
                <Input
                  type="number"
                  value={item.qty}
                  min={1}
                  onChange={(e) => updateItem(i, "qty", Number(e.target.value))}
                  className="col-span-2 h-9 text-xs text-center"
                  aria-label="Quantity"
                />
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))}
                  className="col-span-2 h-9 text-xs text-right"
                  aria-label="Unit price"
                />
                <div className="col-span-1 text-right t-text font-semibold text-xs">{fmt(item.qty * item.unitPrice)}</div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  aria-label="Remove line item"
                  className="col-span-1 flex justify-center t-text-30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-xs t-text-40 hover:t-text-70 transition-colors mt-2"
            >
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
            <Label htmlFor="invoice-notes" className="t-text-40 text-xs font-medium">
              Notes
            </Label>
            <Textarea
              id="invoice-notes"
              rows={3}
              placeholder="Payment terms, thank you note…"
              className="resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="md">
              Save Draft
            </Button>
            <Button type="submit" size="md">
              Send Invoice
            </Button>
          </div>
        </Form.Root>

        {/* Hidden inputs to keep same submit shape (demo) */}
        <input type="hidden" name="invoice-date" value={invoiceDateStr} readOnly />
        <input type="hidden" name="due-date" value={dueDateStr} readOnly />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-text-40 text-xs font-semibold uppercase tracking-wide">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FormField({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: React.ComponentProps<typeof Input>["type"];
}) {
  const name = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Form.Field name={name} className="space-y-1.5">
      <Form.Label asChild>
        <Label className="t-text-40 text-xs font-medium">{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <Input defaultValue={defaultValue} type={type} className="h-9 text-xs" />
      </Form.Control>
    </Form.Field>
  );
}

function DateFormField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
}) {
  const name = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Form.Field name={name} className="space-y-1.5">
      <Form.Label asChild>
        <Label className="t-text-40 text-xs font-medium">{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <DatePicker value={value} onChange={onChange} placeholder="YYYY-MM-DD" />
      </Form.Control>
    </Form.Field>
  );
}
