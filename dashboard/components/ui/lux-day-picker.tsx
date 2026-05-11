"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "@/lib/utils";

const weekendModifiers = {
  sun: (d: Date) => d.getDay() === 0,
  sat: (d: Date) => d.getDay() === 6,
};

function defaultMonthBounds() {
  const y = new Date().getFullYear();
  return { startMonth: new Date(y - 100, 0), endMonth: new Date(y + 25, 11) };
}

/**
 * react-day-picker v9 — Korean locale, Sun/Sat column tints, primary selection,
 * compact sizing via `.lux-calendar` (globals). Year/month dropdowns by default.
 */
export function LuxDayPicker(props: DayPickerProps) {
  const {
    className,
    formatters,
    modifiers: modifiersProp,
    modifiersClassNames,
    captionLayout,
    startMonth: startMonthProp,
    endMonth: endMonthProp,
    ...rest
  } = props;

  const bounds = defaultMonthBounds();
  const layout = captionLayout ?? "dropdown";

  return (
    <DayPicker
      locale={ko}
      weekStartsOn={0}
      navLayout="around"
      captionLayout={layout}
      startMonth={startMonthProp ?? bounds.startMonth}
      endMonth={endMonthProp ?? bounds.endMonth}
      showOutsideDays
      modifiers={{ ...weekendModifiers, ...modifiersProp }}
      modifiersClassNames={{
        sun: "lux-cal-sun",
        sat: "lux-cal-sat",
        ...modifiersClassNames,
      }}
      formatters={{
        ...(layout === "label"
          ? { formatCaption: (month: Date) => format(month, "yyyy년 M월", { locale: ko }) }
          : {}),
        ...formatters,
      }}
      className={cn("lux-calendar", className)}
      {...rest}
    />
  );
}
