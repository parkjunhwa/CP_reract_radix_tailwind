import { cn } from "@/lib/utils";

export function ExamplePanel({
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
    <section className={cn("panel", className)}>
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        {description && <p className="t-text-40 text-xs mt-0.5">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

