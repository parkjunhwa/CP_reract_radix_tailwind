"use client";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixAspectRatioPage() {
  return (
    <ExampleShell title="Aspect Ratio" description="Displays content within a desired ratio.">
      <ExamplePanel title="16:9 preview" description="Resize the page to see it maintain ratio.">
        <div className="max-w-xl">
          <AspectRatio.Root ratio={16 / 9} className="overflow-hidden rounded-lg border" style={{ borderColor: "var(--t-border)" }}>
            <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-sky-500/10 flex items-center justify-center">
              <div className="text-center">
                <p className="t-text font-semibold text-sm">Media Placeholder</p>
                <p className="t-text-40 text-xs mt-1">16:9</p>
              </div>
            </div>
          </AspectRatio.Root>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

