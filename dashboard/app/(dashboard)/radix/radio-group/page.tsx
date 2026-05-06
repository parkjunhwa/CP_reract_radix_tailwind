"use client";

import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

function RadioItem({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex items-center gap-3 select-none">
      <RadioGroup.Item
        value={value}
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
        )}
        style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}
      >
        <RadioGroup.Indicator className="w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--t-accent)" }}>
          <Check className="w-3 h-3 text-[var(--t-accent-text)]" aria-hidden="true" />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
      <span className="t-text text-sm">{label}</span>
    </label>
  );
}

export default function RadixRadioGroupPage() {
  const [value, setValue] = useState("standard");

  return (
    <ExampleShell title="Radio Group" description="A set of checkable buttons where only one can be selected.">
      <ExamplePanel title="Shipping" description="Use arrow keys to change selection.">
        <RadioGroup.Root value={value} onValueChange={setValue} className="space-y-3">
          <RadioItem value="standard" label="Standard (3–5 days)" />
          <RadioItem value="express" label="Express (1–2 days)" />
          <RadioItem value="overnight" label="Overnight" />
        </RadioGroup.Root>
        <p className="t-text-40 text-xs mt-3">Selected: {value}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

