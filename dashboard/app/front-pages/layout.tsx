import type { ReactNode } from "react";
import { FrontHeader, FrontFooter } from "./_components/FrontShell";

/** Standalone marketing-style routes (no dashboard chrome), matching full-version front-pages paths. */
export default function FrontPagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-bg)", color: "var(--t-text)" }}>
      <FrontHeader />
      <main className="flex-1">{children}</main>
      <FrontFooter />
    </div>
  );
}
