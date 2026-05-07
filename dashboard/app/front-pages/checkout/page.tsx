"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag, MapPin, CreditCard, Check, ArrowLeft, ArrowRight, Plus, Minus, Trash2,
  Wallet, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Step = 0 | 1 | 2;

const STEPS = [
  { label: "Cart", icon: ShoppingBag },
  { label: "Address", icon: MapPin },
  { label: "Payment", icon: CreditCard },
] as const;

const initialItems = [
  { id: "p1", name: "Orbital Titanium Chrono", desc: "Watches & Jewelry · 42mm", price: 12450, qty: 1, color: "from-violet-500 to-purple-700", initials: "OT" },
  { id: "p2", name: "Heritage Weekender", desc: "Bags · Cognac Leather", price: 2190, qty: 1, color: "from-amber-500 to-orange-700", initials: "HW" },
  { id: "p3", name: "Silk Scarf · Kyoto", desc: "Apparel · Hand-bound silk", price: 890, qty: 2, color: "from-rose-500 to-pink-700", initials: "SK" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(0);
  const [items, setItems] = useState(initialItems);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.04);
  const shipping = subtotal > 5000 ? 0 : 25;
  const total = subtotal + tax + shipping;

  const updateQty = (id: string, delta: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
      {/* Stepper */}
      <ol className="flex items-center justify-center gap-3 sm:gap-6 mb-10">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const done = idx < step;
          const active = idx === step;
          return (
            <li key={s.label} className="flex items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors",
                  active && "border-violet-500 bg-violet-500/15 text-violet-300",
                  done && "border-emerald-500 bg-emerald-500/15 text-emerald-300",
                  !active && !done && "border-white/15 t-text-30",
                )}
              >
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-[0.18em] t-text-40">Step {idx + 1}</p>
                <p className={cn("text-sm font-semibold", active ? "t-text" : "t-text-50")}>{s.label}</p>
              </div>
              {idx < STEPS.length - 1 && (
                <span className="w-8 sm:w-16 h-px" style={{ backgroundColor: "var(--t-border-2)" }} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 panel p-6 lg:p-8 min-h-[420px]">
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">My shopping bag</h2>
                <span className="t-text-40 text-xs">{items.length} items</span>
              </div>
              {items.length === 0 ? (
                <div className="py-16 text-center t-text-40 text-sm">Your bag is empty.</div>
              ) : (
                <ul className="divide-y" style={{ borderColor: "var(--t-border)" }}>
                  {items.map((it) => (
                    <li key={it.id} className="py-5 flex gap-4 items-center">
                      <div className={cn("w-16 h-16 rounded-xl bg-gradient-to-br shrink-0 flex items-center justify-center text-white font-bold", it.color)}>
                        {it.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="t-text font-medium text-sm truncate">{it.name}</p>
                        <p className="t-text-40 text-xs mt-0.5">{it.desc}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, -1)}
                            className="w-7 h-7 rounded-lg border t-hover inline-flex items-center justify-center"
                            style={{ borderColor: "var(--t-border-2)" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, 1)}
                            className="w-7 h-7 rounded-lg border t-hover inline-flex items-center justify-center"
                            style={{ borderColor: "var(--t-border-2)" }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="t-text font-semibold">${(it.price * it.qty).toLocaleString()}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="t-text-30 hover:text-red-400 transition-colors text-xs inline-flex items-center gap-1 mt-2"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Add delivery address</h2>
                <p className="t-text-50 text-sm mt-1">We&apos;ll send tracking info to your email and phone.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "home", title: "Home", desc: "9 Mercer St, NY 10013", default: true },
                  { id: "office", title: "Office", desc: "1 Park Ave, NY 10016" },
                ].map((a) => (
                  <label
                    key={a.id}
                    className="rounded-xl border p-4 cursor-pointer t-hover flex items-start gap-3"
                    style={{ borderColor: "var(--t-border-2)" }}
                  >
                    <input type="radio" name="address" defaultChecked={a.default} className="accent-violet-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold t-text">{a.title}</p>
                      <p className="t-text-50 text-xs mt-0.5">{a.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name" placeholder="Jane Doe" />
                <Field label="Phone" placeholder="+1 415 555 0192" />
                <div className="sm:col-span-2"><Field label="Street address" placeholder="123 Mercer St, Apt 4B" /></div>
                <Field label="City" placeholder="New York" />
                <Field label="ZIP / Postal" placeholder="10013" mono />
                <Field label="State / Region" placeholder="NY" />
                <Field label="Country" placeholder="United States" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Payment</h2>
                <p className="t-text-50 text-sm mt-1">Choose how you&apos;d like to pay for this order.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard, caption: "Encrypted via Stripe" },
                  { id: "paypal", label: "PayPal", icon: Wallet, caption: "Pay with your PayPal account" },
                ].map((m, i) => (
                  <label
                    key={m.id}
                    className="rounded-xl border p-4 cursor-pointer t-hover flex items-start gap-3"
                    style={{ borderColor: "var(--t-border-2)" }}
                  >
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-violet-500 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold t-text inline-flex items-center gap-2">
                        <m.icon className="w-4 h-4 text-violet-300" />
                        {m.label}
                      </p>
                      <p className="t-text-50 text-xs mt-1">{m.caption}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-span-6"><Field label="Card number" placeholder="8763 2345 3478 0921" mono /></div>
                <div className="sm:col-span-3"><Field label="Card holder" placeholder="Jane Doe" /></div>
                <div className="sm:col-span-2"><Field label="EXP. date" placeholder="05/2026" mono /></div>
                <div className="sm:col-span-1"><Field label="CVV" placeholder="734" mono /></div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
              disabled={step === 0}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            {step < 2 ? (
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700"
                onClick={() => setStep((s) => ((s + 1) as Step))}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700">
                Place order <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Order summary */}
        <aside className="lg:col-span-4 panel p-6 lg:p-7 h-fit lg:sticky lg:top-20 space-y-4">
          <h3 className="font-bold t-text">Order summary</h3>
          <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 h-9 px-3 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
              />
              <Button size="sm">Apply</Button>
            </div>
            <p className="t-text-40 text-xs">Try <span className="font-mono text-violet-300">LUXE10</span> for 10% off.</p>
          </div>
          <ul className="text-sm space-y-2">
            <Row k="Subtotal" v={`$${subtotal.toLocaleString()}`} />
            <Row k="Tax (4%)" v={`$${tax.toLocaleString()}`} />
            <Row k="Shipping" v={shipping === 0 ? "Free" : `$${shipping}`} muted={shipping === 0} />
          </ul>
          <div className="h-px" style={{ backgroundColor: "var(--t-border)" }} />
          <div className="flex items-baseline justify-between">
            <span className="t-text-70 text-sm">Total</span>
            <span className="t-text font-bold text-lg">${total.toLocaleString()}</span>
          </div>
          <Badge variant="outline" className="gap-1 border-emerald-500/30 text-emerald-300 bg-emerald-500/10 text-[10px]">
            <ShieldCheck className="w-3 h-3" /> Insured · signature required at delivery
          </Badge>
          <p className="t-text-40 text-[11px] leading-relaxed pt-1">
            Need help? <Link href="/front-pages/help-center" className="text-violet-300 hover:underline">Visit the help center</Link> or contact concierge support.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <li className="flex justify-between">
      <span className="t-text-50">{k}</span>
      <span className={cn("font-medium", muted ? "text-emerald-300" : "t-text")}>{v}</span>
    </li>
  );
}

function Field({ label, placeholder, mono }: { label: string; placeholder?: string; mono?: boolean }) {
  return (
    <label className="space-y-1.5 block">
      <span className="t-text-50 text-xs font-medium">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full h-10 px-3 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
          mono && "font-mono tracking-wider",
        )}
        style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
      />
    </label>
  );
}
