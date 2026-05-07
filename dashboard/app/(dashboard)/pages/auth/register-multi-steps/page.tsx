"use client";
import Link from "next/link";
import { Diamond } from "lucide-react";
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a2e 100%)" }}>
      <div className="w-full max-w-md text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mx-auto mb-6"><Diamond className="w-6 h-6 text-white" /></div>
        <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h1 className="text-xl font-bold text-white mb-2">Register Multi-Steps</h1>
          <p className="text-slate-400 text-sm mb-6">Step-by-step onboarding registration</p>
          <Link href="/login" className="inline-block w-full h-11 rounded-xl text-white text-sm font-semibold leading-[44px]" style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>Go to Login</Link>
        </div>
      </div>
    </div>
  );
}
