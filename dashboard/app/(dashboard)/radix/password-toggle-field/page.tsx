"use client";

import * as PasswordToggleField from "@radix-ui/react-password-toggle-field";
import { Eye, EyeOff } from "lucide-react";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const inputCls = cn(
  "w-full h-10 pl-3 pr-10 rounded-lg border text-sm outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixPasswordToggleFieldPage() {
  return (
    <ExampleShell title="Password Toggle Field" description="A password input with an integrated visibility toggle.">
      <ExamplePanel title="Basic usage" description="Toggle shows/hides the password value and keeps focus sensible.">
        <div className="max-w-md">
          <PasswordToggleField.Root>
            <div className="relative">
              <PasswordToggleField.Input
                placeholder="Enter password"
                autoComplete="current-password"
                className={inputCls}
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              />
              <PasswordToggleField.Toggle
                aria-label="Toggle password visibility"
                className={cn(
                  "absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg border flex items-center justify-center",
                  "hover:bg-[var(--t-hover)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
                )}
                style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              >
                <PasswordToggleField.Icon
                  visible={<Eye className="w-4 h-4 opacity-70" aria-hidden="true" />}
                  hidden={<EyeOff className="w-4 h-4 opacity-70" aria-hidden="true" />}
                />
              </PasswordToggleField.Toggle>
            </div>
          </PasswordToggleField.Root>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

