"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2";

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenu.Item
      onSelect={(e) => {
        e.preventDefault();
        onSelect?.();
      }}
      className={cn(
        "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer",
        "data-[highlighted]:bg-[var(--t-hover)]"
      )}
      style={{ color: "var(--t-text-70)" }}
    >
      {children}
    </DropdownMenu.Item>
  );
}

export default function RadixDropdownMenuPage() {
  const [bookmarked, setBookmarked] = React.useState(false);
  return (
    <ExampleShell title="Dropdown Menu" description="A menu triggered by a button.">
      <ExamplePanel title="Actions menu" description="Arrow keys navigate items; Enter selects.">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            className={cn(btn, "gap-2 hover:bg-[var(--t-hover)]")}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            Actions <ChevronDown className="w-4 h-4 opacity-60" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              className="min-w-56 rounded-xl border p-1 shadow-xl"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
            >
              <Item onSelect={() => alert("Edit")}>Edit</Item>
              <Item onSelect={() => alert("Duplicate")}>Duplicate</Item>
              <DropdownMenu.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />

              <DropdownMenu.CheckboxItem
                checked={bookmarked}
                onCheckedChange={setBookmarked}
                className={cn(
                  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
                  "data-[highlighted]:bg-[var(--t-hover)]"
                )}
                style={{ color: "var(--t-text-70)" }}
              >
                <span className="w-4 h-4 inline-flex items-center justify-center">
                  {bookmarked && <Check className="w-4 h-4" aria-hidden="true" />}
                </span>
                Bookmark
              </DropdownMenu.CheckboxItem>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

