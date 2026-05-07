import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = { label: string; href?: string };

export function PageBreadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <li aria-hidden className="flex items-center text-[color:var(--t-text-30)]">
                  <ChevronRight className="size-3.5 shrink-0" />
                </li>
              )}
              <li className="flex min-h-6 items-center">
                {!last && item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors underline-offset-4 hover:underline",
                      "text-[color:var(--t-text-40)] hover:text-[color:var(--t-text)]"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={last ? "text-[color:var(--t-text)] font-medium" : "text-[color:var(--t-text-40)]"}
                    aria-current={last ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
