"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3, Package,
  Settings, HelpCircle, ChevronLeft, ChevronRight, ChevronDown, Diamond,
  Bell, Globe, CreditCard, FileText, X, Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipCssVars = {
  "--tooltip-bg"?: string;
  "--tooltip-fg"?: string;
  "--tooltip-border"?: string;
};

type NavLeaf = {
  label: string;
  href: string;
  icon?: React.ElementType;
  badge?: string | null;
};

type NavSection = NavLeaf & {
  children: NavItemType[];
};

type NavItemType = NavLeaf | NavSection;

/** Placeholder nav (no routes): 5-level nested example for the sidebar. Hash hrefs are unique for expand/collapse state. */
const fiveDepthMenuNav: NavSection = {
  label: "5depth Menu",
  icon: Layers,
  href: "#5depth",
  badge: null,
  children: [
    {
      label: "1 depth",
      href: "#5depth-1",
      badge: null,
      children: [
        {
          label: "2 depth",
          href: "#5depth-2",
          badge: null,
          children: [
            {
              label: "3 depth",
              href: "#5depth-3",
              badge: null,
              children: [
                {
                  label: "4 depth",
                  href: "#5depth-4",
                  badge: null,
                  children: [{ label: "5 depth (leaf)", href: "#", badge: null }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const mainNav: readonly NavItemType[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/",              badge: null },
  { label: "Orders",    icon: ShoppingBag,     href: "/orders",        badge: "12" },
  { label: "Products",  icon: Package,         href: "/products",      badge: null },
  { label: "Clients",   icon: Users,           href: "/clients",       badge: "3"  },
  { label: "Analytics", icon: BarChart3,       href: "/analytics",     badge: null },
  { label: "Invoices",  icon: FileText,        href: "/invoices",      badge: null },
  { label: "Payments",  icon: CreditCard,      href: "/payments",      badge: null },
  { label: "Markets",   icon: Globe,           href: "/markets",       badge: null },
  { label: "Radix",    icon: Diamond,         href: "/radix",         badge: null },
  fiveDepthMenuNav,
] as const satisfies readonly NavItemType[];

const bottomNav = [
  { label: "Notifications", icon: Bell,       href: "/notifications", badge: "5"  },
  { label: "Settings",      icon: Settings,   href: "/settings",      badge: null },
  { label: "Help",          icon: HelpCircle, href: "/help",          badge: null },
];

function NavItem({
  label, icon: Icon, href, badge, active, collapsed, onClick,
}: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; active: boolean; collapsed: boolean; onClick?: () => void;
}) {
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
    active
      ? "bg-[var(--luxe-accent-2)] border"
      : "hover:bg-[var(--t-hover)]",
    collapsed && "justify-center"
  );

  const iconEl = (
    <Icon
      aria-hidden="true"
      className={cn("flex-shrink-0 w-4 h-4 transition-colors",
        active ? "text-[var(--t-accent-text)]" : "opacity-40 group-hover:opacity-70")}
    />
  );

  const content = collapsed ? (
    <>{iconEl}<span className="sr-only">{label}</span></>
  ) : (
    <>
      {iconEl}
      <span className="flex-1" style={{ color: active ? "var(--t-accent-text)" : "var(--luxe-text-40)" }}>
        {label}
      </span>
      {badge && (
        <Badge
          aria-label={`${badge} items`}
          className="text-[10px] h-4 px-1.5 border"
          style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}
        >
          {badge}
        </Badge>
      )}
    </>
  );

  const link = (
    <Link
      href={href}
      className={cls}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {content}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {link}
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="text-xs"
          style={{
            "--tooltip-bg": "var(--luxe-sidebar-2)",
            "--tooltip-border": "var(--luxe-border-2)",
            "--tooltip-fg": "var(--luxe-text)",
          } as React.CSSProperties & TooltipCssVars}
        >
          {label}{badge && <span className="ml-1.5 text-violet-400">({badge})</span>}
        </TooltipContent>
      </Tooltip>
    );
  }
  return link;
}

function SubNavItem({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
        active ? "bg-[var(--luxe-accent-2)] border" : "hover:bg-[var(--t-hover)]"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity",
          active ? "opacity-100" : "opacity-25 group-hover:opacity-50"
        )}
        style={{ backgroundColor: "var(--t-accent)" }}
      />
      <span className="flex-1" style={{ color: active ? "var(--t-accent-text)" : "var(--luxe-text-40)" }}>
        {label}
      </span>
    </Link>
  );
}

function isSection(item: NavItemType): item is NavSection {
  return "children" in item;
}

function navHrefActive(href: string, pathname: string, hash: string): boolean {
  if (href.includes("#")) {
    const [path, frag] = href.split("#");
    return pathname === path && hash === `#${frag}`;
  }
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(`${href}/`)) return true;
  return false;
}

function hasActiveDescendant(node: NavItemType, pathname: string, hash: string): boolean {
  if (navHrefActive(node.href, pathname, hash)) return true;
  if (!isSection(node)) return false;
  return node.children.some((c) => hasActiveDescendant(c, pathname, hash));
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, [pathname]);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const toggleOpen = (href: string) => setOpenMap((m) => ({ ...m, [href]: !(m[href] ?? false) }));
  const getOpen = (node: NavSection, depth: number) => {
    const explicit = openMap[node.href];
    if (explicit !== undefined) return explicit;
    return depth === 0 ? false : hasActiveDescendant(node, pathname, hash);
  };

  const renderNav = (items: readonly NavItemType[], depth: number) => {
    /* depth 0…5 → up to 5 nested sidebar levels under a root section (leaves at depth 5) */
    if (depth >= 6) return null;
    return (
      <div className={cn(depth === 0 ? "flex flex-col gap-0.5" : "space-y-0.5")}>
        {items.map((item) => {
          const active = hasActiveDescendant(item, pathname, hash);

          if (!isSection(item)) {
            if (depth === 0) {
              return (
                <NavItem
                  key={item.href}
                  label={item.label}
                  icon={item.icon ?? Diamond}
                  href={item.href}
                  badge={item.badge}
                  active={navHrefActive(item.href, pathname, hash)}
                  collapsed={collapsed}
                  onClick={onClose}
                />
              );
            }
            return (
              <SubNavItem
                key={item.href}
                label={item.label}
                href={item.href}
                active={navHrefActive(item.href, pathname, hash)}
                onClick={onClose}
              />
            );
          }

          // collapsed sidebar: render only the section link (no children UI)
          if (collapsed) {
            return (
              <NavItem
                key={item.href}
                label={item.label}
                icon={item.icon ?? Diamond}
                href={item.href}
                badge={item.badge}
                active={active}
                collapsed={collapsed}
                onClick={onClose}
              />
            );
          }

          const open = getOpen(item, depth);
          const headerLink =
            depth === 0 ? (
              <NavItem
                label={item.label}
                icon={item.icon ?? Diamond}
                href={item.href}
                badge={item.badge}
                active={active}
                collapsed={false}
                onClick={onClose}
              />
            ) : (
              <SubNavItem label={item.label} href={item.href} active={navHrefActive(item.href, pathname, hash)} onClick={onClose} />
            );

          return (
            <div key={item.href} className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="flex-1 min-w-0">{headerLink}</div>
                <button
                  type="button"
                  aria-label={open ? `Collapse ${item.label} section` : `Expand ${item.label} section`}
                  onClick={() => toggleOpen(item.href)}
                  className={cn(
                    "inline-flex items-center justify-center shrink-0 py-2 px-0.5 rounded-md border-0 bg-transparent",
                    "text-sm leading-none text-[var(--luxe-text-40)]",
                    "transition-colors hover:text-[var(--luxe-text)] hover:bg-transparent",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-offset-0"
                  )}
                >
                  {open ? (
                    <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </div>

              {open && (
                <div className={cn("space-y-0.5", depth === 0 ? "pl-6" : "pl-4")}>
                  {renderNav(item.children, depth + 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <aside
      aria-label="Sidebar navigation"
      className={cn(
        "sidebar-panel relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
      style={{ backgroundColor: "var(--luxe-sidebar)", borderColor: "var(--luxe-border)" }}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 gap-3", collapsed && "justify-center px-0")}>
        <Link
          href="/"
          aria-label="LUXE Commerce home"
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <Diamond className="w-4 h-4 text-white" aria-hidden="true" />
        </Link>
        {!collapsed && (
          <div className="flex flex-col leading-tight flex-1 min-w-0">
            <span className="font-semibold text-sm tracking-wide" style={{ color: "var(--luxe-text)" }}>LUXE</span>
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--luxe-text-30)" }}>Commerce</span>
          </div>
        )}
        {!collapsed && onClose && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex-shrink-0"
            style={{ color: "var(--luxe-text-30)" }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Separator aria-hidden="true" style={{ backgroundColor: "var(--luxe-border)" }} />

      {/* Main nav */}
      <nav aria-label="Primary navigation" className="flex-1 flex flex-col gap-0.5 px-2 py-4 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] px-2 mb-2 opacity-30" style={{ color: "var(--luxe-text)" }} aria-hidden="true">
            Main Menu
          </p>
        )}
        {renderNav(mainNav, 0)}
      </nav>

      <Separator aria-hidden="true" style={{ backgroundColor: "var(--luxe-border)" }} />

      {/* Bottom nav */}
      <nav aria-label="Secondary navigation" className="flex flex-col gap-0.5 px-2 py-4">
        {bottomNav.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} collapsed={collapsed} onClick={onClose} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full border items-center justify-center transition-all duration-150 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        style={{ backgroundColor: "var(--luxe-sidebar-2)", borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-40)" }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" aria-hidden="true" />
          : <ChevronLeft className="w-3 h-3" aria-hidden="true" />
        }
      </button>
    </aside>
  );
}
