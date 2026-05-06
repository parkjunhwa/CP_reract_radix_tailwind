"use client";

import { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixProgressPage() {
  const [value, setValue] = useState(15);

  useEffect(() => {
    const t = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 7)));
    }, 650);
    return () => clearInterval(t);
  }, []);

  return (
    <ExampleShell title="Progress" description="Displays an indicator showing the completion progress of a task.">
      <ExamplePanel title="Animated progress" description="A simple controlled progress value.">
        <div className="space-y-3 max-w-xl">
          <Progress.Root
            value={value}
            className="relative h-3 w-full overflow-hidden rounded-full border"
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}
          >
            <Progress.Indicator
              className="h-full w-full transition-transform"
              style={{
                backgroundColor: "var(--t-accent)",
                transform: `translateX(-${100 - value}%)`,
              }}
            />
          </Progress.Root>
          <p className="t-text-40 text-xs">Value: {value}%</p>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

