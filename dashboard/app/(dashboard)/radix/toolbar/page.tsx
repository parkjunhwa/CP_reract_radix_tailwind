"use client";

import * as Toolbar from "@radix-ui/react-toolbar";
import { Bold, Italic, Underline } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const itemCls = cn(
  "inline-flex items-center justify-center w-10 h-9 rounded-lg border transition-colors",
  "hover:bg-[var(--t-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixToolbarPage() {
  return (
    <ExampleShell title="Toolbar" description="A container for grouping a set of controls.">
      <ExamplePanel title="Formatting toolbar" description="Toolbar manages roving focus among items.">
        <Toolbar.Root
          className="inline-flex items-center gap-2 p-2 rounded-xl border"
          style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}
          aria-label="Formatting options"
        >
          <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting" className="flex items-center gap-2">
            <Toolbar.ToggleItem
              value="bold"
              className={cn(itemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")}
              style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Bold"
            >
              <Bold className="w-4 h-4" aria-hidden="true" />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              value="italic"
              className={cn(itemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")}
              style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Italic"
            >
              <Italic className="w-4 h-4" aria-hidden="true" />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              value="underline"
              className={cn(itemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")}
              style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="Underline"
            >
              <Underline className="w-4 h-4" aria-hidden="true" />
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
        </Toolbar.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

