"use client";

import { useState } from "react";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";

import { AuthV2Split } from "@/components/auth/AuthV2Split";
import {
  AuthDividerOr,
  AuthPrimaryButton,
  AuthSocialRow,
} from "@/components/auth/auth-ui";
import { AuthLabeledInput, AuthLabeledPassword } from "@/components/auth/auth-fields";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TEMPLATE_NAME } from "@/lib/auth-assets";

export default function LoginV2Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AuthV2Split illustrationId="login">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--t-text)]">{`Welcome to ${TEMPLATE_NAME}! 👋🏻`}</h1>
        <p className="mt-1 text-sm text-[color:var(--t-text-50)]">
          Please sign-in to your account and start the adventure
        </p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledInput
          id="login-v2-email"
          label="Email or Username"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email or username"
          autoFocus
          autoComplete="username"
        />
        <AuthLabeledPassword
          id="login-v2-password"
          label="Password"
          value={password}
          onChange={setPassword}
          shown={show}
          onToggle={() => setShow((s) => !s)}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="login-v2-rm" />
            <Label htmlFor="login-v2-rm" className="text-sm text-[color:var(--t-text-50)] cursor-pointer">
              Remember me
            </Label>
          </div>
          <Link href="/pages/auth/forgot-password-v2" className="text-sm font-medium text-[color:var(--t-accent)]">
            Forgot password?
          </Link>
        </div>
        <AuthPrimaryButton type="submit">Login</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-[color:var(--t-text-50)]">New on our platform?</span>
          <Link href="/pages/auth/register-v2" className="font-medium text-[color:var(--t-accent)]">
            Create an account
          </Link>
        </div>
        <AuthDividerOr />
        <AuthSocialRow />
      </Form.Root>
    </AuthV2Split>
  );
}
