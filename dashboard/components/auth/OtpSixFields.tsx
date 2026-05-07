"use client";

import { useState } from "react";
import * as OTP from "@radix-ui/react-one-time-password-field";

import { cn } from "@/lib/utils";

const slotCls = cn(
  "w-10 h-12 rounded-lg border text-center text-lg font-semibold tabular-nums outline-none",
  "border-[color:var(--t-border-2)] bg-[color:var(--t-input-bg)] text-[color:var(--t-text)]",
  "focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--t-bg)]",
);

export function OtpSixFields() {
  const [value, setValue] = useState("");
  return (
    <OTP.Root
      value={value}
      onValueChange={setValue}
      validationType="numeric"
      autoComplete="one-time-code"
      className="flex flex-wrap items-center gap-2"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <OTP.Input key={i} index={i} className={slotCls} />
      ))}
      <OTP.HiddenInput name="otp" />
    </OTP.Root>
  );
}
