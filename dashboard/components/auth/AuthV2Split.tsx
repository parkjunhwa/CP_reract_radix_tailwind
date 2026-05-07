"use client";

import Image from "next/image";

import { AuthLogoLink } from "@/components/auth/auth-ui";
import { AUTH_ASSETS } from "@/lib/auth-assets";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type IllustrationId = "login" | "register" | "forgot" | "reset" | "twoSteps" | "verify";

export function AuthV2Split({
  illustrationId,
  children,
  logoClassName,
}: {
  illustrationId: IllustrationId;
  children: React.ReactNode;
  logoClassName?: string;
}) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const bundle = AUTH_ASSETS[illustrationId];
  const illustrationSrc = dark ? bundle.dark : bundle.light;
  const maskSrc = dark ? AUTH_ASSETS.mask.dark : AUTH_ASSETS.mask.light;

  return (
    <div className="flex min-h-dvh w-full justify-center bg-[color:var(--t-bg)]">
      <div
        className={cn(
          "relative hidden flex-1 flex-col items-center justify-center overflow-hidden p-8 lg:p-12",
          "md:flex border-r border-[color:var(--t-border)]",
        )}
      >
        <div className="relative z-[2] mx-auto my-8 w-full max-w-xl">
          <Image
            src={illustrationSrc}
            alt=""
            width={640}
            height={640}
            className="h-auto w-full max-h-[min(680px,70vh)] object-contain"
            priority
          />
        </div>
        <Image
          src={maskSrc}
          alt=""
          width={960}
          height={360}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto max-h-[min(355px,40%)] w-full object-cover object-bottom opacity-90"
        />
      </div>
      <div
        className={cn(
          "relative flex min-h-dvh w-full flex-col justify-center",
          "bg-[color:var(--t-surface)] px-6 py-10 md:max-w-[480px] md:shrink-0 md:px-12 md:py-12",
        )}
      >
        <div className="absolute left-6 top-5 md:left-[38px] md:top-[33px]">
          <AuthLogoLink className={cn("mb-0", logoClassName)} />
        </div>
        <div className="mx-auto w-full max-w-[400px] pt-20 md:pt-4">{children}</div>
      </div>
    </div>
  );
}
