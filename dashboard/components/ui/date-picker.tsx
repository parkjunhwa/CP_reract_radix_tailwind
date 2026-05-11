"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { CalendarPopoverFooter } from "@/components/ui/calendar-popover-footer";
import { LuxDayPicker } from "@/components/ui/lux-day-picker";
import { cn } from "@/lib/utils";

export type DatePickerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "defaultValue" | "onChange"
> & {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** Uncontrolled initial date (used when `value` is not provided). */
  defaultValue?: Date;
};

export function DatePicker({
  value,
  onChange,
  defaultValue,
  placeholder = "Pick a date",
  className,
  disabled,
  ...props
}: DatePickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const selected = isControlled ? value : internal;

  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<Date | undefined>(selected);

  React.useEffect(() => {
    if (open) setPending(selected);
  }, [open, selected]);

  const setDate = (d: Date | undefined) => {
    if (!isControlled) setInternal(d);
    onChange?.(d);
  };

  const handleConfirm = () => {
    setDate(pending);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          data-slot="date-picker"
          disabled={disabled}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border bg-[color:var(--t-input-bg)] px-3 text-xs outline-none transition-colors",
            "border-[color:var(--t-border-2)] text-[color:var(--t-text-70)]",
            "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "h-9",
            className,
          )}
          {...props}
        >
          <CalendarIcon className="h-3.5 w-3.5 text-[color:var(--t-text-40)]" aria-hidden="true" />
          <span className={cn("flex-1 truncate text-left", !selected && "text-[color:var(--t-text-30)]")}>
            {selected ? format(selected, "yyyy-MM-dd") : placeholder}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-fit min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border p-0 shadow-xl",
            "bg-[color:var(--t-surface)] border-[color:var(--t-border-2)]",
          )}
        >
          <div className="px-2 pb-0.5 pt-2">
            <LuxDayPicker
              mode="single"
              selected={pending}
              onSelect={setPending}
              showOutsideDays
              disabled={disabled}
            />
          </div>
          <CalendarPopoverFooter onCancel={handleCancel} onConfirm={handleConfirm} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
