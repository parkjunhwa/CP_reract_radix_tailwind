"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SETTINGS = [
  { id: "apple-pay", label: "Enable Apple Pay checkout", desc: "Show the Apple Pay button on supported devices.", defaultChecked: true },
  { id: "signature", label: "Require signature over $10k cart", desc: "Capture courier signature for high-value orders.", defaultChecked: true },
  { id: "referral", label: "Expose referral codes during checkout", desc: "Allow customers to redeem partner referral codes.", defaultChecked: false },
] as const;

export default function EcommerceSettingsPage() {
  const initial: Record<string, boolean> = Object.fromEntries(
    SETTINGS.map((s) => [s.id, s.defaultChecked]),
  );
  const [values, setValues] = useState<Record<string, boolean>>(initial);

  return (
    <div className="space-y-3 pb-0">
      <div className="panel divide-y" style={{ borderColor: "var(--t-border)" }}>
        {SETTINGS.map((s) => (
          <div
            key={s.id}
            className="flex items-start justify-between gap-4 px-5 py-4"
            style={{ borderColor: "var(--t-border)" }}
          >
            <div className="min-w-0 space-y-0.5">
              <Label htmlFor={s.id} className="text-[color:var(--t-text-70)] text-sm cursor-pointer">
                {s.label}
              </Label>
              <p className="t-text-40 text-xs">{s.desc}</p>
            </div>
            <Switch
              id={s.id}
              checked={values[s.id]}
              onCheckedChange={(v) => setValues((cur) => ({ ...cur, [s.id]: v }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
