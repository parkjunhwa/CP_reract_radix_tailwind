import type { BreadcrumbItem } from "@/components/ui/breadcrumb";

/** Per-route metadata. Anything not listed falls back to URL-derived defaults. */
export type PageMeta = {
  title?: string;
  description?: string;
};

/** Title casing fallback when a segment isn't in `SEGMENT_LABELS`. */
const titleCase = (seg: string) =>
  seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Friendly labels for known URL segments (keys must match the path slug). */
const SEGMENT_LABELS: Record<string, string> = {
  // top-level groupings
  apps: "Apps",
  dashboards: "Dashboards",
  forms: "Forms",
  charts: "Charts",
  pages: "Pages",
  "user-interface": "User Interface",
  "front-pages": "Front Pages",
  "react-table": "React Table",
  radix: "Radix",
  // app modules
  ecommerce: "eCommerce",
  invoice: "Invoice",
  email: "Email",
  chat: "Chat",
  calendar: "Calendar",
  kanban: "Kanban",
  user: "User",
  users: "Users",
  roles: "Roles",
  permissions: "Permissions",
  academy: "Academy",
  logistics: "Logistics",
  customers: "Customers",
  products: "Products",
  orders: "Orders",
  details: "Details",
  list: "List",
  add: "Add",
  edit: "Edit",
  preview: "Preview",
  view: "View",
  category: "Categories",
  "manage-reviews": "Manage Reviews",
  referrals: "Referrals",
  settings: "Settings",
  dashboard: "Dashboard",
  "course-details": "Course Details",
  "my-courses": "My Courses",
  fleet: "Fleet",
  // forms / charts / tables
  "form-layouts": "Form Layouts",
  "form-validation": "Form Validation",
  "form-wizard": "Form Wizard",
  "apex-charts": "Apex Charts",
  recharts: "Recharts",
  // pages / utilities
  "user-profile": "User Profile",
  "account-settings": "Account Settings",
  faq: "FAQ",
  pricing: "Pricing",
  "widget-examples": "Widget Examples",
  "wizard-examples": "Wizard Examples",
  basic: "Basic",
  advanced: "Advanced",
  statistics: "Statistics",
  actions: "Actions",
  checkout: "Checkout",
  "create-deal": "Create Deal",
  "property-listing": "Property Listing",
  // user-interface section
  "mui-table": "MUI Table",
  "form-elements": "Form Elements",
  foundation: "Foundation",
  components: "Components",
  colors: "Colors",
  typography: "Typography",
  shadows: "Shadows",
  icons: "Icons",
  // misc
  payment: "Payment",
  landing: "Landing",
  "help-center": "Help Center",
  article: "Article",
};

/**
 * URL prefixes whose grandchild route is purely a grouping container without
 * its own page (so it must appear in the breadcrumb without a link).
 */
const NON_LINK_GROUPS = new Set([
  "apps",
  "pages",
  "forms",
  "charts",
  "dashboards",
  "user-interface",
  "products",
  "orders",
  "customers",
  "details",
  "auth",
  "misc",
  "widget-examples",
  "wizard-examples",
  "ecommerce",
  "academy",
  "logistics",
  "user",
  "invoice",
  "foundation",
  "email",
  "front-pages",
]);

/** Routes that should not get an automatic preamble (full-screen splash, etc.). */
const SKIP_PREFIXES = ["/pages/auth/"] as const;

