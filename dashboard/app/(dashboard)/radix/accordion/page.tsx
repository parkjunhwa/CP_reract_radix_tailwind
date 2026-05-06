"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

function Item({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item value={value} className="border-b last:border-b-0" style={{ borderColor: "var(--t-border)" }}>
      <Accordion.Header>
        <Accordion.Trigger
          className={cn(
            "w-full flex items-center justify-between gap-3 py-3 text-sm font-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
          )}
          style={{ color: "var(--t-text)" }}
        >
          <span>{title}</span>
          <ChevronDown className="w-4 h-4 opacity-60 transition-transform data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-3 text-sm" style={{ color: "var(--t-text-60)" }}>
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default function RadixAccordionPage() {
  return (
    <ExampleShell title="Accordion" description="A vertically stacked set of interactive headings that reveal content.">
      <ExamplePanel title="Basic" description="Single open item (type=single).">
        <Accordion.Root type="single" collapsible className="divide-y" style={{ borderColor: "var(--t-border)" }}>
          <Item value="one" title="What is Radix?">
            Radix Primitives are unstyled, accessible React components you can compose into your own design system.
          </Item>
          <Item value="two" title="Keyboard support">
            Use arrow keys to move between triggers, Enter/Space to toggle, and Home/End to jump.
          </Item>
          <Item value="three" title="Composition">
            You can style and structure the content freely while retaining accessibility.
          </Item>
        </Accordion.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

