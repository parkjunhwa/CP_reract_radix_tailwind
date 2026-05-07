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

export default function RegisterV1Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Adventure starts here 🚀</h1>
        <p className="text-slate-400 text-sm">Make your app management easy and fun!</p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledInput
          id="reg-v1-user"
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
          autoFocus
          autoComplete="username"
        />
        <AuthLabeledInput
          id="reg-v1-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          autoComplete="email"
        />
        <AuthLabeledPassword
          id="reg-v1-password"
          label="Password"
          value={password}
          onChange={setPassword}
          shown={show}
          onToggle={() => setShow((s) => !s)}
        />
        <div className="flex items-start gap-2">
          <Checkbox id="reg-v1-terms" className="mt-0.5" />
          <Label htmlFor="reg-v1-terms" className="text-sm text-slate-400 leading-snug cursor-pointer">
            I agree to{" "}
            <span className="text-violet-400">privacy policy & terms</span>
          </Label>
        </div>
        <AuthPrimaryButton type="submit">Sign Up</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-slate-400">Already have an account?</span>
          <Link href="/pages/auth/login-v1" className="font-medium text-violet-400 hover:text-violet-300">
            Sign in instead
          </Link>
        </div>
        <AuthDividerOr />
        <AuthSocialRow />
      </Form.Root>
    </AuthV1Shell>
  );
}
