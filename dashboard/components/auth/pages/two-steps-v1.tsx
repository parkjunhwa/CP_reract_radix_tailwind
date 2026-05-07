"use client";

import * as Form from "@radix-ui/react-form";

import { AuthLogoLink, AuthPrimaryButton, AuthV1Shell } from "@/components/auth/auth-ui";
import { OtpSixFields } from "@/components/auth/OtpSixFields";

export default function TwoStepsV1Page() {
  return (
    <AuthV1Shell>
      <AuthLogoLink lightOnDark />
      <div className="mb-6 text-left">
        <h1 className="text-2xl font-bold text-white mb-1">Two Step Verification 💬</h1>
        <p className="text-slate-400 text-sm">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <p className="text-slate-300 text-sm font-medium mt-2">******1234</p>
      </div>
      <Form.Root
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Type your 6 digit security code</p>
          <OtpSixFields />
        </div>
        <AuthPrimaryButton type="submit">Verify my account</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-slate-400">Didn&apos;t get the code?</span>
          <button
            type="button"
            className="font-medium text-violet-400 hover:text-violet-300"
            onClick={(e) => e.preventDefault()}
          >
            Resend
          </button>
        </div>
      </Form.Root>
    </AuthV1Shell>
  );
}
