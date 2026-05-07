import { PageHeader } from "@/components/ui/page-header";
import { PageBreadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export function ExampleShell({
  title,
  description,
  children,
  className,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
}) {
  return (
    <div className={cn("space-y-4 pb-4", className)}>
      <div className="space-y-0">
        {breadcrumbs?.length ? <PageBreadcrumb items={breadcrumbs} /> : null}
        <PageHeader title={title} description={description} />
      </div>
      {children}
    </div>
  );
}

