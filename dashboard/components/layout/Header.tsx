"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, Sun, Moon, Monitor, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
const pageMeta: Record<string, { title: string; sub: string }> = {
  "/":               { title: "Overview",       sub: "Tuesday, May 6, 2026" },
  "/orders":         { title: "Orders",         sub: "Manage and track all transactions" },
  "/products":       { title: "Products",       sub: "Catalog and inventory management" },
  "/clients":        { title: "Clients",        sub: "Client relationship management" },
  "/analytics":      { title: "Analytics",      sub: "Performance insights and trends" },
  "/invoices":       { title: "Invoices",       sub: "Invoices and billing" },
  "/payments":       { title: "Payments",       sub: "Payment ledger" },
  "/markets":        { title: "Markets",        sub: "Regional revenue analysis" },
  "/notifications":  { title: "Notifications",  sub: "Activity alerts and updates" },
  "/settings":       { title: "Settings",       sub: "Account and preferences" },
  "/help":           { title: "Help & Support", sub: "Docs and support tickets" },
  "/profile":        { title: "My Profile",     sub: "Account overview" },
  "/radix":          { title: "Radix",          sub: "Primitives playground" },
};

const THEME_OPTIONS = [
  { value: "light",  label: "Light",  icon: Sun },
  { value: "dark",   label: "Dark",   icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

const PROFILE_MENU = [
  { label: "My profile", href: "/profile" },
  { label: "Settings",   href: "/settings" },
  { label: "API keys",   href: "/settings?tab=api" },
];

interface HeaderProps { onMenuToggle?: () => void; }

const iconBtn = "w-9 h-9 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)]";

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const meta = pathname === "/radix" ? pageMeta["/radix"] : (pageMeta[pathname] ?? { title: "Dashboard", sub: "" });
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "light" ? Sun : theme === "system" ? Monitor : Moon;

  return (
    <header
      role="banner"
      className="header-panel h-16 flex items-center justify-between px-4 md:px-6 backdrop-blur-md border-b sticky top-0 z-30 flex-shrink-0"
      style={{ backgroundColor: "rgba(var(--luxe-sidebar-rgb, 10,10,15),0.85)", borderColor: "var(--luxe-border)" }}
    >
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          aria-label="Open sidebar menu"
          onClick={onMenuToggle}
          className={cn(iconBtn, "md:hidden")}
          style={{ color: "var(--luxe-text-40)" }}
        >
          <Menu className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="font-semibold text-base leading-tight truncate" style={{ color: "var(--luxe-text)" }}>
            {meta.title}
          </h1>
          {meta.sub && (
            <p className="text-xs hidden sm:block truncate" style={{ color: "var(--luxe-text-30)" }}>
              {meta.sub}
            </p>
          )}
        </div>
      </div>

      {/* Center: search */}
      <div
        role="search"
        className="hidden md:flex items-center gap-2 w-64 lg:w-72 h-9 px-3 rounded-lg border cursor-text transition-colors"
        style={{ backgroundColor: "var(--luxe-accent-2)", borderColor: "var(--luxe-border-2)" }}
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" style={{ color: "var(--luxe-text-30)" }} />
        <span className="text-xs flex-1" style={{ color: "var(--luxe-text-30)" }}>Search (orders, products, clients…)</span>
        <kbd
          className="text-[10px] rounded px-1.5 py-0.5 font-mono border hidden lg:block"
          aria-label="Shortcut Cmd K"
          style={{ color: "var(--luxe-text-30)", borderColor: "var(--luxe-border-2)", backgroundColor: "var(--luxe-accent-2)" }}
        >⌘K</kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Current theme: ${theme}. Change theme`}
            suppressHydrationWarning
            className={cn(iconBtn, "outline-none")}
            style={{ color: "var(--luxe-text-40)" }}
          >
            <span suppressHydrationWarning>
              <ThemeIcon className="w-4 h-4" aria-hidden="true" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-36 border"
            style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)" }}
            role="menu"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal" style={{ color: "var(--luxe-text-40)" }}>
                Theme
              </DropdownMenuLabel>
              <DropdownMenuSeparator style={{ backgroundColor: "var(--luxe-border)" }} />
              {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={value}
                  role="menuitemradio"
                  aria-checked={theme === value}
                  onClick={() => setTheme(value)}
                  className={cn("flex items-center gap-2 text-sm cursor-pointer", theme === value ? "bg-[var(--luxe-accent-2)]" : "")}
                  style={{ color: theme === value ? "var(--t-accent-text)" : "var(--luxe-text-60)" }}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {label}
                  {theme === value && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--t-accent)" }} aria-hidden="true" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification bell → /notifications */}
        <Link
          href="/notifications"
          aria-label="Notifications — 5 unread"
          className={cn(iconBtn, "relative")}
          style={{ color: "var(--luxe-text-40)" }}
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[var(--luxe-sidebar)]"
          />
        </Link>

        <div className="w-px h-6 mx-1 hidden sm:block" style={{ backgroundColor: "var(--luxe-border-2)" }} aria-hidden="true" />

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open account menu"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] t-hover"
          >
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-[11px] font-semibold">
                JP
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-medium" style={{ color: "var(--luxe-text)" }}>Junhwa Park</span>
              <span className="text-[10px]" style={{ color: "var(--luxe-text-30)" }}>Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 hidden sm:block" aria-hidden="true" style={{ color: "var(--luxe-text-30)" }} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 border"
            style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)" }}
            role="menu"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal" style={{ color: "var(--luxe-text-50)" }}>
                Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator style={{ backgroundColor: "var(--luxe-border)" }} />
              {PROFILE_MENU.map(({ label, href }) => (
                <DropdownMenuItem
                  key={href}
                  className="cursor-pointer text-sm px-2 py-1.5 t-hover transition-colors rounded-sm"
                  style={{ color: "var(--luxe-text-60)" }}
                  asChild
                >
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator style={{ backgroundColor: "var(--luxe-border)" }} />
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
