"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as Avatar from "@radix-ui/react-avatar";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Form from "@radix-ui/react-form";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Label from "@radix-ui/react-label";
import * as Menubar from "@radix-ui/react-menubar";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as OTP from "@radix-ui/react-one-time-password-field";
import * as PasswordToggleField from "@radix-ui/react-password-toggle-field";
import * as Popover from "@radix-ui/react-popover";
import * as Progress from "@radix-ui/react-progress";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import * as Toast from "@radix-ui/react-toast";
import * as Toggle from "@radix-ui/react-toggle";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Info,
  Italic,
  Underline,
  X,
} from "lucide-react";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { RADIX_PRIMITIVES } from "@/lib/radix-primitives";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2";

const inputCls = cn(
  "w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

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

const tabBtn = cn(
  "px-3 h-9 rounded-lg border text-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
  "hover:bg-[var(--t-hover)]",
  "data-[state=active]:bg-[var(--t-accent-soft)] data-[state=active]:text-[var(--t-accent-text)]"
);

const menubarTriggerCls = cn(
  "px-3 h-9 rounded-lg border text-sm",
  "hover:bg-[var(--t-hover)] transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

const menuItemCls = cn(
  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
  "data-[highlighted]:bg-[var(--t-hover)]"
);

const selectTriggerCls = cn(
  "inline-flex items-center justify-between gap-2 h-10 px-3 rounded-lg border text-sm w-64",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
  "hover:bg-[var(--t-hover)] transition-colors"
);

const ctxItemCls = cn(
  "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
  "data-[highlighted]:bg-[var(--t-hover)]"
);

function AccordionItem({
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

function DropdownItem({
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
      className={cn("px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer", "data-[highlighted]:bg-[var(--t-hover)]")}
      style={{ color: "var(--t-text-70)" }}
    >
      {children}
    </DropdownMenu.Item>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Select.Item
      value={value}
      className={cn(
        "px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2",
        "data-[highlighted]:bg-[var(--t-hover)]"
      )}
      style={{ color: "var(--t-text-70)" }}
    >
      <Select.ItemIndicator className="w-4 h-4 inline-flex items-center justify-center">
        <Check className="w-4 h-4" aria-hidden="true" />
      </Select.ItemIndicator>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

function RadioItem({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex items-center gap-3 select-none">
      <RadioGroup.Item
        value={value}
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
        )}
        style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}
      >
        <RadioGroup.Indicator className="w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--t-accent)" }}>
          <Check className="w-3 h-3 text-[var(--t-accent-text)]" aria-hidden="true" />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
      <span className="t-text text-sm">{label}</span>
    </label>
  );
}

const toolbarItemCls = cn(
  "inline-flex items-center justify-center w-10 h-9 rounded-lg border transition-colors",
  "hover:bg-[var(--t-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

const toggleGroupItemCls = cn(
  "inline-flex items-center justify-center w-10 h-9 rounded-lg border transition-colors",
  "hover:bg-[var(--t-hover)]",
  "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

function DemoAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="divide-y" style={{ borderColor: "var(--t-border)" }}>
      <AccordionItem value="one" title="What is Radix?">
        Radix Primitives are unstyled, accessible React components you can compose into your own design system.
      </AccordionItem>
      <AccordionItem value="two" title="Keyboard support">
        Use arrow keys to move between triggers, Enter/Space to toggle, and Home/End to jump.
      </AccordionItem>
      <AccordionItem value="three" title="Composition">
        You can style and structure the content freely while retaining accessibility.
      </AccordionItem>
    </Accordion.Root>
  );
}

function DemoAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={cn(btn, "hover:bg-[var(--t-hover)]")} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
        Delete invoice…
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60" />
        <AlertDialog.Content
          className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 z-[60]"
          style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border)" }}
        >
          <AlertDialog.Title className="t-text font-semibold text-sm">Delete invoice</AlertDialog.Title>
          <AlertDialog.Description className="t-text-40 text-xs mt-1.5">This action cannot be undone. The invoice will be permanently removed.</AlertDialog.Description>
          <div className="mt-5 flex items-center justify-end gap-2">
            <AlertDialog.Cancel className={cn(btn, "hover:bg-[var(--t-hover)]")} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action className={cn(btn)} style={{ backgroundColor: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.3)", color: "rgb(248,113,113)" }}>
              Delete
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function DemoAspectRatio() {
  return (
    <div className="max-w-xl">
      <AspectRatio.Root ratio={16 / 9} className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--t-border)" }}>
        <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-sky-500/10 flex items-center justify-center">
          <div className="text-center">
            <p className="t-text font-semibold text-sm">Media Placeholder</p>
            <p className="t-text-40 text-xs mt-1">16:9</p>
          </div>
        </div>
      </AspectRatio.Root>
    </div>
  );
}

