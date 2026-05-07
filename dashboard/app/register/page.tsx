"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Diamond } from "lucide-react";

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a2e 100%)" }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
            <Diamond className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">LUXE</span>
        </div>

        <div className="rounded-2xl p-8"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-500 text-sm mb-6">Join LUXE Commerce today.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[["First Name","James"], ["Last Name","Worthington"]].map(([label, ph]) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-sm text-slate-400">{label}</label>
                  <input type="text" required placeholder={ph}
                    className="w-full h-10 px-3 rounded-xl border text-sm text-white outline-none transition-colors focus:border-violet-500"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-slate-400">Email</label>
              <input type="email" required placeholder="james@luxe.com"
                className="w-full h-10 px-3 rounded-xl border text-sm text-white outline-none transition-colors focus:border-violet-500"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-slate-400">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required placeholder="Min. 8 characters"
                  className="w-full h-10 px-3 pr-10 rounded-xl border text-sm text-white outline-none transition-colors focus:border-violet-500"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }} />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 rounded accent-violet-500 mt-0.5" />
              <span className="text-xs text-slate-400">
                I agree to the <span className="text-violet-400">Terms of Service</span> and <span className="text-violet-400">Privacy Policy</span>
              </span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating…</> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
