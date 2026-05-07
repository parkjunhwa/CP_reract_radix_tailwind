"use client";

import { AuthV2Split } from "@/components/auth/AuthV2Split";
import { AuthPrimaryButton } from "@/components/auth/auth-ui";

export default function VerifyEmailV2Page() {
  return (
    <AuthV2Split illustrationId="verify">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--t-text)]">Verify your email ✉️</h1>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--t-text-50)]">
          Account activation link sent to your email address:{" "}
          <span className="font-medium text-[color:var(--t-text)]">john.doe@email.com</span> Please follow the link
          inside to continue.
        </p>
      </div>
      <div className="space-y-5">
        <AuthPrimaryButton type="button">Skip For Now</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-[color:var(--t-text-50)]">Didn&apos;t get the mail?</span>
          <button
            type="button"
            className="font-medium text-[color:var(--t-accent)]"
            onClick={(e) => e.preventDefault()}
          >
            Resend
          </button>
        </div>
      </div>
    </AuthV2Split>
  );
}
