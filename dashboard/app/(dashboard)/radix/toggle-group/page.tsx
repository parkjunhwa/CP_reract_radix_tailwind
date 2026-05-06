"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const itemCls = cn(
  "inline-flex items-center justify-center w-10 h-9 rounded-lg border transition-colors",
  "hover:bg-[var(--t-hover)]",
  "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixToggleGroupPage() {
  const [align, setAlign] = useState("left");

  return (
    <ExampleShell title="Toggle Group" description="A set of two-state buttons that can be toggled on or off.">
      <ExamplePanel title="Single selection" description="Type=single, value is controlled.">
        <div className="flex items-center gap-3">
          <ToggleGroup.Root type="single" value={align} onValueChange={(v) => v && setAlign(v)} className="flex items-center gap-2">
            <ToggleGroup.Item
              value="left"
              className={itemCls}
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Align left"
            >
              <AlignLeft className="w-4 h-4" aria-hidden="true" />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="center"
              className={itemCls}
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Align center"
            >
              <AlignCenter className="w-4 h-4" aria-hidden="true" />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="right"
              className={itemCls}
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Align right"
            >
              <AlignRight className="w-4 h-4" aria-hidden="true" />
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <p className="t-text-40 text-xs">Align: {align}</p>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

