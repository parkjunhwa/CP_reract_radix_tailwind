"use client";

import { useState, useEffect } from "react";
import { Diamond } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function ComingSoonPage() {
  const target = new Date("2026-09-01T00:00:00");
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const rem = Math.max(0, Math.floor((target.getTime() - now) / 1000));
      setDiff({ d: Math.floor(rem / 86400), h: Math.floor((rem % 86400) / 3600), m: Math.floor((rem % 3600) / 60), s: rem % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-2xl shadow-violet-900/50">
        <Diamond className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="t-text font-bold text-4xl mb-3">Coming Soon 🚀</h1>
        <p className="t-text-40 text-sm max-w-md mx-auto">We are working hard to bring you something amazing. Stay tuned!</p>
      </div>
      {/* Countdown */}
      <div className="flex items-center gap-3">
        {[["Days", diff.d], ["Hours", diff.h], ["Minutes", diff.m], ["Seconds", diff.s]].map(([label, val]) => (
          <div key={label as string} className="panel p-4 w-30 text-center">
            <p className="t-text font-bold text-3xl tabular-nums">{pad(val as number)}</p>
            <p className="t-text-30 text-[10px] uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </div>
      {/* Subscribe */}
      <Form.Root className="flex gap-2 max-w-sm w-full">
        <Form.Field name="email" className="flex-1">
          <Form.Label className="sr-only">Email</Form.Label>
          <Form.Control asChild>
            <Input
              type="email"
              required
              placeholder="Enter your email…"
              aria-label="Email"
              className="h-10 text-sm t-text-70 placeholder:t-text-30"
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            type="submit"
            size="lg"
            className="text-white border-0 hover:opacity-90"
            style={{ backgroundColor: "var(--t-accent)" }}
          >
            Notify Me
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
