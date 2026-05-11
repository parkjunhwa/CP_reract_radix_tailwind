"use client";

import * as Popover from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "@/lib/utils";

type PickerTriggerButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "children"
> & {
  icon?: React.ReactNode;
  displayValue?: React.ReactNode;
  placeholder?: string;
  muted?: boolean;
};

export const PickerTriggerButton = React.forwardRef<
  HTMLButtonElement,
  PickerTriggerButtonProps
>(
  (
    {
      icon,
      displayValue,
      placeholder = "Select",
      muted,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border px-3 text-xs outline-none transition-colors",
        "border-(--t-border-2) bg-(--t-input-bg) text-(--t-text-70)",
        "focus-visible:border-(--t-accent) focus-visible:ring-2 focus-visible:ring-(--t-ring)/30",
        "disabled:cursor-not-allowed disabled:bg-(--t-input-muted-bg) disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-(--t-text-40) [&_svg]:size-3.5">{icon}</span>}
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left tabular-nums",
          muted && "text-(--t-text-30)",
        )}
      >
        {displayValue ?? placeholder}
      </span>
    </button>
  ),
);
PickerTriggerButton.displayName = "PickerTriggerButton";

export function PickerPopoverContent({
  className,
  sideOffset = 8,
  align = "start",
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popover.Content>) {
  return (
    <Popover.Portal>
      <Popover.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 w-[min(100vw-1.5rem,17rem)] overflow-hidden rounded-xl border border-(--t-border-2) bg-(--t-surface) p-2 shadow-xl outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
}

export function PickerPanel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-(--t-border-2) bg-(--t-surface-2)",
        className,
      )}
      {...props}
    />
  );
}

export const PickerScrollColumn = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "max-h-[216px] overflow-y-auto overscroll-y-contain px-1 py-1.5",
        className,
      )}
      {...props}
    />
));
PickerScrollColumn.displayName = "PickerScrollColumn";

type PickerOptionProps = React.ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
};

export function PickerOption({
  active,
  className,
  type = "button",
  ...props
}: PickerOptionProps) {
  return (
    <button
      type={type}
      data-active={active ? "true" : undefined}
      className={cn(
        "w-full min-h-8 shrink-0 rounded-lg px-2 py-1.5 text-center text-xs font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring/40",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-foreground hover:bg-accent/50",
        className,
      )}
      {...props}
    />
  );
}
