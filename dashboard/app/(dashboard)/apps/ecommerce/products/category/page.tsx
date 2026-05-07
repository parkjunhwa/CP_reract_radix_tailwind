"use client";

import { FolderTree } from "lucide-react";
import { cn } from "@/lib/utils";

const tree = [
  { name: "Luxury", count: 128, depth: 0 },
  { name: "Accessories", count: 54, depth: 1 },
  { name: "Watches", count: 31, depth: 1 },
  { name: "Apparel", count: 43, depth: 0 },
  { name: "Outerwear", count: 18, depth: 1 },
];

export default function EcommerceProductCategoryPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
          <FolderTree className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h2 className="t-text font-semibold text-lg">Products · Category</h2>
          <p className="t-text-40 text-sm mt-1">Category tree preview (static sample).</p>
        </div>
      </div>
      <div className="panel divide-y" style={{ borderColor: "var(--t-border)" }}>
        {tree.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between px-5 py-3.5 t-hover transition-colors"
            style={{ paddingLeft: `${16 + row.depth * 20}px` }}
          >
            <span className={cn("text-sm", row.depth ? "t-text-70" : "t-text font-medium")}>{row.name}</span>
            <span className="t-text-40 text-xs">{row.count} SKUs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
