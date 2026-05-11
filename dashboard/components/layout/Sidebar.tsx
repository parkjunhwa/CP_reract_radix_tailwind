"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ChevronLeft, ChevronRight, ChevronDown, Diamond,
  Settings, HelpCircle, X,
  GraduationCap, Truck, Mail, MessageCircle, ShoppingCart,
  Calendar, Clipboard, FileText, User, Lock, File,
  Layout, CheckSquare, GitMerge, Table2, PieChart,
  Home, BarChart2, ExternalLink, BarChart,
  BookOpen, Navigation, Shield, ListTree,
  Component as ComponentIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DOCS_BASE = (
  process.env.NEXT_PUBLIC_DOCS_URL ??
  "https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation"
).replace(/\/$/, "");

const docHref = (path: string) => `${DOCS_BASE}${path.startsWith("/") ? path : `/${path}`}`;

/* ─── Types ─────────────────────────────────────────────────── */
type NavLeaf = {
  label: string;
  href: string;
  icon?: React.ElementType;
  badge?: string | null;
  isSection?: false;
  external?: boolean;
  /** full-version Others: 라벨+배지만 보이고 이동 없음 */
  navOnly?: boolean;
  disabled?: boolean;
};
type NavGroup = NavLeaf & { children: NavItemType[] };
type NavSectionLabel = { label: string; isSection: true; children: NavItemType[] };
type NavItemType = NavLeaf | NavGroup | NavSectionLabel;

/* ─── Nav data (mirrors full-version verticalMenuData) ──────── */
const mainNav: NavItemType[] = [
  {
    label: "Dashboards", icon: LayoutDashboard, href: "#dashboards", badge: "5",
    children: [
      { label: "CRM",        href: "/dashboards/crm" },
      { label: "Analytics",  href: "/dashboards/analytics" },
      { label: "eCommerce",  href: "/dashboards/ecommerce" },
      { label: "Academy",    href: "/dashboards/academy" },
      { label: "Logistics",  href: "/dashboards/logistics" },
    ],
  },
  {
    label: "Front Pages", icon: Home, href: "#front-pages",
    children: [
      { label: "Landing",     href: "/front-pages/landing-page" },
      { label: "Pricing",     href: "/front-pages/pricing" },
      { label: "Payment",     href: "/front-pages/payment" },
      { label: "Checkout",    href: "/front-pages/checkout" },
      { label: "Help Center", href: "/front-pages/help-center" },
      {
        label: "HC · Add product to cart",
        href: "/front-pages/help-center/article/how-to-add-product-in-cart",
      },
    ],
  },
];

