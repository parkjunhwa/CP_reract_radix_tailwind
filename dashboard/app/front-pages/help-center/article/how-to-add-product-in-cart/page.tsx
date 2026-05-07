"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft, Search, Calendar, Clock, ShoppingCart, ShieldCheck } from "lucide-react";

const RELATED = [
  "Template kits",
  "Elementor template kits — PHP zip extends",
  "Envato elements template kits",
  "How to use the template in WordPress",
  "How to use the Template Kit Importer",
  "Troubleshooting import problems",
];

export default function HelpCenterArticleCartPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN ARTICLE */}
        <article className="lg:col-span-8 panel p-6 lg:p-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm flex items-center gap-1.5 t-text-40 mb-5">
            <Link href="/front-pages/help-center" className="hover:text-violet-300">Help Center</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="t-text-70">How to add a product to cart</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How to add a product to cart?</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 t-text-40 text-xs">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Updated 1 month ago</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> ~3 min read</span>
            <span className="inline-flex items-center gap-1.5"><ShoppingCart className="w-3.5 h-3.5" /> Buying</span>
          </div>

          <div className="mt-8 h-px" style={{ backgroundColor: "var(--t-border)" }} />

          <div className="mt-8 space-y-6 t-text-70 text-[15px] leading-relaxed">
            <p>
              If you&apos;re after only one item, simply choose the <strong className="t-text">Buy now</strong> option on the product
              page. This will take you directly to checkout.
            </p>
            <p>
              If you want several items, use the <strong className="t-text">Add to cart</strong> button and then choose
              <strong className="t-text"> Keep browsing</strong> to continue shopping or <strong className="t-text">Checkout</strong> to
              finalize your purchase.
            </p>

            {/* Illustration / step visual #1 */}
            <figure className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--t-border-2)" }}>
              <div
                className="h-56 sm:h-72 grid grid-cols-3"
                style={{ backgroundColor: "var(--t-surface-2)" }}
                aria-hidden="true"
              >
                <div className="border-r flex items-center justify-center" style={{ borderColor: "var(--t-border)" }}>
                  <div className="w-20 h-24 rounded-md bg-gradient-to-br from-violet-500 to-purple-700" />
                </div>
                <div className="col-span-2 p-6 flex flex-col gap-3 justify-center">
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                  <div className="h-3 w-2/3 bg-white/10 rounded" />
                  <div className="mt-3 inline-flex w-fit gap-2">
                    <div className="h-9 w-28 rounded-lg bg-violet-600/80" />
                    <div className="h-9 w-28 rounded-lg border" style={{ borderColor: "var(--t-border-3)" }} />
                  </div>
                </div>
              </div>
              <figcaption className="px-5 py-3 t-text-40 text-xs border-t" style={{ borderColor: "var(--t-border)" }}>
                Product detail page — &quot;Add to cart&quot; and &quot;Buy now&quot; actions are always visible.
              </figcaption>
            </figure>

            <p>
              You can go back to your cart at any time by clicking the shopping cart icon at the top right side of the page.
            </p>

            {/* Illustration / step visual #2 */}
            <figure className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--t-border-2)" }}>
              <div
                className="h-56 sm:h-72 p-6 flex flex-col gap-3"
                style={{ backgroundColor: "var(--t-surface-2)" }}
                aria-hidden="true"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 w-32 bg-white/10 rounded" />
                  <ShoppingCart className="w-5 h-5 t-text-40" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-3 flex flex-col gap-2" style={{ borderColor: "var(--t-border-3)" }}>
                      <div className="h-12 rounded bg-white/5" />
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-9 w-32 rounded-lg bg-emerald-600/80" />
                </div>
              </div>
              <figcaption className="px-5 py-3 t-text-40 text-xs border-t" style={{ borderColor: "var(--t-border)" }}>
                Mini cart — review items, adjust quantities and proceed to checkout.
              </figcaption>
            </figure>

            <div className="rounded-xl border p-5 flex gap-3" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)" }}>
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="t-text-60 text-sm">
                Your shopping bag is secured end-to-end. Items remain reserved for you for 30 minutes after they&apos;ve been added.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-between gap-4">
            <Link href="/front-pages/help-center" className="text-sm text-violet-300 hover:underline inline-flex items-center gap-1.5">
              <ChevronLeft className="w-4 h-4" /> Back to Help Center
            </Link>
            <Link href="/front-pages/help-center" className="text-sm text-violet-300 hover:underline inline-flex items-center gap-1.5">
              Next article <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start">
          <div className="panel p-5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 t-text-30" />
              <input
                type="search"
                placeholder="Search…"
                className="w-full h-10 pl-9 pr-3 rounded-lg border text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-70)" }}
              />
            </div>
          </div>

          <div className="panel">
            <div className="px-5 py-3 border-b" style={{ borderColor: "var(--t-border)", backgroundColor: "var(--t-surface-2)" }}>
              <p className="t-text font-semibold text-sm">Articles in this section</p>
            </div>
            <ul className="divide-y" style={{ borderColor: "var(--t-border)" }}>
              {RELATED.map((r) => (
                <li key={r}>
                  <Link
                    href="/front-pages/help-center/article/how-to-add-product-in-cart"
                    className="flex items-center justify-between gap-3 px-5 py-3 t-text-60 hover:text-violet-300"
                  >
                    <span className="text-sm truncate">{r}</span>
                    <ChevronRight className="w-3.5 h-3.5 t-text-30 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
