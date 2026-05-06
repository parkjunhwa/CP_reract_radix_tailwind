"use client";

import * as Separator from "@radix-ui/react-separator";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixSeparatorPage() {
  return (
    <ExampleShell title="Separator" description="Visually or semantically separates content.">
      <ExamplePanel title="Horizontal and vertical" description="Uses `orientation` and `decorative`.">
        <div className="space-y-4">
          <div>
            <p className="t-text text-sm font-medium">Account</p>
            <p className="t-text-40 text-xs mt-0.5">Manage profile, security, and billing.</p>
          </div>

          <Separator.Root decorative className="h-px w-full" style={{ backgroundColor: "var(--t-border)" }} />

          <div className="flex items-center gap-4">
            <button className="px-3 h-9 rounded-lg border text-sm" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              Profile
            </button>
            <Separator.Root decorative orientation="vertical" className="w-px h-6" style={{ backgroundColor: "var(--t-border)" }} />
            <button className="px-3 h-9 rounded-lg border text-sm" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              Security
            </button>
          </div>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

