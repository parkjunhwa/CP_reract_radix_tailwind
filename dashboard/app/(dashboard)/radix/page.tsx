"use client";

import { useEffect } from "react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { RadixAllDemos } from "@/components/radix/RadixAllDemos";
import { SourceFooter } from "@/components/ui/source-footer";

function scrollToHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function RadixIndexPage() {
  useEffect(() => {
    scrollToHash();
    const onHash = () => scrollToHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <ExampleShell
      title="Radix Primitives"
      description="모든 프리미티브 예제"
      showPreamble={false}
    >
      <>
        <RadixAllDemos />
        <SourceFooter>
          Examples map to{" "}
          <a className="t-accent-text underline" href="https://www.radix-ui.com/primitives/docs/overview/introduction" target="_blank" rel="noopener noreferrer">
            Radix Primitives
          </a>{" "}
          (
          <a className="t-accent-text underline" href="https://github.com/radix-ui/primitives" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ); install names follow{" "}
          <code className="px-1 py-0.5 rounded t-surface-2 t-text-60 text-[11px]">@radix-ui/react-*</code>{" "}
          on npm.
        </SourceFooter>
      </>
    </ExampleShell>
  );
}