const appsSection: NavSectionLabel = {
  label: "Apps & Pages", isSection: true,
  children: [
    {
      label: "eCommerce", icon: ShoppingCart, href: "#apps-ecommerce",
      children: [
        {
          label: "Products",
          href: "#ecom-products",
          children: [
            { label: "List", href: "/apps/ecommerce/products/list" },
            { label: "Add", href: "/apps/ecommerce/products/add" },
            { label: "Category", href: "/apps/ecommerce/products/category" },
          ],
        },
        {
          label: "Orders",
          href: "#ecom-orders",
          children: [
            { label: "List", href: "/apps/ecommerce/orders/list" },
            { label: "Details", href: "/apps/ecommerce/orders/details/5434" },
          ],
        },
        {
          label: "Customers",
          href: "#ecom-customers",
          children: [
            { label: "List", href: "/apps/ecommerce/customers/list" },
            { label: "Details", href: "/apps/ecommerce/customers/details/879861" },
          ],
        },
        { label: "Manage Reviews", href: "/apps/ecommerce/manage-reviews" },
        { label: "Referrals", href: "/apps/ecommerce/referrals" },
        { label: "Settings", href: "/apps/ecommerce/settings" },
      ],
    },
    {
      label: "Academy", icon: GraduationCap, href: "#apps-academy",
      children: [
        { label: "My Courses",     href: "/apps/academy/my-courses" },
        { label: "Course Details", href: "/apps/academy/course-details" },
      ],
    },
    {
      label: "Logistics", icon: Truck, href: "#apps-logistics",
      children: [
        { label: "Fleet",     href: "/apps/logistics/fleet" },
      ],
    },
    { label: "Email",    icon: Mail,          href: "/apps/email" },
    { label: "Chat",     icon: MessageCircle, href: "/apps/chat" },
    { label: "Calendar", icon: Calendar,      href: "/apps/calendar" },
    { label: "Kanban",   icon: Clipboard,     href: "/apps/kanban" },
    {
      label: "Invoice", icon: FileText, href: "#apps-invoice",
      children: [
        { label: "List",    href: "/apps/invoice/list" },
        { label: "Preview", href: "/apps/invoice/preview/4987" },
        { label: "Edit",    href: "/apps/invoice/edit/4987" },
        { label: "Add",     href: "/apps/invoice/add" },
      ],
    },
    {
      label: "User", icon: User, href: "#apps-user",
      children: [
        { label: "List", href: "/apps/user/list" },
        { label: "View", href: "/apps/user/view" },
      ],
    },
    {
      label: "Roles & Permissions", icon: Lock, href: "#apps-roles",
      children: [
        { label: "Roles",       href: "/apps/roles" },
        { label: "Permissions", href: "/apps/permissions" },
      ],
    },
    {
      label: "Pages", icon: File, href: "#pages-group",
      children: [
        { label: "User Profile",     href: "/pages/user-profile" },
        { label: "Account Settings", href: "/pages/account-settings" },
        { label: "FAQ",              href: "/pages/faq" },
        { label: "Pricing",          href: "/pages/pricing" },
        {
          label: "Miscellaneous",
          href: "#pages-misc",
          children: [
            { label: "Coming Soon",       href: "/pages/misc/coming-soon" },
            { label: "Under Maintenance", href: "/pages/misc/under-maintenance" },
            { label: "Page Not Found",    href: "/pages/misc/404-not-found" },
            { label: "Not Authorized",    href: "/pages/misc/401-not-authorized" },
          ],
        },
      ],
    },
    {
      label: "Auth Pages", icon: Shield, href: "#auth-pages",
      children: [
        { label: "Login", href: "#auth-login",
          children: [
            { label: "Login v1", href: "/pages/auth/login-v1" },
            { label: "Login v2", href: "/pages/auth/login-v2" },
          ],
        },
        { label: "Register", href: "#auth-register",
          children: [
            { label: "Register v1",          href: "/pages/auth/register-v1" },
            { label: "Register v2",          href: "/pages/auth/register-v2" },
            { label: "Register Multi-Steps", href: "/pages/auth/register-multi-steps" },
          ],
        },
        { label: "Verify Email", href: "#auth-verify",
          children: [
            { label: "Verify Email v1", href: "/pages/auth/verify-email-v1" },
            { label: "Verify Email v2", href: "/pages/auth/verify-email-v2" },
          ],
        },
        { label: "Forgot Password", href: "#auth-forgot",
          children: [
            { label: "Forgot Password v1", href: "/pages/auth/forgot-password-v1" },
            { label: "Forgot Password v2", href: "/pages/auth/forgot-password-v2" },
          ],
        },
        { label: "Reset Password", href: "#auth-reset",
          children: [
            { label: "Reset Password v1", href: "/pages/auth/reset-password-v1" },
            { label: "Reset Password v2", href: "/pages/auth/reset-password-v2" },
          ],
        },
        { label: "Two Steps", href: "#auth-two-steps",
          children: [
            { label: "Two Steps v1", href: "/pages/auth/two-steps-v1" },
            { label: "Two Steps v2", href: "/pages/auth/two-steps-v2" },
          ],
        },
      ],
    },
    {
      label: "Wizard Examples", icon: Navigation, href: "#wizard-examples",
      children: [
        { label: "Checkout",          href: "/pages/wizard-examples/checkout" },
        { label: "Property Listing",  href: "/pages/wizard-examples/property-listing" },
        { label: "Create Deal",       href: "/pages/wizard-examples/create-deal" },
      ],
    },
    {
      label: "Widget Examples", icon: BarChart, href: "#widget-examples",
      children: [
        { label: "Basic",      href: "/pages/widget-examples/basic" },
        { label: "Advanced",   href: "/pages/widget-examples/advanced" },
        { label: "Statistics", href: "/pages/widget-examples/statistics" },
        { label: "Charts",     href: "/pages/widget-examples/charts" },
        { label: "Actions",    href: "/pages/widget-examples/actions" },
      ],
    },
  ],
};

