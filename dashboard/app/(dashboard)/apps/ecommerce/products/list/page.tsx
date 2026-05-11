"use client";

import { Badge } from "@/components/ui/badge";

const rows = [
  { sku: "LX-ORBIT-01", name: "Orbital Titanium Chrono", cat: "Watches", price: 12450, stock: 28, status: "Live" },
  { sku: "LX-SILK-22", name: "Silk Scarf Kyoto", cat: "Apparel", price: 890, stock: 140, status: "Live" },
  { sku: "LX-LEATHER-09", name: "Heritage Weekender", cat: "Bags", price: 2190, stock: 42, status: "Low stock" },
  { sku: "LX-VASE-03", name: "Blown Glass Vase · Aurora", cat: "Home", price: 420, stock: 0, status: "Draft" },
];

export default function EcommerceProductsListPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
              {["SKU", "Name", "Category", "Price", "Stock", "Status"].map((h) => (
                <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.sku} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <td className="px-5 py-3.5"><Badge variant="outline" className="text-[10px] font-mono">{r.sku}</Badge></td>
                <td className="px-5 py-3.5 t-text-70 text-xs">{r.name}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{r.cat}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs font-semibold">${r.price.toLocaleString()}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{r.stock}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full border bg-violet-500/10 text-violet-500 border-violet-500/20">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
