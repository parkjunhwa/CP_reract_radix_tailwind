"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixTooltipPage() {
  return (
    <ExampleShell title="Tooltip" description="A popup that displays information on hover or focus.">
      <ExamplePanel title="Basic tooltip" description="Hover or focus the icon.">
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 rounded-lg border",
                "hover:bg-[var(--t-hover)] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
              )}
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              aria-label="More info"
            >
              <Info className="w-4 h-4 opacity-70" aria-hidden="true" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                sideOffset={10}
                className="rounded-lg border px-2.5 py-1.5 text-xs shadow-lg"
                style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              >
                Tooltips are for short, non-interactive hints.
                <Tooltip.Arrow className="fill-[var(--t-surface)]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </ExamplePanel>
    </ExampleShell>
  );
}

