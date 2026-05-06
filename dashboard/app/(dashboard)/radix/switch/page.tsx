"use client";

import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixSwitchPage() {
  const [enabled, setEnabled] = useState(true);

  return (
    <ExampleShell title="Switch" description="A control that allows the user to toggle between checked and not checked.">
      <ExamplePanel title="Toggle setting" description="Click or press Space to toggle.">
        <div className="flex items-center justify-between gap-4 max-w-md">
          <div>
            <p className="t-text text-sm font-medium">Push notifications</p>
            <p className="t-text-40 text-xs mt-0.5">Get alerts for orders and payments.</p>
          </div>

          <Switch.Root
            checked={enabled}
            onCheckedChange={setEnabled}
            className={cn(
              "w-10 h-6 rounded-full relative border transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
            )}
            style={{
              backgroundColor: enabled ? "var(--t-accent-soft)" : "var(--t-surface-2)",
              borderColor: "var(--t-border-2)",
            }}
          >
            <Switch.Thumb
              className="block w-5 h-5 rounded-full transition-transform"
              style={{
                backgroundColor: "var(--t-surface)",
                transform: enabled ? "translateX(16px)" : "translateX(2px)",
              }}
            />
          </Switch.Root>
        </div>

        <p className="t-text-40 text-xs mt-3">Enabled: {enabled ? "true" : "false"}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