function DemoAvatar() {
  return (
    <div className="flex items-center gap-3">
      <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)" }}>
        <Avatar.Image className="w-full h-full object-cover" src="https://this-image-does-not-exist.invalid/avatar.png" alt="Junhwa Park" />
        <Avatar.Fallback className="w-full h-full flex items-center justify-center text-sm font-semibold">JP</Avatar.Fallback>
      </Avatar.Root>
      <div>
        <p className="t-text font-semibold text-sm">Junhwa Park</p>
        <p className="t-text-40 text-xs mt-0.5">Administrator</p>
      </div>
    </div>
  );
}

function DemoCheckbox() {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <label className="flex items-center gap-3 select-none">
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
          className={cn(
            "w-5 h-5 rounded-md border flex items-center justify-center",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
            "transition-colors"
          )}
          style={{
            borderColor: "var(--t-border-2)",
            backgroundColor: checked ? "var(--t-accent-soft)" : "var(--t-surface-2)",
          }}
        >
          <Checkbox.Indicator className="text-[var(--t-accent-text)]">
            <Check className="w-4 h-4" aria-hidden="true" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className="t-text text-sm">Enable email alerts</span>
      </label>
      <p className="t-text-40 text-xs mt-3">Value: {checked ? "checked" : "unchecked"}</p>
    </>
  );
}

function DemoCollapsible() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="max-w-xl">
      <Collapsible.Trigger
        className={cn(
          "w-full h-10 px-3 rounded-lg border flex items-center justify-between text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
          "hover:bg-[var(--t-hover)] transition-colors"
        )}
        style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
      >
        <span>Release notes</span>
        <ChevronDown className={cn("w-4 h-4 opacity-60 transition-transform", open && "rotate-180")} />
      </Collapsible.Trigger>
      <Collapsible.Content className="mt-3 rounded-lg border p-4 text-sm" style={{ borderColor: "var(--t-border)" }}>
        <p className="t-text-40">
          Collapsible content can contain any markup. This area becomes hidden and removed from the tab order when closed.
        </p>
        <ul className="mt-3 list-disc pl-5 t-text-40 text-sm space-y-1">
          <li>Accessible trigger</li>
          <li>Keyboard friendly</li>
          <li>Fully styleable</li>
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function DemoContextMenu() {
  const [pinned, setPinned] = useState(false);
  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <div
            className={cn(
              "h-40 w-full max-w-xl rounded-xl border flex items-center justify-center text-sm select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
            )}
            tabIndex={0}
            style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text-70)" }}
          >
            Right click (or long press) here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content className="min-w-56 rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
            <ContextMenu.Item className={ctxItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Open")}>
              Open
            </ContextMenu.Item>
            <ContextMenu.Item className={ctxItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Duplicate")}>
              Duplicate
            </ContextMenu.Item>
            <ContextMenu.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />
            <ContextMenu.CheckboxItem checked={pinned} onCheckedChange={(v) => setPinned(v === true)} className={ctxItemCls} style={{ color: "var(--t-text-70)" }}>
              <span className="w-4 h-4 inline-flex items-center justify-center">{pinned && <Check className="w-4 h-4" aria-hidden="true" />}</span>
              Pin
            </ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <p className="t-text-40 text-xs mt-3">Pinned: {String(pinned)}</p>
    </>
  );
}

function DemoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn(btn, "hover:bg-[var(--t-hover)]")} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
        Open dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 z-[60]"
          style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="t-text font-semibold text-sm">Edit profile</Dialog.Title>
              <Dialog.Description className="t-text-40 text-xs mt-1">Make changes to your profile here. Click save when you&apos;re done.</Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className={cn(
                "w-9 h-9 rounded-lg border flex items-center justify-center",
                "hover:bg-[var(--t-hover)] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
              )}
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Form.Root className="mt-5 space-y-3">
            <Form.Field name="displayName" className="space-y-1">
              <Form.Label className="t-text-50 text-xs">Display name</Form.Label>
              <Form.Control asChild>
                <input defaultValue="Junhwa Park" className="w-full h-10 px-3 rounded-lg border text-sm outline-none" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
              </Form.Control>
            </Form.Field>
            <Form.Field name="email" className="space-y-1">
              <Form.Label className="t-text-50 text-xs">Email</Form.Label>
              <Form.Control asChild>
                <input defaultValue="junhwa.park@gmail.com" className="w-full h-10 px-3 rounded-lg border text-sm outline-none" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
              </Form.Control>
            </Form.Field>
          </Form.Root>
          <div className="mt-5 flex justify-end gap-2">
            <Dialog.Close className={cn(btn, "hover:bg-[var(--t-hover)]")} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
              Cancel
            </Dialog.Close>
            <Dialog.Close className={cn(btn)} style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }}>
              Save
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DemoDropdownMenu() {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={cn(btn, "gap-2 hover:bg-[var(--t-hover)]")} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
        Actions <ChevronDown className="w-4 h-4 opacity-60" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} className="min-w-56 rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
          <DropdownItem onSelect={() => alert("Edit")}>Edit</DropdownItem>
          <DropdownItem onSelect={() => alert("Duplicate")}>Duplicate</DropdownItem>
          <DropdownMenu.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />
          <DropdownMenu.CheckboxItem
            checked={bookmarked}
            onCheckedChange={setBookmarked}
            className={cn("px-2 py-1.5 rounded-md text-sm outline-none cursor-pointer flex items-center gap-2", "data-[highlighted]:bg-[var(--t-hover)]")}
            style={{ color: "var(--t-text-70)" }}
          >
            <span className="w-4 h-4 inline-flex items-center justify-center">{bookmarked && <Check className="w-4 h-4" aria-hidden="true" />}</span>
            Bookmark
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function DemoForm() {
  const [submitted, setSubmitted] = useState<{ email: string; password: string } | null>(null);
  return (
    <>
      <Form.Root
        className="max-w-md space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setSubmitted({ email: String(fd.get("email") ?? ""), password: String(fd.get("password") ?? "") });
        }}
      >
        <Form.Field name="email" className="space-y-1">
          <Form.Label className="t-text-50 text-xs">Email</Form.Label>
          <Form.Control asChild>
            <input type="email" required placeholder="name@company.com" className={inputCls} style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
          </Form.Control>
          <Form.Message match="valueMissing" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
            Please enter your email.
          </Form.Message>
          <Form.Message match="typeMismatch" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
            Please provide a valid email.
          </Form.Message>
        </Form.Field>
        <Form.Field name="password" className="space-y-1">
          <Form.Label className="t-text-50 text-xs">Password</Form.Label>
          <Form.Control asChild>
            <input type="password" required minLength={8} placeholder="At least 8 characters" className={inputCls} style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
          </Form.Control>
          <Form.Message match="valueMissing" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
            Please enter a password.
          </Form.Message>
          <Form.Message match="tooShort" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
            Password must be at least 8 characters.
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <button type="submit" className="inline-flex h-10 min-h-10 shrink-0 items-center justify-center px-4 rounded-lg border text-sm font-medium leading-none hover:bg-[var(--t-hover)] transition-colors" style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
            Submit
          </button>
        </Form.Submit>
      </Form.Root>
      {submitted && (
        <div className="mt-4 rounded-lg border p-3" style={{ borderColor: "var(--t-border)" }}>
          <p className="t-text text-sm font-semibold">Submitted</p>
          <p className="t-text-40 text-xs mt-1">Email: {submitted.email}</p>
          <p className="t-text-40 text-xs mt-0.5">Password length: {submitted.password.length}</p>
        </div>
      )}
    </>
  );
}

