"use client";

import * as Popover from "@radix-ui/react-popover";
import { Clock } from "lucide-react";
import * as React from "react";

import {
  PickerOption,
  PickerPanel,
  PickerPopoverContent,
  PickerScrollColumn,
  PickerTriggerButton,
} from "@/components/ui/picker-popover";

const PERIODS = [
  { id: "am" as const, label: "오전" },
  { id: "pm" as const, label: "오후" },
];

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function parse24ToParts(value: string): { period: "am" | "pm"; h12: number; minute: number } {
  const [hh, mm] = value.split(":").map((x) => parseInt(x ?? "0", 10));
  const h = Number.isFinite(hh) ? hh : 0;
  const minute = Number.isFinite(mm) ? mm : 0;
  const safeH = ((h % 24) + 24) % 24;
  const period = safeH < 12 ? "am" : "pm";
  const h12 = safeH % 12 === 0 ? 12 : safeH % 12;
  return { period, h12, minute: Math.min(59, Math.max(0, minute)) };
}

function partsTo24(period: "am" | "pm", h12: number, minute: number): string {
  let h24: number;
  if (period === "am") {
    h24 = h12 === 12 ? 0 : h12;
  } else {
    h24 = h12 === 12 ? 12 : h12 + 12;
  }
  return `${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatKoreanLabel(value: string) {
  const { period, h12, minute } = parse24ToParts(value);
  const prefix = period === "am" ? "오전" : "오후";
  return `${prefix} ${h12}:${String(minute).padStart(2, "0")}`;
}

function scrollActiveIntoView(root: HTMLElement | null) {
  if (!root) return;
  const el = root.querySelector<HTMLElement>('[data-active="true"]');
  el?.scrollIntoView({ block: "center" });
}

export type TimeScrollPickerProps = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
};

export function TimeScrollPicker({ value, onChange, disabled, className, id }: TimeScrollPickerProps) {
  const [open, setOpen] = React.useState(false);
  const { period, h12, minute } = parse24ToParts(value);

  const colAmPmRef = React.useRef<HTMLDivElement>(null);
  const colHourRef = React.useRef<HTMLDivElement>(null);
  const colMinRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!open) return;
    scrollActiveIntoView(colAmPmRef.current);
    scrollActiveIntoView(colHourRef.current);
    scrollActiveIntoView(colMinRef.current);
  }, [open, value]);

  const setParts = (next: { period?: "am" | "pm"; h12?: number; minute?: number }) => {
    onChange(
      partsTo24(next.period ?? period, next.h12 ?? h12, next.minute ?? minute),
    );
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <PickerTriggerButton
          id={id}
          disabled={disabled}
          className={className}
          icon={<Clock aria-hidden />}
          displayValue={formatKoreanLabel(value)}
        />
      </Popover.Trigger>
      <PickerPopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <PickerPanel className="grid grid-cols-3 gap-0 divide-x divide-(--t-border-2)">
          <PickerScrollColumn ref={colAmPmRef}>
            {PERIODS.map((p) => {
              const sel = p.id === period;
              return (
                <PickerOption
                  key={p.id}
                  active={sel}
                  onClick={() => setParts({ period: p.id })}
                >
                  {p.label}
                </PickerOption>
              );
            })}
          </PickerScrollColumn>
          <PickerScrollColumn ref={colHourRef}>
            {HOURS_12.map((h) => {
              const sel = h === h12;
              return (
                <PickerOption
                  key={h}
                  active={sel}
                  onClick={() => setParts({ h12: h })}
                >
                  {String(h).padStart(2, "0")}
                </PickerOption>
              );
            })}
          </PickerScrollColumn>
          <PickerScrollColumn ref={colMinRef}>
            {MINUTES.map((m) => {
              const sel = m === minute;
              return (
                <PickerOption
                  key={m}
                  active={sel}
                  onClick={() => setParts({ minute: m })}
                >
                  {String(m).padStart(2, "0")}
                </PickerOption>
              );
            })}
          </PickerScrollColumn>
        </PickerPanel>
      </PickerPopoverContent>
    </Popover.Root>
  );
}
