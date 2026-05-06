"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const triggerCls = cn(
  "inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm",
  "hover:bg-[var(--t-hover)] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

const linkCls = cn(
  "px-3 h-9 inline-flex items-center rounded-lg border text-sm",
  "hover:bg-[var(--t-hover)] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixNavigationMenuPage() {
  return (
    <ExampleShell title="Navigation Menu" description="A collection of links for navigating websites.">
      <ExamplePanel title="Simple menu" description="Trigger opens content; links remain accessible.">
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className="flex items-center gap-2">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/"
                  className={linkCls}
                  style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}
                >
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={triggerCls}
                style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}
              >
                Components <ChevronDown className="w-4 h-4 opacity-60" aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className="absolute left-0 top-[calc(100%+10px)] w-[min(520px,92vw)] rounded-xl border p-4 shadow-xl"
                style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Dialog", desc: "Modal interactions", href: "/radix/dialog" },
                    { title: "Dropdown Menu", desc: "Action menus", href: "/radix/dropdown-menu" },
                    { title: "Tooltip", desc: "Small hints", href: "/radix/tooltip" },
                    { title: "Toast", desc: "Transient messages", href: "/radix/toast" },
                  ].map((it) => (
                    <NavigationMenu.Link asChild key={it.href}>
                      <Link
                        href={it.href}
                        className="rounded-lg border p-3 block hover:bg-[var(--t-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
                        style={{ borderColor: "var(--t-border)", color: "var(--t-text)" }}
                      >
                        <div className="text-sm font-semibold">{it.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--t-text-40)" }}>
                          {it.desc}
                        </div>
                      </Link>
                    </NavigationMenu.Link>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/radix"
                  className={linkCls}
                  style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}
                >
                  Radix Index
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </ExamplePanel>
    </ExampleShell>
  );
}

