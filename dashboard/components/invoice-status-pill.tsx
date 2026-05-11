import { cn } from "@/lib/utils";
import { STATUS_STYLES, type InvoiceStatus } from "@/lib/invoices";

export function InvoiceStatusPill({ status }: { status: InvoiceStatus }) {
  const { cls, dot } = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit max-w-full shrink-0 items-center gap-1 rounded-4xl border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
        cls,
      )}
    >
      <span className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full", dot)} aria-hidden />
      {status}
    </span>
  );
}
