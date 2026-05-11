"use client";

import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { CalendarPopoverFooter } from "@/components/ui/calendar-popover-footer";
import {
  CalendarPickerBody,
  CalendarPickerContent,
  CalendarPickerTrigger,
} from "@/components/ui/date-picker-popover";
import { LuxDayPicker } from "@/components/ui/lux-day-picker";

export type DateRangePickerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "defaultValue" | "onChange"
> & {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  defaultValue?: DateRange;
};

function formatRangeLabel(range: DateRange | undefined) {
  if (!range?.from) return undefined;

  const from = format(range.from, "yyyy-MM-dd");
  return range.to ? `${from} -> ${format(range.to, "yyyy-MM-dd")}` : `${from} ...`;
}

export function DateRangePicker({
  value,
  onChange,
  defaultValue,
  placeholder = "Pick a range",
  className,
  disabled,
  ...props
}: DateRangePickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<DateRange | undefined>(defaultValue);
  const selected = isControlled ? value : internal;

  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<DateRange | undefined>(selected);

  React.useEffect(() => {
    if (open) setPending(selected);
  }, [open, selected]);

  const setRange = (range: DateRange | undefined) => {
    if (!isControlled) setInternal(range);
    onChange?.(range);
  };

  const handleConfirm = () => {
    setRange(pending);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <CalendarPickerTrigger
          data-slot="date-range-picker"
          disabled={disabled}
          className={className}
          displayValue={formatRangeLabel(selected)}
          placeholder={placeholder}
          muted={!selected?.from}
          {...props}
        />
      </Popover.Trigger>
      <CalendarPickerContent>
        <CalendarPickerBody>
          <LuxDayPicker
            mode="range"
            selected={pending}
            onSelect={setPending}
            showOutsideDays
            disabled={disabled}
          />
        </CalendarPickerBody>
        <CalendarPopoverFooter onCancel={() => setOpen(false)} onConfirm={handleConfirm} />
      </CalendarPickerContent>
    </Popover.Root>
  );
}
