"use client";

import { useState } from "react";
import {
  Bell, ChevronDown, Heart, Info, AlertTriangle, CheckCircle2, X,
  Star, Send, Plus, Minus, MoreHorizontal, ChevronRight, ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AutocompleteDemo,
  AutocompleteMultiDemo,
  BadgesExtendedDemo,
  ButtonsExtendedDemo,
  CalloutDemo,
  CheckboxCardsDemo,
  CheckboxListDemo,
  CollapsibleDemo,
  DateRangePickerDemo,
  DateTimePickerDemo,
  DialogVariantsDemo,
  DropdownRichDemo,
  IconButtonsDemo,
  LabelsDemo,
  MenubarKitchenDemo,
  NavigationMenuKitchenDemo,
  OtpFieldDemo,
  PopoverKitchenDemo,
  RadioListDemo,
  SegmentedControlDemo,
} from "./_showcase";

function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel flex h-full min-h-0 flex-col", className)}>
      <header className="shrink-0 border-b t-border px-5 py-3.5">
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        {description && <p className="t-text-40 text-xs mt-0.5">{description}</p>}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
    </section>
  );
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "What is included with the LUXE template?", a: "Pre-built dashboards, app modules, charting, and a complete component system." },
    { q: "Can I use the design system in my own project?", a: "Yes — the tokens and primitives are framework-agnostic, just bring Tailwind v4 and Radix." },
    { q: "Is dark mode supported?", a: "Every surface ships with paired dark/light tokens and prefers-color-scheme fallbacks." },
  ];
  return (
    <div className="t-divide rounded-lg" style={{ border: "1px solid var(--t-border)" }}>
      {items.map((it, idx) => (
        <div key={idx}>
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-left t-hover"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="t-text text-sm font-medium">{it.q}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${open === idx ? "rotate-180" : ""}`} />
          </button>
          {open === idx && (
            <div className="px-4 pb-3 t-text-50 text-sm">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

const ALERTS = [
  { tone: "info",    Icon: Info,         color: "#00BAD1", title: "An informational message.",  desc: "Something noteworthy that does not require action." },
  { tone: "success", Icon: CheckCircle2, color: "#28C76F", title: "Operation succeeded.",        desc: "Your changes were saved successfully." },
  { tone: "warning", Icon: AlertTriangle, color: "#FF9F43", title: "Take a closer look.",        desc: "We noticed something that may need your attention." },
  { tone: "error",   Icon: X,            color: "#FF4C51", title: "Something went wrong.",       desc: "Please try again or contact support if the issue persists." },
] as const;

function Alerts() {
  return (
    <div className="space-y-3">
      {ALERTS.map((a) => (
        <div
          key={a.tone}
          className="flex items-start gap-3 px-4 py-3 rounded-lg"
          style={{ backgroundColor: `${a.color}1A`, color: a.color }}
        >
          <a.Icon className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-sm">{a.title}</div>
            <div className="text-xs opacity-80 mt-0.5">{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Avatars() {
  const initials = ["JW", "AR", "ML", "KP", "TS"];
  const sizes = ["h-6 w-6 text-[10px]", "h-8 w-8 text-xs", "h-10 w-10 text-sm", "h-12 w-12 text-base", "h-14 w-14 text-lg"];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {initials.map((i, idx) => (
        <Avatar key={i} className={sizes[idx]}>
          <AvatarFallback>{i}</AvatarFallback>
        </Avatar>
      ))}
      <div className="ml-2 flex -space-x-2">
        {initials.slice(0, 4).map((i) => (
          <Avatar key={i} className="h-9 w-9 ring-2" style={{ boxShadow: "0 0 0 2px var(--t-surface)" }}>
            <AvatarFallback>{i}</AvatarFallback>
          </Avatar>
        ))}
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-medium"
          style={{ backgroundColor: "var(--t-surface-3)", color: "var(--t-text-60)", boxShadow: "0 0 0 2px var(--t-surface)" }}
        >
          +3
        </div>
      </div>
    </div>
  );
}

function Badges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge>
        <Bell />
        With icon
      </Badge>
    </div>
  );
}

function Buttons() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Bell"><Bell /></Button>
      </div>
    </div>
  );
}

function ButtonGroups() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="inline-flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--t-border)" }}>
        <Button variant="ghost" className="rounded-none border-r" style={{ borderRight: "1px solid var(--t-border)" }}>Day</Button>
        <Button variant="ghost" className="rounded-none border-r" style={{ borderRight: "1px solid var(--t-border)" }}>Week</Button>
        <Button variant="ghost" className="rounded-none">Month</Button>
      </div>
      <div className="inline-flex rounded-lg overflow-hidden">
        <Button className="rounded-r-none">Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-l-none border-l border-white/10" aria-label="More options">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Save & continue</DropdownMenuItem>
            <DropdownMenuItem>Save as draft</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Discard</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function Chips() {
  const [tags, setTags] = useState(["Design", "Engineering", "Product", "Operations"]);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: "var(--t-surface-3)", color: "var(--t-text-80)" }}
        >
          {t}
          <button
            type="button"
            onClick={() => setTags(tags.filter((x) => x !== t))}
            className="t-hover-2 rounded-full p-0.5"
            aria-label={`Remove ${t}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={() => setTags([...tags, `Tag ${tags.length + 1}`])}
        className="inline-flex items-center gap-1 pl-2 pr-2.5 py-1 rounded-full text-xs font-medium t-accent-text"
        style={{ backgroundColor: "var(--t-accent-soft)" }}
      >
        <Plus className="w-3 h-3" /> Add tag
      </button>
    </div>
  );
}

function ListDemo() {
  const items = [
    { name: "James Worthington", role: "Account Manager",  initials: "JW" },
    { name: "Ava Rodriguez",     role: "Concierge Lead",   initials: "AR" },
    { name: "Mateo Lin",         role: "Visual Director",  initials: "ML" },
  ];
  return (
    <ul className="rounded-lg" style={{ border: "1px solid var(--t-border)" }}>
      {items.map((i, idx) => (
        <li
          key={i.name}
          className="flex items-center gap-3 px-4 py-3 t-hover"
          style={{ borderTop: idx === 0 ? "none" : "1px solid var(--t-border)" }}
        >
          <Avatar className="h-8 w-8 text-xs">
            <AvatarFallback>{i.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="t-text text-sm font-medium truncate">{i.name}</div>
            <div className="t-text-40 text-xs truncate">{i.role}</div>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </li>
      ))}
    </ul>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(2);
  const total = 5;
  return (
    <div className="inline-flex items-center gap-1">
      <Button variant="outline" size="icon-sm" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous page">
        <ChevronLeft />
      </Button>
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n === page;
        return (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            className={`h-8 min-w-8 px-2 rounded-md text-xs font-medium ${active ? "text-white" : "t-text-60 t-hover"}`}
            style={{ backgroundColor: active ? "var(--t-accent)" : "transparent" }}
          >
            {n}
          </button>
        );
      })}
      <Button variant="outline" size="icon-sm" disabled={page === total} onClick={() => setPage((p) => Math.min(total, p + 1))} aria-label="Next page">
        <ChevronRight />
      </Button>
    </div>
  );
}

function ProgressDemo() {
  const values = [25, 50, 75, 100];
  return (
    <div className="space-y-3">
      {values.map((v) => (
        <div key={v} className="space-y-1.5">
          <div className="flex justify-between t-text-50 text-xs"><span>Loading</span><span>{v}%</span></div>
          <Progress value={v} />
        </div>
      ))}
    </div>
  );
}

function RatingsDemo() {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            aria-label={`Set rating to ${i + 1}`}
            className="t-hover-2 rounded p-1"
          >
            <Star className={`w-5 h-5 ${filled ? "fill-current" : ""}`} style={{ color: filled ? "#FF9F43" : "var(--t-text-30)" }} />
          </button>
        );
      })}
      <span className="t-text-60 text-sm ml-2">{rating} / 5</span>
    </div>
  );
}

function SnackbarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Show snackbar</Button>
      {open && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-lg t-text"
          style={{ backgroundColor: "var(--t-surface-2)", border: "1px solid var(--t-border)", boxShadow: "var(--t-shadow)" }}
          role="status"
        >
          <CheckCircle2 className="w-4 h-4" style={{ color: "#28C76F" }} />
          <span className="text-sm">Settings saved successfully.</span>
          <Button variant="ghost" size="icon-xs" onClick={() => setOpen(false)} aria-label="Dismiss">
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}

function SwiperDemo() {
  const slides = [
    { title: "Curated for you",  bg: "linear-gradient(135deg,#7367F0,#675DD8)" },
    { title: "Always evolving",  bg: "linear-gradient(135deg,#00BAD1,#00A7BC)" },
    { title: "Built for scale",  bg: "linear-gradient(135deg,#28C76F,#24B364)" },
  ];
  const [idx, setIdx] = useState(0);
  return (
    <div className="space-y-3">
      <div
        className="h-32 rounded-xl flex items-center justify-center text-white text-lg font-semibold transition-all"
        style={{ background: slides[idx].bg }}
      >
        {slides[idx].title}
      </div>
      <div className="flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className="h-2 rounded-full transition-all"
            style={{
              width: i === idx ? 24 : 8,
              backgroundColor: i === idx ? "var(--t-accent)" : "var(--t-border-2)",
            }}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="t-text-60 text-sm pt-3">
        Top-line metrics and KPIs across the LUXE estate.
      </TabsContent>
      <TabsContent value="activity" className="t-text-60 text-sm pt-3">
        Recent activity, audit logs, and user changes.
      </TabsContent>
      <TabsContent value="settings" className="t-text-60 text-sm pt-3">
        Workspace, billing, and integration controls.
      </TabsContent>
    </Tabs>
  );
}

function TimelineDemo() {
  const events = [
    { time: "09:14", title: "Order #LX-2041 placed",     desc: "Ava Rodriguez · Manhattan flagship",   color: "#7367F0" },
    { time: "10:02", title: "Inventory rebalanced",      desc: "Prada — 14 units redistributed",       color: "#00BAD1" },
    { time: "11:48", title: "Concierge ticket resolved", desc: "VIP-118 marked as completed",          color: "#28C76F" },
    { time: "13:30", title: "Pricing review scheduled",  desc: "Marketing & merchandising sync",       color: "#FF9F43" },
  ];
  return (
    <ol className="space-y-3">
      {events.map((e, idx) => (
        <li key={idx} className="relative pl-7">
          <span
            className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: e.color, boxShadow: `0 0 0 4px ${e.color}33` }}
          />
          {idx < events.length - 1 && (
            <span className="absolute left-[10px] top-4 bottom-[-1rem] w-px" style={{ backgroundColor: "var(--t-border)" }} />
          )}
          <div className="flex items-baseline justify-between gap-3">
            <div className="t-text text-sm font-medium">{e.title}</div>
            <div className="t-text-40 text-xs">{e.time}</div>
          </div>
          <div className="t-text-50 text-xs mt-0.5">{e.desc}</div>
        </li>
      ))}
    </ol>
  );
}

function ToastsDemo() {
  const [toasts, setToasts] = useState<{ id: number; title: string; tone: "info" | "success" | "warning" | "error" }[]>([]);

  const push = (tone: "info" | "success" | "warning" | "error") => {
    const id = Date.now();
    const titleMap = {
      info: "New update available",
      success: "Changes saved",
      warning: "Approaching limit",
      error: "Failed to save",
    };
    setToasts((t) => [...t, { id, title: titleMap[tone], tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const colorMap = { info: "#00BAD1", success: "#28C76F", warning: "#FF9F43", error: "#FF4C51" };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => push("info")}>Info</Button>
        <Button variant="outline" onClick={() => push("success")}>Success</Button>
        <Button variant="outline" onClick={() => push("warning")}>Warning</Button>
        <Button variant="outline" onClick={() => push("error")}>Error</Button>
      </div>
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-lg t-text min-w-[260px]"
            style={{ backgroundColor: "var(--t-surface-2)", border: "1px solid var(--t-border)", boxShadow: "var(--t-shadow)" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colorMap[t.tone] }} />
            <span className="text-sm flex-1">{t.title}</span>
            <Button variant="ghost" size="icon-xs" onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} aria-label="Dismiss">
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoreDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline">
        <Heart />
        Like
      </Button>
      <Button variant="outline">
        <Send />
        Share
      </Button>
      <Button variant="outline">
        <Plus />
        Subscribe
      </Button>
      <Button variant="outline">
        <Minus />
        Unsubscribe
      </Button>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      <Section title="Autocomplete" description="Searchable combobox-style input.">
        <AutocompleteDemo />
      </Section>

      <Section title="Autocomplete (multi)" description="Multi-select with chips.">
        <AutocompleteMultiDemo />
      </Section>

      <Section title="Callouts" description="Structured callout blocks with icon and tone.">
        <CalloutDemo />
      </Section>

      <Section title="Collapsible" description="Expand / collapse disclosure.">
        <CollapsibleDemo />
      </Section>

      <Section title="Checkbox" description="Checkbox group states.">
        <CheckboxListDemo />
      </Section>

      <Section title="Checkbox cards" description="Selectable cards with description.">
        <CheckboxCardsDemo />
      </Section>

      <Section title="Radio" description="Radio group with stacked options.">
        <RadioListDemo />
      </Section>

      <Section title="One-time password" description="OTP input cells (Radix OTP field).">
        <OtpFieldDemo />
      </Section>

      <Section title="Date range" description="Calendar range in a popover.">
        <DateRangePickerDemo />
      </Section>

      <Section title="Date & time" description="Date picker + time field.">
        <DateTimePickerDemo />
      </Section>

      <Section title="Dialogs" description="Basic, wide, and scrollable modals.">
        <DialogVariantsDemo />
      </Section>

      <Section title="Dropdown menu" description="Labeled groups, icons, and destructive item.">
        <DropdownRichDemo />
      </Section>

      <Section title="Icon buttons" description="Icon-only action buttons.">
        <IconButtonsDemo />
      </Section>

      <Section title="Label" description="Field labels and required markers.">
        <LabelsDemo />
      </Section>

      <Section title="Menubar" description="Application-style menu bar.">
        <MenubarKitchenDemo />
      </Section>

      <Section title="Navigation menu" description="Site nav with dropdown and scroll.">
        <NavigationMenuKitchenDemo />
      </Section>

      <Section title="Popover" description="Anchored floating panel.">
        <PopoverKitchenDemo />
      </Section>

      <Section title="Segmented control" description="Single-select toggle group.">
        <SegmentedControlDemo />
      </Section>

      <Section title="Accordion" description="Vertically stacked, collapsible content panels.">
        <Accordion />
      </Section>

      <Section title="Alerts" description="Contextual feedback messages.">
        <Alerts />
      </Section>

      <Section title="Avatars" description="User imagery with size, fallback, and stacking variants.">
        <Avatars />
      </Section>

      <Section title="Badges" description="Variants, tones, and counters.">
        <div className="space-y-4">
          <Badges />
          <BadgesExtendedDemo />
        </div>
      </Section>

      <Section title="Buttons" description="Variants, sizes, and loading-style patterns.">
        <div className="space-y-4">
          <Buttons />
          <ButtonsExtendedDemo />
        </div>
      </Section>

      <Section title="Button Groups" description="Compose related actions.">
        <ButtonGroups />
      </Section>

      <Section title="Chips" description="Removable, additive labels.">
        <Chips />
      </Section>

      <Section title="List" description="Stacked content rows with avatar and trailing actions.">
        <ListDemo />
      </Section>

      <Section title="Pagination" description="Navigate through paged collections.">
        <PaginationDemo />
      </Section>

      <Section title="Progress" description="Linear progress indicators.">
        <ProgressDemo />
      </Section>

      <Section title="Ratings" description="Five-point rating scale.">
        <RatingsDemo />
      </Section>

      <Section title="Snackbar" description="Brief, non-blocking confirmation.">
        <SnackbarDemo />
      </Section>

      <Section title="Swiper" description="Featured carousel with paginated dots.">
        <SwiperDemo />
      </Section>

      <Section title="Tabs" description="Switch between contextual views.">
        <TabsDemo />
      </Section>

      <Section title="Timeline" description="Chronological feed of events.">
        <TimelineDemo />
      </Section>

      <Section title="Toasts" description="Stacked transient notifications.">
        <ToastsDemo />
      </Section>

      <Section title="More" description="Helper actions and quick examples.">
        <MoreDemo />
      </Section>
    </div>
  );
}
