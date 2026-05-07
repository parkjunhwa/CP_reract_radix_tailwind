"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldState { value: string; error: string; touched: boolean }

const FIELDS = ["Name", "Email", "Phone", "Password", "Amount", "URL"] as const;
type FieldName = (typeof FIELDS)[number];

const TYPES: Record<FieldName, string> = {
  Name: "text",
  Email: "email",
  Phone: "tel",
  Password: "password",
  Amount: "number",
  URL: "url",
};

const PLACEHOLDERS: Record<FieldName, string> = {
  Name: "James Worthington",
  Email: "j@luxe.com",
  Phone: "+1 (212) 555-0100",
  Password: "Min. 8 characters",
  Amount: "25000",
  URL: "https://luxe.com",
};

function validate(name: FieldName, value: string): string {
  if (!value.trim()) return `${name} is required`;
  if (name === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
  if (name === "Phone" && !/^\+?[\d\s\-()]{7,}$/.test(value)) return "Please enter a valid phone number";
  if (name === "Password" && value.length < 8) return "Password must be at least 8 characters";
  if (name === "Amount" && (Number.isNaN(Number(value)) || Number(value) <= 0)) return "Amount must be a positive number";
  if (name === "URL" && !/^https?:\/\/.+/.test(value)) return "URL must start with http:// or https://";
  return "";
}

function ValidatedField({
  id, label, placeholder, type, state, onChange, onBlur,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  state: FieldState;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const hasError = Boolean(state.touched && state.error);
  const isValid = Boolean(state.touched && !state.error && state.value);

  return (
    <Form.Field name={id} className="space-y-1.5">
      <Form.Label asChild>
        <Label htmlFor={id}>{label}</Label>
      </Form.Label>
      <InputGroup invalid={hasError} valid={isValid}>
        <Form.Control asChild>
          <Input
            id={id}
            type={type}
            value={state.value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        </Form.Control>
        {hasError && <InputAddon><XCircle className="h-3.5 w-3.5 text-red-400" /></InputAddon>}
        {isValid && <InputAddon><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /></InputAddon>}
      </InputGroup>
      {hasError && (
        <p id={`${id}-error`} className="text-red-400 text-[10px]">{state.error}</p>
      )}
    </Form.Field>
  );
}

const initialState = (): Record<FieldName, FieldState> =>
  Object.fromEntries(FIELDS.map((f) => [f, { value: "", error: "", touched: false }])) as Record<FieldName, FieldState>;

export default function FormValidationPage() {
  const [states, setStates] = useState<Record<FieldName, FieldState>>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: FieldName, value: string) =>
    setStates((s) => ({ ...s, [field]: { value, error: validate(field, value), touched: s[field].touched } }));

  const blur = (field: FieldName) =>
    setStates((s) => ({ ...s, [field]: { ...s[field], touched: true, error: validate(field, s[field].value) } }));

  const reset = () => {
    setStates(initialState());
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = Object.fromEntries(
      FIELDS.map((f) => [f, { ...states[f], touched: true, error: validate(f, states[f].value) }]),
    ) as Record<FieldName, FieldState>;
    setStates(updated);
    if (!Object.values(updated).some((s) => s.error)) setSubmitted(true);
  };

  return (
    <div className="space-y-3 pb-0">
      {submitted && (
        <div
          className="panel p-4 flex items-center gap-3 bg-emerald-500/5"
          style={{ borderColor: "rgb(16 185 129 / 0.3)" }}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-emerald-400 text-sm font-medium">Form submitted successfully!</p>
        </div>
      )}

      <Form.Root onSubmit={handleSubmit} className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Real-time Validation</h3>
          <p className="t-text-40 text-xs mt-0.5">
            Fields validate as you type and on blur. Submit to check all fields.
          </p>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FIELDS.map((field) => (
              <ValidatedField
                key={field}
                id={`val-${field.toLowerCase()}`}
                label={field}
                placeholder={PLACEHOLDERS[field]}
                type={TYPES[field]}
                state={states[field]}
                onChange={(v) => update(field, v)}
                onBlur={() => blur(field)}
              />
            ))}
          </div>

          <div
            className="p-3 rounded-lg border"
            style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="t-text-60 text-xs font-medium">Validation Summary</span>
            </div>
            <div className="space-y-1">
              {FIELDS.map((f) => {
                const s = states[f];
                if (!s.touched) return null;
                return (
                  <div key={f} className="flex items-center gap-2 text-xs">
                    {s.error
                      ? <XCircle className="w-3 h-3 text-red-400" />
                      : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    <span className={s.error ? "text-red-400" : "text-emerald-400"}>
                      {f}: {s.error || "Valid"}
                    </span>
                  </div>
                );
              })}
              {FIELDS.every((f) => !states[f].touched) && (
                <p className="t-text-30 text-xs">Start filling the form to see validation status.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="lg" onClick={reset}>Reset</Button>
            <Form.Submit asChild>
              <Button
                type="submit"
                size="lg"
                className="bg-[color:var(--t-accent)] text-white hover:bg-[color:var(--t-accent-h)]"
              >
                Submit
              </Button>
            </Form.Submit>
          </div>
        </div>
      </Form.Root>
    </div>
  );
}
