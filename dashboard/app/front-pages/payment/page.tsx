"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Wallet, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COUNTRIES = ["United States", "United Kingdom", "United Arab Emirates", "India", "Canada", "Brazil", "Australia"];
type Method = "card" | "paypal";

export default function PaymentPage() {
  const [method, setMethod] = useState<Method>("card");

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT — main form */}
        <Form.Root className="lg:col-span-7 panel p-6 lg:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] t-text-40">Step 1 of 1</p>
            <h1 className="text-2xl font-bold mt-1">Checkout</h1>
            <p className="t-text-50 text-sm mt-2 max-w-md">
              All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your needs.
            </p>
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <h2 className="text-sm font-semibold t-text mb-3">Select payment method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { id: "card", label: "Credit / Debit Card", caption: "Visa, MasterCard, Amex", icon: CreditCard },
                { id: "paypal", label: "PayPal", caption: "Pay with your PayPal account", icon: Wallet },
              ] as const).map(({ id, label, caption, icon: Icon }) => {
                const active = method === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMethod(id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors flex items-start gap-3",
                      active
                        ? "border-violet-500/60 bg-violet-500/[0.06] ring-1 ring-violet-500/30"
                        : "t-hover",
                    )}
                    style={{ borderColor: active ? undefined : "var(--t-border-2)" }}
                  >
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                      active ? "bg-violet-500/15 text-violet-300" : "bg-white/5 t-text-40")}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium t-text">{label}</p>
                      <p className="t-text-40 text-xs mt-0.5">{caption}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 w-4 h-4 rounded-full border-2 shrink-0",
                        active ? "border-violet-500 bg-violet-500" : "border-white/20",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* BILLING DETAILS */}
          <div>
            <h2 className="text-sm font-semibold t-text mb-4">Billing details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field name="email" label="Email address" type="email" placeholder="jane.doe@brand.com" />
              <Field name="password" label="Password" type="password" placeholder="Password" />
              <Form.Field name="billingCountry" className="space-y-1.5">
                <Form.Label asChild>
                  <Label className="t-text-50 text-xs font-medium">Billing country</Label>
                </Form.Label>
                <Select defaultValue="United States">
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Form.Field>
              <Field name="billingZip" label="Billing zip / postal code" type="text" placeholder="10001" />
            </div>
          </div>

          {/* CARD INFO */}
          {method === "card" && (
            <div>
              <h2 className="text-sm font-semibold t-text mb-4">Credit card info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-span-6">
                  <Field name="cardNumber" label="Card number" type="text" placeholder="8763 2345 3478 0921" mono />
                </div>
                <div className="sm:col-span-3">
                  <Field name="cardHolder" label="Card holder" type="text" placeholder="Jane Doe" />
                </div>
                <div className="sm:col-span-2">
                  <Field name="expDate" label="EXP. date" type="text" placeholder="05/2026" mono />
                </div>
                <div className="sm:col-span-1">
                  <Field name="cvv" label="CVV" type="text" placeholder="734" mono />
                </div>
              </div>
              <p className="t-text-40 text-xs mt-4 inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Encrypted, PCI-DSS compliant transmission.
              </p>
            </div>
          )}
        </Form.Root>

        {/* RIGHT — order summary */}
        <aside className="lg:col-span-5 panel p-6 lg:p-8 flex flex-col gap-6 h-fit lg:sticky lg:top-20">
          <div>
            <h2 className="text-lg font-bold t-text">Order summary</h2>
            <p className="t-text-50 text-sm mt-1">
              It can help you manage and service orders before, during and after fulfillment.
            </p>
          </div>

          <div className="rounded-xl border p-5" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)" }}>
            <p className="text-sm t-text-60">Pro · A simple start for everyone</p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">$59.99</span>
              <span className="t-text-40 text-sm">/month</span>
            </div>
            <Link href="/front-pages/pricing" className="mt-4 inline-block">
              <Button size="sm" variant="outline">Change plan</Button>
            </Link>
          </div>

          <div className="space-y-2 text-sm">
            {[
              ["Subscription", "$85.99"],
              ["Tax", "$4.99"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="t-text-50">{k}</span>
                <span className="t-text font-medium">{v}</span>
              </div>
            ))}
            <div className="my-3 h-px" style={{ backgroundColor: "var(--t-border)" }} />
            <div className="flex justify-between">
              <span className="t-text-70">Total</span>
              <span className="t-text font-bold text-base">$90.98</span>
            </div>
          </div>

          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700">
            Proceed with payment
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Badge variant="outline" className="self-start gap-1 text-[10px] border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
            <ShieldCheck className="w-3 h-3" /> 14-day money-back guarantee
          </Badge>

          <p className="t-text-40 text-xs leading-relaxed">
            By continuing, you accept our Terms of Service and Privacy Policy. Please note that payments are non-refundable after 14 days.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({ name, label, type, placeholder, mono }: { name: string; label: string; type: string; placeholder?: string; mono?: boolean }) {
  return (
    <Form.Field name={name} className="space-y-1.5 block">
      <Form.Label asChild>
        <Label className="t-text-50 text-xs font-medium">{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <Input type={type} placeholder={placeholder} className={cn("h-10 text-sm", mono && "font-mono tracking-wider")} />
      </Form.Control>
    </Form.Field>
  );
}
