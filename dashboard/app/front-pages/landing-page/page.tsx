"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Rocket, Code2, FileText, CheckCircle2, Users, BookOpen, Diamond, Star,
  Headphones, ShieldCheck, Mail, Phone, ArrowRight, Sparkles, Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FaqList from "../_components/FaqList";

const FEATURES = [
  { icon: Code2, title: "Quality Code", desc: "Code structure that all developers will easily understand and fall in love with." },
  { icon: Rocket, title: "Continuous Updates", desc: "Free updates for the next 12 months, including new demos and features." },
  { icon: FileText, title: "Starter-Kit", desc: "Start your project quickly without having to remove unnecessary features." },
  { icon: CheckCircle2, title: "API Ready", desc: "Just change the endpoint and see your own data loaded within seconds." },
  { icon: Headphones, title: "Excellent Support", desc: "Our team is on standby to help you ship faster and smoother." },
  { icon: BookOpen, title: "Well Documented", desc: "An easy-to-follow doc with lots of references and code examples." },
];

const STATS = [
  { value: "7.1k+", label: "Support Tickets Resolved", color: "from-violet-500 to-purple-700", icon: Headphones },
  { value: "50k+", label: "Creatives in our community", color: "from-emerald-500 to-teal-700", icon: Users },
  { value: "4.8/5", label: "Highly rated products", color: "from-sky-500 to-blue-700", icon: Diamond },
  { value: "100%", label: "Money-back guarantee", color: "from-amber-500 to-orange-700", icon: ShieldCheck },
];

const REVIEWS = [
  { brand: "Pinterest", color: "text-rose-400", desc: "I've never used a theme as versatile and flexible as Vuexy. It's my go-to for building dashboard sites on almost any project.", name: "Eugenia Moore", title: "Founder, Pinterest", rating: 5 },
  { brand: "Netflix", color: "text-red-400", desc: "Materio is awesome — and I particularly enjoy knowing that if I get stuck on something, the docs and team are there.", name: "Tommy Hoffman", title: "Founder, Netflix", rating: 5 },
  { brand: "Airbnb", color: "text-pink-400", desc: "This template is superior in so many ways. The code, the design, the regular updates, the support — it's the whole package.", name: "Ava Park", title: "CTO, Airbnb", rating: 5 },
];

const TEAM = [
  { name: "Sophie Gilbert", role: "Project Manager", color: "from-violet-500 to-purple-700", initials: "SG" },
  { name: "Paul Miles", role: "UI Designer", color: "from-sky-500 to-blue-700", initials: "PM" },
  { name: "Nannie Ford", role: "Development Lead", color: "from-rose-500 to-pink-700", initials: "NF" },
  { name: "Chris Watkins", role: "Marketing Manager", color: "from-emerald-500 to-teal-700", initials: "CW" },
];

const PLANS = [
  { name: "Basic", monthly: 19, annual: 14, perYear: 168, current: false, features: ["Timeline", "Basic search", "Live chat widget", "Email marketing", "Custom Forms", "Traffic analytics"] },
  { name: "Team", monthly: 29, annual: 22, perYear: 264, current: true, features: ["Everything in Basic", "Timeline with database", "Advanced search", "Marketing automation", "Advanced chatbot", "Campaign management"] },
  { name: "Enterprise", monthly: 49, annual: 37, perYear: 444, current: false, features: ["Campaign management", "Timeline with database", "Fuzzy search", "A/B testing sandbox", "Custom permissions", "Social media automation"] },
];

const FAQS = [
  { id: "p1", question: "Do you charge for each upgrade?", answer: "No — your purchase includes free updates for the next 12 months. New demos, components and bug fixes ship continuously." },
  { id: "p2", question: "What is a regular license?", answer: "A regular license can be used for end products that do not charge users for access. A single regular license covers a single end product. For multiple clients or domains, purchase a separate license per project.", defaultOpen: true },
  { id: "p3", question: "What is an extended license?", answer: "An extended license is required when the end product is sold to end users for a fee, e.g. SaaS apps that charge a subscription. It covers a single end product." },
  { id: "p4", question: "Which license is applicable for a SaaS application?", answer: "If you are charging users for access to your SaaS app, you should pick the extended license. For an internal/free tool the regular license is enough." },
];

