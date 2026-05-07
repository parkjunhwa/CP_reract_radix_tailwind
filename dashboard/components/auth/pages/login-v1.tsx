"use client";

import { useState } from "react";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";

import {
  AuthDividerOr,
  AuthLogoLink,
  AuthPrimaryButton,
  AuthSocialRow,
  AuthV1Shell,
} from "@/components/auth/auth-ui";
import { AuthLabeledInput, AuthLabeledPassword } from "@/components/auth/auth-fields";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TEMPLATE_NAME } from "@/lib/auth-assets";

export default function LoginV1Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">{`Welcome to ${TEMPLATE_NAME}! 👋🏻`}</h1>
        <p className="text-slate-400 text-sm">Please sign-in to your account and start the adventure</p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledInput
          id="login-v1-email"
          label="Email or Username"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email or username"
          autoFocus
          autoComplete="username"
        />
        <AuthLabeledPassword
          id="login-v1-password"
          label="Password"
          value={password}
          onChange={setPassword}
          shown={show}
          onToggle={() => setShow((s) => !s)}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="login-v1-rm" />
            <Label htmlFor="login-v1-rm" className="text-sm text-slate-400 cursor-pointer">
              Remember me
            </Label>
          </div>
          <Link href="/pages/auth/forgot-password-v1" className="text-sm text-violet-400 hover:text-violet-300">
            Forgot password?
          </Link>
        </div>
        <AuthPrimaryButton type="submit">Login</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-slate-400">New on our platform?</span>
          <Link href="/pages/auth/register-v1" className="font-medium text-violet-400 hover:text-violet-300">
            Create an account
          </Link>
        </div>
        <AuthDividerOr />
        <AuthSocialRow />
      </Form.Root>
    </AuthV1Shell>
  );
}
