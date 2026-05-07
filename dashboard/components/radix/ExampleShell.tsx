import { PageHeader } from "@/components/ui/page-header";
import { PageBreadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export function ExampleShell({
  title,
  description,
  children,
  className,
  breadcrumbs,
  showPreamble = true,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  /**
   * When false, hides breadcrumb + page header. Useful when the layout already
   * renders a global `PagePreamble`.
   */
  showPreamble?: boolean;
}) {
  return (
    <div className={cn("space-y-3 pb-0", className)}>
      {showPreamble ? (
        <div className="space-y-0">
          {breadcrumbs?.length ? <PageBreadcrumb items={breadcrumbs} /> : null}
          <PageHeader title={title} description={description} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

