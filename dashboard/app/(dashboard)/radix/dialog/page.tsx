"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2";

export default function RadixDialogPage() {
  return (
    <ExampleShell title="Dialog" description="A window overlaid on the page, rendering content underneath inert.">
      <ExamplePanel title="Basic modal" description="Press Esc to close. Focus is trapped while open.">
        <Dialog.Root>
          <Dialog.Trigger
            className={cn(btn, "hover:bg-[var(--t-hover)]")}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            Open dialog
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60" />
            <Dialog.Content
              className="fixed left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="t-text font-semibold text-sm">Edit profile</Dialog.Title>
                  <Dialog.Description className="t-text-40 text-xs mt-1">
                    Make changes to your profile here. Click save when you&apos;re done.
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className={cn(
                    "w-9 h-9 rounded-lg border flex items-center justify-center",
                    "hover:bg-[var(--t-hover)] transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
                  )}
                  style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </Dialog.Close>
              </div>

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="t-text-50 text-xs">Display name</span>
                  <input
                    defaultValue="Junhwa Park"
                    className="mt-1 w-full h-10 px-3 rounded-lg border text-sm outline-none"
                    style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                  />
                </label>
                <label className="block">
                  <span className="t-text-50 text-xs">Email</span>
                  <input
                    defaultValue="junhwa.park@gmail.com"
                    className="mt-1 w-full h-10 px-3 rounded-lg border text-sm outline-none"
                    style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                  />
                </label>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <Dialog.Close
                  className={cn(btn, "hover:bg-[var(--t-hover)]")}
                  style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                >
                  Cancel
                </Dialog.Close>
                <Dialog.Close
                  className={cn(btn)}
                  style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}
                >
                  Save
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

