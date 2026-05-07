"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { Diamond } from "lucide-react";

import { cn } from "@/lib/utils";
import { TEMPLATE_NAME } from "@/lib/auth-assets";

/** Decorative blocks (from full-version AuthIllustrationWrapper), violet-tinted. */
export function AuthIllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[450px]", className)}>
      <span
        aria-hidden
        className="pointer-events-none max-md:hidden absolute z-[-1] h-[234px] w-[238px] -left-11 -top-20 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='238' height='234' fill='none'%3E%3Crect x='87.94' y='.5' width='149' height='149' rx='19.5' stroke='%237c3aed' stroke-opacity='.16'/%3E%3Crect y='33.56' width='200' height='200' rx='10' fill='%237c3aed' fill-opacity='.08'/%3E%3C/svg%3E")`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none max-md:hidden absolute z-[-1] bottom-[-64px] right-[-57px] h-[180px] w-[180px] opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' fill='none'%3E%3Crect x='1' y='1' width='178' height='178' rx='19' stroke='%237c3aed' stroke-opacity='.16' stroke-width='2' stroke-dasharray='8 8'/%3E%3Crect x='22.5' y='22.5' width='135' height='135' rx='10' fill='%237c3aed' fill-opacity='.08'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </div>
  );
}

export function AuthLogoLink({
  lightOnDark,
  className,
}: {
  lightOnDark?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center justify-center gap-2 mb-6", className)}>
      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-900/40">
        <Diamond className="w-5 h-5 text-white" aria-hidden />
      </span>
      <span
        className={cn(
          "font-bold text-lg tracking-tight",
          lightOnDark ? "text-white" : "text-[color:var(--t-text)]",
        )}
      >
        {TEMPLATE_NAME}
      </span>
    </Link>
  );
}

export function AuthDividerOr() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-[color:var(--t-border-2)]" />
      <span className="text-xs uppercase tracking-wider text-[color:var(--t-text-40)]">or</span>
      <div className="h-px flex-1 bg-[color:var(--t-border-2)]" />
    </div>
  );
}

function SocialIconButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border text-sm transition-colors",
        "border-[color:var(--t-border-2)] bg-[color:var(--t-surface-2)] hover:bg-[color:var(--t-hover)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function AuthSocialRow() {
  return (
    <div className="flex justify-center items-center gap-2">
      <SocialIconButton label="Facebook" className="text-[#1877f2]">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.5 22v-9h3l.75-3.75H13.5v-1.65c0-1.04.29-1.75 1.83-1.75H17V3.1c-.34-.05-1.51-.15-2.86-.15-2.83 0-4.76 1.72-4.76 4.9V9.25H7v3.75h3.38V22h3.12z" />
        </svg>
      </SocialIconButton>
      <SocialIconButton label="X" className="text-[color:var(--t-text)]">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </SocialIconButton>
      <SocialIconButton label="GitHub" className="text-[color:var(--t-text)]">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </SocialIconButton>
      <SocialIconButton label="Google" className="text-[#ea4335]">
        <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </SocialIconButton>
    </div>
  );
}

export function AuthV1Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d1a2e 100%)" }}
    >
      <AuthIllustrationWrapper>
        <div
          data-theme="dark"
          className="w-full sm:max-w-[450px] rounded-2xl p-8 sm:p-12 shadow-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {children}
        </div>
      </AuthIllustrationWrapper>
    </div>
  );
}

export function AuthPrimaryButton({
  className,
  type = "submit",
  style,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "w-full inline-flex h-11 min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold leading-none text-white",
        "hover:opacity-90 transition-opacity disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
      style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", ...style }}
    />
  );
}

export function AuthBackToLogin({ href }: { href: string }) {
  return (
    <p className="flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--t-accent)] hover:opacity-90"
      >
        <span aria-hidden className="text-lg leading-none">←</span>
        Back to login
      </Link>
    </p>
  );
}
