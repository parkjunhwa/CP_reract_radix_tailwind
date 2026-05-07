"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Send, Download, Printer, Pencil, DollarSign, ArrowLeft } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getInvoiceById, INVOICE_LINE_ITEMS, STATUS_STYLES, fmtMoney,
} from "@/lib/invoices";

const TAX_RATE = 0.21;
const DISCOUNT = 28;

export default function InvoicePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const invoice = getInvoiceById(id);
  if (!invoice) notFound();

  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false);

  const subtotal = INVOICE_LINE_ITEMS.reduce((s, l) => s + l.total, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = subtotal - DISCOUNT + tax;

  const status = STATUS_STYLES[invoice.invoiceStatus];

  return (
    <div className="space-y-3 pb-0">
      <div className="flex items-center gap-2">
        <Link href="/apps/invoice/list">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to list
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4 print:grid-cols-1">
        {/* Invoice document */}
        <div className="panel p-6 sm:p-10 print:shadow-none print:border-0">
          {/* Header band */}
          <div className="rounded-xl px-6 py-5 mb-8" style={{ backgroundColor: "var(--t-hover)" }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-violet-600 flex items-center justify-center text-white text-xs font-black">L</div>
                  <span className="t-text font-bold text-base">LUXE Commerce</span>
                </div>
                <div className="text-xs t-text-60 leading-relaxed">
                  <p>Office 149, 450 South Brand Brooklyn</p>
                  <p>San Diego County, CA 91905, USA</p>
                  <p>+1 (123) 456 7891 · +44 (876) 543 2198</p>
                </div>
              </div>
              <div className="space-y-3 sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <h2 className="t-text font-bold text-xl">Invoice #{invoice.id}</h2>
                  <Badge variant="outline" className={cn("gap-1 text-[10px]", status.cls)}>
                    <span className={cn("inline-block w-1.5 h-1.5 rounded-full", status.dot)} />
                    {invoice.invoiceStatus}
                  </Badge>
                </div>
                <div className="text-xs t-text-60 space-y-1">
                  <p>Date Issued: <span className="t-text-70 font-medium">{invoice.issuedDate}</span></p>
                  <p>Date Due: <span className="t-text-70 font-medium">{invoice.dueDate}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <p className="t-text-40 text-[11px] font-semibold uppercase tracking-wide">Invoice To</p>
              <div className="text-sm t-text-70 space-y-0.5">
                <p className="t-text font-semibold">{invoice.name}</p>
                <p>{invoice.company}</p>
                <p className="t-text-60 text-xs">{invoice.address}</p>
                <p className="t-text-60 text-xs">{invoice.contact}</p>
                <p className="t-text-60 text-xs">{invoice.companyEmail}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="t-text-40 text-[11px] font-semibold uppercase tracking-wide">Bill To</p>
              <div className="text-xs t-text-70 space-y-1.5">
                {[
                  ["Total Due", fmtMoney(total)],
                  ["Bank name", "American Bank"],
                  ["Country", "United States"],
                  ["IBAN", "ETD95476213874685"],
                  ["SWIFT code", "BR91905"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start gap-3">
                    <span className="min-w-[88px] t-text-40">{k}:</span>
                    <span className="t-text-70 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--t-border)" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--t-hover)" }}>
                <tr>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider t-text-50 px-4 py-3">Item</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wider t-text-50 px-4 py-3">Description</th>
                  <th className="text-right text-[11px] font-semibold uppercase tracking-wider t-text-50 px-4 py-3 w-20">Hours</th>
                  <th className="text-right text-[11px] font-semibold uppercase tracking-wider t-text-50 px-4 py-3 w-16">Qty</th>
                  <th className="text-right text-[11px] font-semibold uppercase tracking-wider t-text-50 px-4 py-3 w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {INVOICE_LINE_ITEMS.map((line) => (
                  <tr key={line.item} style={{ borderTop: "1px solid var(--t-border)" }}>
                    <td className="px-4 py-3 t-text-70 text-xs font-medium">{line.item}</td>
                    <td className="px-4 py-3 t-text-50 text-xs">{line.description}</td>
                    <td className="px-4 py-3 text-right t-text-60 text-xs">{line.hours}</td>
                    <td className="px-4 py-3 text-right t-text-60 text-xs">{line.qty}</td>
                    <td className="px-4 py-3 text-right t-text-70 text-xs font-semibold">${line.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals + signed by */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2 text-xs t-text-60">
              <p>
                <span className="font-semibold t-text-70">Salesperson: </span>
                <span>Tommy Shelby</span>
              </p>
              <p>Thanks for your business.</p>
            </div>
            <div className="ml-auto w-full max-w-[260px] space-y-2">
              {[
                ["Subtotal:", fmtMoney(subtotal)],
                ["Discount:", `−${fmtMoney(DISCOUNT)}`],
                ["Tax:", `${(TAX_RATE * 100).toFixed(0)}%`],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="t-text-40">{label}</span>
                  <span className="t-text-70 font-medium">{val}</span>
                </div>
              ))}
              <div
                className="flex items-center justify-between text-sm font-bold pt-3 border-t"
                style={{ borderColor: "var(--t-border)" }}
              >
                <span className="t-text">Total:</span>
                <span className="t-text">{fmtMoney(total)}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--t-border)" }}>
            <p className="text-xs t-text-60">
              <span className="font-semibold t-text-70">Note: </span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future projects. Thank You!
            </p>
          </div>
        </div>

        {/* Side actions */}
        <div className="space-y-3 print:hidden">
          <div className="panel p-4 space-y-3">
            <Button
              className="w-full bg-violet-600 hover:bg-violet-700 text-white border-violet-700"
              onClick={() => setSendDrawerOpen(true)}
            >
              <Send className="w-3.5 h-3.5" /> Send Invoice
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-3.5 h-3.5" /> Download
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-3.5 h-3.5" /> Print
              </Button>
              <Link href={`/apps/invoice/edit/${invoice.id}`}>
                <Button variant="outline" className="w-full">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Button>
              </Link>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
              onClick={() => setPaymentDrawerOpen(true)}
            >
              <DollarSign className="w-3.5 h-3.5" /> Add Payment
            </Button>
          </div>

          <div className="panel p-4 space-y-3">
            <p className="t-text-40 text-[11px] font-semibold uppercase tracking-wide">Quick info</p>
            <dl className="text-xs space-y-2">
              <div className="flex justify-between">
                <dt className="t-text-40">Service</dt>
                <dd className="t-text-70 text-right max-w-[160px] truncate">{invoice.service}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="t-text-40">Country</dt>
                <dd className="t-text-70">{invoice.country}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="t-text-40">Total</dt>
                <dd className="t-text-70 font-semibold">{fmtMoney(invoice.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="t-text-40">Balance</dt>
                <dd className={cn("font-semibold", invoice.balance > 0 ? "text-amber-300" : invoice.balance < 0 ? "text-emerald-300" : "t-text-70")}>
                  {invoice.balance === 0 ? "Paid" : fmtMoney(invoice.balance)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Lightweight drawers (modals) */}
      {sendDrawerOpen && (
        <SimpleDrawer title="Send invoice" onClose={() => setSendDrawerOpen(false)}>
          <DrawerField label="From" defaultValue="billing@luxe.com" />
          <DrawerField label="To" defaultValue={invoice.companyEmail} />
          <DrawerField label="Subject" defaultValue={`Invoice of ${fmtMoney(total)} from LUXE Commerce`} />
          <DrawerTextarea label="Message" rows={5} defaultValue={`Dear ${invoice.name},\n\nThank you for your business — please find your invoice attached.\n\nLUXE Commerce`} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSendDrawerOpen(false)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700" onClick={() => setSendDrawerOpen(false)}>
              <Send className="w-3.5 h-3.5" /> Send
            </Button>
          </div>
        </SimpleDrawer>
      )}
      {paymentDrawerOpen && (
        <SimpleDrawer title="Add payment" onClose={() => setPaymentDrawerOpen(false)}>
          <DrawerField label="Invoice balance" defaultValue={fmtMoney(invoice.balance || total)} />
          <DrawerField label="Payment amount" defaultValue={fmtMoney(invoice.balance || total)} />
          <DrawerField label="Payment date" type="date" defaultValue="2026-05-07" />
          <DrawerField label="Payment method" defaultValue="Internet Banking" />
          <DrawerTextarea label="Internal notes" rows={3} placeholder="Optional internal notes…" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPaymentDrawerOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700" onClick={() => setPaymentDrawerOpen(false)}>
              Save
            </Button>
          </div>
        </SimpleDrawer>
      )}
    </div>
  );
}

function SimpleDrawer({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-full max-w-md h-full overflow-y-auto p-6 space-y-3 shadow-2xl"
        style={{ backgroundColor: "var(--t-bg)", borderLeft: "1px solid var(--t-border)" }}>
        <div className="flex items-center justify-between">
          <h3 className="t-text font-bold text-base">{title}</h3>
          <button onClick={onClose} className="t-text-40 hover:t-text-70 text-xs">Close</button>
        </div>
        <Form.Root className="space-y-3">
          {children}
        </Form.Root>
      </div>
    </div>
  );
}

function DrawerField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  // Avoid collision between native <input size={number}> and our <Input size="sm|lg|..."> prop.
  const { className, name, size: _nativeSize, ...rest } = props;
  return (
    <Form.Field name={name ?? label} className="space-y-1.5">
      <Form.Label className="t-text-40 text-xs font-medium">{label}</Form.Label>
      <Form.Control asChild>
        <Input
          {...rest}
          className={cn(
            "h-9 text-xs t-text-70 placeholder:t-text-30",
            className,
          )}
        />
      </Form.Control>
    </Form.Field>
  );
}

function DrawerTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Form.Field name={props.name ?? label} className="space-y-1.5">
      <Form.Label className="t-text-40 text-xs font-medium">{label}</Form.Label>
      <Form.Control asChild>
        <Textarea
          {...props}
          className={cn(
            "text-xs t-text-70 placeholder:t-text-30 resize-none",
            props.className,
          )}
        />
      </Form.Control>
    </Form.Field>
  );
}
