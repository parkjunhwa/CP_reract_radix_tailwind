"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import { AuthV2Split } from "@/components/auth/AuthV2Split";
import { AuthBackToLogin, AuthPrimaryButton } from "@/components/auth/auth-ui";
import { AuthLabeledInput } from "@/components/auth/auth-fields";

export default function ForgotPasswordV2Page() {
  const [email, setEmail] = useState("");

  return (
    <AuthV2Split illustrationId="forgot">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--t-text)]">Forgot Password 🔒</h1>
        <p className="mt-1 text-sm text-[color:var(--t-text-50)]">
          Enter your email and we&apos;ll send you instructions to reset your password
        </p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledInput
          id="fp-v2-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          autoComplete="email"
          autoFocus
        />
        <AuthPrimaryButton type="submit">Send Reset Link</AuthPrimaryButton>
        <AuthBackToLogin href="/pages/auth/login-v2" />
      </Form.Root>
    </AuthV2Split>
  );
}
