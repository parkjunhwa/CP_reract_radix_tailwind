"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, Sun, Moon, Monitor, Bell, Search, X,
  User, Settings, DollarSign, HelpCircle, LogOut,
  Calendar, FileText, Users, Shield, LayoutDashboard,
  ChevronDown, Check,
} from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const SEARCH_ITEMS = [
  { section: "UI",           name: "Radix UI",         url: "/radix" },
  { section: "Dashboards",   name: "CRM",              url: "/dashboards/crm" },
  { section: "Dashboards",   name: "Analytics",        url: "/dashboards/analytics" },
  { section: "Dashboards",   name: "eCommerce",        url: "/dashboards/ecommerce" },
  { section: "Dashboards",   name: "Academy",          url: "/dashboards/academy" },
  { section: "Dashboards",   name: "Logistics",        url: "/dashboards/logistics" },
  { section: "Apps",         name: "Products",         url: "/apps/ecommerce/products/list" },
  { section: "Apps",         name: "Orders",           url: "/apps/ecommerce/orders/list" },
  { section: "Apps",         name: "Email",            url: "/apps/email" },
  { section: "Apps",         name: "Chat",             url: "/apps/chat" },
  { section: "Apps",         name: "Calendar",         url: "/apps/calendar" },
  { section: "Apps",         name: "Kanban",           url: "/apps/kanban" },
  { section: "Apps",         name: "Invoice List",     url: "/apps/invoice/list" },
  { section: "Apps",         name: "User List",        url: "/apps/user/list" },
  { section: "Apps",         name: "Roles",            url: "/apps/roles" },
  { section: "Apps",         name: "Permissions",      url: "/apps/permissions" },
  { section: "Apps",         name: "My Courses",       url: "/apps/academy/my-courses" },
  { section: "Apps",         name: "Fleet",            url: "/apps/logistics/fleet" },
  { section: "Pages",        name: "User Profile",     url: "/pages/user-profile" },
  { section: "Pages",        name: "Account Settings", url: "/pages/account-settings" },
  { section: "Pages",        name: "FAQ",              url: "/pages/faq" },
  { section: "Pages",        name: "Pricing",          url: "/pages/pricing" },
  { section: "Pages",        name: "Dialog Examples",  url: "/pages/dialog-examples" },
  { section: "Pages",        name: "Coming Soon",      url: "/pages/misc/coming-soon" },
  { section: "Pages",        name: "404 Not Found",    url: "/pages/misc/404-not-found" },
  { section: "Forms",        name: "Form Layouts",     url: "/forms/form-layouts" },
  { section: "Forms",        name: "Form Validation",  url: "/forms/form-validation" },
  { section: "Forms",        name: "Form Wizard",      url: "/forms/form-wizard" },
  { section: "Forms",        name: "React Table",      url: "/react-table" },
  { section: "Charts",       name: "Apex Charts",      url: "/charts/apex-charts" },
  { section: "Charts",       name: "Recharts",         url: "/charts/recharts" },
  { section: "Charts",       name: "Chart.js",         url: "/charts/chart-js" },
  { section: "Widgets",      name: "Widget Basic",     url: "/pages/widget-examples/basic" },
  { section: "Widgets",      name: "Widget Statistics", url: "/pages/widget-examples/statistics" },
  { section: "Wizards",      name: "Checkout Wizard",  url: "/pages/wizard-examples/checkout" },
  { section: "Wizards",      name: "Create Deal",      url: "/pages/wizard-examples/create-deal" },
  { section: "Auth",         name: "Login v1",         url: "/pages/auth/login-v1" },
  { section: "Auth",         name: "Login v2",         url: "/pages/auth/login-v2" },
  { section: "Auth",         name: "Register v1",      url: "/pages/auth/register-v1" },
];

const NOTIFICATIONS = [
  { id: 1, avatar: "CF", color: "from-violet-500 to-purple-700", title: "Congratulations Flora 🎉", sub: "Won the monthly bestseller gold badge", time: "1h ago", read: false },
  { id: 2, avatar: "CB", color: "from-sky-500 to-blue-700",    title: "Cecilia Becker", sub: "Accepted your connection", time: "12h ago", read: false },
  { id: 3, avatar: "BW", color: "from-emerald-500 to-teal-700", title: "Bernard Woods", sub: "You have new message from Bernard", time: "May 18, 8:26 AM", read: true },
  { id: 4, avatar: "MR", color: "from-amber-500 to-orange-700", title: "Monthly Report Generated", sub: "July month financial report is generated", time: "Apr 24", read: true },
  { id: 5, avatar: "GA", color: "from-rose-500 to-pink-700",   title: "Application Approved 🚀", sub: "Your project application has been approved", time: "Feb 17", read: true },
];

