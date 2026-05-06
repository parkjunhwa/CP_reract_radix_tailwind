"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixCollapsiblePage() {
  const [open, setOpen] = useState(false);

  return (
    <ExampleShell title="Collapsible" description="An interactive component which expands/collapses a panel.">
      <ExamplePanel title="Basic" description="Controlled open state.">
        <Collapsible.Root open={open} onOpenChange={setOpen} className="max-w-xl">
          <Collapsible.Trigger
            className={cn(
              "w-full h-10 px-3 rounded-lg border flex items-center justify-between text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
              "hover:bg-[var(--t-hover)] transition-colors"
            )}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            <span>Release notes</span>
            <ChevronDown className={cn("w-4 h-4 opacity-60 transition-transform", open && "rotate-180")} />
          </Collapsible.Trigger>

          <Collapsible.Content className="mt-3 rounded-lg border p-4 text-sm" style={{ borderColor: "var(--t-border)" }}>
            <p className="t-text-40">
              Collapsible content can contain any markup. This area becomes hidden and removed from the tab order when closed.
            </p>
            <ul className="mt-3 list-disc pl-5 t-text-40 text-sm space-y-1">
              <li>Accessible trigger</li>
              <li>Keyboard friendly</li>
              <li>Fully styleable</li>
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

