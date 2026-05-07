import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotAuthorizedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="relative">
        <p className="font-black select-none" style={{ fontSize: "clamp(80px, 20vw, 160px)", color: "rgba(239,68,68,0.08)" }}>401</p>
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-16 h-16 text-red-400/30" />
        </div>
      </div>
      <div>
        <h1 className="t-text font-bold text-3xl mb-3">Not Authorized 🔒</h1>
        <p className="t-text-40 text-sm max-w-md mx-auto">
          You don't have permission to access this resource. Please contact your administrator or sign in with an authorized account.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button
            size="lg"
            className="text-white border-0 hover:opacity-90"
            style={{ backgroundColor: "var(--t-accent)" }}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" /> Go to Dashboard
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