const formsSection: NavSectionLabel = {
  label: "Forms & Tables", isSection: true,
  children: [
    { label: "Form Layouts",   icon: Layout,      href: "/forms/form-layouts" },
    { label: "Form Validation", icon: CheckSquare, href: "/forms/form-validation" },
    { label: "Form Wizard",    icon: GitMerge,    href: "/forms/form-wizard" },
    {
      label: "Table",
      icon: Table2,
      href: "#tables",
      children: [
        { label: "React Table", href: "/react-table" },
        { label: "MUI Table", href: "/user-interface/mui-table" },
      ],
    },
  ],
};

const userInterfaceSection: NavSectionLabel = {
  label: "User Interface", isSection: true,
  children: [
    {
      label: "Foundation", icon: BookOpen, href: "#ui-foundation",
      children: [
        { label: "Colors",     href: "/user-interface/foundation/colors" },
        { label: "Typography", href: "/user-interface/foundation/typography" },
        { label: "Shadows",    href: "/user-interface/foundation/shadows" },
        { label: "Icons",      href: "/user-interface/foundation/icons" },
      ],
    },
    { label: "Components",    icon: ComponentIcon, href: "/user-interface/components" },
    { label: "Form Elements", icon: CheckSquare,   href: "/user-interface/form-elements" },
    { label: "Radix UI",      icon: Diamond,       href: "/radix" },
  ],
};

const chartsSection: NavSectionLabel = {
  label: "Charts & Misc", isSection: true,
  children: [
    {
      label: "Charts", icon: PieChart, href: "#charts-group",
      children: [
        { label: "Apex Charts", href: "/charts/apex-charts" },
        { label: "Recharts",    href: "/charts/recharts" },
        { label: "Chart.js",    href: "/charts/chart-js" },
      ],
    },
    /* 페이지 없음: 접기·펼치기 UX 확인용 (로컬 #만 사용) */
    {
      label: "Menu Examples",
      icon: ListTree,
      href: "#charts-menu-examples",
      children: [
        {
          label: "Sample group A",
          href: "#charts-me-a",
          children: [
            { label: "Nested item A1", href: "#charts-me-a1" },
            {
              label: "Nested item A2",
              href: "#charts-me-a2",
              children: [{ label: "Deep item A2a", href: "#charts-me-a2a" }],
            },
          ],
        },
        { label: "Sample group B", href: "#charts-me-b" },
      ],
    },
    { label: "Raise Support",  icon: HelpCircle, href: "https://pixinvent.ticksy.com", external: true },
    { label: "Documentation", icon: BookOpen,  href: DOCS_BASE,                      external: true },
    {
      label: "Others",
      icon: BarChart2,
      href: "#charts-others",
      children: [
        { label: "Item with Badge", href: "#others-badge", badge: "New", navOnly: true },
        { label: "External Link", href: "https://pixinvent.com", external: true },
        {
          label: "Menu Levels",
          href: "#menu-levels",
          children: [
            { label: "Menu Level 2.1", href: "#ml-21" },
            {
              label: "Menu Level 2.2",
              href: "#ml-22",
              children: [
                { label: "Menu Level 3.1", href: "#ml-31" },
                { label: "Menu Level 3.2", href: "#ml-32" },
              ],
            },
          ],
        },
        { label: "Disabled Menu", href: "#others-disabled", disabled: true },
      ],
    },
  ],
};

