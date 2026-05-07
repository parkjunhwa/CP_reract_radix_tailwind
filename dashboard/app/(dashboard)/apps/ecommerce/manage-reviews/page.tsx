"use client";

import { Star } from "lucide-react";

const reviews = [
  { user: "A. Novak", product: "Orbital Titanium Chrono", score: 5, body: "Flawless finish and shipping was overnight.", days: "2d ago" },
  { user: "L. Martins", product: "Heritage Weekender", score: 4, body: "Leather mellowed nicely after two trips.", days: "5d ago" },
  { user: "H. Patel", product: "Silk Scarf Kyoto", score: 5, body: "Packaging matched the boutique experience.", days: "1w ago" },
];

export default function EcommerceManageReviewsPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="panel p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="t-text font-medium text-sm">{r.user}</p>
                <p className="t-text-40 text-xs mt-0.5">{r.product}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-3 h-3" />
                {r.score}.0 · {r.days}
              </div>
            </div>
            <p className="t-text-70 text-xs mt-3 leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
