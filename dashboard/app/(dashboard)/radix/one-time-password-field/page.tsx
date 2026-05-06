"use client";

import { useState } from "react";
import * as OTP from "@radix-ui/react-one-time-password-field";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const inputCls = cn(
  "w-10 h-12 rounded-lg border text-center text-lg font-semibold tabular-nums outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixOneTimePasswordFieldPage() {
  const [value, setValue] = useState("");
  const length = 6;

  return (
    <ExampleShell title="One-Time Password Field" description="A group of single-character inputs to handle OTP verification.">
      <ExamplePanel title="Basic usage" description="Paste a code, or type to advance focus automatically.">
        <div className="space-y-3">
          <OTP.Root
            value={value}
            onValueChange={setValue}
            validationType="numeric"
            autoComplete="one-time-code"
            className="flex items-center gap-2"
          >
            {Array.from({ length }).map((_, i) => (
              <OTP.Input
                key={i}
                index={i}
                className={inputCls}
                style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              />
            ))}
            <OTP.HiddenInput name="otp" />
          </OTP.Root>

          <p className="t-text-40 text-xs">Value: {value || "—"}</p>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

