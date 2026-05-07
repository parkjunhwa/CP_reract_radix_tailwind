"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Personal Info", desc: "Basic account details" },
  { id: 2, label: "Company", desc: "Business information" },
  { id: 3, label: "Preferences", desc: "Customize your setup" },
  { id: 4, label: "Confirmation", desc: "Review & submit" },
];

const CATEGORIES = ["Luxury Watches", "Fine Jewelry", "Premium Fashion", "Art & Collectibles", "Rare Spirits"];
const REGIONS = ["North America", "Europe", "Asia Pacific", "Middle East", "Latin America"];
const TIERS = ["Standard", "Premium", "VIP", "Ultra-HNW"];

export default function FormWizardPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", role: "", industry: "", annualRevenue: "",
    categories: [] as string[], regions: [] as string[], tier: "Premium",
    notifications: true, whiteGlove: false,
  });

  const update = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (key: "categories" | "regions", val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));
  };

  if (done) {
    return (
      <div className="panel p-12 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="t-text font-bold text-xl">Account Created!</h2>
        <p className="t-text-40 text-sm">Welcome to LUXE Commerce, {form.firstName || "there"}. Your account is ready.</p>
        <button onClick={() => { setDone(false); setStep(1); setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", role: "", industry: "", annualRevenue: "", categories: [], regions: [], tier: "Premium", notifications: true, whiteGlove: false }); }}
          className="h-10 px-6 rounded-lg text-white text-sm font-medium mx-auto" style={{ backgroundColor: "var(--t-accent)" }}>Start Over</button>
      </div>
    );
  }

  const inputCls = "w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 placeholder:t-text-30 focus:border-[var(--t-accent)] transition-colors";
  const inputStyle = { backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" };

  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      {/* Step indicators */}
      <div className="panel p-5">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button onClick={() => s.id < step && setStep(s.id)} className="flex items-center gap-3 group">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
                  s.id < step ? "bg-emerald-500 text-white" : s.id === step ? "text-white" : "t-text-30 border"
                )} style={s.id === step ? { backgroundColor: "var(--t-accent)" } : s.id < step ? {} : { borderColor: "var(--t-border-2)" }}>
                  {s.id < step ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <div className="hidden sm:block">
                  <p className={cn("text-xs font-semibold", s.id === step ? "t-text-80" : s.id < step ? "t-text-60" : "t-text-30")}>{s.label}</p>
                  <p className="t-text-30 text-[10px]">{s.desc}</p>
                </div>
              </button>
              {i < STEPS.length - 1 && <div className="flex-1 mx-3 h-px" style={{ backgroundColor: step > s.id ? "var(--t-accent)" : "var(--t-border)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="panel p-6 space-y-5">
        {step === 1 && (
          <>
            <h3 className="t-text font-semibold text-sm">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="t-text-40 text-xs">First Name</label><input placeholder="James" value={form.firstName} onChange={e => update("firstName", e.target.value)} className={inputCls} style={inputStyle} /></div>
              <div className="space-y-1.5"><label className="t-text-40 text-xs">Last Name</label><input placeholder="Worthington" value={form.lastName} onChange={e => update("lastName", e.target.value)} className={inputCls} style={inputStyle} /></div>
            </div>
            <div className="space-y-1.5"><label className="t-text-40 text-xs">Email Address</label><input type="email" placeholder="j.worthington@luxe.com" value={form.email} onChange={e => update("email", e.target.value)} className={inputCls} style={inputStyle} /></div>
            <div className="space-y-1.5"><label className="t-text-40 text-xs">Phone Number</label><input type="tel" placeholder="+1 (212) 555-0100" value={form.phone} onChange={e => update("phone", e.target.value)} className={inputCls} style={inputStyle} /></div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="t-text font-semibold text-sm">Company Details</h3>
            <div className="space-y-1.5"><label className="t-text-40 text-xs">Company Name</label><input placeholder="LUXE Commerce Inc." value={form.company} onChange={e => update("company", e.target.value)} className={inputCls} style={inputStyle} /></div>
            <div className="space-y-1.5"><label className="t-text-40 text-xs">Your Role</label><input placeholder="Senior Account Manager" value={form.role} onChange={e => update("role", e.target.value)} className={inputCls} style={inputStyle} /></div>
            <div className="space-y-1.5">
              <label className="t-text-40 text-xs">Industry</label>
              <select value={form.industry} onChange={e => update("industry", e.target.value)} className={inputCls} style={inputStyle}>
                <option value="">Select industry</option>
                {["Luxury Retail", "Auction House", "Private Banking", "Art Dealing", "Estate Management"].map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="t-text-40 text-xs">Annual Revenue (USD)</label>
              <select value={form.annualRevenue} onChange={e => update("annualRevenue", e.target.value)} className={inputCls} style={inputStyle}>
                <option value="">Select range</option>
                {["Under $1M", "$1M – $10M", "$10M – $50M", "$50M – $100M", "$100M+"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="t-text font-semibold text-sm">Preferences</h3>
            <div className="space-y-2">
              <label className="t-text-40 text-xs font-medium">Product Categories</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => toggleArr("categories", cat)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                      form.categories.includes(cat) ? "text-white" : "t-text-40 hover:bg-[var(--t-hover)]"
                    )} style={form.categories.includes(cat) ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="t-text-40 text-xs font-medium">Regions of Interest</label>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(r => (
                  <button key={r} onClick={() => toggleArr("regions", r)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                      form.regions.includes(r) ? "text-white" : "t-text-40 hover:bg-[var(--t-hover)]"
                    )} style={form.regions.includes(r) ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="t-text-40 text-xs font-medium">Account Tier</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {TIERS.map(t => (
                  <button key={t} onClick={() => update("tier", t)}
                    className={cn("px-3 py-2 rounded-lg text-xs font-medium border transition-colors text-center",
                      form.tier === t ? "text-white" : "t-text-40 hover:bg-[var(--t-hover)]"
                    )} style={form.tier === t ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="t-text font-semibold text-sm">Review & Confirm</h3>
            <div className="space-y-3">
              {[
                { label: "Personal", items: [["Name", `${form.firstName} ${form.lastName}`.trim() || "—"], ["Email", form.email || "—"], ["Phone", form.phone || "—"]] },
                { label: "Company", items: [["Company", form.company || "—"], ["Role", form.role || "—"], ["Industry", form.industry || "—"], ["Revenue", form.annualRevenue || "—"]] },
                { label: "Preferences", items: [["Categories", form.categories.join(", ") || "—"], ["Regions", form.regions.join(", ") || "—"], ["Tier", form.tier]] },
              ].map(sec => (
                <div key={sec.label} className="rounded-lg border p-4 space-y-2" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}>
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
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
            className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] disabled:opacity-30 disabled:cursor-not-allowed" style={{ borderColor: "var(--t-border-2)" }}>
            Previous
          </button>
          <span className="t-text-30 text-xs">Step {step} of {STEPS.length}</span>
          {step < STEPS.length
            ? <button onClick={() => setStep(s => Math.min(STEPS.length, s + 1))} className="h-9 px-4 rounded-lg text-white text-xs font-medium flex items-center gap-1.5" style={{ backgroundColor: "var(--t-accent)" }}>
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            : <button onClick={() => setDone(true)} className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>
                Submit
              </button>
          }
        </div>
      </div>
    </div>
  );
}
