import Link from "next/link";
import { cn } from "@/lib/utils";

export function ExampleCard({
  title,
  description,
  href,
  className,
}: {
  title: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "panel block p-5 transition-colors",
        "hover:bg-[var(--t-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="space-y-1">
        <h3 className="t-text font-semibold text-sm">{title}</h3>
        <p className="t-text-40 text-xs">{description}</p>
      </div>
    </Link>
  );
}

