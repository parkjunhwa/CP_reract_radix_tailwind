"use client";

import Link from "next/link";
import { Palette, Type, Layers, Image as ImageIcon, ArrowRight } from "lucide-react";

const FOUNDATION_TILES = [
  {
    title: "Colors",
    description: "Brand palette, semantic intents, and opacity scales used across LUXE.",
    href: "/user-interface/foundation/colors",
    icon: Palette,
  },
  {
    title: "Typography",
    description: "Headings, body, subtitle, and utility text styles with metrics.",
    href: "/user-interface/foundation/typography",
    icon: Type,
  },
  {
    title: "Shadows",
    description: "System elevations (Z1–Z24) plus custom and color shadow utilities.",
    href: "/user-interface/foundation/shadows",
    icon: Layers,
  },
  {
    title: "Icons",
    description: "Iconography pulled from Lucide, mirroring the Iconify catalog.",
    href: "/user-interface/foundation/icons",
    icon: ImageIcon,
  },
] as const;

export default function FoundationIndexPage() {
  return (
    <div className="space-y-3 pb-0 max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FOUNDATION_TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="panel p-5 flex flex-col gap-3 transition-colors hover:bg-[color:var(--t-hover)]"
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--t-accent-soft)", color: "var(--t-accent-text)" }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="t-text font-semibold text-base">{tile.title}</h3>
                <p className="t-text-50 text-sm leading-relaxed">{tile.description}</p>
              </div>
              <div className="t-accent-text inline-flex items-center gap-1 text-xs font-medium mt-auto">
                Open section <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
