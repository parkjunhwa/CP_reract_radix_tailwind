"use client";

import Link from "next/link";

const orders = [
  { id: "5434", customer: "S. Marchetti", total: 18420, status: "Shipped", date: "2026-05-02" },
  { id: "5433", customer: "Y. Tanaka", total: 620, status: "Processing", date: "2026-05-02" },
  { id: "5432", customer: "M. Thompson", total: 9800, status: "Paid", date: "2026-05-01" },
  { id: "5431", customer: "E. Petrov", total: 240, status: "Cancelled", date: "2026-04-30" },
];

export default function EcommerceOrdersListPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-lg">Orders · List</h2>
        <p className="t-text-40 text-sm mt-1">Open a row via Details in the sidebar (sample id 5434).</p>
      </div>
      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
              {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <td className="px-5 py-3.5">
                  <Link href={`/apps/ecommerce/orders/details/${o.id}`} className="text-violet-400 text-xs font-semibold hover:underline">
                    #{o.id}
                  </Link>
                </td>
                <td className="px-5 py-3.5 t-text-70 text-xs">{o.customer}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs font-semibold">${o.total.toLocaleString()}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{o.status}</td>
                <td className="px-5 py-3.5 t-text-40 text-xs">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
