"use client";

import { useState } from "react";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";

import { AuthV2Split } from "@/components/auth/AuthV2Split";
import { AuthDividerOr, AuthPrimaryButton, AuthSocialRow } from "@/components/auth/auth-ui";
import { AuthLabeledInput, AuthLabeledPassword } from "@/components/auth/auth-fields";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RegisterV2Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AuthV2Split illustrationId="register">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--t-text)]">Adventure starts here 🚀</h1>
        <p className="mt-1 text-sm text-[color:var(--t-text-50)]">Make your app management easy and fun!</p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledInput
          id="reg-v2-user"
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
          autoFocus
          autoComplete="username"
        />
        <AuthLabeledInput
          id="reg-v2-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          autoComplete="email"
        />
        <AuthLabeledPassword
          id="reg-v2-password"
          label="Password"
          value={password}
          onChange={setPassword}
          shown={show}
          onToggle={() => setShow((s) => !s)}
        />
        <div className="flex items-start gap-2">
          <Checkbox id="reg-v2-terms" className="mt-0.5" />
          <Label htmlFor="reg-v2-terms" className="text-sm text-[color:var(--t-text-50)] leading-snug cursor-pointer">
            I agree to <span className="text-[color:var(--t-accent)]">privacy policy & terms</span>
          </Label>
        </div>
        <AuthPrimaryButton type="submit">Sign Up</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-[color:var(--t-text-50)]">Already have an account?</span>
          <Link href="/pages/auth/login-v2" className="font-medium text-[color:var(--t-accent)]">
            Sign in instead
          </Link>
        </div>
        <AuthDividerOr />
        <AuthSocialRow />
      </Form.Root>
    </AuthV2Split>
  );
}
