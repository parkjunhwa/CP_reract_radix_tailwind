"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronRight, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ { q: string; a: string }
interface Category { label: string; icon: string; faqs: FAQ[] }

const CATEGORIES: Category[] = [
  {
    label: "Orders & Purchases",
    icon: "🛍️",
    faqs: [
      { q: "How do I place an order for a luxury item?", a: "You can place an order through your dedicated account manager or directly via the platform. All high-value items require identity verification and signed purchase agreement before processing." },
      { q: "What payment methods are accepted?", a: "We accept wire transfers, bank transfers, and select cryptocurrency for verified UHNW clients. Credit card payments are available for items under $50,000." },
      { q: "Can I cancel or modify an order?", a: "Orders can be cancelled within 24 hours of placement for a full refund. Modifications must be requested before the item enters authentication processing." },
      { q: "Is there a minimum order value?", a: "There is no minimum order value, however white-glove delivery and personal concierge services are available for orders above $25,000." },
    ],
  },
  {
    label: "Authentication & Verification",
    icon: "🔒",
    faqs: [
      { q: "How are luxury items authenticated?", a: "All items undergo a multi-step authentication process by certified experts, including serial number verification, physical inspection, documentation review, and in some cases third-party laboratory testing." },
      { q: "What certification comes with each purchase?", a: "Each authenticated item includes a LUXE Certificate of Authenticity, complete service history (where applicable), original documentation, and tamper-evident holographic seal." },
      { q: "How long does authentication take?", a: "Standard authentication takes 3–5 business days. Expedited service (24–48 hours) is available for an additional fee for qualifying items." },
    ],
  },
  {
    label: "Shipping & Delivery",
    icon: "📦",
    faqs: [
      { q: "How are items shipped?", a: "All items are shipped via our proprietary secure logistics network using armored vehicles or insured private air freight, depending on the item value and destination." },
      { q: "Is insurance included?", a: "Full replacement value insurance is included for all shipments. Coverage documentation is provided with each order confirmation." },
      { q: "What are the delivery timeframes?", a: "Domestic delivery: 2–4 business days. International delivery: 5–10 business days. White-glove in-home delivery can be arranged for an additional fee." },
    ],
  },
  {
    label: "Account & Billing",
    icon: "💳",
    faqs: [
      { q: "How do I update my billing information?", a: "Billing information can be updated in Account Settings > Payment Methods. Changes require two-factor authentication for security." },
      { q: "Where can I view my invoices?", a: "All invoices are accessible in the Invoices section of your dashboard. PDF versions can be downloaded for any transaction." },
      { q: "What is the return policy?", a: "Items may be returned within 7 days of delivery if the item does not match the provided description. Return shipping must be arranged through our logistics team." },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItems(prev => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  };

  const filteredCategories = CATEGORIES.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      !search ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => (activeCategory ? cat.label === activeCategory : true) && cat.faqs.length > 0);

  return (
    <div className="space-y-6 pb-4 max-w-4xl">
      {/* Hero search */}
      <div className="panel p-8 text-center space-y-4">
        <h1 className="t-text font-bold text-2xl">How can we help you?</h1>
        <p className="t-text-40 text-sm">Search our knowledge base or browse categories below</p>
        <div className="max-w-lg mx-auto flex items-center gap-2 h-11 px-4 rounded-xl border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
          <Search className="w-4 h-4 t-text-30 flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search FAQs…"
            className="flex-1 bg-transparent text-sm outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory(null)}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors",
            !activeCategory ? "text-white" : "t-text-40 hover:bg-[var(--t-hover)]")}
          style={!activeCategory ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat.label} onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors",
              activeCategory === cat.label ? "text-white" : "t-text-40 hover:bg-[var(--t-hover)]")}
            style={activeCategory === cat.label ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
            <span>{cat.icon}</span>{cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <div key={cat.label} className="panel overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
              <span className="text-lg">{cat.icon}</span>
              <h2 className="t-text font-semibold text-sm">{cat.label}</h2>
              <span className="t-text-30 text-xs ml-auto">{cat.faqs.length} questions</span>
            </div>
            <div>
              {cat.faqs.map((faq, i) => {
                const key = `${cat.label}-${i}`;
                const open = openItems.has(key);
                return (
                  <div key={key} style={{ borderBottom: i < cat.faqs.length - 1 ? "1px solid var(--t-border)" : "none" }}>
                    <button onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--t-hover)] transition-colors">
                      <span className={cn("text-xs font-medium", open ? "t-text-80" : "t-text-60")}>{faq.q}</span>
                      {open ? <ChevronDown className="w-4 h-4 t-text-30 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 t-text-30 flex-shrink-0" />}
                    </button>
                    {open && (
                      <div className="px-5 pb-4">
                        <p className="t-text-50 text-xs leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="panel p-6">
        <h3 className="t-text font-semibold text-sm mb-4">Still need help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: Mail, label: "Email Support", sub: "support@luxe.com", color: "text-violet-400" },
            { icon: MessageCircle, label: "Live Chat", sub: "Available 9 AM – 6 PM EST", color: "text-sky-400" },
          ].map(({ icon: Icon, label, sub, color }) => (
            <button key={label} className="flex items-center gap-4 p-4 rounded-xl border text-left hover:bg-[var(--t-hover)] transition-colors"
              style={{ borderColor: "var(--t-border-2)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--t-hover)" }}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <div>
                <p className="t-text-70 text-xs font-semibold">{label}</p>
                <p className="t-text-40 text-[10px] mt-0.5">{sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