const bottomNav = [
  { label: "Settings", icon: Settings,   href: "/pages/account-settings", badge: null },
  { label: "Help",     icon: HelpCircle, href: "/pages/faq",            badge: null },
];

/* ─── Helpers ────────────────────────────────────────────────── */
function isSectionLabel(item: NavItemType): item is NavSectionLabel {
  return "isSection" in item && item.isSection === true;
}
function isNavGroup(item: NavItemType): item is NavGroup {
  return !isSectionLabel(item) && "children" in item;
}
function navActive(href: string, pathname: string): boolean {
  if (!href || href.startsWith("#") || href.startsWith("http")) return false;
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(href + "/")) return true;
  return false;
}
function hasActive(item: NavItemType, pathname: string): boolean {
  if (isSectionLabel(item)) return item.children.some(c => hasActive(c, pathname));
  if (navActive(item.href, pathname)) return true;
  if (isNavGroup(item)) return item.children.some(c => hasActive(c, pathname));
  return false;
}

/** 라우팅 가능한 주소(`/…`, 절대 URL). `#…` 플레이스홀더는 제외. */
function isRoutableHref(href: string): boolean {
  return (
    href.startsWith("/") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

/* ─── Expandable group: 한 행에서 링크 이동 + (자식 있으면) 펼침 통합 ─── */
function GroupNavRow({
  item,
  depth,
  open,
  pathname,
  active,
  collapsed,
  onExpandIfNeeded,
  onToggleFold,
  onClose,
}: {
  item: NavGroup;
  depth: number;
  open: boolean;
  pathname: string;
  active: boolean;
  collapsed: boolean;
  onExpandIfNeeded: () => void;
  onToggleFold: () => void;
  onClose?: () => void;
}) {
  const Icon = item.icon ?? Diamond;
  const hasKids = item.children.length > 0;
  const routable = isRoutableHref(item.href);
  const linkActive = navActive(item.href, pathname);
  const linkProps = item.external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const);

  const chevron =
    hasKids && !collapsed ? (
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "w-3.5 h-3.5 shrink-0 transition-transform opacity-45",
          open ? "rotate-0" : "-rotate-90"
        )}
        style={{ color: "var(--luxe-text-40)" }}
      />
    ) : null;

  if (depth === 0) {
    const cls = cn(
      "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full min-w-0",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
      active ? "bg-[var(--luxe-accent-2)] border" : "hover:bg-[var(--t-hover)]",
      collapsed && "justify-center"
    );
    const iconEl = (
      <Icon
        aria-hidden="true"
        className={cn(
          "flex-shrink-0 w-4 h-4 transition-colors",
          active ? "text-[var(--t-accent-text)]" : "opacity-40 group-hover:opacity-70"
        )}
      />
    );
    const textStyle = active ? "var(--t-accent-text)" : "var(--luxe-text-40)";
    const body = collapsed ? (
      <>
        {iconEl}
        <span className="sr-only">{item.label}</span>
      </>
    ) : (
      <>
        {iconEl}
        <span className="flex-1 text-left truncate" style={{ color: textStyle }}>
          {item.label}
        </span>
        {item.badge && (
          <Badge
            className="text-[10px] h-4 px-1.5 border flex-shrink-0"
            style={{
              backgroundColor: "var(--t-accent-soft)",
              borderColor: "var(--t-border-2)",
              color: "var(--t-accent-text)",
            }}
          >
            {item.badge}
          </Badge>
        )}
        {item.external && routable && (
          <ExternalLink className="w-3 h-3 opacity-30 flex-shrink-0" aria-hidden="true" />
        )}
        {chevron}
      </>
    );

    if (routable) {
      const row = (
        <Link
          href={item.href}
          className={cls}
          aria-current={linkActive ? "page" : undefined}
          {...(hasKids ? { "aria-expanded": open } : {})}
          onClick={() => {
            if (hasKids) onExpandIfNeeded();
            onClose?.();
          }}
          {...linkProps}
        >
          {body}
        </Link>
      );
      if (collapsed) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>{row}</TooltipTrigger>
            <TooltipContent
              side="right"
              className="text-xs"
              style={
                {
                  "--tooltip-bg": "var(--luxe-sidebar-2)",
                  "--tooltip-border": "var(--luxe-border-2)",
                  "--tooltip-fg": "var(--luxe-text)",
                } as React.CSSProperties
              }
            >
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      }
      return row;
    }

    const row = (
      <button
        type="button"
        className={cn(cls, "text-left")}
        {...(hasKids ? { "aria-expanded": open } : {})}
        onClick={() => {
          if (hasKids) onToggleFold();
        }}
      >
        {body}
      </button>
    );
    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{row}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="text-xs"
            style={
              {
                "--tooltip-bg": "var(--luxe-sidebar-2)",
                "--tooltip-border": "var(--luxe-border-2)",
                "--tooltip-fg": "var(--luxe-text)",
              } as React.CSSProperties
            }
          >
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }
    return row;
  }

  /* depth > 0: 서브메뉴 그룹 */
  const cls = cn(
    "group flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors w-full min-w-0 text-left",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
    active ? "bg-[var(--luxe-accent-2)] border" : "hover:bg-[var(--t-hover)]"
  );
  const body = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity",
          linkActive ? "opacity-100" : "opacity-25 group-hover:opacity-50"
        )}
        style={{ backgroundColor: "var(--t-accent)" }}
      />
      <span
        className="flex-1 truncate"
        style={{ color: linkActive ? "var(--t-accent-text)" : "var(--luxe-text-40)" }}
      >
        {item.label}
      </span>
      {item.badge && (
        <Badge
          className="text-[9px] h-3.5 px-1 border flex-shrink-0"
          style={{
            backgroundColor: "var(--t-accent-soft)",
            borderColor: "var(--t-border-2)",
            color: "var(--t-accent-text)",
          }}
        >
          {item.badge}
        </Badge>
      )}
      {item.external && routable && (
        <ExternalLink className="w-2.5 h-2.5 opacity-30 flex-shrink-0" aria-hidden="true" />
      )}
      {chevron}
    </>
  );

  if (routable) {
    return (
      <Link
        href={item.href}
        className={cls}
        aria-current={linkActive ? "page" : undefined}
        {...(hasKids ? { "aria-expanded": open } : {})}
        onClick={() => {
          if (hasKids) onExpandIfNeeded();
          onClose?.();
        }}
        {...linkProps}
      >
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      {...(hasKids ? { "aria-expanded": open } : {})}
      onClick={() => {
        if (hasKids) onToggleFold();
      }}
    >
      {body}
    </button>
  );
}

