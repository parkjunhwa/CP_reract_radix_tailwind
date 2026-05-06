"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixScrollAreaPage() {
  const items = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    label: `Order #${String(7820 + i).padStart(4, "0")}`,
  }));

  return (
    <ExampleShell title="Scroll Area" description="Augments native scrolling for custom styling.">
      <ExamplePanel title="Scrollable list" description="Custom scrollbar thumb rendered via primitives.">
        <ScrollArea.Root className="w-full max-w-lg h-56 rounded-xl border" style={{ borderColor: "var(--t-border)" }}>
          <ScrollArea.Viewport className="w-full h-full p-3">
            <div className="space-y-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text-70)" }}
                >
                  {it.label}
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="flex select-none touch-none p-1" orientation="vertical">
            <ScrollArea.Thumb className="flex-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

