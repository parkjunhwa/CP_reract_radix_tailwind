"use client";

import * as Form from "@radix-ui/react-form";

import { AuthV2Split } from "@/components/auth/AuthV2Split";
import { AuthPrimaryButton } from "@/components/auth/auth-ui";
import { OtpSixFields } from "@/components/auth/OtpSixFields";

export default function TwoStepsV2Page() {
  return (
    <AuthV2Split illustrationId="twoSteps">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[color:var(--t-text)]">Two Step Verification 💬</h1>
        <p className="mt-1 text-sm text-[color:var(--t-text-50)]">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <p className="mt-2 text-sm font-medium text-[color:var(--t-text)]">******1234</p>
      </div>
      <Form.Root
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-2">
          <p className="text-sm text-[color:var(--t-text-50)]">Type your 6 digit security code</p>
          <OtpSixFields />
        </div>
        <AuthPrimaryButton type="submit">Verify my account</AuthPrimaryButton>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-[color:var(--t-text-50)]">Didn&apos;t get the code?</span>
          <button
            type="button"
            className="font-medium text-[color:var(--t-accent)]"
            onClick={(e) => e.preventDefault()}
          >
            Resend
          </button>
        </div>
      </Form.Root>
    </AuthV2Split>
  );
}
