import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

export function ExampleShell({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6 pb-6", className)}>
      <PageHeader title={title} description={description} />
      {children}
    </div>
  );
}

