"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const triggerCls = cn(
  "inline-flex items-center justify-between gap-2 h-10 px-3 rounded-lg border text-sm w-64",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
  "hover:bg-[var(--t-hover)] transition-colors"
);

function Item({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Select.Item
      value={value}
      className={cn(
        "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
        "data-[highlighted]:bg-[var(--t-hover)]"
      )}
      style={{ color: "var(--t-text-70)" }}
    >
      <Select.ItemIndicator className="w-4 h-4 inline-flex items-center justify-center">
        <Check className="w-4 h-4" aria-hidden="true" />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

export default function RadixSelectPage() {
  const [value, setValue] = useState("gold");

  return (
    <ExampleShell title="Select" description="Displays a list of options for the user to pick from.">
      <ExamplePanel title="Tier selector" description="Trigger opens a portal listbox.">
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger
            className={triggerCls}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
            aria-label="Tier"
          >
            <Select.Value />
            <Select.Icon>
              <ChevronDown className="w-4 h-4 opacity-60" aria-hidden="true" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="rounded-xl border p-1 shadow-xl" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
              <Select.Viewport className="p-1">
                <Item value="bronze">Bronze</Item>
                <Item value="silver">Silver</Item>
                <Item value="gold">Gold</Item>
                <Item value="platinum">Platinum</Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <p className="t-text-40 text-xs mt-3">Selected: {value}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

