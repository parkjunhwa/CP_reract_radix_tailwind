"use client";

const campaigns = [
  { code: "LUXE-AMB-01", referrer: "Sofia M.", conversions: 48, payout: "$2,840" },
  { code: "LUXE-AMB-07", referrer: "James W.", conversions: 32, payout: "$1,910" },
  { code: "LUXE-AMB-14", referrer: "Yuki T.", conversions: 21, payout: "$1,055" },
];

export default function EcommerceReferralsPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active codes", val: "18" },
          { label: "30d conversions", val: "312" },
          { label: "Pending payout", val: "$8,430" },
        ].map((k) => (
          <div key={k.label} className="panel p-5">
            <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
            <p className="t-text font-bold text-2xl mt-1">{k.val}</p>
          </div>
        ))}
      </div>
      <div className="panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
              {["Code", "Ambassador", "Conversions", "Payout"].map((h) => (
                <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.code} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <td className="px-5 py-3.5 t-text-70 text-xs font-mono">{c.code}</td>
                <td className="px-5 py-3.5 t-text-70 text-xs">{c.referrer}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs">{c.conversions}</td>
                <td className="px-5 py-3.5 t-text-50 text-xs font-semibold">{c.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
