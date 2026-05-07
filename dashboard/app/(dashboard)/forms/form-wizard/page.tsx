"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const STEPS = [
  { id: 1, label: "Personal Info", desc: "Basic account details" },
  { id: 2, label: "Company", desc: "Business information" },
  { id: 3, label: "Preferences", desc: "Customize your setup" },
  { id: 4, label: "Confirmation", desc: "Review & submit" },
];

const CATEGORIES = ["Luxury Watches", "Fine Jewelry", "Premium Fashion", "Art & Collectibles", "Rare Spirits"];
const REGIONS = ["North America", "Europe", "Asia Pacific", "Middle East", "Latin America"];
const TIERS = ["Standard", "Premium", "VIP", "Ultra-HNW"];
const INDUSTRIES = ["Luxury Retail", "Auction House", "Private Banking", "Art Dealing", "Estate Management"];
const REVENUES = ["Under $1M", "$1M – $10M", "$10M – $50M", "$50M – $100M", "$100M+"];

interface FormState {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; role: string; industry: string; annualRevenue: string;
  categories: string[]; regions: string[]; tier: string;
}

const INITIAL_FORM: FormState = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", role: "", industry: "", annualRevenue: "",
  categories: [], regions: [], tier: "Premium",
};

export default function FormWizardPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleArr = (key: "categories" | "regions", val: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));
  };

  const restart = () => { setDone(false); setStep(1); setForm(INITIAL_FORM); };

  if (done) {
    return (
      <div className="panel p-12 text-center space-y-3 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="t-text font-bold text-xl">Account Created!</h2>
        <p className="t-text-40 text-sm">
          Welcome to LUXE Commerce, {form.firstName || "there"}. Your account is ready.
        </p>
        <Button
          onClick={restart}
          size="lg"
          className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]"
        >
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-0">
      {/* Step indicators */}
      <div className="panel p-5">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => s.id < step && setStep(s.id)}
                className="flex items-center gap-3 group"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
                    s.id < step ? "bg-emerald-500 text-white"
                      : s.id === step ? "text-white"
                      : "t-text-30 border",
                  )}
                  style={
                    s.id === step
                      ? { backgroundColor: "var(--t-accent)" }
                      : s.id < step ? {} : { borderColor: "var(--t-border-2)" }
                  }
                >
                  {s.id < step ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={cn(
                    "text-xs font-semibold",
                    s.id === step ? "t-text-80" : s.id < step ? "t-text-60" : "t-text-30",
                  )}>
                    {s.label}
                  </p>
                  <p className="t-text-30 text-[10px]">{s.desc}</p>
                </div>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 mx-3 h-px"
                  style={{ backgroundColor: step > s.id ? "var(--t-accent)" : "var(--t-border)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Form.Root className="panel p-6 space-y-5">
        {step === 1 && (
          <>
            <h3 className="t-text font-semibold text-sm">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <Form.Field name="firstName" className="space-y-1.5">
                <Form.Label asChild>
                  <Label htmlFor="wiz-firstname">First Name</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input id="wiz-firstname" placeholder="James"
                    value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                </Form.Control>
              </Form.Field>
              <Form.Field name="lastName" className="space-y-1.5">
                <Form.Label asChild>
                  <Label htmlFor="wiz-lastname">Last Name</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input id="wiz-lastname" placeholder="Worthington"
                    value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                </Form.Control>
              </Form.Field>
            </div>
            <Form.Field name="email" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-email">Email Address</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="wiz-email" type="email" placeholder="j.worthington@luxe.com"
                  value={form.email} onChange={(e) => update("email", e.target.value)} />
              </Form.Control>
            </Form.Field>
            <Form.Field name="phone" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-phone">Phone Number</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="wiz-phone" type="tel" placeholder="+1 (212) 555-0100"
                  value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </Form.Control>
            </Form.Field>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="t-text font-semibold text-sm">Company Details</h3>
            <Form.Field name="company" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-company">Company Name</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="wiz-company" placeholder="LUXE Commerce Inc."
                  value={form.company} onChange={(e) => update("company", e.target.value)} />
              </Form.Control>
            </Form.Field>
            <Form.Field name="role" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-role">Your Role</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="wiz-role" placeholder="Senior Account Manager"
                  value={form.role} onChange={(e) => update("role", e.target.value)} />
              </Form.Control>
            </Form.Field>
            <Form.Field name="industry" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-industry">Industry</Label>
              </Form.Label>
              <Select value={form.industry} onValueChange={(v) => update("industry", v)}>
                <SelectTrigger id="wiz-industry" className="w-full h-9">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((i) => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Field>
            <Form.Field name="annualRevenue" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="wiz-revenue">Annual Revenue (USD)</Label>
              </Form.Label>
              <Select value={form.annualRevenue} onValueChange={(v) => update("annualRevenue", v)}>
                <SelectTrigger id="wiz-revenue" className="w-full h-9">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {REVENUES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Form.Field>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="t-text font-semibold text-sm">Preferences</h3>

            <div className="space-y-2">
              <p className="t-text-40 text-xs font-medium">Product Categories</p>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => {
                  const id = `wiz-cat-${cat.replace(/\s+/g, "-").toLowerCase()}`;
                  const checked = form.categories.includes(cat);
                  return (
                    <Form.Field key={cat} name={id} className="flex items-center gap-2.5">
                      <Form.Control asChild>
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={() => toggleArr("categories", cat)}
                        />
                      </Form.Control>
                      <Form.Label asChild>
                        <Label htmlFor={id} className="text-[color:var(--t-text-60)] cursor-pointer">
                          {cat}
                        </Label>
                      </Form.Label>
                    </Form.Field>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="t-text-40 text-xs font-medium">Regions of Interest</p>
              <div className="grid grid-cols-2 gap-2">
                {REGIONS.map((r) => {
                  const id = `wiz-region-${r.replace(/\s+/g, "-").toLowerCase()}`;
                  const checked = form.regions.includes(r);
                  return (
                    <Form.Field key={r} name={id} className="flex items-center gap-2.5">
                      <Form.Control asChild>
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={() => toggleArr("regions", r)}
                        />
                      </Form.Control>
                      <Form.Label asChild>
                        <Label htmlFor={id} className="text-[color:var(--t-text-60)] cursor-pointer">
                          {r}
                        </Label>
                      </Form.Label>
                    </Form.Field>
                  );
                })}
              </div>
            </div>

            <Form.Field name="tier" className="space-y-2">
              <Form.Label className="t-text-40 text-xs font-medium">Account Tier</Form.Label>
              <RadioGroup
                value={form.tier}
                onValueChange={(v) => update("tier", v)}
                className="grid grid-cols-2 md:grid-cols-4 gap-2"
              >
                {TIERS.map((t) => {
                  const id = `wiz-tier-${t.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <Label
                      key={t}
                      htmlFor={id}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors",
                        form.tier === t
                          ? "border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)] t-text-80"
                          : "t-text-60 hover:bg-[color:var(--t-hover)]",
                      )}
                      style={form.tier === t ? {} : { borderColor: "var(--t-border-2)" }}
                    >
                      <RadioGroupItem id={id} value={t} />
                      <span>{t}</span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </Form.Field>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="t-text font-semibold text-sm">Review & Confirm</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Personal",
                  items: [
                    ["Name", `${form.firstName} ${form.lastName}`.trim() || "—"],
                    ["Email", form.email || "—"],
                    ["Phone", form.phone || "—"],
                  ],
                },
                {
                  label: "Company",
                  items: [
                    ["Company", form.company || "—"],
                    ["Role", form.role || "—"],
                    ["Industry", form.industry || "—"],
                    ["Revenue", form.annualRevenue || "—"],
                  ],
                },
                {
                  label: "Preferences",
                  items: [
                    ["Categories", form.categories.join(", ") || "—"],
                    ["Regions", form.regions.join(", ") || "—"],
                    ["Tier", form.tier],
                  ],
                },
              ].map((sec) => (
                <div
                  key={sec.label}
                  className="rounded-lg border p-4 space-y-2"
                  style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}
                >
                  <p className="t-text-40 text-[10px] font-semibold uppercase tracking-wide">{sec.label}</p>
                  {sec.items.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="t-text-30">{k}</span>
                      <span className="t-text-60 font-medium text-right max-w-[60%] truncate">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <span className="t-text-30 text-xs">Step {step} of {STEPS.length}</span>
          {step < STEPS.length ? (
            <Button
              type="button"
              size="lg"
              className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]"
              onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Form.Submit asChild>
              <Button
                size="lg"
                className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]"
                onClick={() => setDone(true)}
              >
                Submit
              </Button>
            </Form.Submit>
          )}
        </div>
      </Form.Root>
    </div>
  );
}
