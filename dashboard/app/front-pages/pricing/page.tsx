"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, X, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FaqList from "../_components/FaqList";

const PLANS = [
  { key: "basic", name: "Basic", monthly: 19, annual: 14, perYear: 168, current: false, blurb: "For freelancers and side projects.", features: ["Timeline", "Basic search", "Live chat widget", "Email marketing", "Custom forms", "Traffic analytics"] },
  { key: "team", name: "Team", monthly: 29, annual: 22, perYear: 264, current: true, blurb: "For growing product teams.", features: ["Everything in Basic", "Timeline with database", "Advanced search", "Marketing automation", "Advanced chatbot", "Campaign management"] },
  { key: "enterprise", name: "Enterprise", monthly: 49, annual: 37, perYear: 444, current: false, blurb: "For organizations at scale.", features: ["Everything in Team", "Fuzzy search", "A/B testing sandbox", "Custom permissions", "Social automation", "Dedicated success manager"] },
];

type Tier = "starter" | "pro" | "enterprise";

const FEATURE_TABLE: { feature: string; starter: boolean | "addon"; pro: boolean | "addon"; enterprise: boolean | "addon" }[] = [
  { feature: "14-day free trial", starter: true, pro: true, enterprise: true },
  { feature: "No user limit", starter: false, pro: false, enterprise: true },
  { feature: "Product support", starter: false, pro: true, enterprise: true },
  { feature: "Email support", starter: false, pro: "addon", enterprise: true },
  { feature: "Integrations", starter: false, pro: true, enterprise: true },
  { feature: "Removal of Front branding", starter: false, pro: "addon", enterprise: true },
  { feature: "Active maintenance & support", starter: false, pro: false, enterprise: true },
  { feature: "Data storage for 365 days", starter: false, pro: false, enterprise: true },
];

const FAQS = [
  { id: "f1", question: "What counts towards the 100 responses limit?", answer: "We count all responses submitted through all your forms in a month. If you receive 100 in a month, no more responses are accepted until next month." },
  { id: "f2", question: "How do you process payments?", answer: "We accept Visa, MasterCard, American Express and PayPal. All transactions are encrypted and PCI compliant.", defaultOpen: true },
  { id: "f3", question: "What payment methods do you accept?", answer: "All major credit and debit cards via Stripe, plus PayPal." },
  { id: "f4", question: "Do you have a money-back guarantee?", answer: "Yes — request a refund within 30 days of your purchase, no questions asked." },
  { id: "f5", question: "I have more questions. Where can I get help?", answer: "Reach our team at hello@luxe.example or via the help center." },
];