function DemoHoverCard() {
  return (
    <HoverCard.Root openDelay={200} closeDelay={150}>
      <HoverCard.Trigger
        className={cn("text-sm font-medium underline underline-offset-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2 rounded-sm")}
        style={{ color: "var(--t-accent-text)" }}
      >
        @junhwa
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={10} className="rounded-xl border p-4 shadow-xl w-72 z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/40 to-purple-700/20 border" style={{ borderColor: "var(--t-border-2)" }} />
            <div className="min-w-0">
              <p className="t-text font-semibold text-sm truncate">Junhwa Park</p>
              <p className="t-text-40 text-xs mt-0.5">Administrator · LUXE Commerce</p>
              <p className="t-text-40 text-xs mt-2">Building a Radix playground inside the dashboard.</p>
            </div>
          </div>
          <HoverCard.Arrow className="fill-[var(--t-surface)]" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function DemoLabel() {
  return (
    <Form.Root className="max-w-md space-y-2">
      <Form.Field name="email" className="space-y-2">
        <Form.Label asChild>
          <Label.Root className="t-text-50 text-xs" htmlFor="radix-label-email">
            Email address
          </Label.Root>
        </Form.Label>
        <Form.Control asChild>
          <input
            id="radix-label-email"
            type="email"
            placeholder="name@company.com"
            className="w-full h-10 px-3 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
}

function DemoMenubar() {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  return (
    <>
      <Menubar.Root className="inline-flex items-center gap-2 p-2 rounded-xl border flex-wrap" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}>
        <Menubar.Menu>
          <Menubar.Trigger className={menubarTriggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
            File
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content className="min-w-56 rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
              <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("New file")}>
                New
              </Menubar.Item>
              <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Open…")}>
                Open…
              </Menubar.Item>
              <Menubar.Separator className="my-1 h-px" style={{ backgroundColor: "var(--t-border)" }} />
              <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Close")}>
                Close
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className={menubarTriggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
            View
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content className="min-w-56 rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
              <Menubar.CheckboxItem checked={showLineNumbers} onCheckedChange={(v) => setShowLineNumbers(v === true)} className={menuItemCls} style={{ color: "var(--t-text-70)" }}>
                <span className="w-4 h-4 inline-flex items-center justify-center">{showLineNumbers && <Check className="w-4 h-4" aria-hidden="true" />}</span>
                Line numbers
              </Menubar.CheckboxItem>
              <Menubar.Sub>
                <Menubar.SubTrigger className={cn(menuItemCls, "justify-between")} style={{ color: "var(--t-text-70)" }}>
                  Theme <ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                </Menubar.SubTrigger>
                <Menubar.SubContent className="min-w-44 rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
                  <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Dark")}>
                    Dark
                  </Menubar.Item>
                  <Menubar.Item className={menuItemCls} style={{ color: "var(--t-text-70)" }} onSelect={() => alert("Light")}>
                    Light
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Sub>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
      <p className="t-text-40 text-xs mt-3">Line numbers: {String(showLineNumbers)}</p>
    </>
  );
}

function DemoNavigationMenu() {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex items-center gap-2 flex-wrap">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href="/" className={linkCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              Home
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
            Components <ChevronDown className="w-4 h-4 opacity-60" aria-hidden="true" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="absolute left-0 top-[calc(100%+10px)] w-[min(520px,92vw)] rounded-xl border p-4 shadow-xl z-50"
            style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Dialog", desc: "Modal interactions", hash: "radix-dialog" },
                { title: "Dropdown Menu", desc: "Action menus", hash: "radix-dropdown-menu" },
                { title: "Tooltip", desc: "Small hints", hash: "radix-tooltip" },
                { title: "Toast", desc: "Transient messages", hash: "radix-toast" },
              ].map((it) => (
                <NavigationMenu.Link asChild key={it.hash}>
                  <Link href={`/radix#${it.hash}`} className="rounded-lg border p-3 block hover:bg-[var(--t-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2" style={{ borderColor: "var(--t-border)", color: "var(--t-text)" }}>
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
            <Link href="/radix" className={linkCls} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
              Radix overview
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

const otpInputCls = cn(
  "w-10 h-12 rounded-lg border text-center text-lg font-semibold tabular-nums outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

function DemoOneTimePassword() {
  const [value, setValue] = useState("");
  const length = 6;
  return (
    <div className="space-y-3">
      <OTP.Root value={value} onValueChange={setValue} validationType="numeric" autoComplete="one-time-code" className="flex items-center gap-2 flex-wrap">
        {Array.from({ length }).map((_, i) => (
          <OTP.Input key={i} index={i} className={otpInputCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
        ))}
        <OTP.HiddenInput name="otp" />
      </OTP.Root>
      <p className="t-text-40 text-xs">Value: {value || "—"}</p>
    </div>
  );
}

function DemoPasswordToggle() {
  const pwdInputCls = cn(
    "w-full h-10 pl-3 pr-10 rounded-lg border text-sm outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
  );
  return (
    <div className="max-w-md">
      <PasswordToggleField.Root>
        <div className="relative">
          <PasswordToggleField.Input placeholder="Enter password" autoComplete="current-password" className={pwdInputCls} style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} />
          <PasswordToggleField.Toggle
            aria-label="Toggle password visibility"
            className={cn(
              "absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg border flex items-center justify-center",
              "hover:bg-[var(--t-hover)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
            )}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            <PasswordToggleField.Icon visible={<Eye className="w-4 h-4 opacity-70" aria-hidden="true" />} hidden={<EyeOff className="w-4 h-4 opacity-70" aria-hidden="true" />} />
          </PasswordToggleField.Toggle>
        </div>
      </PasswordToggleField.Root>
    </div>
  );
}

function DemoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          "inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm",
          "hover:bg-[var(--t-hover)] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
        )}
        style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
      >
        <Info className="w-4 h-4 opacity-70" aria-hidden="true" />
        What is this?
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={10} className="w-80 rounded-xl border p-4 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
          <p className="t-text font-semibold text-sm">Quick note</p>
          <p className="t-text-40 text-xs mt-1.5">Popovers are great for contextual information, forms, and lightweight interactions.</p>
          <Popover.Arrow className="fill-[var(--t-surface)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function DemoProgress() {
  const [value, setValue] = useState(15);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 7))), 650);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-3 max-w-xl">
      <Progress.Root value={value} className="relative h-3 w-full overflow-hidden rounded-full border" style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}>
        <Progress.Indicator className="h-full w-full transition-transform" style={{ backgroundColor: "var(--t-accent)", transform: `translateX(-${100 - value}%)` }} />
      </Progress.Root>
      <p className="t-text-40 text-xs">Value: {value}%</p>
    </div>
  );
}

