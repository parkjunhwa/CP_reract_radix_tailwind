"use client";
import { useState } from "react";
import { Check, ChevronRight, Home, MapPin, DollarSign, Image } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const STEPS = [
  { id: 1, label: "Property Info", icon: Home },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Pricing", icon: DollarSign },
  { id: 4, label: "Media", icon: Image },
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

export default function PropertyListingPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="max-w-lg mx-auto panel p-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="t-text font-bold text-xl">Property Listed!</h2>
        <p className="t-text-40 text-sm">Your luxury property listing is live and pending review.</p>
        <button
          type="button"
          onClick={() => { setStep(1); setDone(false); }}
          className="h-10 px-6 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: "var(--t-accent)" }}
        >
          New Listing
        </button>
      </div>
    );

  return (
    <div className="space-y-3 pb-0">
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
                  <span className={cn("text-[10px] font-medium hidden sm:block", s.id === step ? "t-text-70" : "t-text-30")}>{s.label}</span>
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

      <Form.Root className="panel p-6 space-y-3" onSubmit={(e) => { e.preventDefault(); if (step < 4) setStep(step + 1); else setDone(true); }}>
        {step === 1 && (
          <>
            <h3 className="t-text font-semibold text-sm">Property Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Property Name", "Penthouse at One57"],
                ["Type", "Penthouse"],
                ["Bedrooms", "5"],
                ["Bathrooms", "6"],
                ["Size (sqft)", "8,500"],
                ["Year Built", "2014"],
              ].map(([l, p]) => <FieldRow key={l} label={l!} placeholder={p!} name={l!.toLowerCase().replace(/\W+/g, "_")} />)}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="t-text font-semibold text-sm">Location Details</h3>
            <div className="space-y-3">
              {[
                ["Address", "157 W 57th St"],
                ["City", "New York"],
                ["Country", "United States"],
                ["Zip Code", "10019"],
              ].map(([l, p]) => <FieldRow key={l} label={l!} placeholder={p!} name={l!.toLowerCase().replace(/\W+/g, "_")} />)}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h3 className="t-text font-semibold text-sm">Pricing & Availability</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Listing Price", "$48,000,000"],
                ["Price/sqft", "$5,647"],
                ["Available From", "2026-07-01"],
                ["Status", "Available"],
              ].map(([l, p]) => <FieldRow key={l} label={l!} placeholder={p!} name={l!.toLowerCase().replace(/\W+/g, "_")} />)}
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h3 className="t-text font-semibold text-sm">Media & Description</h3>
            <Form.Field name="description" className="space-y-1.5">
              <Form.Label asChild>
                <Label className="t-text-40 text-xs font-normal">Property Description</Label>
              </Form.Label>
              <Form.Control asChild>
                <Textarea
                  rows={4}
                  placeholder="Exceptional full-floor penthouse with panoramic views..."
                  className="text-xs t-text-70 resize-none"
                />
              </Form.Control>
            </Form.Field>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center transition-colors hover:border-[var(--t-accent)]"
              style={{ borderColor: "var(--t-border-2)" }}
            >
              <Image className="w-8 h-8 mx-auto mb-2 t-text-30" />
              <p className="t-text-40 text-xs">Drop property images here, or click to upload</p>
            </div>
          </>
        )}
        <div className="flex justify-between pt-2">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] disabled:opacity-30"
            style={{ borderColor: "var(--t-border-2)" }}
          >
            Previous
          </button>
          <Form.Submit asChild>
            <button
              className="h-9 px-4 rounded-lg text-white text-xs font-medium flex items-center gap-1.5"
              style={{ backgroundColor: "var(--t-accent)" }}
            >
              {step < 4 ? (<>Next <ChevronRight className="w-3.5 h-3.5" /></>) : "Submit Listing"}
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}
