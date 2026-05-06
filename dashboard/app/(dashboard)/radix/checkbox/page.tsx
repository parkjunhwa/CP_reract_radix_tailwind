"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixCheckboxPage() {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <ExampleShell title="Checkbox" description="A control that allows the user to toggle between checked and not checked.">
      <ExamplePanel title="Controlled checkbox" description="Click or press Space to toggle.">
        <label className="flex items-center gap-3 select-none">
          <Checkbox.Root
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
            className={cn(
              "w-5 h-5 rounded-md border flex items-center justify-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
              "transition-colors"
            )}
            style={{
              borderColor: "var(--t-border-2)",
              backgroundColor: checked ? "var(--t-accent-soft)" : "var(--t-surface-2)",
            }}
          >
            <Checkbox.Indicator className="text-[var(--t-accent-text)]">
              <Check className="w-4 h-4" aria-hidden="true" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="t-text text-sm">Enable email alerts</span>
        </label>

        <p className="t-text-40 text-xs mt-3">Value: {checked ? "checked" : "unchecked"}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

