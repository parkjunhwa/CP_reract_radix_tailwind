"use client";

import * as Popover from "@radix-ui/react-popover";
import { Clock } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const PERIODS = [
  { id: "am" as const, label: "오전" },
  { id: "pm" as const, label: "오후" },
];

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const ROW_BASE =
  "w-full min-h-8 shrink-0 rounded-[0.25rem] px-2 py-1.5 text-center text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

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
        <button
          type="button"
          id={id}
          disabled={disabled}
          className={cn(
            "flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border px-3 text-xs outline-none transition-colors",
            "border-[color:var(--t-border-2)] bg-[color:var(--t-input-bg)] text-[color:var(--t-text-70)]",
            "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <Clock className="size-3.5 shrink-0 text-[color:var(--t-text-40)]" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-left tabular-nums">{formatKoreanLabel(value)}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-[min(100vw-1.5rem,17rem)] overflow-hidden rounded-xl border p-2 shadow-xl outline-none",
            "border-[color:var(--t-border-2)] bg-[color:var(--t-surface)]",
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-3 gap-0 divide-x divide-[color:var(--t-border-2)] rounded-lg border border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)]">
            <div
              ref={colAmPmRef}
              className="max-h-[216px] overflow-y-auto overscroll-y-contain px-1 py-1.5"
              role="listbox"
              aria-label="오전/오후"
            >
              {PERIODS.map((p) => {
                const sel = p.id === period;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="option"
                    aria-selected={sel ? "true" : "false"}
                    data-active={sel ? "true" : undefined}
                    onClick={() => setParts({ period: p.id })}
                    className={cn(
                      ROW_BASE,
                      sel ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <div
              ref={colHourRef}
              className="max-h-[216px] overflow-y-auto overscroll-y-contain px-1 py-1.5"
              role="listbox"
              aria-label="시"
            >
              {HOURS_12.map((h) => {
                const sel = h === h12;
                return (
                  <button
                    key={h}
                    type="button"
                    role="option"
                    aria-selected={sel ? "true" : "false"}
                    data-active={sel ? "true" : undefined}
                    onClick={() => setParts({ h12: h })}
                    className={cn(
                      ROW_BASE,
                      sel ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
            <div
              ref={colMinRef}
              className="max-h-[216px] overflow-y-auto overscroll-y-contain px-1 py-1.5"
              role="listbox"
              aria-label="분"
            >
              {MINUTES.map((m) => {
                const sel = m === minute;
                return (
                  <button
                    key={m}
                    type="button"
                    role="option"
                    aria-selected={sel ? "true" : "false"}
                    data-active={sel ? "true" : undefined}
                    onClick={() => setParts({ minute: m })}
                    className={cn(
                      ROW_BASE,
                      sel ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