/* ─── NavItem (top-level clickable row) ─────────────────────── */
function NavItem({ label, icon: Icon, href, badge, active, collapsed, external, onClick }: {
  label: string; icon: React.ElementType; href: string;
  badge?: string | null; active: boolean; collapsed: boolean;
  external?: boolean; onClick?: () => void;
}) {
  const cls = cn(
    "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
    active ? "bg-[var(--luxe-accent-2)] border" : "hover:bg-[var(--t-hover)]",
    collapsed && "justify-center",
  );
  const iconEl = (
    <Icon aria-hidden="true" className={cn("flex-shrink-0 w-4 h-4 transition-colors",
      active ? "text-[var(--t-accent-text)]" : "opacity-40 group-hover:opacity-70")} />
  );
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const content = collapsed ? (
    <>{iconEl}<span className="sr-only">{label}</span></>
  ) : (
    <>
      {iconEl}
      <span className="flex-1" style={{ color: active ? "var(--t-accent-text)" : "var(--luxe-text-40)" }}>{label}</span>
      {badge && (
        <Badge className="text-[10px] h-4 px-1.5 border"
          style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}>
          {badge}
        </Badge>
      )}
      {external && <ExternalLink className="w-3 h-3 opacity-30 flex-shrink-0" />}
    </>
  );
  const link = (
    <Link href={href} className={cls} aria-current={active ? "page" : undefined}
      onClick={onClick} {...linkProps}>{content}</Link>
  );
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs"
          style={{ "--tooltip-bg": "var(--luxe-sidebar-2)", "--tooltip-border": "var(--luxe-border-2)", "--tooltip-fg": "var(--luxe-text)" } as React.CSSProperties}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  return link;
}

