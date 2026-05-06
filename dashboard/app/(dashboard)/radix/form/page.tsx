"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { cn } from "@/lib/utils";

const inputCls = cn(
  "w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
);

export default function RadixFormPage() {
  const [submitted, setSubmitted] = useState<{ email: string; password: string } | null>(null);

  return (
    <ExampleShell title="Form" description="Collect information using validation rules (built on native constraint validation).">
      <ExamplePanel title="Inline validation" description="Try submitting with empty/invalid fields.">
        <Form.Root
          className="max-w-md space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setSubmitted({
              email: String(fd.get("email") ?? ""),
              password: String(fd.get("password") ?? ""),
            });
          }}
        >
          <Form.Field name="email" className="space-y-1">
            <Form.Label className="t-text-50 text-xs">Email</Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className={inputCls}
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
              Please enter your email.
            </Form.Message>
            <Form.Message match="typeMismatch" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
              Please provide a valid email.
            </Form.Message>
          </Form.Field>

          <Form.Field name="password" className="space-y-1">
            <Form.Label className="t-text-50 text-xs">Password</Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={inputCls}
                style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
              Please enter a password.
            </Form.Message>
            <Form.Message match="tooShort" className="text-xs" style={{ color: "rgb(248,113,113)" }}>
              Password must be at least 8 characters.
            </Form.Message>
          </Form.Field>

          <Form.Submit asChild>
            <button
              className="h-10 px-4 rounded-lg border text-sm font-medium hover:bg-[var(--t-hover)] transition-colors"
              style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
            >
              Submit
            </button>
          </Form.Submit>
        </Form.Root>

        {submitted && (
          <div className="mt-4 rounded-lg border p-3" style={{ borderColor: "var(--t-border)" }}>
            <p className="t-text text-sm font-semibold">Submitted</p>
            <p className="t-text-40 text-xs mt-1">Email: {submitted.email}</p>
            <p className="t-text-40 text-xs mt-0.5">Password length: {submitted.password.length}</p>
          </div>
        )}
      </ExamplePanel>
    </ExampleShell>
  );
}

