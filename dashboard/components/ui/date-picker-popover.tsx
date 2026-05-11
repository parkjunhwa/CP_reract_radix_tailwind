"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import {
  PickerPopoverContent,
  PickerTriggerButton,
} from "@/components/ui/picker-popover";
import { cn } from "@/lib/utils";

type CalendarPickerTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof PickerTriggerButton>,
  "icon"
>;

export const CalendarPickerTrigger = React.forwardRef<
  HTMLButtonElement,
  CalendarPickerTriggerProps
>((props, ref) => (
  <PickerTriggerButton
    ref={ref}
    icon={<CalendarIcon aria-hidden="true" />}
    {...props}
  />
));
CalendarPickerTrigger.displayName = "CalendarPickerTrigger";

export function CalendarPickerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof PickerPopoverContent>) {
  return (
    <PickerPopoverContent
      className={cn(
        "w-fit min-w-0 max-w-[calc(100vw-1.5rem)] p-0",
        className,
      )}
      {...props}
    >
      {children}
    </PickerPopoverContent>
  );
}

export function CalendarPickerBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("px-2 pb-0.5 pt-2", className)} {...props} />;
}