/* ─── SubNavItem (nested row) ───────────────────────────────── */
function SubNavItem({
  label, href, active, badge, external, onClick, navOnly, disabled,
}: {
  label: string;
  href: string;
  active: boolean;
  badge?: string | null;
  external?: boolean;
  onClick?: () => void;
  navOnly?: boolean;
  disabled?: boolean;
}) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};
  const base = cn(
    "group flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
    disabled
      ? "opacity-35 cursor-not-allowed pointer-events-none"
      : navOnly
        ? "cursor-default"
        : active
          ? "bg-[var(--luxe-accent-2)] border"
          : "hover:bg-[var(--t-hover)]",
  );

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity",
          active ? "opacity-100" : "opacity-25 group-hover:opacity-50",
        )}
        style={{ backgroundColor: "var(--t-accent)" }}
      />
      <span className="flex-1" style={{ color: active ? "var(--t-accent-text)" : "var(--luxe-text-40)" }}>
        {label}
      </span>
      {badge && (
        <Badge
          className="text-[9px] h-3.5 px-1 border"
          style={{
            backgroundColor: "var(--t-accent-soft)",
            borderColor: "var(--t-border-2)",
            color: "var(--t-accent-text)",
          }}
        >
          {badge}
        </Badge>
      )}
      {external && isRoutableHref(href) && !navOnly && !disabled && (
        <ExternalLink className="w-2.5 h-2.5 opacity-30 flex-shrink-0" aria-hidden="true" />
      )}
    </>
  );

  if (disabled) {
    return (
      <span className={base} aria-disabled="true">
        {inner}
      </span>
    );
  }
  if (navOnly) {
    return (
      <span className={base} role="presentation">
        {inner}
      </span>
    );
  }
  return (
    <Link href={href} aria-current={active ? "page" : undefined} onClick={onClick} {...linkProps} className={base}>
      {inner}
    </Link>
  );
}

