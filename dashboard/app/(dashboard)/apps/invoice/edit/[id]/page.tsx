"use client";

import { useMemo, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Trash2, Send, DollarSign, Eye, ArrowLeft } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getInvoiceById, INVOICE_LINE_ITEMS, STATUS_STYLES, fmtMoney,
} from "@/lib/invoices";

interface LineItem { description: string; details?: string; qty: number; unitPrice: number }

const PAYMENT_METHODS = ["Internet Banking", "Debit Card", "Credit Card", "Paypal", "UPI Transfer"] as const;

export default function InvoiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const invoice = getInvoiceById(id);
  if (!invoice) notFound();

  const status = STATUS_STYLES[invoice.invoiceStatus];

  const [items, setItems] = useState<LineItem[]>(
    INVOICE_LINE_ITEMS.map((line) => ({
      description: line.item,
      details: line.description,
      qty: line.qty,
      unitPrice: line.total,
    })),
  );
  const [paymentMethod, setPaymentMethod] = useState<typeof PAYMENT_METHODS[number]>("Internet Banking");
  const [paymentTerms, setPaymentTerms] = useState(true);
  const [clientNotes, setClientNotes] = useState(false);
  const [paymentStub, setPaymentStub] = useState(false);
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

  const addItem = () =>
    setItems([...items, { description: "", details: "", qty: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string | number) =>
    setItems(items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.unitPrice, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + tax;

  return (
    <div className="space-y-3 pb-0">
      <div className="flex items-center justify-between gap-2">
        <Link href="/apps/invoice/list">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to list
          </Button>
        </Link>
        <Badge variant="outline" className={cn("gap-1 text-[10px]", status.cls)}>
          <span className={cn("inline-block w-1.5 h-1.5 rounded-full", status.dot)} />
          {invoice.invoiceStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        {/* Editable invoice */}
        <div className="panel p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="t-text font-bold text-lg">Edit invoice</h2>
              <p className="t-text-40 text-xs mt-0.5">Update billing details before resending.</p>
            </div>
            <div className="text-right">
              <p className="t-text-30 text-xs">Invoice #</p>
              <p className="t-text font-mono font-bold">INV-{invoice.id}</p>
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
                <FormField label="Client Name" defaultValue={invoice.name} />
                <FormField label="Company" defaultValue={invoice.company} />
                <FormField label="Address" defaultValue={invoice.address} />
                <FormField label="Country" defaultValue={invoice.country} />
                <FormField label="Email" defaultValue={invoice.companyEmail} type="email" />
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
                <div className="col-span-6">Item & details</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-6 space-y-1.5">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(i, "description", e.target.value)}
                      placeholder="Item description"
                      className="h-9 text-xs"
                    />
                    <Input
                      value={item.details ?? ""}
                      onChange={(e) => updateItem(i, "details", e.target.value)}
                      placeholder="Details (optional)"
                      className="h-8 text-[11px]"
                    />
                  </div>
                  <Input
                    type="number"
                    aria-label="Quantity"
                    value={item.qty}
                    min={1}
                    onChange={(e) => updateItem(i, "qty", Number(e.target.value))}
                    className="col-span-2 h-9 text-xs text-center"
                  />
                  <Input
                    type="number"
                    aria-label="Unit price"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))}
                    className="col-span-2 h-9 text-xs text-right"
                  />
                  <div className="col-span-1 h-9 flex items-center justify-end t-text font-semibold text-xs">
                    {fmtMoney(item.qty * item.unitPrice)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    aria-label="Remove line item"
                    className="col-span-1 h-9 flex items-center justify-center t-text-30 hover:text-red-400 transition-colors"
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
              {[
                ["Subtotal", subtotal],
                ["Tax (8%)", tax],
              ].map(([label, val]) => (
                <div key={label as string} className="flex justify-between text-xs">
                  <span className="t-text-40">{label}</span>
                  <span className="t-text-60">{fmtMoney(val as number)}</span>
                </div>
              ))}
              <div
                className="flex justify-between text-sm font-bold pt-2 border-t"
                style={{ borderColor: "var(--t-border)" }}
              >
                <span className="t-text">Total</span>
                <span className="t-text">{fmtMoney(total)}</span>
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
                defaultValue="It was a pleasure working with you and your team. Thank you!"
                className="resize-none"
              />
            </div>
          </Form.Root>

          {/* Hidden inputs to keep same submit shape (demo) */}
          <input type="hidden" name="invoice-date" value={invoiceDateStr} readOnly />
          <input type="hidden" name="due-date" value={dueDateStr} readOnly />
        </div>

        {/* Side actions */}
        <div className="space-y-3">
          <div className="panel p-4 space-y-3">
            <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
              <Send className="w-3.5 h-3.5" /> Send Invoice
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/apps/invoice/preview/${invoice.id}`}>
                <Button variant="outline" className="w-full">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </Button>
              </Link>
              <Button variant="outline">Save</Button>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700">
              <DollarSign className="w-3.5 h-3.5" /> Add Payment
            </Button>
          </div>

          <div className="panel p-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="invoice-payment-method" className="t-text-40 text-xs font-medium">
                Accept payments via
              </Label>
              <Select
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as typeof PAYMENT_METHODS[number])}
              >
                <SelectTrigger id="invoice-payment-method" className="w-full h-9 text-xs">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SwitchRow label="Payment Terms" checked={paymentTerms} onCheckedChange={setPaymentTerms} />
            <SwitchRow label="Client Notes" checked={clientNotes} onCheckedChange={setClientNotes} />
            <SwitchRow label="Payment Stub" checked={paymentStub} onCheckedChange={setPaymentStub} />
          </div>
        </div>
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

function SwitchRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  const id = `invoice-switch-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="t-text-60 text-xs cursor-pointer">
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
