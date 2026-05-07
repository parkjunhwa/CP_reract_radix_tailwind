"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Diamond } from "lucide-react";
import * as Form from "@radix-ui/react-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("admin@luxe.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    router.push("/");
  };

  return (
    <div data-theme="dark" className="min-h-screen flex bg-[#0a0a0f] text-white scheme-dark">
      {/* Left: branding */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0533 0%, #0a0a0f 50%, #0d1a2e 100%)" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 70% 70%, #2563eb 0%, transparent 50%)" }} />
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
              <Diamond className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wide">LUXE</span>
              <span className="text-violet-300 text-xs tracking-[0.3em] ml-2 uppercase">Commerce</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Welcome to<br />
              <span className="text-violet-400">LUXE Dashboard</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              The premier platform for ultra-high-net-worth commerce. Manage luxury assets, track global transactions, and grow your portfolio.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm">
              {[
                { label: "Revenue", value: "$28.4M" },
                { label: "Clients",  value: "4,891" },
                { label: "Countries", value: "42" },
              ].map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-white font-bold text-lg">{s.value}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-600 text-xs">© 2026 LUXE Commerce. All rights reserved.</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col justify-center px-8 sm:px-12 py-12 bg-[#0d0d14]">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <Diamond className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">LUXE Commerce</span>
        </div>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
          <p className="text-slate-500 text-sm mb-8">Welcome back! Please enter your credentials.</p>

          <Form.Root onSubmit={handleLogin} className="space-y-5">
            <Form.Field name="email" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="login-email" className="text-sm text-slate-400">Email</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@luxe.com"
                  size="lg"
                  className="rounded-xl text-sm h-11 px-4"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="password" className="space-y-1.5">
              <div className="flex justify-between">
                <Form.Label asChild>
                  <Label htmlFor="login-password" className="text-sm text-slate-400">Password</Label>
                </Form.Label>
                <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <InputGroup inputSize="lg" className="rounded-xl h-11 px-4">
                <Form.Control asChild>
                  <Input
                    id="login-password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="text-sm"
                  />
                </Form.Control>
                <InputAddon>
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </InputAddon>
              </InputGroup>
            </Form.Field>
            <Form.Field name="remember" className="flex items-center gap-2.5">
              <Form.Control asChild>
                <Checkbox id="login-remember" defaultChecked />
              </Form.Control>
              <Form.Label asChild>
                <Label htmlFor="login-remember" className="text-sm text-slate-400 cursor-pointer">
                  Remember me
                </Label>
              </Form.Label>
            </Form.Field>
            <Form.Submit asChild>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-xl text-white font-semibold border-0 hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : "Sign In"}
              </Button>
            </Form.Submit>
          </Form.Root>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Create one</Link>
          </p>

          <div className="mt-6 p-3 rounded-xl text-xs text-slate-500"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="font-medium text-slate-400 mb-1">Demo credentials</p>
            <p>Email: <span className="text-slate-300">admin@luxe.com</span></p>
            <p>Password: <span className="text-slate-300">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