/* ─── Sidebar Component ─────────────────────────────────────── */
export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggle = (key: string) => setOpenMap(m => ({ ...m, [key]: !m[key] }));
  const isOpen = (key: string, item: NavItemType, depth: number): boolean => {
    if (openMap[key] !== undefined) return openMap[key];
    return depth === 0 ? hasActive(item, pathname) : hasActive(item, pathname);
  };

  const renderItems = (items: readonly NavItemType[], depth: number): React.ReactNode => {
    if (depth >= 6) return null;
    return (
      <div className={depth === 0 ? "flex flex-col gap-0.5" : "space-y-0.5"}>
        {items.map((item, idx) => {
          if (isSectionLabel(item)) {
            return (
              <div key={`sec-${idx}`} className="mt-5 first:mt-0">
                {!collapsed ? (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2 mb-2 opacity-40"
                    style={{ color: "var(--luxe-text)" }} aria-hidden="true">{item.label}</p>
                ) : (
                  <Separator className="my-2" style={{ backgroundColor: "var(--luxe-border)" }} />
                )}
                {renderItems(item.children, depth)}
              </div>
            );
          }

          const active = hasActive(item, pathname);
          const key = `${depth}-${idx}-${item.href}`;

          if (!isNavGroup(item)) {
            if (depth === 0) {
              return (
                <NavItem key={key} label={item.label} icon={item.icon ?? Diamond} href={item.href}
                  badge={item.badge} active={navActive(item.href, pathname)}
                  collapsed={collapsed} external={item.external} onClick={onClose} />
              );
            }
            return (
              <SubNavItem
                key={key}
                label={item.label}
                href={item.href}
                active={navActive(item.href, pathname)}
                badge={item.badge}
                external={item.external}
                navOnly={Boolean(item.navOnly)}
                disabled={Boolean(item.disabled)}
                onClick={onClose}
              />
            );
          }

          if (collapsed) {
            const widenAndOpen = () => {
              setCollapsed(false);
              setOpenMap(m => ({ ...m, [key]: true }));
            };
            return (
              <GroupNavRow
                key={key}
                item={item}
                depth={0}
                open={false}
                pathname={pathname}
                active={active}
                collapsed
                onExpandIfNeeded={widenAndOpen}
                onToggleFold={widenAndOpen}
                onClose={onClose}
              />
            );
          }

          const open = isOpen(key, item, depth);
          const expandBranch = () => setOpenMap(m => ({ ...m, [key]: true }));

          return (
            <div key={key} className="space-y-0.5">
              <GroupNavRow
                item={item}
                depth={depth}
                open={open}
                pathname={pathname}
                active={active}
                collapsed={false}
                onExpandIfNeeded={() => expandBranch()}
                onToggleFold={() => toggle(key)}
                onClose={onClose}
              />
              {open && (
                <div className={cn("space-y-0.5", depth === 0 ? "pl-6" : "pl-4")}>
                  {renderItems(item.children, depth + 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const allSections: NavItemType[] = [...mainNav, formsSection, appsSection, userInterfaceSection, chartsSection];

  return (
    <aside aria-label="Sidebar navigation"
      className={cn("sidebar-panel relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-[72px]" : "w-[260px]")}
      style={{ backgroundColor: "var(--luxe-sidebar)", borderColor: "var(--luxe-border)" }}>

      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 gap-3 flex-shrink-0", collapsed && "justify-center px-0")}>
        <Link href="/" aria-label="LUXE home"
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
          <Diamond className="w-4 h-4 text-white" aria-hidden="true" />
        </Link>
        {!collapsed && (
          <div className="flex flex-col leading-tight flex-1 min-w-0">
            <span className="font-semibold text-sm tracking-wide" style={{ color: "var(--luxe-text)" }}>LUXE</span>
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--luxe-text-30)" }}>Commerce</span>
          </div>
        )}
        {!collapsed && onClose && (
          <button type="button" aria-label="Close sidebar" onClick={onClose}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex-shrink-0"
            style={{ color: "var(--luxe-text-30)" }}>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Separator aria-hidden="true" style={{ backgroundColor: "var(--luxe-border)" }} />

      {/* Scrollable nav */}
      <nav aria-label="Primary navigation" className="flex-1 min-h-0 flex flex-col gap-0.5 px-2 py-4 overflow-y-auto overflow-x-hidden">
        {!collapsed && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2 mb-2 opacity-40"
            style={{ color: "var(--luxe-text)" }} aria-hidden="true">Main Menu</p>
        )}
        {renderItems(allSections, 0)}
      </nav>

      <Separator aria-hidden="true" style={{ backgroundColor: "var(--luxe-border)" }} />

      {/* Bottom nav */}
      <nav aria-label="Secondary navigation" className="flex flex-col gap-0.5 px-2 py-3 flex-shrink-0">
        {bottomNav.map(item => (
          <NavItem key={item.href} {...item} active={navActive(item.href, pathname)}
            collapsed={collapsed} onClick={onClose} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(c => !c)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full border items-center justify-center transition-all duration-150 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        style={{ backgroundColor: "var(--luxe-sidebar-2)", borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-40)" }}>
        {collapsed
          ? <ChevronRight className="w-3 h-3" aria-hidden="true" />
          : <ChevronLeft  className="w-3 h-3" aria-hidden="true" />}
      </button>
    </aside>
  );
}
