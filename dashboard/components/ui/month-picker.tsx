"use client";

import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import {
  PickerOption,
  PickerPanel,
  PickerPopoverContent,
  PickerTriggerButton,
} from "@/components/ui/picker-popover";
import { cn } from "@/lib/utils";

const MONTH_LABELS = Array.from({ length: 12 }, (_, month) =>
  format(new Date(2026, month, 1), "MMM"),
);

type MonthParts = {
  year: number;
  month: number;
};

function parseMonthValue(value: string | undefined): MonthParts | undefined {
  if (!value) return undefined;

  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return undefined;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  if (!Number.isFinite(year) || month < 0 || month > 11) return undefined;

  return { year, month };
}

function getCurrentMonthParts(): MonthParts {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

function formatMonthValue({ year, month }: MonthParts) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function formatMonthLabel(value: string | undefined) {
  const parts = parseMonthValue(value);
  if (!parts) return undefined;

  return format(new Date(parts.year, parts.month, 1), "MMM yyyy");
}

export type MonthPickerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  onChange?: (next: string) => void;
  defaultValue?: string;
  placeholder?: string;
};

export function MonthPicker({
  value,
  onChange,
  defaultValue,
  placeholder = "Pick a month",
  className,
  disabled,
  ...props
}: MonthPickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<MonthParts>(
    parseMonthValue(selected) ?? getCurrentMonthParts(),
  );

  React.useEffect(() => {
    if (!open) return;
    setPending(parseMonthValue(selected) ?? getCurrentMonthParts());
  }, [open, selected]);

  const setYear = (year: number) => {
    setPending((prev) => ({ ...prev, year }));
  };

  const commitMonth = (month: number) => {
    const next = formatMonthValue({ ...pending, month });
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <PickerTriggerButton
          disabled={disabled}
          className={className}
          icon={<CalendarDays aria-hidden />}
          displayValue={formatMonthLabel(selected)}
          placeholder={placeholder}
          muted={!selected}
          {...props}
        />
      </Popover.Trigger>
      <PickerPopoverContent
        className="w-[min(100vw-1.5rem,18rem)]"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <PickerPanel>
          <div className="flex items-center justify-between border-b border-(--t-border-2) px-2 py-1.5">
            <YearButton
              aria-label="Previous year"
              onClick={() => setYear(pending.year - 1)}
              icon={<ChevronLeft aria-hidden />}
            />
            <span className="text-xs font-semibold text-(--t-text) tabular-nums">
              {pending.year}
            </span>
            <YearButton
              aria-label="Next year"
              onClick={() => setYear(pending.year + 1)}
              icon={<ChevronRight aria-hidden />}
            />
          </div>
          <div className="grid grid-cols-3 gap-1 p-1.5">
            {MONTH_LABELS.map((label, month) => (
              <PickerOption
                key={label}
                active={pending.month === month}
                onClick={() => commitMonth(month)}
              >
                {label}
              </PickerOption>
            ))}
          </div>
        </PickerPanel>
      </PickerPopoverContent>
    </Popover.Root>
  );
}

function YearButton({
  icon,
  className,
  type = "button",
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { icon: React.ReactNode }) {
  return (
    <button
      type={type}
      className={cn(
        "flex size-7 items-center justify-center rounded-md text-(--t-text-40) transition-colors hover:bg-(--t-hover) hover:text-(--t-text-70)",
        "focus-visible:ring-2 focus-visible:ring-(--t-ring)/30",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
