"use client";

import { useState } from "react";
import Link from "next/link";
import { Diamond, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true); setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a2e 100%)" }}>
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <Diamond className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">LUXE</span>
        </div>

        <div className="rounded-2xl p-8"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {sent ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-xl font-bold text-white">Email Sent!</h1>
              <p className="text-slate-400 text-sm">We've sent a password reset link to <span className="text-white">{email}</span>. Check your inbox.</p>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors mt-4">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <Diamond className="w-7 h-7 text-violet-400" />
              </div>
              <h1 className="text-xl font-bold text-white mb-1">Forgot Password?</h1>
              <p className="text-slate-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-400">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@luxe.com"
                    className="w-full h-11 px-4 rounded-xl border text-sm text-white outline-none transition-colors focus:border-violet-500"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full h-11 rounded-xl text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>
                  {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</> : "Send Reset Link"}
                </button>
              </form>
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mt-5">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
