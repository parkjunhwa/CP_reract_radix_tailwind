"use client";

import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const btn = cn(
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors",
  "hover:bg-[var(--t-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixToastPage() {
  const [open, setOpen] = useState(false);

  return (
    <ExampleShell title="Toast" description="A succinct message that is displayed temporarily.">
      <ExamplePanel title="Publish a toast" description="Press the button; toast appears bottom-right.">
        <Toast.Provider duration={4000} swipeDirection="right">
          <button
            className={btn}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
            onClick={() => setOpen(false)}
            type="button"
          >
            Reset
          </button>
          <button
            className={cn(btn, "ml-2")}
            style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}
            onClick={() => setOpen(true)}
            type="button"
          >
            Show toast
          </button>

          <Toast.Root
            open={open}
            onOpenChange={setOpen}
            className="rounded-xl border p-4 shadow-xl grid gap-2"
            style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
          >
            <Toast.Title className="t-text font-semibold text-sm">Saved</Toast.Title>
            <Toast.Description className="t-text-40 text-xs">Your settings have been updated.</Toast.Description>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Toast.Action
                altText="Undo the save"
                className={btn}
                style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              >
                Undo
              </Toast.Action>
              <Toast.Close
                className={btn}
                style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                aria-label="Dismiss"
              >
                Dismiss
              </Toast.Close>
            </div>
          </Toast.Root>

          <Toast.Viewport
            className="fixed bottom-4 right-4 w-[360px] max-w-[92vw] outline-none z-50"
            aria-label="Notifications"
          />
        </Toast.Provider>
      </ExamplePanel>
    </ExampleShell>
  );
}

