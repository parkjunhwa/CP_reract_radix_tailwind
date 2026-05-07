"use client";

import Link from "next/link";

const customers = [
  { id: "879861", name: "Flora Chen", email: "flora.chen@example.com", orders: 24, tier: "Platinum", city: "Singapore" },
  { id: "879860", name: "Oliver Blake", email: "o.blake@example.com", orders: 6, tier: "Gold", city: "London" },
  { id: "879859", name: "Giulia Ricci", email: "g.ricci@example.com", orders: 11, tier: "Silver", city: "Milan" },
];

export default function EcommerceCustomersListPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-lg">Customers · List</h2>
        <p className="t-text-40 text-sm mt-1">Sample records; Details uses id from full-version menu (879861).</p>
      </div>
      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
              {["Customer", "Email", "City", "Tier", "Orders"].map((h) => (
                <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <td className="px-5 py-3.5">
                  <Link href={`/apps/ecommerce/customers/details/${c.id}`} className="text-violet-400 text-xs font-semibold hover:underline">
                    {c.name}
                  </Link>
                </td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{c.email}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{c.city}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{c.tier}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
