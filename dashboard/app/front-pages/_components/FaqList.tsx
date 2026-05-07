"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { id: string; question: string; answer: string; defaultOpen?: boolean };

export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items.find((i) => i.defaultOpen)?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="panel overflow-hidden"
            style={{ borderColor: open ? "var(--t-accent-soft)" : undefined }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left t-hover"
            >
              <span className={cn("text-sm font-medium", open ? "t-text" : "t-text-70")}>{item.question}</span>
              <ChevronDown
                className={cn("w-4 h-4 transition-transform t-text-40", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {open && (
              <div className="px-5 pb-5 -mt-1 t-text-50 text-sm leading-relaxed">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
