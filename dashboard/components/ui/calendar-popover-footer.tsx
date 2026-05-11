"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CalendarPopoverFooter({
  onCancel,
  onConfirm,
  cancelLabel = "취소",
  confirmLabel = "확인",
  className,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-end gap-2 border-t px-3 py-3 border-[color:var(--t-border)]",
        className,
      )}
    >
      <Button type="button" variant="outline" size="sm" className="h-9 min-w-[4.5rem] text-xs" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button type="button" size="sm" className="h-9 min-w-[4.5rem] text-xs" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  );
}
