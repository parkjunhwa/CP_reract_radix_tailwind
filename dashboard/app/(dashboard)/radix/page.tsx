"use client";

import { useEffect } from "react";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { RadixAllDemos } from "@/components/radix/RadixAllDemos";

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
      <RadixAllDemos />
    </ExampleShell>
  );
}
