"use client";

import * as Popover from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixPopoverPage() {
  return (
    <ExampleShell title="Popover" description="Displays rich content in a portal, triggered by a button.">
      <ExamplePanel title="Details popover" description="Opens on click; Esc closes.">
        <Popover.Root>
          <Popover.Trigger
            className={cn(
              "inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm",
              "hover:bg-[var(--t-hover)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
            )}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            <Info className="w-4 h-4 opacity-70" aria-hidden="true" />
            What is this?
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              sideOffset={10}
              className="w-80 rounded-xl border p-4 shadow-xl"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
            >
              <p className="t-text font-semibold text-sm">Quick note</p>
              <p className="t-text-40 text-xs mt-1.5">
                Popovers are great for contextual information, forms, and lightweight interactions.
              </p>
              <Popover.Arrow className="fill-[var(--t-surface)]" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