/** Per-pathname overrides for title and description. */
const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Dashboard",
    description: "Welcome back. Here's what's happening across LUXE today.",
  },

  // Dashboards
  "/dashboards/crm": {
    title: "CRM",
    description: "Sales pipeline, leads, and customer insights.",
  },
  "/dashboards/analytics": {
    title: "Analytics",
    description: "Cross-store traffic, engagement, and conversion.",
  },
  "/dashboards/ecommerce": {
    title: "eCommerce",
    description: "Revenue, orders, and product performance.",
  },
  "/dashboards/academy": {
    title: "Academy",
    description: "Learning programs, instructors, and learner outcomes.",
  },
  "/dashboards/logistics": {
    title: "Logistics",
    description: "Fleet, deliveries, and route optimization.",
  },

  // Radix
  "/radix": {
    title: "Radix Primitives",
    description: "@radix-ui 프리미티브 및 Form(upload · editor) 예제",
  },

  // User Interface
  "/user-interface/foundation": {
    title: "Foundation",
    description:
      "Design tokens — colors, typography, shadows, and icons — that power every LUXE surface.",
  },
  "/user-interface/foundation/colors": {
    title: "Color",
    description:
      "Solid intents and opacity scales used by the LUXE palette. Mirrors the MUI palette tokens.",
  },
  "/user-interface/foundation/typography": {
    title: "Typography",
    description:
      "Type scale used across LUXE — headings, body, subtitles, plus utility variants and color tokens.",
  },
  "/user-interface/foundation/shadows": {
    title: "Shadows",
    description:
      "Elevation tokens used by surfaces, popovers, dialogs, and accent intents.",
  },
  "/user-interface/foundation/icons": {
    title: "Iconography",
    description: "luxe는 lucid icon의 시스템을 사용합니다.",
  },
  "/user-interface/components": {
    title: "Components",
    description:
      "A live tour of the LUXE component catalog — accordions, alerts, dialogs, menus, and more.",
  },
  "/user-interface/form-elements": {
    title: "Form Elements",
    description:
      "LUXE-styled inputs, pickers, and layout patterns. Radix-based controls (select, checkbox, slider, …) live under Radix UI.",
  },
  "/user-interface/mui-table": {
    title: "MUI Table",
    description:
      "Tabular layouts mirroring the Vuexy table catalog — basic, dense, sticky, collapsible, spanning, customized, and sortable selecting tables.",
  },

  // Forms & Tables
  "/forms/form-layouts": {
    title: "Form Layouts",
    description: "Single-column, two-column, and section-based form layouts.",
  },
  "/forms/form-validation": {
    title: "Form Validation",
    description: "Real-time validation patterns with inline feedback.",
  },
  "/forms/form-wizard": {
    title: "Form Wizard",
    description: "Multi-step flows with progress indicators.",
  },
  "/react-table": {
    title: "React Table",
    description: "Headless table primitive with sorting, filtering, and pagination.",
  },

  // Charts
  "/charts/apex-charts": { title: "Apex Charts" },
  "/charts/recharts": { title: "Recharts" },
  "/charts/chart-js": { title: "Chart.js" },

  // Apps — eCommerce
  "/apps/ecommerce/products/list": { title: "Products" },
  "/apps/ecommerce/products/add": { title: "Add Product" },
  "/apps/ecommerce/products/category": { title: "Categories" },
  "/apps/ecommerce/orders/list": { title: "Orders" },
  "/apps/ecommerce/customers/list": { title: "Customers" },
  "/apps/ecommerce/manage-reviews": { title: "Manage Reviews" },
  "/apps/ecommerce/referrals": { title: "Referrals" },
  "/apps/ecommerce/settings": { title: "eCommerce Settings" },

  // Apps — Invoice
  "/apps/invoice/list": { title: "Invoices" },
  "/apps/invoice/add": { title: "New Invoice" },
  "/apps/invoice/edit": { title: "Edit Invoice" },
  "/apps/invoice/preview": { title: "Invoice Preview" },

  // Apps — User
  "/apps/user/list": { title: "Users" },
  "/apps/user/view": { title: "User Profile" },
  "/apps/roles": { title: "Roles" },
  "/apps/permissions": { title: "Permissions" },

  // Apps — Academy
  "/apps/academy/my-courses": { title: "My Courses" },
  "/apps/academy/course-details": { title: "Course Details" },

  // Apps — Logistics
  "/apps/logistics/fleet": { title: "Fleet" },

  // Apps — Communication
  "/apps/email": { title: "Email" },
  "/apps/chat": { title: "Chat" },
  "/apps/calendar": { title: "Calendar" },
  "/apps/kanban": { title: "Kanban" },

  // Pages
  "/pages/account-settings": { title: "Account Settings" },
  "/pages/user-profile": { title: "User Profile" },
  "/pages/faq": { title: "FAQ" },
  "/pages/pricing": { title: "Pricing" },
  "/pages/widget-examples/basic": { title: "Basic Widgets" },
  "/pages/widget-examples/advanced": { title: "Advanced Widgets" },
  "/pages/widget-examples/statistics": { title: "Statistics Widgets" },
  "/pages/widget-examples/charts": { title: "Chart Widgets" },
  "/pages/widget-examples/actions": { title: "Action Widgets" },
  "/pages/wizard-examples/checkout": { title: "Checkout Wizard" },
  "/pages/wizard-examples/create-deal": { title: "Create Deal" },
  "/pages/wizard-examples/property-listing": { title: "Property Listing" },
};

export type ResolvedMeta = {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  /** When true, the layout should not render any preamble for this route. */
  skip: boolean;
};

/** Resolve breadcrumb + title + description for a given pathname. */
export function resolvePageMeta(pathname: string): ResolvedMeta {
  const skip = SKIP_PREFIXES.some((p) => pathname.startsWith(p));

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumb: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    currentPath += `/${seg}`;
    const isLast = i === segments.length - 1;

    const segOverride = PAGE_META[currentPath]?.title;
    const fallback = SEGMENT_LABELS[seg] ?? titleCase(seg);
    const label = segOverride ?? fallback;

    const linkable = !isLast && !NON_LINK_GROUPS.has(seg);
    breadcrumb.push({ label, href: linkable ? currentPath : undefined });
  }

  const override = PAGE_META[pathname];
  const fallbackTitle =
    segments.length === 0
      ? "Dashboard"
      : SEGMENT_LABELS[segments[segments.length - 1]] ??
        titleCase(segments[segments.length - 1]);

  return {
    title: override?.title ?? fallbackTitle,
    description: override?.description,
    breadcrumb,
    skip,
  };
}
