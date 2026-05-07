"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import { AuthBackToLogin, AuthLogoLink, AuthPrimaryButton, AuthV1Shell } from "@/components/auth/auth-ui";
import { AuthLabeledInput } from "@/components/auth/auth-fields";

export default function ForgotPasswordV1Page() {
  const [email, setEmail] = useState("");

  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Forgot Password 🔒</h1>
        <p className="text-slate-400 text-sm">
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
          id="fp-v1-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          autoComplete="email"
          autoFocus
        />
        <AuthPrimaryButton type="submit">Send Reset Link</AuthPrimaryButton>
        <AuthBackToLogin href="/pages/auth/login-v1" />
      </Form.Root>
    </AuthV1Shell>
  );
}