const SHORTCUTS = [
  { label: "Calendar",    href: "/apps/calendar",          icon: Calendar },
  { label: "Invoice",     href: "/apps/invoice/list",      icon: FileText },
  { label: "Users",       href: "/apps/user/list",         icon: Users },
  { label: "Roles",       href: "/apps/roles",             icon: Shield },
  { label: "Dashboard",   href: "/dashboards/analytics",   icon: LayoutDashboard },
  { label: "Settings",    href: "/pages/account-settings", icon: Settings },
];

const THEMES = [
  { value: "light" as const,  label: "Light",  icon: Sun },
  { value: "dark" as const,   label: "Dark",   icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

const iconBtn = "w-9 h-9 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)]";

/* ─── Search Modal ──────────────────────────────────────────── */
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  // close on navigation
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) { prevPath.current = pathname; onClose(); }
  }, [pathname, onClose]);

  const results = query.trim()
    ? SEARCH_ITEMS.filter(i =>
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        i.section.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const grouped = results.reduce<Record<string, typeof SEARCH_ITEMS>>((acc, item) => {
    (acc[item.section] ??= []).push(item);
    return acc;
  }, {});

  const handleSelect = (url: string) => { router.push(url); onClose(); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)" }}
        onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <Search className="w-4 h-4 t-text-30 flex-shrink-0" />
          <Form.Root className="flex-1">
            <Form.Field name="query">
              <Form.Control asChild>
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, apps, features…"
                  aria-label="Search"
                  className="h-auto border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 t-text-70 placeholder:t-text-30"
                  onKeyDown={(e) => e.key === "Escape" && onClose()}
                />
              </Form.Control>
            </Form.Field>
          </Form.Root>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded border font-mono t-text-30 hidden sm:block"
            style={{ borderColor: "var(--t-border-2)" }}>esc</kbd>
          <button aria-label="Close search" onClick={onClose} className="t-text-30 hover:t-text-70 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Search className="w-10 h-10 mx-auto mb-3 t-text-20" />
              <p className="t-text-50 text-sm font-medium">No results for "{query}"</p>
              <p className="t-text-30 text-xs mt-1">Try searching for pages, features, or settings</p>
            </div>
          ) : query ? (
            <div className="p-2">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section} className="mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider t-text-30 px-3 py-1.5">{section}</p>
                  {items.map(item => (
                    <button key={item.url} onClick={() => handleSelect(item.url)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-[var(--t-hover)]">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "var(--t-hover)" }}>
                        <LayoutDashboard className="w-3.5 h-3.5 t-text-40" />
                      </div>
                      <span className="t-text-70 text-sm flex-1 text-left">{item.name}</span>
                      <span className="t-text-20 text-[10px]">{item.url}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider t-text-30 px-1 mb-3">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {SHORTCUTS.map(s => {
                  const Icon = s.icon;
                  return (
                    <button key={s.href} onClick={() => handleSelect(s.href)}
                      className="flex items-center gap-3 p-3 rounded-xl border text-left transition-colors hover:bg-[var(--t-hover)]"
                      style={{ borderColor: "var(--t-border)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "var(--t-hover)" }}>
                        <Icon className="w-4 h-4 t-text-40" />
                      </div>
                      <span className="t-text-60 text-xs font-medium">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="flex items-center gap-3 px-4 py-2 text-[10px] t-text-30"
          style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border font-mono" style={{ borderColor: "var(--t-border-2)" }}>↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border font-mono" style={{ borderColor: "var(--t-border-2)" }}>↵</kbd> open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border font-mono" style={{ borderColor: "var(--t-border-2)" }}>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Notifications Dropdown ─────────────────────────────────── */
function NotificationsDropdown() {
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const unread = notes.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label={`${unread} unread notifications`}
          className={cn(iconBtn, "relative outline-none")} style={{ color: "var(--luxe-text-40)" }}>
          <Bell className="w-4 h-4" />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[var(--luxe-sidebar)]" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 border overflow-hidden"
        style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div className="flex items-center gap-2">
            <span className="t-text font-semibold text-sm">Notifications</span>
            {unread > 0 && <Badge className="text-[10px] px-1.5 h-4 border"
              style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}>{unread}</Badge>}
          </div>
          <button onClick={() => setNotes(n => n.map(x => ({ ...x, read: true })))}
            className="text-[10px] t-text-40 hover:t-text-70 transition-colors">Mark all read</button>
        </div>
        <div className="max-h-72 overflow-y-auto divide-y" style={{ borderColor: "var(--t-border)" }}>
          {notes.map(n => (
            <div key={n.id} onClick={() => setNotes(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
              className={cn("flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--t-hover)]",
                !n.read && "bg-[var(--luxe-accent-2)]")}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-bold", n.color)}>{n.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="t-text-70 text-xs font-medium leading-snug">{n.title}</p>
                <p className="t-text-40 text-[10px] mt-0.5 truncate">{n.sub}</p>
                <p className="t-text-30 text-[10px] mt-0.5">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "var(--t-accent)" }} />}
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 text-center" style={{ borderTop: "1px solid var(--t-border)" }}>
          <Link href="/pages/widget-examples/basic" className="text-xs t-text-50 hover:t-text-80 transition-colors">
            View all notifications →
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
export default function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "light" ? Sun : theme === "system" ? Monitor : Moon;

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); setSearchOpen(o => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header role="banner"
        className="h-16 flex items-center justify-between px-4 md:px-6 border-b sticky top-0 z-30 flex-shrink-0 backdrop-blur-md"
        style={{ backgroundColor: "rgba(var(--luxe-sidebar-rgb,10,10,15),0.85)", borderColor: "var(--luxe-border)" }}>

        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button type="button" aria-label="Open sidebar" onClick={onMenuToggle}
            className={cn(iconBtn, "md:hidden outline-none")} style={{ color: "var(--luxe-text-40)" }}>
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Center: search */}
        <button onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 w-64 lg:w-72 h-9 px-3 rounded-lg border cursor-text transition-colors hover:border-[var(--t-border-2)] outline-none"
          style={{ backgroundColor: "var(--luxe-accent-2)", borderColor: "var(--luxe-border-2)" }}>
          <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--luxe-text-30)" }} />
          <span className="text-xs flex-1 text-left" style={{ color: "var(--luxe-text-30)" }}>Search…</span>
          <kbd className="text-[10px] rounded px-1.5 py-0.5 font-mono border hidden lg:block"
            style={{ color: "var(--luxe-text-30)", borderColor: "var(--luxe-border-2)", backgroundColor: "var(--luxe-accent-2)" }}>⌘K</kbd>
        </button>

        {/* Right */}
        <div className="flex items-center gap-1 md:gap-1.5">
          {/* Mobile search */}
          <button aria-label="Open search" onClick={() => setSearchOpen(true)}
            className={cn(iconBtn, "md:hidden outline-none")} style={{ color: "var(--luxe-text-40)" }}>
            <Search className="w-4 h-4" />
          </button>

          {/* Theme */}
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Theme" className={cn(iconBtn, "outline-none")} style={{ color: "var(--luxe-text-40)" }}>
              <ThemeIcon className="w-4 h-4" suppressHydrationWarning />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 border"
              style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)" }}>
              {THEMES.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem key={value} onClick={() => setTheme(value)}
                  className="flex items-center gap-2 text-xs cursor-pointer"
                  style={{ color: theme === value ? "var(--t-accent-text)" : "var(--luxe-text-60)" }}>
                  <Icon className="w-3.5 h-3.5" />{label}
                  {theme === value && <Check className="w-3 h-3 ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <NotificationsDropdown />

          <div className="w-px h-6 mx-1 hidden sm:block" style={{ backgroundColor: "var(--luxe-border-2)" }} />

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors outline-none hover:bg-[var(--t-hover)]">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-[11px] font-semibold">JP</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-xs font-medium" style={{ color: "var(--luxe-text)" }}>Junhwa Park</span>
                  <span className="text-[10px]" style={{ color: "var(--luxe-text-30)" }}>Administrator</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 hidden sm:block" style={{ color: "var(--luxe-text-30)" }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-0 border overflow-hidden"
              style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-border-2)" }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-xs font-bold">JP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="t-text-80 text-sm font-semibold">Junhwa Park</p>
                  <p className="t-text-40 text-[10px]">junhwa.park@gmail.com</p>
                </div>
              </div>
              <div className="p-1">
                {[
                  { label: "My Profile", href: "/pages/user-profile",    icon: User },
                  { label: "Settings",   href: "/pages/account-settings", icon: Settings },
                  { label: "Pricing",    href: "/pages/pricing",          icon: DollarSign },
                  { label: "FAQ",        href: "/pages/faq",              icon: HelpCircle },
                ].map(({ label, href, icon: Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={href} className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs cursor-pointer t-text-60 hover:bg-[var(--t-hover)]">
                      <Icon className="w-3.5 h-3.5 t-text-40" />{label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator style={{ backgroundColor: "var(--luxe-border)" }} />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    <LogOut className="w-3.5 h-3.5" />Sign Out
                  </Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
