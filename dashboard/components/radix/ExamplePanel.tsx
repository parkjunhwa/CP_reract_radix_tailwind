import { cn } from "@/lib/utils";

export function ExamplePanel({
  title,
  description,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Override body classes when a specific demo needs different overflow handling. */
  bodyClassName?: string;
}) {
  return (
    <section className={cn("panel flex h-full flex-col", className)}>
      <div className="shrink-0 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        {description && <p className="t-text-40 text-xs mt-0.5">{description}</p>}
      </div>
      <div className={cn("flex-1 p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

