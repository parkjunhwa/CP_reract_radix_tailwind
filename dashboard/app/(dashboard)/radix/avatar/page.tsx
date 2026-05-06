"use client";

import * as Avatar from "@radix-ui/react-avatar";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { ExamplePanel } from "@/components/radix/ExamplePanel";

export default function RadixAvatarPage() {
  return (
    <ExampleShell title="Avatar" description="An image element with a fallback for representing the user.">
      <ExamplePanel title="Image + fallback" description="If the image fails to load, fallback renders.">
        <div className="flex items-center gap-4">
          <Avatar.Root
            className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border"
            style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-surface-2)" }}
          >
            <Avatar.Image
              className="w-full h-full object-cover"
              src="https://this-image-does-not-exist.invalid/avatar.png"
              alt="Junhwa Park"
            />
            <Avatar.Fallback className="w-full h-full flex items-center justify-center text-sm font-semibold">
              JP
            </Avatar.Fallback>
          </Avatar.Root>

          <div>
            <p className="t-text font-semibold text-sm">Junhwa Park</p>
            <p className="t-text-40 text-xs mt-0.5">Administrator</p>
          </div>
        </div>
      </ExamplePanel>
    </ExampleShell>
  );
}

