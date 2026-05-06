"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";
import { cn } from "@/lib/utils";

export default function RadixSliderPage() {
  const [value, setValue] = useState([35]);

  return (
    <ExampleShell title="Slider" description="An input where the user selects a value from within a given range.">
      <ExamplePanel title="Single value" description="Use arrow keys while focused for precision.">
        <div className="max-w-xl space-y-3">
          <Slider.Root
            className="relative flex items-center select-none touch-none h-5"
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            aria-label="Volume"
          >
            <Slider.Track className="relative grow h-2 rounded-full border" style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)" }}>
              <Slider.Range className="absolute h-full rounded-full" style={{ backgroundColor: "var(--t-accent)" }} />
            </Slider.Track>
            <Slider.Thumb
              className={cn(
                "block w-4 h-4 rounded-full border shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2"
              )}
              style={{ backgroundColor: "var(--t-surface)", borderColor: "var(--t-border-2)" }}
            />
          </Slider.Root>

          <p className="t-text-40 text-xs">Value: {value[0]}</p>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

