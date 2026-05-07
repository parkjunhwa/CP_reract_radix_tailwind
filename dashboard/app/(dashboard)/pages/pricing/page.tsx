"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Zap, Building, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    monthlyPrice: 299,
    yearlyPrice: 249,
    description: "Perfect for boutique luxury dealers and individual collectors.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    popular: false,
    features: [
      { text: "Up to 50 product listings", included: true },
      { text: "5 user accounts", included: true },
      { text: "Basic authentication reports", included: true },
      { text: "Standard shipping integration", included: true },
      { text: "Email support (48h response)", included: true },
      { text: "Analytics dashboard", included: false },
      { text: "White-glove concierge", included: false },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: Building,
    monthlyPrice: 899,
    yearlyPrice: 749,
    description: "For established luxury dealers with high-volume transactions.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    popular: true,
    features: [
      { text: "Unlimited product listings", included: true },
      { text: "25 user accounts", included: true },
      { text: "Full authentication suite", included: true },
      { text: "Priority shipping (armored)", included: true },
      { text: "Priority support (4h response)", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "White-glove concierge", included: true },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Diamond,
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    description: "For luxury houses, auction firms, and institutional buyers.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    popular: false,
    features: [
      { text: "Unlimited product listings", included: true },
      { text: "Unlimited users", included: true },
      { text: "Full authentication suite", included: true },
      { text: "Dedicated logistics fleet", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Advanced analytics & BI", included: true },
      { text: "White-glove concierge", included: true },
      { text: "Custom branding", included: true },
      { text: "Full API access", included: true },
    ],
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="space-y-6 pb-4 max-w-5xl">
      {/* Header */}
      <div className="panel p-8 text-center space-y-4">
        <h1 className="t-text font-bold text-2xl">Simple, Transparent Pricing</h1>
        <p className="t-text-40 text-sm max-w-lg mx-auto">Choose the plan that fits your business. Scale up or down at any time.</p>
        <div className="flex items-center justify-center gap-3">
          <span className={cn("text-xs font-medium", !yearly ? "t-text-70" : "t-text-30")}>Monthly</span>
          <button onClick={() => setYearly(!yearly)}
            className="relative w-10 h-6 rounded-full transition-colors"
            style={{ backgroundColor: yearly ? "var(--t-accent)" : "var(--t-border-2)" }}>
            <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform", yearly ? "translate-x-5" : "translate-x-1")} />
          </button>
          <span className={cn("text-xs font-medium", yearly ? "t-text-70" : "t-text-30")}>
            Yearly <span className="text-emerald-400 font-semibold">–17%</span>
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <div key={plan.id}
              className={cn("panel p-6 flex flex-col gap-5 relative", plan.popular ? `border-2 ${plan.border}` : "")}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full" style={{ backgroundColor: "var(--t-accent)" }}>Most Popular</span>
                </div>
              )}
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", plan.bg)}>
                <Icon className={cn("w-5 h-5", plan.color)} />
              </div>
              <div>
                <h3 className="t-text font-bold text-base">{plan.name}</h3>
                <p className="t-text-40 text-xs mt-1 leading-relaxed">{plan.description}</p>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="t-text font-bold text-3xl">${price.toLocaleString()}</span>
                  <span className="t-text-40 text-xs">/mo</span>
                </div>
                {yearly && <p className="text-emerald-400 text-[10px] mt-1">Billed annually</p>}
              </div>
              <button
                className={cn("w-full h-10 rounded-lg text-sm font-medium transition-colors", plan.popular ? "text-white" : "border t-text-60 hover:bg-[var(--t-hover)]")}
                style={plan.popular ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
                Get Started
              </button>
              <div className="space-y-2.5">
                {plan.features.map((feat) => (
                  <div key={feat.text} className="flex items-center gap-2.5">
                    {feat.included
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      : <XCircle className="w-4 h-4 t-text-20 flex-shrink-0" />
                    }
                    <span className={cn("text-xs", feat.included ? "t-text-60" : "t-text-30")}>{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ teaser */}
      <div className="panel p-6 text-center space-y-2">
        <p className="t-text-60 text-sm font-medium">Have questions about our plans?</p>
        <p className="t-text-40 text-xs">Contact our sales team at <span className="text-violet-400">sales@luxe.com</span> or browse our <span className="text-violet-400 cursor-pointer">FAQ page</span>.</p>
      </div>
    </div>
  );
}
