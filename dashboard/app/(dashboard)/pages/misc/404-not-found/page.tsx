import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="relative">
        <p className="font-black text-[160px] leading-none select-none"
          style={{ color: "rgba(124,58,237,0.08)", fontSize: "clamp(80px, 20vw, 160px)" }}>404</p>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-16 h-16 text-violet-400/30" />
        </div>
      </div>
      <div>
        <h1 className="t-text font-bold text-3xl mb-3">Page Not Found</h1>
        <p className="t-text-40 text-sm max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Check the URL or navigate back.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="h-10 px-5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-colors flex items-center gap-2"
          style={{ backgroundColor: "var(--t-accent)" }}>
          <ArrowLeft className="w-4 h-4" /> Go to Dashboard
        </Link>
        <Link href="/pages/faq" className="h-10 px-5 rounded-lg border text-sm font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors"
          style={{ borderColor: "var(--t-border-2)" }}>
          Help & FAQ
        </Link>
      </div>
    </div>
  );
}
