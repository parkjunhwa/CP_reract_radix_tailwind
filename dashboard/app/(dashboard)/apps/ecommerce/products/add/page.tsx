"use client";

import { Button } from "@/components/ui/button";

export default function EcommerceProductAddPage() {
  return (
    <div className="space-y-4 pb-4 max-w-2xl">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-lg">Products · Add</h2>
        <p className="t-text-40 text-sm mt-1">Minimal form scaffold — mirrors full-version route.</p>
      </div>
      <div className="panel p-5 space-y-4">
        {[
          ["Product name", "text", "Limited edition tote"],
          ["SKU", "text", "LX-NEW-101"],
          ["Base price (USD)", "number", "1299"],
        ].map(([label, type, ph]) => (
          <label key={label as string} className="block space-y-1.5">
            <span className="t-text-50 text-xs font-medium">{label}</span>
            <input
              type={type as string}
              placeholder={ph as string}
              className="w-full h-10 px-3 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
            />
          </label>
        ))}
        <Button type="button" className="w-full sm:w-auto">Save draft</Button>
      </div>
    </div>
  );
}
