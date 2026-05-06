"use client";

import { useState } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { Bold } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixTogglePage() {
  const [pressed, setPressed] = useState(false);

  return (
    <ExampleShell title="Toggle" description="A two-state button that can be either on or off.">
      <ExamplePanel title="Formatting toggle" description="Toggles `pressed` state.">
        <div className="flex items-center gap-3">
          <Toggle.Root
            pressed={pressed}
            onPressedChange={setPressed}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg border text-sm transition-colors",
              "hover:bg-[var(--t-hover)]",
              "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
            )}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            <Bold className="w-4 h-4 opacity-80" aria-hidden="true" />
            Bold
          </Toggle.Root>
          <p className="t-text-40 text-xs">Pressed: {String(pressed)}</p>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

