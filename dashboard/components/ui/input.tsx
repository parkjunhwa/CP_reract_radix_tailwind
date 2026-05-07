"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  cn(
    "flex w-full rounded-lg border bg-[color:var(--t-input-bg)] text-xs outline-none transition-colors",
    "border-[color:var(--t-border-2)] text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]",
    "focus-visible:border-[color:var(--t-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--t-ring)]/30",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-red-500/60 aria-invalid:ring-red-500/20 aria-invalid:focus-visible:ring-red-500/30",
    "data-[invalid=true]:border-red-500/60 data-[invalid=true]:ring-red-500/20 data-[invalid=true]:focus-visible:ring-red-500/30",
    "data-[valid=true]:border-emerald-500/60",
    "[&::-webkit-search-cancel-button]:hidden",
  ),
  {
    variants: {
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-3",
        lg: "h-10 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type NativeInputProps = Omit<React.ComponentProps<"input">, "size">;

export interface InputProps
  extends NativeInputProps,
    VariantProps<typeof inputVariants> {
  invalid?: boolean;
  valid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, invalid, valid, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-invalid={invalid || undefined}
        data-valid={valid || undefined}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputAddon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="input-addon"
    className={cn(
      "flex items-center text-[color:var(--t-text-40)] [&_svg]:h-3.5 [&_svg]:w-3.5",
      className,
    )}
    {...props}
  />
));
InputAddon.displayName = "InputAddon";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    invalid?: boolean;
    valid?: boolean;
    inputSize?: VariantProps<typeof inputVariants>["size"];
  }
>(
  (
    { className, invalid, valid, inputSize = "default", children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="input-group"
      data-invalid={invalid || undefined}
      data-valid={valid || undefined}
      data-size={inputSize}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border bg-[color:var(--t-input-bg)] px-3 transition-colors",
        "border-[color:var(--t-border-2)]",
        "focus-within:border-[color:var(--t-accent)]",
        "data-[invalid=true]:border-red-500/60 data-[invalid=true]:focus-within:border-red-500/70",
        "data-[valid=true]:border-emerald-500/60",
        "data-[size=sm]:h-8",
        "data-[size=default]:h-9",
        "data-[size=lg]:h-10 data-[size=lg]:px-3.5",
        "[&>input]:h-full [&>input]:flex-1 [&>input]:bg-transparent [&>input]:px-0 [&>input]:text-xs [&>input]:outline-none",
        "[&>input]:text-[color:var(--t-text-70)] [&>input]:placeholder:text-[color:var(--t-text-30)]",
        "[&>input]:border-0 [&>input]:focus-visible:ring-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
InputGroup.displayName = "InputGroup";

export { Input, InputAddon, InputGroup, inputVariants };
