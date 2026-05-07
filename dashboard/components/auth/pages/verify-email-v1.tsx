"use client";

import { AuthLogoLink, AuthPrimaryButton, AuthV1Shell } from "@/components/auth/auth-ui";

export default function VerifyEmailV1Page() {
  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-left">
        <h1 className="text-2xl font-bold text-white mb-2">Verify your email ✉️</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Account activation link sent to your email address:{" "}
          <span className="font-medium text-slate-200">john.doe@email.com</span> Please follow the link inside to
          continue.
        </p>
      </div>
      <div className="space-y-5">
        <AuthPrimaryButton type="button">Skip For Now</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-slate-400">Didn&apos;t get the mail?</span>
          <button type="button" className="font-medium text-violet-400 hover:text-violet-300" onClick={(e) => e.preventDefault()}>
            Resend
          </button>
        </div>
      </div>
    </AuthV1Shell>
  );
}
