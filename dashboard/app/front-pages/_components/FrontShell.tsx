"use client";

import Link from "next/link";
import { useState } from "react";
import { Diamond, Menu, X, ArrowRight, Globe, AtSign, MessageCircle, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/front-pages/landing-page" },
  { label: "Pricing", href: "/front-pages/pricing" },
  { label: "Payment", href: "/front-pages/payment" },
  { label: "Checkout", href: "/front-pages/checkout" },
  { label: "Help Center", href: "/front-pages/help-center" },
];

export function FrontHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in oklab, var(--t-bg) 80%, transparent)",
        borderColor: "var(--t-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center gap-6">
        <Link href="/front-pages/landing-page" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <Diamond className="w-4 h-4 text-white" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide t-text">LUXE</span>
            <span className="text-[10px] tracking-[0.2em] uppercase t-text-30">Commerce</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-medium t-text-60 t-hover transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex h-9 px-3 items-center text-sm font-medium t-text-60 hover:t-text rounded-lg t-hover transition-colors"
          >
            Login
          </Link>
          <Link href="/" className="hidden sm:block">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
              Open dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg t-hover"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ borderColor: "var(--t-border)" }}>
          <nav className="px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium t-text-70 t-hover"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium t-text-70 t-hover"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

const FOOTER_GROUPS = [
  {
    title: "Demos",
    links: [
      { label: "Landing", href: "/front-pages/landing-page" },
      { label: "Pricing", href: "/front-pages/pricing" },
      { label: "Payment", href: "/front-pages/payment" },
      { label: "Checkout", href: "/front-pages/checkout" },
      { label: "Help Center", href: "/front-pages/help-center" },
    ],
  },
  {
    title: "Pages",
    links: [
      { label: "Login", href: "/pages/auth/login-v1" },
      { label: "Register", href: "/pages/auth/register-v1" },
      { label: "Account Settings", href: "/pages/account-settings" },
      { label: "FAQ", href: "/pages/faq" },
      { label: "404 Not Found", href: "/pages/misc/404-not-found" },
    ],
  },
  {
    title: "Apps",
    links: [
      { label: "eCommerce", href: "/dashboards/ecommerce" },
      { label: "Email", href: "/apps/email" },
      { label: "Calendar", href: "/apps/calendar" },
      { label: "Invoice", href: "/apps/invoice/list" },
      { label: "Kanban", href: "/apps/kanban" },
    ],
  },
];

export function FrontFooter() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface)" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/front-pages/landing-page" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40">
                <Diamond className="w-4 h-4 text-white" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold t-text">LUXE</span>
                <span className="text-[10px] tracking-[0.2em] uppercase t-text-30">Commerce</span>
              </span>
            </Link>
            <p className="t-text-50 text-sm mt-4 leading-relaxed">
              The most developer-friendly &amp; highly customizable admin template, crafted for modern luxury brands.
            </p>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className={cn(
                  "flex-1 h-10 px-3 rounded-lg text-sm outline-none border",
                  "focus-visible:ring-2 focus-visible:ring-violet-500/40",
                )}
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
              />
              <Button size="lg" type="submit" className="bg-violet-600 hover:bg-violet-700 text-white border-violet-700">
                Subscribe
              </Button>
            </form>
          </div>

          {FOOTER_GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] t-text-40 mb-4">{g.title}</p>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm t-text-60 hover:t-text-70 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: "var(--t-border)" }}>
          <p className="t-text-40 text-xs">© {new Date().getFullYear()} LUXE Commerce — Demo template inspired by Vuexy.</p>
          <div className="flex items-center gap-3 t-text-40">
            {[
              { Icon: AtSign, label: "Mastodon" },
              { Icon: MessageCircle, label: "Discord" },
              { Icon: Globe, label: "Website" },
              { Icon: Code2, label: "Open source" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg t-hover"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
