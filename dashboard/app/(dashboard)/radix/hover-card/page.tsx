"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixHoverCardPage() {
  return (
    <ExampleShell title="Hover Card" description="Preview content behind a link for sighted users.">
      <ExamplePanel title="Profile preview" description="Hover or focus the link to open.">
        <HoverCard.Root openDelay={200} closeDelay={150}>
          <HoverCard.Trigger
            className={cn(
              "text-sm font-medium underline underline-offset-4",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2 rounded-sm"
            )}
            style={{ color: "var(--t-accent-text)" }}
          >
            @junhwa
          </HoverCard.Trigger>

          <HoverCard.Portal>
            <HoverCard.Content
              sideOffset={10}
              className="rounded-xl border p-4 shadow-xl w-72"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/40 to-purple-700/20 border" style={{ borderColor: "var(--t-border-2)" }} />
                <div className="min-w-0">
                  <p className="t-text font-semibold text-sm truncate">Junhwa Park</p>
                  <p className="t-text-40 text-xs mt-0.5">Administrator · LUXE Commerce</p>
                  <p className="t-text-40 text-xs mt-2">
                    Building a Radix playground inside the dashboard.
                  </p>
                </div>
              </div>
              <HoverCard.Arrow className="fill-[var(--t-surface)]" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

