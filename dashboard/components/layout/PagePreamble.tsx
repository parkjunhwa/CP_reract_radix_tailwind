"use client";

import { usePathname } from "next/navigation";

import { PageBreadcrumb } from "@/components/ui/breadcrumb";
import { resolvePageMeta } from "@/lib/page-meta";

/**
 * Auto-rendered breadcrumb + title + description that sits above every
 * dashboard page. Pages may opt out of the entire preamble through the
 * `SKIP_PREFIXES` list in `lib/page-meta.ts`.
 */
export function PagePreamble() {
  const pathname = usePathname() ?? "/";
  const { title, description, breadcrumb, skip } = resolvePageMeta(pathname);

  if (skip) return null;

  return (
    <header className="mb-4 space-y-1">
      <PageBreadcrumb items={breadcrumb} />
      <div>
        <h1 className="t-text font-bold text-xl">{title}</h1>
        {description ? (
          <p className="t-text-40 text-sm mt-0.5">{description}</p>
        ) : null}
      </div>
    </header>
  );
}
