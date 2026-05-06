"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const tabBtn = cn(
  "px-3 h-9 rounded-lg border text-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
  "hover:bg-[var(--t-hover)]",
  "data-[state=active]:bg-[var(--t-accent-soft)] data-[state=active]:text-[var(--t-accent-text)]"
);

export default function RadixTabsPage() {
  return (
    <ExampleShell title="Tabs" description="A set of layered sections of content—shown one at a time.">
      <ExamplePanel title="Account" description="Keyboard: Arrow keys move between tabs; Tab enters panel.">
        <Tabs.Root defaultValue="profile" className="max-w-2xl">
          <Tabs.List className="flex items-center gap-2">
            {[
              { v: "profile", label: "Profile" },
              { v: "security", label: "Security" },
              { v: "billing", label: "Billing" },
            ].map((t) => (
              <Tabs.Trigger
                key={t.v}
                value={t.v}
                className={tabBtn}
                style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="mt-4 rounded-lg border p-4" style={{ borderColor: "var(--t-border)" }}>
            <Tabs.Content value="profile">
              <p className="t-text text-sm font-medium">Profile</p>
              <p className="t-text-40 text-xs mt-1">Update your name, email, and public details.</p>
            </Tabs.Content>
            <Tabs.Content value="security">
              <p className="t-text text-sm font-medium">Security</p>
              <p className="t-text-40 text-xs mt-1">Manage password, sessions, and 2FA.</p>
            </Tabs.Content>
            <Tabs.Content value="billing">
              <p className="t-text text-sm font-medium">Billing</p>
              <p className="t-text-40 text-xs mt-1">Invoices, payment methods, and plans.</p>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