function DemoRadioGroup() {
  const [value, setValue] = useState("standard");
  return (
    <>
      <RadioGroup.Root value={value} onValueChange={setValue} className="space-y-3">
        <RadioItem value="standard" label="Standard (3–5 days)" />
        <RadioItem value="express" label="Express (1–2 days)" />
        <RadioItem value="overnight" label="Overnight" />
      </RadioGroup.Root>
      <p className="t-text-40 text-xs mt-3">Selected: {value}</p>
    </>
  );
}

function DemoScrollArea() {
  const items = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    label: `Order #${String(7820 + i).padStart(4, "0")}`,
  }));
  return (
    <ScrollArea.Root className="w-full max-w-lg h-56 rounded-xl border" style={{ borderColor: "var(--t-border)" }}>
      <ScrollArea.Viewport className="w-full h-full p-3">
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text-70)" }}>
              {it.label}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex select-none touch-none p-1" orientation="vertical">
        <ScrollArea.Thumb className="flex-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

function DemoSelect() {
  const [value, setValue] = useState("gold");
  return (
    <>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger className={selectTriggerCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Tier">
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 opacity-60" aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="rounded-xl border p-1 shadow-xl z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
            <Select.Viewport className="p-1">
              <SelectItem value="bronze">Bronze</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <p className="t-text-40 text-xs mt-3">Selected: {value}</p>
    </>
  );
}

function DemoSeparator() {
  return (
    <div className="space-y-3">
      <div>
        <p className="t-text text-sm font-medium">Account</p>
        <p className="t-text-40 text-xs mt-0.5">Manage profile, security, and billing.</p>
      </div>
      <Separator.Root decorative className="h-px w-full" style={{ backgroundColor: "var(--t-border)" }} />
      <div className="flex items-center gap-3">
        <button type="button" className="px-3 h-9 rounded-lg border text-sm" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
          Profile
        </button>
        <Separator.Root decorative orientation="vertical" className="w-px h-6" style={{ backgroundColor: "var(--t-border)" }} />
        <button type="button" className="px-3 h-9 rounded-lg border text-sm" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
          Security
        </button>
      </div>
    </div>
  );
}

function DemoSlider() {
  const [value, setValue] = useState([35]);
  return (
    <div className="max-w-xl space-y-3">
      <Slider.Root className="relative flex items-center select-none touch-none h-5" value={value} onValueChange={setValue} max={100} step={1} aria-label="Volume">
        <Slider.Track className="relative grow h-2 rounded-full border" style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}>
          <Slider.Range className="absolute h-full rounded-full" style={{ backgroundColor: "var(--t-accent)" }} />
        </Slider.Track>
        <Slider.Thumb
          className={cn("block w-4 h-4 rounded-full border shadow-sm", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2")}
          style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
        />
      </Slider.Root>
      <p className="t-text-40 text-xs">Value: {value[0]}</p>
    </div>
  );
}

function DemoSwitch() {
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <div className="flex items-center justify-between gap-4 max-w-md">
        <div>
          <p className="t-text text-sm font-medium">Push notifications</p>
          <p className="t-text-40 text-xs mt-0.5">Get alerts for orders and payments.</p>
        </div>
        <Switch.Root
          checked={enabled}
          onCheckedChange={setEnabled}
          className={cn("w-10 h-6 rounded-full relative border transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2")}
          style={{ backgroundColor: enabled ? "var(--t-accent-soft)" : "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}
        >
          <Switch.Thumb
            className="block w-5 h-5 rounded-full transition-transform"
            style={{ backgroundColor: "var(--t-surface)", transform: enabled ? "translateX(16px)" : "translateX(2px)" }}
          />
        </Switch.Root>
      </div>
      <p className="t-text-40 text-xs mt-3">Enabled: {enabled ? "true" : "false"}</p>
    </>
  );
}

function DemoTabs() {
  return (
    <Tabs.Root defaultValue="profile" className="max-w-2xl">
      <Tabs.List className="flex items-center gap-2 flex-wrap">
        {[
          { v: "profile", label: "Profile" },
          { v: "security", label: "Security" },
          { v: "billing", label: "Billing" },
        ].map((t) => (
          <Tabs.Trigger key={t.v} value={t.v} className={tabBtn} style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)", color: "var(--t-text)" }}>
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="mt-4 rounded-lg border p-4" style={{ borderColor: "var(--t-border)" }}>
        <Tabs.Content value="profile">
          <p className="t-text text-sm font-medium">Profile</p>
          <p className="t-text-40 text-xs mt-1">Update your name, email, and public details.</p>
        </Tabs.Content>
        <Tabs.Content value="security">
          <p className="t-text text-sm font-medium">Security</p>
          <p className="t-text-40 text-xs mt-1">Manage password, sessions, and 2FA.</p>
        </Tabs.Content>
        <Tabs.Content value="billing">
          <p className="t-text text-sm font-medium">Billing</p>
          <p className="t-text-40 text-xs mt-1">Invoices, payment methods, and plans.</p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}

const toastBtn = cn(
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors",
  "hover:bg-[var(--t-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

function DemoToast() {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider duration={4000} swipeDirection="right">
      <button type="button" className={toastBtn} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} onClick={() => setOpen(false)}>
        Reset
      </button>
      <button type="button" className={cn(toastBtn, "ml-2")} style={{ backgroundColor: "var(--t-accent-soft)", borderColor: "var(--t-border-2)", color: "var(--t-accent-text)" }} onClick={() => setOpen(true)}>
        Show toast
      </button>
      <Toast.Root open={open} onOpenChange={setOpen} className="rounded-xl border p-4 shadow-xl grid gap-2 z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}>
        <Toast.Title className="t-text font-semibold text-sm">Saved</Toast.Title>
        <Toast.Description className="t-text-40 text-xs">Your settings have been updated.</Toast.Description>
        <div className="flex items-center justify-end gap-2 pt-1">
          <Toast.Action altText="Undo the save" className={toastBtn} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
            Undo
          </Toast.Action>
          <Toast.Close className={toastBtn} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Dismiss">
            Dismiss
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 w-[360px] max-w-[92vw] outline-none z-50" aria-label="Notifications" />
    </Toast.Provider>
  );
}

function DemoToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Toggle.Root
        pressed={pressed}
        onPressedChange={setPressed}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg border text-sm transition-colors",
          "hover:bg-[var(--t-hover)]",
          "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
        )}
        style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
      >
        <Bold className="w-4 h-4 opacity-80" aria-hidden="true" />
        Bold
      </Toggle.Root>
      <p className="t-text-40 text-xs">Pressed: {String(pressed)}</p>
    </div>
  );
}

function DemoToggleGroup() {
  const [align, setAlign] = useState("left");
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <ToggleGroup.Root type="single" value={align} onValueChange={(v) => v && setAlign(v)} className="flex items-center gap-2">
        <ToggleGroup.Item value="left" className={toggleGroupItemCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Align left">
          <AlignLeft className="w-4 h-4" aria-hidden="true" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" className={toggleGroupItemCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Align center">
          <AlignCenter className="w-4 h-4" aria-hidden="true" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" className={toggleGroupItemCls} style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Align right">
          <AlignRight className="w-4 h-4" aria-hidden="true" />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <p className="t-text-40 text-xs">Align: {align}</p>
    </div>
  );
}

function DemoToolbar() {
  return (
    <Toolbar.Root className="inline-flex items-center gap-2 p-2 rounded-xl border flex-wrap" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }} aria-label="Formatting options">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting" className="flex items-center gap-2">
        <Toolbar.ToggleItem value="bold" className={cn(toolbarItemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")} style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Bold">
          <Bold className="w-4 h-4" aria-hidden="true" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="italic" className={cn(toolbarItemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")} style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Italic">
          <Italic className="w-4 h-4" aria-hidden="true" />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="underline" className={cn(toolbarItemCls, "data-[state=on]:bg-[var(--t-accent-soft)] data-[state=on]:text-[var(--t-accent-text)]")} style={{ borderColor: "var(--t-border-2)", color: "var(--t-text)" }} aria-label="Underline">
          <Underline className="w-4 h-4" aria-hidden="true" />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}

function DemoTooltip() {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded-lg border",
            "hover:bg-[var(--t-hover)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
          )}
          style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          aria-label="More info"
        >
          <Info className="w-4 h-4 opacity-70" aria-hidden="true" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={10} className="rounded-lg border px-2.5 py-1.5 text-xs shadow-lg z-50" style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}>
            Tooltips are for short, non-interactive hints.
            <Tooltip.Arrow className="fill-[var(--t-surface)]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const DEMO_BY_SLUG: Record<(typeof RADIX_PRIMITIVES)[number]["slug"], React.ReactNode> = {
  accordion: <DemoAccordion />,
  "alert-dialog": <DemoAlertDialog />,
  "aspect-ratio": <DemoAspectRatio />,
  avatar: <DemoAvatar />,
  checkbox: <DemoCheckbox />,
  collapsible: <DemoCollapsible />,
  "context-menu": <DemoContextMenu />,
  dialog: <DemoDialog />,
  "dropdown-menu": <DemoDropdownMenu />,
  form: <DemoForm />,
  "hover-card": <DemoHoverCard />,
  label: <DemoLabel />,
  menubar: <DemoMenubar />,
  "navigation-menu": <DemoNavigationMenu />,
  "one-time-password-field": <DemoOneTimePassword />,
  "password-toggle-field": <DemoPasswordToggle />,
  popover: <DemoPopover />,
  progress: <DemoProgress />,
  "radio-group": <DemoRadioGroup />,
  "scroll-area": <DemoScrollArea />,
  select: <DemoSelect />,
  separator: <DemoSeparator />,
  slider: <DemoSlider />,
  switch: <DemoSwitch />,
  tabs: <DemoTabs />,
  toast: <DemoToast />,
  toggle: <DemoToggle />,
  "toggle-group": <DemoToggleGroup />,
  toolbar: <DemoToolbar />,
  tooltip: <DemoTooltip />,
};

/** Slugs whose demos need the panel body to allow floating overlays to escape. */
const OVERFLOW_VISIBLE_SLUGS = new Set(["navigation-menu"]);

export function RadixAllDemos() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
      {RADIX_PRIMITIVES.map((p) => {
        const allowOverflow = OVERFLOW_VISIBLE_SLUGS.has(p.slug);
        return (
          <div
            key={p.slug}
            id={`radix-${p.slug}`}
            className={
              "flex h-full min-h-0 min-w-0 flex-col scroll-mt-28" +
              (allowOverflow ? " relative z-30" : "")
            }
          >
            <ExamplePanel
              title={p.title}
              description={p.description}
              bodyClassName={allowOverflow ? "!overflow-visible" : undefined}
            >
              {DEMO_BY_SLUG[p.slug]}
            </ExamplePanel>
          </div>
        );
      })}
    </div>
  );
}
