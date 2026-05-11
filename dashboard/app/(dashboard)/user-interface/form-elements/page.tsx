"use client";

import { useState } from "react";
import {
  User, Mail, Lock, Eye, EyeOff, Search,
} from "lucide-react";

import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel flex h-full min-h-0 flex-col", className)}>
      <header className="shrink-0 border-b t-border px-5 py-3.5">
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        {description && <p className="t-text-40 text-xs mt-0.5">{description}</p>}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
    </section>
  );
}

function SpecRow({
  label,
  token,
  children,
}: {
  label: string;
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-3 border-b t-border last:border-b-0">
      <div className="space-y-0.5">
        <p className="t-text text-xs font-medium">{label}</p>
        <code className="t-text-30 block font-mono text-[10px] leading-snug break-all">{token}</code>
      </div>
      <div className="min-w-0 w-full">{children}</div>
    </div>
  );
}

/** SM · MD (default) · LG, disabled, read-only, and grouped inputs — quick reference. */
function InputSizesAndStatesDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
      <div className="min-w-0 flex flex-col gap-3">
        <p className="t-text-50 text-xs font-semibold uppercase tracking-wide">Standalone · size</p>
        <div className="rounded-xl border t-border px-4 flex-1 min-h-0">
          <SpecRow label="SM" token='size="sm" · h-8'>
            <Input id="fe-sz-sm" size="sm" placeholder="Small input" />
          </SpecRow>
          <SpecRow label="MD" token='size="default" (md) · h-9'>
            <Input id="fe-sz-md" size="default" placeholder="Medium — default height" />
          </SpecRow>
          <SpecRow label="LG" token='size="lg" · h-10 text-sm'>
            <Input id="fe-sz-lg" size="lg" placeholder="Large input" />
          </SpecRow>
        </div>
      </div>

      <div className="min-w-0 flex flex-col gap-3">
        <p className="t-text-50 text-xs font-semibold uppercase tracking-wide">Standalone · state</p>
        <div className="rounded-xl border t-border px-4 flex-1 min-h-0">
          <SpecRow label="Default" token="—">
            <Input id="fe-st-def" placeholder="Editable value" defaultValue="" />
          </SpecRow>
          <SpecRow label="Disabled" token="disabled">
            <Input id="fe-st-dis" disabled placeholder="Unavailable" defaultValue="Cannot focus" />
          </SpecRow>
          <SpecRow label="Read-only" token="readOnly">
            <Input
              id="fe-st-ro"
              readOnly
              defaultValue="Generated id: INV-2026-042"
              className="cursor-default"
            />
          </SpecRow>
          <SpecRow label="Invalid" token="invalid (validation error)">
            <Input id="fe-st-inv" invalid defaultValue="bad@value" aria-invalid />
          </SpecRow>
          <SpecRow label="Valid" token="valid (success state)">
            <Input id="fe-st-val" valid defaultValue="ok@company.com" />
          </SpecRow>
        </div>
      </div>

      <div className="min-w-0 flex flex-col gap-3">
        <p className="t-text-50 text-xs font-semibold uppercase tracking-wide">InputGroup · size</p>
        <div className="rounded-xl border t-border px-4 flex-1 min-h-0">
          <SpecRow label="SM group" token='InputGroup inputSize="sm"'>
            <InputGroup inputSize="sm">
              <InputAddon><Search className="shrink-0" /></InputAddon>
              <Input id="fe-gr-sm" size="sm" placeholder="Search…" />
            </InputGroup>
          </SpecRow>
          <SpecRow label="MD group" token='InputGroup inputSize="default"'>
            <InputGroup inputSize="default">
              <InputAddon><Search className="shrink-0" /></InputAddon>
              <Input id="fe-gr-md" placeholder="Search…" />
            </InputGroup>
          </SpecRow>
          <SpecRow label="LG group" token='InputGroup inputSize="lg"'>
            <InputGroup inputSize="lg">
              <InputAddon><Search className="shrink-0" /></InputAddon>
              <Input id="fe-gr-lg" size="lg" placeholder="Search…" />
            </InputGroup>
          </SpecRow>
        </div>
      </div>

      <div className="min-w-0 flex flex-col gap-3">
        <p className="t-text-50 text-xs font-semibold uppercase tracking-wide">InputGroup · state</p>
        <div className="rounded-xl border t-border px-4 flex-1 min-h-0">
          <SpecRow label="Disabled" token="disabled on inner Input">
            <InputGroup>
              <InputAddon><Mail /></InputAddon>
              <Input id="fe-gr-dis" type="email" disabled defaultValue="locked@luxe.com" />
            </InputGroup>
          </SpecRow>
          <SpecRow label="Read-only" token="readOnly on inner Input">
            <InputGroup>
              <InputAddon><User /></InputAddon>
              <Input id="fe-gr-ro" readOnly defaultValue="Read-only display" className="cursor-default" />
            </InputGroup>
          </SpecRow>
        </div>
      </div>

      <div className="min-w-0 flex flex-col gap-3">
        <p className="t-text-50 text-xs font-semibold uppercase tracking-wide">Textarea · state</p>
        <div className="rounded-xl border t-border px-4 flex-1 min-h-0">
          <SpecRow label="Default" token="—">
            <Textarea id="fe-ta-def" rows={2} placeholder="Notes…" />
          </SpecRow>
          <SpecRow label="Disabled" token="disabled">
            <Textarea id="fe-ta-dis" disabled rows={2} defaultValue="This note cannot be edited." />
          </SpecRow>
          <SpecRow label="Read-only" token="readOnly">
            <Textarea id="fe-ta-ro" readOnly rows={2} defaultValue="Terms accepted on 2026-01-12 — record locked." className="cursor-default" />
          </SpecRow>
        </div>
      </div>
    </div>
  );
}

function TextFieldDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
      <div className="space-y-1.5">
        <Label htmlFor="fe-default">Default</Label>
        <Input id="fe-default" placeholder="Enter your name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-icon">With leading icon</Label>
        <InputGroup>
          <InputAddon><User /></InputAddon>
          <Input id="fe-icon" placeholder="Enter your name" />
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-email">Email</Label>
        <InputGroup>
          <InputAddon><Mail /></InputAddon>
          <Input id="fe-email" type="email" placeholder="you@luxe.com" />
        </InputGroup>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-help">With helper text</Label>
        <Input id="fe-help" placeholder="https://" aria-describedby="fe-help-desc" />
        <p id="fe-help-desc" className="t-text-40 text-xs">We&apos;ll never share this URL.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-error">With error</Label>
        <Input id="fe-error" invalid defaultValue="invalid value" />
        <p className="text-red-500 text-xs">This field is required.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-success">With success</Label>
        <Input id="fe-success" valid defaultValue="great@luxe.com" />
        <p className="text-emerald-500 text-xs">Looks good!</p>
      </div>
    </div>
  );
}

function PasswordDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5 max-w-sm">
      <Label htmlFor="fe-password">Password</Label>
      <InputGroup>
        <InputAddon><Lock /></InputAddon>
        <Input id="fe-password" type={show ? "text" : "password"} placeholder="••••••••" />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="t-text-50 t-hover-2 rounded p-1"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </InputGroup>
    </div>
  );
}

function CustomInputDemo() {
  const [option, setOption] = useState("annual");
  const options = [
    { value: "monthly", title: "Monthly",  price: "$24",  desc: "Pay-as-you-go pricing" },
    { value: "annual",  title: "Annual",   price: "$220", desc: "Save 20% with yearly billing" },
    { value: "lifetime",title: "Lifetime", price: "$899", desc: "One-time payment, lifetime access" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
      {options.map((o) => {
        const active = option === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setOption(o.value)}
            className={`text-left p-4 rounded-xl transition-colors ${active ? "" : "t-hover"}`}
            style={{
              border: `1px solid ${active ? "var(--t-accent)" : "var(--t-border)"}`,
              backgroundColor: active ? "var(--t-accent-soft)" : "transparent",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="t-text font-semibold text-sm">{o.title}</span>
              <span
                className="h-4 w-4 rounded-full"
                style={{
                  border: `1px solid ${active ? "var(--t-accent)" : "var(--t-border-2)"}`,
                  backgroundColor: active ? "var(--t-accent)" : "transparent",
                }}
              />
            </div>
            <div className="t-text font-bold text-lg mt-1">{o.price}</div>
            <div className="t-text-40 text-xs mt-1">{o.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="space-y-1.5 max-w-2xl">
      <Label htmlFor="fe-bio">Bio</Label>
      <Textarea id="fe-bio" rows={4} placeholder="Tell us a bit about yourself..." />
    </div>
  );
}

function AutocompleteDemo() {
  const all = [
    "Switzerland", "United States", "United Kingdom", "Sweden", "Spain",
    "Singapore", "Saudi Arabia", "South Korea", "South Africa",
  ];
  const [query, setQuery] = useState("S");
  const [open, setOpen] = useState(false);
  const matches = all.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="relative max-w-sm space-y-1.5">
      <Label htmlFor="fe-ac">Country</Label>
      <InputGroup>
        <InputAddon><Search /></InputAddon>
        <Input
          id="fe-ac"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder="Search countries"
        />
      </InputGroup>
      {open && matches.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10"
          style={{ backgroundColor: "var(--t-surface)", border: "1px solid var(--t-border)", boxShadow: "var(--t-shadow)" }}
        >
          {matches.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setQuery(m); setOpen(false); }}
              className="w-full text-left px-3 py-2 t-text text-sm t-hover"
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PickerDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
      <div className="space-y-1.5">
        <Label htmlFor="fe-date">Date</Label>
        <DatePicker id="fe-date" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-time">Time</Label>
        <Input id="fe-time" type="time" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="fe-month">Month</Label>
        <Input id="fe-month" type="month" />
      </div>
    </div>
  );
}

export default function FormElementsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <Section
        className="md:col-span-2 xl:col-span-3"
        title="Input · sizes & states"
        description="SM / MD / LG, disabled, read-only, validation, InputGroup and Textarea — API and visuals in one place."
      >
        <InputSizesAndStatesDemo />
      </Section>

      <Section title="Text Field" description="Single-line input with adornment, helper, and validation states.">
        <TextFieldDemo />
      </Section>

      <Section title="Password" description="Text field with reveal/hide toggle.">
        <PasswordDemo />
      </Section>

      <Section title="Custom Inputs" description="Card-style picker with rich content.">
        <CustomInputDemo />
      </Section>

      <Section title="Textarea" description="Multi-line text input.">
        <TextareaDemo />
      </Section>

      <Section title="Autocomplete" description="Searchable list with keyboard-friendly suggestions.">
        <AutocompleteDemo />
      </Section>

      <Section title="Picker" description="Date, time, and month inputs.">
        <PickerDemo />
      </Section>
    </div>
  );
}
