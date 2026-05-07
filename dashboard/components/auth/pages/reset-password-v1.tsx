"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";

import { AuthBackToLogin, AuthLogoLink, AuthPrimaryButton, AuthV1Shell } from "@/components/auth/auth-ui";
import { AuthLabeledPassword } from "@/components/auth/auth-fields";

export default function ResetPasswordV1Page() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Reset Password 🔒</h1>
        <p className="text-slate-400 text-sm">Your new password must be different from previously used passwords</p>
      </div>
      <Form.Root
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AuthLabeledPassword
          id="rs-v1-p1"
          label="New Password"
          value={p1}
          onChange={setP1}
          shown={show1}
          onToggle={() => setShow1((s) => !s)}
        />
        <AuthLabeledPassword
          id="rs-v1-p2"
          label="Confirm Password"
          value={p2}
          onChange={setP2}
          shown={show2}
          onToggle={() => setShow2((s) => !s)}
        />
        <AuthPrimaryButton type="submit">Set New Password</AuthPrimaryButton>
        <AuthBackToLogin href="/pages/auth/login-v1" />
      </Form.Root>
    </AuthV1Shell>
  );
}
