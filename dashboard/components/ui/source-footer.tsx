import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SourceFooterProps = {
  children: ReactNode;
  /** e.g. `col-span-full` when the parent is a CSS grid. */
  className?: string;
};

/** Bottom-of-page attribution (matches foundation/icons tone). */
export function SourceFooter({ children, className }: SourceFooterProps) {
  return (
    <div className={cn("pt-1", className)}>
      <p className="t-text-40 text-xs leading-relaxed">{children}</p>
    </div>
  );
}
