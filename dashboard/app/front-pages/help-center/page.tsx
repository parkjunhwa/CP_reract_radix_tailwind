"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search, ShoppingCart, HelpCircle, DollarSign, Palette, Lock, User, ChevronRight,
  Rocket, Gift, FileText, ArrowRight, Mail, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const POPULAR = [
  { slug: "getting-started", title: "Getting started", icon: Rocket, sub: "Whether you're new or a power user, this article will get you up to speed." },
  { slug: "first-steps", title: "First steps", icon: Gift, sub: "Are you a new customer wondering how to start? We&apos;ve got you covered." },
  { slug: "external-content", title: "Add external content", icon: FileText, sub: "Learn how to expand the functionality of LUXE with integrations." },
];

const KNOWLEDGE = [
  { title: "Buying", icon: ShoppingCart, color: "text-violet-300 bg-violet-500/15", articles: ["What are favourites?", "How do I purchase an item?", "How do I add or change my details?", "How do refunds work?", "Can I get a refund?", "I'm trying to find a specific item"] },
  { title: "Item Support", icon: HelpCircle, color: "text-sky-300 bg-sky-500/15", articles: ["What is item support?", "How to contact an author?", "Where is my purchase code?", "Extend or renew item support", "Item support FAQ", "Why has my item been removed?"] },
  { title: "Licenses", icon: DollarSign, color: "text-emerald-300 bg-emerald-500/15", articles: ["Can I use the same license for…", "How to contact an author?", "I'm making a test site — it's not for…", "Which license do I need?", "I want to make multiple end products", "For logo, what license do I need?"] },
  { title: "Template Kits", icon: Palette, color: "text-amber-300 bg-amber-500/15", articles: ["Template kits", "Elementor template kits — PHP zip", "Imported template issues", "Troubleshooting import problems", "How to use the WordPress plugin", "How to use the Template Kit Importer"] },
  { title: "Account & Password", icon: Lock, color: "text-rose-300 bg-rose-500/15", articles: ["Signing in with a social account", "Locked out of account", "I'm not receiving the verification email", "Forgotten username or password", "New password not accepted", "What is sign-in verification?"] },
  { title: "Account Settings", icon: User, color: "text-fuchsia-300 bg-fuchsia-500/15", articles: ["How do I change my password?", "How do I change my username?", "How do I close my account?", "How do I change my email?", "How can I regain access to my account?", "Are RSS feeds available on Market?"] },
];

const ARTICLE_HREF = "/front-pages/help-center/article/how-to-add-product-in-cart";

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const filteredKb = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KNOWLEDGE;
    return KNOWLEDGE.map((cat) => ({
      ...cat,
      articles: cat.articles.filter((a) => a.toLowerCase().includes(q)),
    })).filter((c) => c.articles.length > 0);
  }, [query]);

  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0) 60%), radial-gradient(40% 40% at 80% 20%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 60%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-5 lg:px-8 pt-20 pb-16 text-center">
          <p className="text-violet-300 text-sm font-medium uppercase tracking-[0.18em]">Help Center</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Hello, how can we <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">help?</span>
          </h1>
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 t-text-30" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question…"
              className="w-full h-12 pl-11 pr-4 rounded-xl border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
            />
          </div>
          <p className="t-text-40 text-xs mt-4">
            Common topics: <span className="text-violet-300">eCommerce</span>, <span className="text-violet-300">blogging</span>, <span className="text-violet-300">payments</span>
          </p>
        </div>
      </section>

      {/* POPULAR ARTICLES */}
      <section className="border-y" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Popular articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {POPULAR.map(({ slug, title, icon: Icon, sub }) => (
              <Link key={slug} href={ARTICLE_HREF} className="panel p-6 flex flex-col gap-3 text-center items-center hover:border-violet-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold t-text">{title}</h3>
                <p className="t-text-50 text-sm leading-relaxed">{sub}</p>
                <Button size="sm" variant="outline" className="mt-2">Read more</Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE BASE */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Knowledge base</h2>

        {filteredKb.length === 0 ? (
          <div className="text-center t-text-40 text-sm py-16">
            No articles match &quot;<span className="t-text-70">{query}</span>&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredKb.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="panel p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", cat.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold t-text">{cat.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {cat.articles.map((a) => (
                      <li key={a}>
                        <Link
                          href={ARTICLE_HREF}
                          className="flex items-center justify-between gap-3 text-sm t-text-60 hover:t-text-70"
                        >
                          <span className="truncate">{a}</span>
                          <ChevronRight className="w-3.5 h-3.5 t-text-30 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={ARTICLE_HREF} className="text-violet-300 hover:underline text-sm font-medium inline-flex items-center gap-1.5 mt-2">
                    See all {cat.articles.length} articles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* NEED HELP */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="panel p-10 sm:p-14 text-center" style={{ borderColor: "var(--t-border-2)" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Still need help?</h2>
          <p className="t-text-50 text-sm mt-3 max-w-xl mx-auto">
            Our specialists are always happy to help. Contact us during standard business hours, or email us 24/7 and we&apos;ll get back to you.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
              <MessageCircle className="w-4 h-4" /> Visit our community
            </Button>
            <Button size="lg" variant="outline">
              <Mail className="w-4 h-4" /> Contact us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
