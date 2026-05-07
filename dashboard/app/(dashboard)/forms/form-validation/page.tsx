"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldState { value: string; error: string; touched: boolean }

function validate(name: string, value: string): string {
  if (!value.trim()) return `${name} is required`;
  if (name === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
  if (name === "Phone" && !/^\+?[\d\s\-()]{7,}$/.test(value)) return "Please enter a valid phone number";
  if (name === "Password" && value.length < 8) return "Password must be at least 8 characters";
  if (name === "Amount" && (isNaN(Number(value)) || Number(value) <= 0)) return "Amount must be a positive number";
  if (name === "URL" && !/^https?:\/\/.+/.test(value)) return "URL must start with http:// or https://";
  return "";
}

function Field({ label, placeholder, type = "text", state, onChange, onBlur }: {
  label: string; placeholder: string; type?: string;
  state: FieldState; onChange: (v: string) => void; onBlur: () => void;
}) {
  const hasError = state.touched && state.error;
  const isValid = state.touched && !state.error && state.value;
  return (
    <div className="space-y-1.5">
      <label className="t-text-50 text-xs font-medium">{label}</label>
      <div className={cn("flex items-center gap-2 h-9 px-3 rounded-lg border transition-colors",
        hasError ? "border-red-500/50 bg-red-500/5" : isValid ? "border-emerald-500/50 bg-emerald-500/5" : "focus-within:border-[var(--t-accent)]"
      )} style={!hasError && !isValid ? { backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" } : {}}>
        <input type={type} value={state.value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)} onBlur={onBlur}
          className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
        {hasError && <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
        {isValid && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
      </div>
      {hasError && <p className="text-red-400 text-[10px]">{state.error}</p>}
    </div>
  );
}

export default function FormValidationPage() {
  const fields = ["Name", "Email", "Phone", "Password", "Amount", "URL"];
  const [states, setStates] = useState<Record<string, FieldState>>(
    Object.fromEntries(fields.map(f => [f, { value: "", error: "", touched: false }]))
  );
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setStates(s => ({ ...s, [field]: { value, error: validate(field, value), touched: s[field].touched } }));
  const blur = (field: string) => setStates(s => ({ ...s, [field]: { ...s[field], touched: true, error: validate(field, s[field].value) } }));

  const handleSubmit = () => {
    const updated = Object.fromEntries(fields.map(f => [f, { ...states[f], touched: true, error: validate(f, states[f].value) }]));
    setStates(updated);
    const hasErrors = Object.values(updated).some(s => s.error);
    if (!hasErrors) setSubmitted(true);
  };

  const types: Record<string, string> = { Email: "email", Password: "password", Amount: "number", URL: "url" };
  const placeholders: Record<string, string> = {
    Name: "James Worthington", Email: "j@luxe.com", Phone: "+1 (212) 555-0100",
    Password: "Min. 8 characters", Amount: "25000", URL: "https://luxe.com",
  };

  return (
    <div className="space-y-4 pb-4 max-w-3xl">
      {submitted && (
        <div className="panel p-4 flex items-center gap-3 border-emerald-500/30 bg-emerald-500/5" style={{ borderColor: "rgb(16 185 129 / 0.3)" }}>
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-emerald-400 text-sm font-medium">Form submitted successfully!</p>
        </div>
      )}

      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Real-time Validation</h3>
          <p className="t-text-40 text-xs mt-0.5">Fields validate as you type and on blur. Submit to check all fields.</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <Field key={field} label={field} placeholder={placeholders[field]} type={types[field] || "text"}
                state={states[field]} onChange={v => update(field, v)} onBlur={() => blur(field)} />
            ))}
          </div>

          <div className="p-3 rounded-lg border" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="t-text-60 text-xs font-medium">Validation Summary</span>
            </div>
            <div className="space-y-1">
              {fields.map((f) => {
                const s = states[f];
                if (!s.touched) return null;
                return (
                  <div key={f} className="flex items-center gap-2 text-xs">
                    {s.error ? <XCircle className="w-3 h-3 text-red-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    <span className={s.error ? "text-red-400" : "text-emerald-400"}>{f}: {s.error || "Valid"}</span>
                  </div>
                );
              })}
              {fields.every(f => !states[f].touched) && <p className="t-text-30 text-xs">Start filling the form to see validation status.</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={() => { setStates(Object.fromEntries(fields.map(f => [f, { value: "", error: "", touched: false }]))); setSubmitted(false); }}
              className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)]" style={{ borderColor: "var(--t-border-2)" }}>Reset</button>
            <button onClick={handleSubmit} className="h-9 px-4 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: "var(--t-accent)" }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
