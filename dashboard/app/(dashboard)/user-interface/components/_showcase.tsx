"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Menubar from "@radix-ui/react-menubar";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as OTP from "@radix-ui/react-one-time-password-field";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  CreditCard,
  Info,
  LayoutGrid,
  LogOut,
  Search,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { type DateRange } from "react-day-picker";

import { CalendarPopoverFooter } from "@/components/ui/calendar-popover-footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuxDayPicker } from "@/components/ui/lux-day-picker";
import { TimeScrollPicker } from "@/components/ui/time-scroll-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItemCls =
  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2 " +
  "data-[highlighted]:bg-[color:var(--t-hover)]";

const menubarTriggerCls =
  "px-3 h-9 rounded-lg border text-sm " +
  "hover:bg-[color:var(--t-hover)] transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)] focus-visible:ring-offset-2";

const linkCls =
  "px-3 h-9 inline-flex items-center rounded-lg border text-sm " +
  "hover:bg-[color:var(--t-hover)] transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)] focus-visible:ring-offset-2";

const triggerCls =
  "inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm " +
  "hover:bg-[color:var(--t-hover)] transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)] focus-visible:ring-offset-2";

const otpInputCls = cn(
  "w-10 h-12 rounded-lg border text-center text-lg font-semibold tabular-nums outline-none",
  "focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)] focus-visible:ring-offset-2"
);

const toggleSegCls =
  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors " +
  "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground " +
  "data-[state=off]:t-text-60 hover:data-[state=off]:bg-[color:var(--t-hover)]";

