"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

type TooltipCssVars = {
  "--tooltip-bg"?: string
  "--tooltip-fg"?: string
  "--tooltip-border"?: string
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const styleVars = props.style as (React.CSSProperties & TooltipCssVars) | undefined
  const mergedStyle = {
    ...(styleVars ?? {}),
    // Defaults (can be overridden by passing CSS vars in `style`)
    "--tooltip-bg": styleVars?.["--tooltip-bg"] ?? "var(--t-surface-2)",
    "--tooltip-fg": styleVars?.["--tooltip-fg"] ?? "var(--t-text)",
    "--tooltip-border": styleVars?.["--tooltip-border"] ?? "var(--t-border-2)",
  } satisfies React.CSSProperties & TooltipCssVars

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs shadow-md",
          "bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] border-[color:var(--tooltip-border)]",
          "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={mergedStyle}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          width={10}
          height={6}
          className="fill-[var(--tooltip-bg)] stroke-[var(--tooltip-border)]"
          style={{ strokeWidth: 1 }}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
