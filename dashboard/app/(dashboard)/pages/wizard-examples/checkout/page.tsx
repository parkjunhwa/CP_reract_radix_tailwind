"use client";

import { useState } from "react";
import { Check, ChevronRight, ShoppingCart, CreditCard, Package } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const STEPS = [
  { id: 1, label: "Cart",     icon: ShoppingCart },
  { id: 2, label: "Address",  icon: Package },
  { id: 3, label: "Payment",  icon: CreditCard },
  { id: 4, label: "Confirm",  icon: Check },
];

const CART_ITEMS = [
  { name: "Patek Philippe Nautilus 5711", price: 142000, qty: 1 },
  { name: "Van Cleef Alhambra Necklace",  price: 12500,  qty: 2 },
];

const PAYMENT_OPTIONS = [
  { id: "wire", label: "Wire Transfer", desc: "Standard for high-value orders" },
  { id: "ach",  label: "Bank Transfer", desc: "ACH/SWIFT international" },
];

function FieldRow({ label, placeholder, name }: { label: string; placeholder: string; name: string }) {
  return (
    <Form.Field name={name} className="space-y-1.5">
      <Form.Label asChild>
        <Label className="t-text-40 text-xs font-normal">{label}</Label>
      </Form.Label>
      <Form.Control asChild>
        <Input placeholder={placeholder} className="h-9 text-xs t-text-70" />
      </Form.Control>
    </Form.Field>
  );
}

export default function CheckoutWizardPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wire");

  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  if (done)
    return (
      <div className="max-w-lg mx-auto panel p-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="t-text font-bold text-xl">Order Placed!</h2>
        <p className="t-text-40 text-sm">Order #ORD-8001 has been placed. Authentication begins within 24 hours.</p>
        <button
          type="button"
          onClick={() => { setStep(1); setDone(false); }}
          className="h-10 px-6 rounded-lg text-white text-sm font-medium mt-2"
          style={{ backgroundColor: "var(--t-accent)" }}
        >
          Start New Order
        </button>
      </div>
    );

  return (
    <div className="space-y-3 pb-0">
      {/* Step indicators */}
      <div className="panel p-5">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors",
                    s.id < step ? "bg-emerald-500 border-emerald-500" :
                    s.id === step ? "border-[var(--t-accent)] bg-[var(--luxe-accent-2)]" :
                    "border-[var(--t-border-2)]",
                  )}>
                    {s.id < step ? <Check className="w-4 h-4 text-white" /> : <Icon className={cn("w-4 h-4", s.id === step ? "text-[var(--t-accent-text)]" : "t-text-30")} />}
                  </div>
                  <span className={cn("text-[10px] font-medium", s.id === step ? "t-text-70" : "t-text-30")}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 mx-2 h-px mt-[-18px]"
                    style={{ backgroundColor: step > s.id ? "var(--t-accent)" : "var(--t-border)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Step content */}
        <Form.Root
          className="xl:col-span-2 panel p-6 space-y-3"
          onSubmit={(e) => { e.preventDefault(); if (step < 4) setStep(step + 1); else setDone(true); }}
        >
          {step === 1 && (
            <>
              <h3 className="t-text font-semibold text-sm">Your Cart</h3>
              <div className="space-y-3">
                {CART_ITEMS.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--t-hover)" }}>
                    <div>
                      <p className="t-text-70 text-xs font-medium">{item.name}</p>
                      <p className="t-text-30 text-[10px] mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <span className="t-text font-semibold text-sm">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="t-text font-semibold text-sm">Delivery Address</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["First Name", "James"],
                  ["Last Name", "Worthington"],
                  ["Address", "1 Fifth Avenue, Suite 100"],
                  ["City", "New York"],
                  ["Country", "United States"],
                  ["ZIP", "10001"],
                ].map(([label, ph]) => (
                  <FieldRow key={label} label={label!} placeholder={ph!} name={label!.toLowerCase().replace(/\W+/g, "_")} />
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h3 className="t-text font-semibold text-sm">Payment Method</h3>
              <Form.Field name="paymentMethod" className="space-y-3">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const active = paymentMethod === opt.id;
                    return (
                      <Label
                        key={opt.id}
                        htmlFor={`pm-${opt.id}`}
                        className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors font-normal"
                        style={{
                          borderColor: active ? "var(--t-accent)" : "var(--t-border-2)",
                          backgroundColor: active ? "var(--luxe-accent-2)" : "transparent",
                        }}
                      >
                        <RadioGroupItem id={`pm-${opt.id}`} value={opt.id} className="mt-0.5" />
                        <div>
                          <p className="t-text-70 text-xs font-semibold">{opt.label}</p>
                          <p className="t-text-40 text-[10px] mt-0.5">{opt.desc}</p>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </Form.Field>
              <div className="space-y-3 mt-4">
                <FieldRow label="Bank / Institution" placeholder="JPMorgan Chase" name="bank" />
                <div className="grid grid-cols-2 gap-3">
                  <FieldRow label="Account Number" placeholder="••••••••7823" name="account" />
                  <FieldRow label="Routing" placeholder="021000021" name="routing" />
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h3 className="t-text font-semibold text-sm">Order Confirmation</h3>
              <div className="space-y-3 text-xs">
                {[
                  ["Delivery to", "James Worthington, 1 Fifth Ave, New York"],
                  ["Payment", "Wire Transfer — JPMorgan"],
                  ["Auth. time", "24–48 business hours"],
                  ["Shipping", "Armored vehicle — insured"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor: "var(--t-border)" }}>
                    <span className="t-text-30">{k}</span><span className="t-text-60 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between pt-2">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(s => s - 1)}
              className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] disabled:opacity-30 transition-colors"
              style={{ borderColor: "var(--t-border-2)" }}
            >
              Previous
            </button>
            <Form.Submit asChild>
              <button
                className="h-9 px-4 rounded-lg text-white text-xs font-medium flex items-center gap-1.5"
                style={{ backgroundColor: "var(--t-accent)" }}
              >
                {step < 4 ? (<>Next <ChevronRight className="w-3.5 h-3.5" /></>) : "Place Order"}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>

        {/* Order summary */}
        <div className="panel p-5 space-y-3 h-fit">
          <h3 className="t-text font-semibold text-sm">Order Summary</h3>
          {CART_ITEMS.map(i => (
            <div key={i.name} className="flex justify-between text-xs">
              <span className="t-text-50 truncate max-w-[70%]">{i.name} ×{i.qty}</span>
              <span className="t-text-60 font-medium">{fmt(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="pt-2 space-y-1.5 border-t" style={{ borderColor: "var(--t-border)" }}>
            {[["Subtotal", subtotal], ["Tax (8%)", tax]].map(([l, v]) => (
              <div key={l as string} className="flex justify-between text-xs">
                <span className="t-text-30">{l}</span><span className="t-text-50">{fmt(v as number)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold pt-2 border-t" style={{ borderColor: "var(--t-border)" }}>
              <span className="t-text">Total</span><span className="t-text">{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