/** Single-select combobox-style filter. */
export function AutocompleteDemo() {
  const opts = ["React", "Next.js", "Tailwind CSS", "Radix UI", "TypeScript", "Vite"];
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [v, setV] = useState("");
  const filtered = opts.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="relative max-w-full">
      <InputGroup>
        <InputAddon><Search className="shrink-0" /></InputAddon>
        <Input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search stack…"
          aria-autocomplete="list"
          aria-expanded={open}
        />
      </InputGroup>
      {open && filtered.length > 0 && (
        <ul
          className="absolute z-20 mt-1 max-h-40 w-full overflow-auto rounded-lg border py-1 shadow-lg"
          style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border)" }}
          role="listbox"
        >
          {filtered.map((o) => (
            <li key={o} role="option">
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-xs t-hover t-text"
                onClick={() => { setV(o); setQ(o); setOpen(false); }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
      {v && <p className="t-text-40 mt-2 text-[10px]">Selected: {v}</p>}
    </div>
  );
}

export function AutocompleteMultiDemo() {
  const opts = ["Design", "Frontend", "API", "Docs", "QA"];
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string[]>(["Design"]);
  const filtered = opts.filter((o) => !picked.includes(o) && o.toLowerCase().includes(q.toLowerCase()));

  const add = (o: string) => {
    setPicked((p) => [...p, o]);
    setQ("");
  };
  const remove = (o: string) => setPicked((p) => p.filter((x) => x !== o));

  return (
    <div className="space-y-2 max-w-full">
      <div className="flex flex-wrap gap-1.5">
        {picked.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
            style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-accent-soft)", color: "var(--t-accent-text)" }}
          >
            {t}
            <button type="button" className="t-hover-2 rounded-full p-0.5" onClick={() => remove(t)} aria-label={`Remove ${t}`}>
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Add tag…"
        size="sm"
      />
      <div className="flex flex-wrap gap-1">
        {filtered.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => add(o)}
            className="rounded-md border px-2 py-1 text-[10px] t-hover"
            style={{ borderColor: "var(--t-border)" }}
          >
            + {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalloutDemo() {
  const items = [
    { t: "info", border: "var(--color-violet-500)", bg: "rgba(139,92,246,0.08)", Icon: Info, title: "Heads up", body: "New analytics will roll out next week." },
    { t: "success", border: "#22c55e", bg: "rgba(34,197,94,0.1)", Icon: Check, title: "Saved", body: "Workspace preferences updated." },
  ] as const;
  return (
    <div className="space-y-2">
      {items.map((c) => (
        <div
          key={c.t}
          className="rounded-lg border-l-4 py-3 pr-3 pl-3"
          style={{ borderLeftColor: c.border, backgroundColor: c.bg, borderTopColor: "var(--t-border)", borderRightColor: "var(--t-border)", borderBottomColor: "var(--t-border)", borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}
        >
          <div className="flex gap-2">
            <c.Icon className="mt-0.5 size-4 shrink-0" style={{ color: c.border }} />
            <div>
              <p className="text-sm font-semibold t-text">{c.title}</p>
              <p className="mt-0.5 text-xs t-text-50">{c.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="rounded-lg border p-3" style={{ borderColor: "var(--t-border)" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium t-text">Shipping details</span>
        <Collapsible.Trigger asChild>
          <Button variant="outline" size="sm">
            {open ? "Hide" : "Show"}
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
        <p className="t-text-50 mt-3 text-xs leading-relaxed">
          Standard delivery 3–5 business days. Express available at checkout.
        </p>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function CheckboxListDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="space-y-2.5">
      <label className="flex items-center gap-2.5">
        <Checkbox checked={a} onCheckedChange={(v) => setA(v === true)} id="sc-a" />
        <span className="text-sm t-text-70">Notify me about product updates</span>
      </label>
      <label className="flex items-center gap-2.5">
        <Checkbox checked={b} onCheckedChange={(v) => setB(v === true)} id="sc-b" />
        <span className="text-sm t-text-70">Subscribe to weekly digest</span>
      </label>
      <label className="flex items-center gap-2.5 opacity-50">
        <Checkbox disabled id="sc-c" />
        <span className="text-sm t-text-50">Unavailable option</span>
      </label>
    </div>
  );
}

export function CheckboxCardsDemo() {
  const [sel, setSel] = useState<string | null>("pro");
  const cards = [
    { id: "starter", title: "Starter", desc: "For individuals", price: "$9" },
    { id: "pro", title: "Pro", desc: "Growing teams", price: "$29" },
    { id: "biz", title: "Business", desc: "Scale & SSO", price: "$99" },
  ];
  return (
    <div className="grid gap-2">
      {cards.map((c) => {
        const on = sel === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => setSel(c.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
              on ? "border-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)]" : "t-hover",
            )}
            style={!on ? { borderColor: "var(--t-border)" } : undefined}
          >
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border",
                on ? "border-[color:var(--t-accent)] bg-[color:var(--t-accent)]" : "border-[color:var(--t-border-3)]",
              )}
            >
              {on ? <Check className="size-3 text-white" strokeWidth={3} /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold t-text">{c.title}</span>
              <span className="mt-0.5 block text-[11px] t-text-50">{c.desc}</span>
              <span className="mt-1 block text-sm font-bold t-accent-text">{c.price}/mo</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function RadioListDemo() {
  return (
    <RadioGroup defaultValue="a" className="gap-2.5">
      <label className="flex items-center gap-2.5">
        <RadioGroupItem value="a" id="rd-a" />
        <span className="text-sm t-text-70">Standard shipping</span>
      </label>
      <label className="flex items-center gap-2.5">
        <RadioGroupItem value="b" id="rd-b" />
        <span className="text-sm t-text-70">Express (+$12)</span>
      </label>
      <label className="flex items-center gap-2.5 opacity-50">
        <RadioGroupItem value="c" id="rd-c" disabled />
        <span className="text-sm t-text-50">Pickup (unavailable)</span>
      </label>
    </RadioGroup>
  );
}

export function OtpFieldDemo() {
  const [value, setValue] = useState("");
  const len = 6;
  return (
    <div className="space-y-2">
      <OTP.Root
        value={value}
        onValueChange={setValue}
        validationType="numeric"
        autoComplete="one-time-code"
        className="flex flex-wrap items-center gap-2"
      >
        {Array.from({ length: len }).map((_, i) => (
          <OTP.Input
            key={i}
            index={i}
            className={otpInputCls}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          />
        ))}
        <OTP.HiddenInput name="otp-demo" />
      </OTP.Root>
      <p className="text-[10px] t-text-40">Joined value: {value || "—"}</p>
      <div className="pointer-events-none opacity-50">
        <p className="mb-1 text-[10px] font-medium uppercase t-text-40">Disabled</p>
        <OTP.Root validationType="numeric" disabled className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <OTP.Input key={i} index={i} className={otpInputCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }} />
          ))}
          <OTP.HiddenInput name="otp-dis" />
        </OTP.Root>
      </div>
    </div>
  );
}

export function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [pending, setPending] = useState<DateRange | undefined>(range);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setPending(range);
  }, [open, range]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-9 w-full max-w-full items-center gap-2 rounded-lg border px-3 text-xs outline-none transition-colors",
            "border-[color:var(--t-border-2)] bg-[color:var(--t-input-bg)] text-[color:var(--t-text-70)]",
            "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0 opacity-50" />
          <span className="min-w-0 flex-1 truncate text-left">
            {range?.from
              ? `${format(range.from, "yyyy-MM-dd")}${range.to ? ` → ${format(range.to, "yyyy-MM-dd")}` : " …"}`
              : "Pick a range"}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          className="z-50 w-fit min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-[color:var(--t-border-2)] bg-[color:var(--t-surface)] p-0 shadow-xl"
        >
          <div className="px-2 pb-0.5 pt-2">
            <LuxDayPicker
              mode="range"
              selected={pending}
              onSelect={setPending}
              showOutsideDays
            />
          </div>
          <CalendarPopoverFooter
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              setRange(pending);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function DateTimePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pending, setPending] = useState<Date | undefined>(date);
  const [time, setTime] = useState("14:30");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setPending(date);
  }, [open, date]);

  const combined = useMemo(() => {
    if (!date || !time) return undefined;
    const [hh, mm] = time.split(":");
    const d = new Date(date);
    d.setHours(parseInt(hh ?? "0", 10), parseInt(mm ?? "0", 10), 0, 0);
    return d;
  }, [date, time]);

  return (
    <div className="max-w-full space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border px-3 text-xs",
                "border-[color:var(--t-border-2)] bg-[color:var(--t-input-bg)] text-[color:var(--t-text-70)]",
                "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
              )}
            >
              <CalendarIcon className="size-3.5 shrink-0 text-[color:var(--t-text-40)]" aria-hidden />
              {date ? format(date, "yyyy-MM-dd") : "Date"}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              sideOffset={8}
              className="z-50 w-fit min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-[color:var(--t-border-2)] bg-[color:var(--t-surface)] p-0 shadow-xl"
            >
              <div className="px-2 pb-0.5 pt-2">
                <LuxDayPicker
                  mode="single"
                  selected={pending}
                  onSelect={setPending}
                  showOutsideDays
                />
              </div>
              <CalendarPopoverFooter
                onCancel={() => setOpen(false)}
                onConfirm={() => {
                  setDate(pending);
                  setOpen(false);
                }}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        <TimeScrollPicker value={time} onChange={setTime} />
      </div>
      <p className="text-[10px] t-text-40">
        Preview: {combined ? format(combined, "yyyy-MM-dd HH:mm") : "—"}
      </p>
    </div>
  );
}

export function DialogVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <DialogFromUi title="Quick confirm" desc="Discard draft?" triggerLabel="Basic" wide={false} long={false} />
      <DialogFromUi title="Wide panel" desc="More horizontal space for forms." triggerLabel="Large" wide long={false} />
      <DialogFromUi title="Scrollable" desc="Long body content." triggerLabel="Scroll" wide={false} long />
    </div>
  );
}

function DialogFromUi({
  title,
  desc,
  triggerLabel,
  wide,
  long,
}: {
  title: string;
  desc: string;
  triggerLabel: string;
  wide: boolean;
  long: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className={cn(wide && "sm:max-w-2xl", long && "max-h-[85vh] overflow-y-auto")}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {desc ? <DialogDescription>{desc}</DialogDescription> : null}
        </DialogHeader>
        {long ? (
          <div className="space-y-2 text-xs t-text-50">
            {Array.from({ length: 18 }).map((_, i) => (
              <p key={i}>
                Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
              </p>
            ))}
          </div>
        ) : (
          <p className="text-xs t-text-50">Optional content region for actions or short forms.</p>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogClose>
          <Button size="sm">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DropdownRichDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          Open menu
          <ChevronDown className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function IconButtonsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-xs" aria-label="Search"><Search className="size-3.5" /></Button>
      <Button size="icon-sm" variant="outline" aria-label="Settings"><Settings className="size-4" /></Button>
      <Button size="icon" aria-label="Grid"><LayoutGrid /></Button>
      <Button size="icon-lg" variant="secondary" aria-label="User"><User /></Button>
      <Button size="icon-sm" variant="destructive" aria-label="Delete"><Trash2 className="size-4" /></Button>
    </div>
  );
}

export function LabelsDemo() {
  return (
    <div className="max-w-full space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="lb-top">Company name</Label>
        <Input id="lb-top" placeholder="Acme Inc." />
      </div>
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-center">
        <Label htmlFor="lb-side" className="sm:text-right">SKU</Label>
        <Input id="lb-side" placeholder="LX-2044" size="sm" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="lb-req" className="inline-flex gap-1">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="lb-req" type="email" required placeholder="you@company.com" />
      </div>
    </div>
  );
}

export function MenubarKitchenDemo() {
  const [ln, setLn] = useState(true);
  return (
    <Menubar.Root
      className="inline-flex flex-wrap items-center gap-2 rounded-xl border p-2"
      style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}
    >
      <Menubar.Menu>
        <Menubar.Trigger className={menubarTriggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className="z-50 min-w-44 rounded-xl border p-1 shadow-xl" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
            <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => {}}>
              New
            </Menubar.Item>
            <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => {}}>
              Open…
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger className={menubarTriggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
          View
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className="z-50 min-w-44 rounded-xl border p-1 shadow-xl" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
            <Menubar.CheckboxItem
              checked={ln}
              onCheckedChange={(v) => setLn(v === true)}
              className={menuItemCls}
              style={{ color: "var(--t-text-70)" }}
            >
              <span className="inline-flex w-4 justify-center">{ln && <Check className="size-4" />}</span>
              Line nos
            </Menubar.CheckboxItem>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
}

export function NavigationMenuKitchenDemo() {
  return (
    <NavigationMenu.Root className="relative z-40 max-w-full">
      <NavigationMenu.List className="flex flex-wrap items-center gap-2">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              href="/dashboards/crm"
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
            Catalog <ChevronDown className="size-4 opacity-60" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="absolute top-full left-0 z-50 mt-2 w-[min(400px,92vw)] rounded-xl border p-3 shadow-xl"
            style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
          >
            <ScrollArea className="h-28">
              <ul className="t-text-60 space-1 text-xs">
                <li>Form elements</li>
                <li>Components</li>
                <li>Radix primitives</li>
              </ul>
            </ScrollArea>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              href="/user-interface/form-elements"
              className={linkCls}
              style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}
            >
              Docs
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export function PopoverKitchenDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Open popover
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-50 w-72 rounded-xl border p-4 shadow-xl"
          style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
        >
          <p className="text-sm font-semibold t-text">Dimensions</p>
          <p className="mt-1 text-xs t-text-50">
            Popovers anchor to the trigger and support keyboard dismissal.
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Popover.Close asChild>
              <Button size="sm" variant="ghost">
                Close
              </Button>
            </Popover.Close>
            <Button size="sm">Apply</Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function SegmentedControlDemo() {
  const [view, setView] = useState("all");
  return (
    <ToggleGroup.Root
      type="single"
      value={view}
      onValueChange={(v) => v && setView(v)}
      className="inline-flex rounded-lg border border-[color:var(--t-border)] bg-[color:var(--t-surface-2)] p-1"
    >
      {[
        { id: "all", label: "All" },
        { id: "active", label: "Active" },
        { id: "off", label: "Inactive" },
      ].map((x) => (
        <ToggleGroup.Item key={x.id} value={x.id} className={toggleSegCls}>
          {x.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

export function BadgesExtendedDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-300">Primary tone</span>
      <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-300">Success</span>
      <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-800 dark:text-amber-200">Warning</span>
      <span className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[11px] text-red-700 dark:text-red-300">Error</span>
    </div>
  );
}

export function ButtonsExtendedDemo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Small primary</Button>
        <Button>Default</Button>
        <Button size="lg">Large CTA</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">Outline sm</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
      </div>
    </div>
  );
}
