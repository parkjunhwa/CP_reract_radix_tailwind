"use client";

import { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { Check, ChevronRight } from "lucide-react";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const triggerCls = cn(
  "px-3 h-9 rounded-lg border text-sm",
  "hover:bg-[var(--t-hover)] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

const itemCls = cn(
  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
  "data-[highlighted]:bg-[var(--t-hover)]"
);

export default function RadixMenubarPage() {
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  return (
    <ExampleShell title="Menubar" description="A visually persistent menu common in desktop applications.">
      <ExamplePanel title="Basic menubar" description="Try keyboard navigation across the top-level menus.">
        <Menubar.Root
          className="inline-flex items-center gap-2 p-2 rounded-xl border"
          style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}
        >
          <Menubar.Menu>
            <Menubar.Trigger className={triggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              File
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="min-w-56 rounded-xl border p-1 shadow-xl"
                style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
              >
                <Menubar.Item className={itemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("New file")}>
                  New
                </Menubar.Item>
                <Menubar.Item className={itemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Open…")}>
                  Open…
                </Menubar.Item>
                <Menubar.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />
                <Menubar.Item className={itemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Close")}>
                  Close
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>

          <Menubar.Menu>
            <Menubar.Trigger className={triggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              View
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className="min-w-56 rounded-xl border p-1 shadow-xl"
                style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
              >
                <Menubar.CheckboxItem
                  checked={showLineNumbers}
                  onCheckedChange={(v) => setShowLineNumbers(v === true)}
                  className={itemCls}
                  style={{ color: "var(--t-text-70)" }}
                >
                  <span className="w-4 h-4 inline-flex items-center justify-center">
                    {showLineNumbers && <Check className="w-4 h-4" aria-hidden="true" />}
                  </span>
                  Line numbers
                </Menubar.CheckboxItem>

                <Menubar.Sub>
                  <Menubar.SubTrigger className={cn(itemCls, "justify-between")} style={{ color: "var(--t-text-70)" }}>
                    Theme <ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                  </Menubar.SubTrigger>
                  <Menubar.SubContent
                    className="min-w-44 rounded-xl border p-1 shadow-xl"
                    style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
                  >
                    <Menubar.Item className={itemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Dark")}>
                      Dark
                    </Menubar.Item>
                    <Menubar.Item className={itemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Light")}>
                      Light
                    </Menubar.Item>
                  </Menubar.SubContent>
                </Menubar.Sub>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        </Menubar.Root>

        <p className="t-text-40 text-xs mt-3">Line numbers: {String(showLineNumbers)}</p>
      </ExamplePanel>
    </ExampleShell>
  );
}

