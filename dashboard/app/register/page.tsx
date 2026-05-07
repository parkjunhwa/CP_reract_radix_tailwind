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

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/");
  };

  return (
    <div
      data-theme="dark"
      className="min-h-screen flex items-center justify-center px-4 py-12 scheme-dark text-white"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a2e 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
            <Diamond className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">LUXE</span>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-500 text-sm mb-6">Join LUXE Commerce today.</p>

          <Form.Root onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Form.Field name="firstName" className="space-y-1.5">
                <Form.Label asChild>
                  <Label htmlFor="reg-firstname" className="text-sm text-slate-400">First Name</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input id="reg-firstname" required placeholder="James" size="lg" className="h-10 rounded-xl text-sm" />
                </Form.Control>
              </Form.Field>
              <Form.Field name="lastName" className="space-y-1.5">
                <Form.Label asChild>
                  <Label htmlFor="reg-lastname" className="text-sm text-slate-400">Last Name</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input id="reg-lastname" required placeholder="Worthington" size="lg" className="h-10 rounded-xl text-sm" />
                </Form.Control>
              </Form.Field>
            </div>
            <Form.Field name="email" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="reg-email" className="text-sm text-slate-400">Email</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="reg-email" type="email" required placeholder="james@luxe.com" size="lg" className="h-10 rounded-xl text-sm" />
              </Form.Control>
            </Form.Field>
            <Form.Field name="password" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="reg-password" className="text-sm text-slate-400">Password</Label>
              </Form.Label>
              <InputGroup inputSize="lg" className="h-10 rounded-xl px-3">
                <Form.Control asChild>
                  <Input id="reg-password" type={show ? "text" : "password"} required placeholder="Min. 8 characters" className="text-sm" />
                </Form.Control>
                <InputAddon>
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </InputAddon>
              </InputGroup>
            </Form.Field>
            <Form.Field name="terms" className="flex items-start gap-2.5">
              <Form.Control asChild>
                <Checkbox id="reg-tos" required className="mt-0.5" />
              </Form.Control>
              <Form.Label asChild>
                <Label htmlFor="reg-tos" className="text-xs text-slate-400 cursor-pointer">
                  I agree to the <span className="text-violet-400">Terms of Service</span> and{" "}
                  <span className="text-violet-400">Privacy Policy</span>
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
                    Creating…
                  </>
                ) : "Create Account"}
              </Button>
            </Form.Submit>
          </Form.Root>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
