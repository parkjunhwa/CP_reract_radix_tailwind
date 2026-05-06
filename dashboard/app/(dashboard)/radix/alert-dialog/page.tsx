"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2";

export default function RadixAlertDialogPage() {
  return (
    <ExampleShell title="Alert Dialog" description="A modal dialog that interrupts the user and expects a response.">
      <ExamplePanel title="Destructive confirmation" description="Focus is trapped and moved into the dialog.">
        <AlertDialog.Root>
          <AlertDialog.Trigger
            className={cn(btn, "hover:bg-[var(--t-hover)]")}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            Delete invoice…
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/60" />
            <AlertDialog.Content
              className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border)" }}
            >
              <AlertDialog.Title className="t-text font-semibold text-sm">Delete invoice</AlertDialog.Title>
              <AlertDialog.Description className="t-text-40 text-xs mt-1.5">
                This action cannot be undone. The invoice will be permanently removed.
              </AlertDialog.Description>

              <div className="mt-5 flex items-center justify-end gap-2">
                <AlertDialog.Cancel
                  className={cn(btn, "hover:bg-[var(--t-hover)]")}
                  style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                >
                  Cancel
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  className={cn(btn)}
                  style={{ backgroundColor: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.3)", color: "rgb(248,113,113)" }}
                >
                  Delete
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