export default function LandingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 60%), radial-gradient(40% 40% at 80% 20%, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0) 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 text-center">
          <Badge variant="outline" className="text-[10px] tracking-[0.18em] uppercase mb-5 border-violet-500/30 text-violet-300 bg-violet-500/10">
            <Sparkles className="w-3 h-3" /> All-in-one platform
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.05]">
            All-in-one SaaS for your <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">luxury commerce</span>
          </h1>
          <p className="t-text-50 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            No coding required to make customizations. The live customizer has everything your marketing team needs — just plug your data and ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/front-pages/pricing">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
                Get early access
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/front-pages/help-center">
              <Button size="lg" variant="outline">View documentation</Button>
            </Link>
          </div>

          <div
            className="mt-14 mx-auto max-w-5xl rounded-2xl border overflow-hidden shadow-2xl shadow-violet-900/30 panel"
            style={{ borderColor: "var(--t-border-2)" }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2 border-b" style={{ borderColor: "var(--t-border)" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-[10px] t-text-30 font-mono">app.luxe.example/dashboards/ecommerce</span>
            </div>
            <div className="grid grid-cols-12 gap-4 p-6">
              <div className="col-span-3 space-y-3">
                {[Diamond, Users, Star, ShieldCheck, BookOpen].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg t-hover">
                    <Icon className="w-4 h-4 t-text-40" />
                    <span className="h-2 flex-1 rounded-full bg-white/5" />
                  </div>
                ))}
              </div>
              <div className="col-span-9 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {STATS.slice(0, 3).map((s) => (
                    <div key={s.label} className="rounded-xl border p-3" style={{ borderColor: "var(--t-border)" }}>
                      <p className="text-[10px] t-text-40 uppercase">{s.label}</p>
                      <p className="font-bold text-lg mt-1">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border p-4 h-32 relative overflow-hidden" style={{ borderColor: "var(--t-border)" }}>
                  <p className="text-[10px] uppercase t-text-40 mb-2">Revenue</p>
                  <svg viewBox="0 0 320 80" className="w-full h-16">
                    <defs>
                      <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 C40,40 80,55 120,30 C160,10 200,40 240,25 C280,15 320,30 320,30 L320,80 L0,80 Z" fill="url(#hero-area)" />
                    <path d="M0,60 C40,40 80,55 120,30 C160,10 200,40 240,25 C280,15 320,30 320,30" stroke="#a78bfa" fill="none" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT STAT */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="panel p-5 flex items-center gap-4">
                <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", s.color)}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-xl t-text">{s.value}</p>
                  <p className="t-text-40 text-xs">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* USEFUL FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
            Useful Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Everything you need</span>{" "}
            to start your next project
          </h2>
          <p className="t-text-50 mt-3 text-sm sm:text-base">
            Not just a set of tools, the package includes ready-to-deploy conceptual applications.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="panel p-6 hover:border-violet-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-300 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold t-text">{title}</h3>
              <p className="mt-2 t-text-50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="border-y" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
                Real Customer Reviews
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">What people say</span>
              </h2>
              <p className="t-text-50 mt-3 text-sm">See what our customers have to say about their experience.</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 t-text-40 text-xs uppercase tracking-[0.18em]">
                {["Airbnb", "Netflix", "Dribbble", "Coinbase", "Pinterest"].map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REVIEWS.map((r) => (
                <div key={r.name} className="panel p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs font-semibold uppercase tracking-[0.18em]", r.color)}>{r.brand}</span>
                    <Quote className="w-5 h-5 t-text-20" />
                  </div>
                  <p className="t-text-70 text-sm leading-relaxed">{r.desc}</p>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
                      {r.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium t-text">{r.name}</p>
                      <p className="t-text-40 text-xs">{r.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section id="team" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
            Our Great Team
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Supported</span>{" "}
            by real people
          </h2>
          <p className="t-text-50 mt-3 text-sm">Who is behind these great-looking interfaces?</p>
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <div key={m.name} className="panel overflow-hidden">
              <div className={cn("h-40 bg-gradient-to-br flex items-end justify-center", m.color)}>
                <div className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-2xl font-bold mb-[-3rem] shadow-xl">
                  {m.initials}
                </div>
              </div>
              <div className="pt-16 pb-5 px-5 text-center">
                <p className="font-semibold t-text">{m.name}</p>
                <p className="t-text-40 text-xs mt-1">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-y" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Tailored pricing plans</span>{" "}
              designed for you
            </h2>
            <p className="t-text-50 mt-3 text-sm">All plans include 40+ advanced tools and features. Choose the best plan to fit your needs.</p>
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
                  key={p.name}
                  className={cn(
                    "panel p-7 flex flex-col gap-6 relative",
                    p.current && "border-violet-500/60 ring-1 ring-violet-500/30 shadow-xl shadow-violet-900/30"
                  )}
                >
                  {p.current && (
                    <Badge className="absolute -top-2 right-5 bg-violet-600 text-white border-violet-700">Most popular</Badge>
                  )}
                  <div className="text-center">
                    <p className="text-base font-semibold t-text-70">{p.name}</p>
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">${price}</span>
                      <span className="t-text-40 text-sm">/mo</span>
                    </div>
                    {billing === "annual" && (
                      <p className="t-text-40 text-xs mt-1">${p.perYear} / year</p>
                    )}
                  </div>
                  <ul className="space-y-2.5">
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
                      Get started
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="t-text-50 mt-3 text-sm">Browse through these FAQs to find answers to commonly asked questions.</p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <FaqList items={FAQS} />
        </div>
      </section>

      {/* GET STARTED CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          className="rounded-3xl border p-10 sm:p-14 relative overflow-hidden"
          style={{ borderColor: "var(--t-border-2)" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(60% 100% at 0% 100%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 60%), radial-gradient(60% 100% at 100% 0%, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0) 60%)",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to get started?</h2>
              <p className="t-text-60 mt-3 text-sm sm:text-base">Start your project with a 14-day free trial — no credit card required.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/front-pages/payment">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/front-pages/help-center">
                  <Button size="lg" variant="outline">Browse help center</Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-16 rounded-xl border",
                      i % 3 === 0 && "bg-violet-500/10",
                      i % 3 === 1 && "bg-emerald-500/10",
                      i % 3 === 2 && "bg-sky-500/10",
                    )}
                    style={{ borderColor: "var(--t-border-2)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-us" className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em] mb-3 border-violet-500/30 text-violet-300 bg-violet-500/10">
            Contact Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Let&apos;s work</span> together
          </h2>
          <p className="t-text-50 mt-3 text-sm">Any question or remark? Just write us a message.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 panel p-6 flex flex-col gap-5">
            <div className="rounded-xl border h-44 flex items-center justify-center" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}>
              <Headphones className="w-10 h-10 text-violet-400" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="t-text-40 text-xs">Email</p>
                  <p className="t-text font-medium text-sm">hello@luxe.example</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="t-text-40 text-xs">Phone</p>
                  <p className="t-text font-medium text-sm">+1 (415) 555-0192</p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="lg:col-span-3 panel p-6 flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h3 className="text-lg font-semibold t-text">Send a message</h3>
              <p className="t-text-50 text-sm mt-1">
                Pre-sales, billing, partnerships — we usually reply within one business day.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Full name", type: "text", placeholder: "Jane Doe" },
                { label: "Email address", type: "email", placeholder: "you@brand.com" },
              ].map((f) => (
                <label key={f.label} className="space-y-1.5">
                  <span className="t-text-50 text-xs font-medium">{f.label}</span>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full h-10 px-3 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                    style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
                  />
                </label>
              ))}
            </div>
            <label className="space-y-1.5">
              <span className="t-text-50 text-xs font-medium">Message</span>
              <textarea
                rows={6}
                placeholder="Tell us about your project…"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
              />
            </label>
            <div>
              <Button size="lg" type="submit" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
                Send inquiry
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
