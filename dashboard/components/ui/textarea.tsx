"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
  valid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, valid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        data-invalid={invalid || undefined}
        data-valid={valid || undefined}
        className={cn(
          "flex w-full min-h-[72px] rounded-lg border bg-[color:var(--t-input-bg)] px-3 py-2 text-xs outline-none transition-colors resize-y",
          "border-[color:var(--t-border-2)] text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]",
          "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-red-500/60 aria-invalid:ring-red-500/20",
          "data-[invalid=true]:border-red-500/60",
          "data-[valid=true]:border-emerald-500/60",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