function FeatureCell({ value }: { value: boolean | "addon" }) {
  if (value === true) {
    return (
      <span className="inline-flex w-6 h-6 rounded-full bg-violet-500/15 text-violet-300 items-center justify-center mx-auto">
        <CheckCircle2 className="w-3.5 h-3.5" />
      </span>
    );
  }
  if (value === "addon") {
    return <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[10px]">Add-on</Badge>;
  }
  return (
    <span className="inline-flex w-6 h-6 rounded-full bg-white/5 t-text-30 items-center justify-center mx-auto">
      <X className="w-3.5 h-3.5" />
    </span>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div>
      {/* HERO + 3 plans */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Tailored pricing</span>{" "}
            designed for you
          </h1>
          <p className="t-text-50 mt-4 text-sm sm:text-base">
            All plans include 40+ advanced tools and features. Choose the best plan to fit your needs — switch any time.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={cn("text-sm", billing === "monthly" ? "t-text font-semibold" : "t-text-40")}>Pay Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={billing === "annual"}
            onClick={() => setBilling((b) => (b === "annual" ? "monthly" : "annual"))}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors",
              billing === "annual" ? "bg-violet-600" : "bg-white/15",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                billing === "annual" && "translate-x-5",
              )}
            />
          </button>
          <span className={cn("text-sm", billing === "annual" ? "t-text font-semibold" : "t-text-40")}>Pay Annually</span>
          <Badge className="ml-1 bg-emerald-500/15 text-emerald-300 border-emerald-500/20">Save 25%</Badge>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PLANS.map((p) => {
            const price = billing === "annual" ? p.annual : p.monthly;
            return (
              <div
                key={p.key}
                className={cn(
                  "panel p-7 flex flex-col gap-5 relative",
                  p.current && "border-violet-500/60 ring-1 ring-violet-500/30 shadow-xl shadow-violet-900/30"
                )}
              >
                {p.current && (
                  <Badge className="absolute -top-2 right-5 bg-violet-600 text-white border-violet-700">Most popular</Badge>
                )}
                <div>
                  <p className="text-base font-semibold t-text-70">{p.name}</p>
                  <p className="t-text-40 text-xs mt-1">{p.blurb}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">${price}</span>
                  <span className="t-text-40 text-sm">/mo</span>
                </div>
                {billing === "annual" && (
                  <p className="t-text-40 text-xs -mt-3">${p.perYear} / year</p>
                )}
                <ul className="space-y-2.5 mt-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm t-text-70">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/front-pages/payment" className="mt-auto">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full",
                      p.current
                        ? "bg-violet-600 hover:bg-violet-700 text-white border-violet-700"
                        : "bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-500/30",
                    )}
                  >
                    Choose {p.name}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FREE TRIAL */}
      <section className="border-y" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold t-text">
              Still not convinced? <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Start with a 14-day free trial.</span>
            </h2>
            <p className="t-text-50 mt-3 text-sm">
              You will get full access to all features for 14 days — no credit card required.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/front-pages/payment">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
                  Start 14-day free trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/front-pages/help-center">
                <Button size="lg" variant="outline">Read documentation</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
              {[Star, CheckCircle2, ArrowRight, Star].map((Icon, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-32 rounded-xl border flex items-center justify-center",
                    i % 2 === 0 ? "bg-violet-500/10 text-violet-300" : "bg-emerald-500/10 text-emerald-300",
                  )}
                  style={{ borderColor: "var(--t-border-2)" }}
                >
                  <Icon className="w-7 h-7" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pick a plan that works best for you</h2>
          <p className="t-text-50 mt-3 text-sm">Stay cool, we have a 48-hour money-back guarantee.</p>
        </div>

        <div className="panel overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--t-border)" }}>
                <th className="text-left px-6 py-4 w-1/3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] t-text-40">Features</p>
                  <p className="t-text-60 text-xs mt-0.5">Native LUXE features</p>
                </th>
                {([
                  { name: "Starter", price: "Free", highlight: false },
                  { name: "Pro", price: "$7.5/mo", highlight: true },
                  { name: "Enterprise", price: "$16/mo", highlight: false },
                ] as const).map((h) => (
                  <th
                    key={h.name}
                    className={cn(
                      "text-center px-4 py-4",
                      h.highlight && "bg-violet-500/[0.06]"
                    )}
                  >
                    <p className="text-sm font-semibold t-text inline-flex items-center gap-1.5 justify-center">
                      {h.name}
                      {h.highlight && <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                    </p>
                    <p className="t-text-40 text-xs mt-0.5">{h.price}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_TABLE.map((row) => (
                <tr key={row.feature} className="border-b last:border-0 t-hover" style={{ borderColor: "var(--t-border)" }}>
                  <td className="px-6 py-3.5 t-text-70">{row.feature}</td>
                  <td className="px-4 py-3.5 text-center"><FeatureCell value={row.starter} /></td>
                  <td className="px-4 py-3.5 text-center bg-violet-500/[0.04]"><FeatureCell value={row.pro} /></td>
                  <td className="px-4 py-3.5 text-center"><FeatureCell value={row.enterprise} /></td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4" />
                {(["starter", "pro", "enterprise"] as Tier[]).map((t) => (
                  <td key={t} className={cn("text-center px-4 py-4", t === "pro" && "bg-violet-500/[0.06]")}>
                    <Link href="/front-pages/payment">
                      <Button
                        size="sm"
                        className={cn(
                          t === "pro"
                            ? "bg-violet-600 hover:bg-violet-700 text-white border-violet-700"
                            : "bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-500/30",
                        )}
                      >
                        Choose plan
                      </Button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">FAQs</h2>
          <p className="t-text-50 mt-3 text-sm">Let us help answer the most common questions.</p>
        </div>
        <FaqList items={FAQS} />
      </section>
    </div>
  );
}
