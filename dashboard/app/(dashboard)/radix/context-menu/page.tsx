"use client";

import { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Check } from "lucide-react";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const itemCls = cn(
  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
  "data-[highlighted]:bg-[var(--t-hover)]"
);

export default function RadixContextMenuPage() {
  const [pinned, setPinned] = useState(false);

  return (
    <ExampleShell
      title="Context Menu"
      description="Displays a menu located at the pointer, triggered by right click or long press."
    >
      <ExamplePanel title="Right click the box" description="Long press also works on touch devices.">
        <ContextMenu.Root>
          <ContextMenu.Trigger asChild>
            <div
              className={cn(
                "h-40 w-full max-w-xl rounded-xl border flex items-center justify-center text-sm select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
              )}
              tabIndex={0}
              style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text-70)" }}
            >
              Right click (or long press) here
            </div>
          </ContextMenu.Trigger>

          <ContextMenu.Portal>
            <ContextMenu.Content
              className="min-w-56 rounded-xl border p-1 shadow-xl"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
            >
              <ContextMenu.Item
                className={itemCls}
                style={{ color: "var(--t-text-70)" }}
                onSelect={() => alert("Open")}
              >
                Open
              </ContextMenu.Item>
              <ContextMenu.Item
                className={itemCls}
                style={{ color: "var(--t-text-70)" }}
                onSelect={() => alert("Duplicate")}
              >
                Duplicate
              </ContextMenu.Item>
              <ContextMenu.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />

              <ContextMenu.CheckboxItem
                checked={pinned}
                onCheckedChange={(v) => setPinned(v === true)}
                className={itemCls}
                style={{ color: "var(--t-text-70)" }}
              >
                <span className="w-4 h-4 inline-flex items-center justify-center">
                  {pinned && <Check className="w-4 h-4" aria-hidden="true" />}
                </span>
                Pin
              </ContextMenu.CheckboxItem>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>

        <p className="t-text-40 text-xs mt-3">Pinned: {String(pinned)}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

