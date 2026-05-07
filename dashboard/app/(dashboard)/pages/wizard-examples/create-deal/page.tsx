"use client";
import { useState } from "react";
import { Check, ChevronRight, Target, Users, FileText, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
const STEPS = [{ id:1, label:"Deal Info", icon:Target }, { id:2, label:"Contacts", icon:Users }, { id:3, label:"Terms", icon:FileText }, { id:4, label:"Summary", icon:Handshake }];
export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const inputCls = "w-full h-9 px-3 rounded-lg border text-xs outline-none t-text-70 focus:border-[var(--t-accent)] transition-colors";
  const inputStyle = { backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" };
  if (done) return (
    <div className="max-w-lg mx-auto panel p-10 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto"><Check className="w-8 h-8 text-emerald-400" /></div>
      <h2 className="t-text font-bold text-xl">Deal Created!</h2>
      <p className="t-text-40 text-sm">Deal DEAL-2026-001 has been created and added to your pipeline.</p>
      <button onClick={() => { setStep(1); setDone(false); }} className="h-10 px-6 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "var(--t-accent)" }}>New Deal</button>
    </div>
  );
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="panel p-5">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => { const Icon = s.icon; return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors", s.id < step ? "bg-emerald-500 border-emerald-500" : s.id === step ? "border-[var(--t-accent)] bg-[var(--luxe-accent-2)]" : "border-[var(--t-border-2)]")}>
                  {s.id < step ? <Check className="w-4 h-4 text-white" /> : <Icon className={cn("w-4 h-4", s.id === step ? "text-[var(--t-accent-text)]" : "t-text-30")} />}
                </div>
                <span className={cn("text-[10px] font-medium hidden sm:block", s.id === step ? "t-text-70" : "t-text-30")}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 mx-2 h-px mt-[-18px]" style={{ backgroundColor: step > s.id ? "var(--t-accent)" : "var(--t-border)" }} />}
            </div>
          ); })}
        </div>
      </div>
      <div className="panel p-6 space-y-4">
        {step === 1 && (<><h3 className="t-text font-semibold text-sm">Deal Information</h3><div className="space-y-3">
          {[["Deal Name","Patek Philippe Enterprise Package"], ["Category","Luxury Watches"], ["Deal Value","$420,000"], ["Stage","Negotiation"], ["Close Date","2026-06-30"], ["Priority","High"]].map(([l,p]) => (
            <div key={l} className="grid grid-cols-2 gap-3"><label className="t-text-40 text-xs self-center">{l}</label><input placeholder={p} className={inputCls} style={inputStyle} /></div>
          ))}</div></>)}
        {step === 2 && (<><h3 className="t-text font-semibold text-sm">Associated Contacts</h3><div className="space-y-3">
          {[["Primary Contact","Marcus Thompson"], ["Email","m.thompson@client.com"], ["Phone","+1 (212) 555-0142"], ["Company","Thompson Capital"]].map(([l,p]) => (
            <div key={l} className="space-y-1.5"><label className="t-text-40 text-xs">{l}</label><input placeholder={p} className={inputCls} style={inputStyle} /></div>
          ))}</div></>)}
        {step === 3 && (<><h3 className="t-text font-semibold text-sm">Deal Terms</h3><div className="space-y-3">
          {[["Payment Method","Wire Transfer"], ["Delivery","White-Glove Concierge"], ["Warranty","2 Years Full Coverage"], ["Discount","5%"]].map(([l,p]) => (
            <div key={l} className="space-y-1.5"><label className="t-text-40 text-xs">{l}</label><input placeholder={p} className={inputCls} style={inputStyle} /></div>
          ))}
          <div className="space-y-1.5"><label className="t-text-40 text-xs">Special Notes</label><textarea rows={3} placeholder="Client prefers private presentation before finalizing..." className="w-full px-3 py-2 rounded-lg border text-xs t-text-70 outline-none resize-none focus:border-[var(--t-accent)] transition-colors" style={inputStyle} /></div>
        </div></>)}
        {step === 4 && (<><h3 className="t-text font-semibold text-sm">Deal Summary</h3>
          <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "var(--t-hover)" }}>
            {[["Deal","Patek Philippe Enterprise Package"], ["Value","$420,000"], ["Contact","Marcus Thompson"], ["Stage","Negotiation"], ["Close","2026-06-30"], ["Terms","Wire Transfer · 5% Discount"]].map(([k,v]) => (
              <div key={k as string} className="flex justify-between text-xs border-b last:border-0 pb-1.5 last:pb-0" style={{ borderColor: "var(--t-border)" }}>
                <span className="t-text-30">{k}</span><span className="t-text-60 font-medium">{v}</span>
              </div>
            ))}
          </div></>)}
        <div className="flex justify-between pt-2">
          <button disabled={step===1} onClick={() => setStep(s=>s-1)} className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] disabled:opacity-30" style={{ borderColor: "var(--t-border-2)" }}>Previous</button>
          {step < 4 ? <button onClick={() => setStep(s=>s+1)} className="h-9 px-4 rounded-lg text-white text-xs font-medium flex items-center gap-1.5" style={{ backgroundColor: "var(--t-accent)" }}>Next <ChevronRight className="w-3.5 h-3.5" /></button>
          : <button onClick={() => setDone(true)} className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>Create Deal</button>}
        </div>
      </div>
    </div>
  );
}
