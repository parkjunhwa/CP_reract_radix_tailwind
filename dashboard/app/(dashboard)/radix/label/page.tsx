"use client";

import * as Label from "@radix-ui/react-label";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixLabelPage() {
  return (
    <ExampleShell title="Label" description="Renders an accessible label associated with controls.">
      <ExamplePanel title="Input labeling" description="Clicking the label focuses the input.">
        <div className="max-w-md space-y-2">
          <Label.Root className="t-text-50 text-xs" htmlFor="email">
            Email address
          </Label.Root>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="w-full h-10 px-3 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          />
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

