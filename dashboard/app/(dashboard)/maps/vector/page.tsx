import Image from "next/image";
import { CircleDot, Globe2, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const WORLD_MAP_IMAGE = "/images/maps/blank-map-pacific-world.png";

const cityPins = [
  { name: "New York", x: 866, y: 268, value: "112 orders", cls: "fill-violet-500" },
  { name: "London", x: 178, y: 238, value: "86 orders", cls: "fill-sky-500" },
  { name: "Dubai", x: 374, y: 338, value: "64 orders", cls: "fill-amber-500" },
  { name: "Tokyo", x: 578, y: 288, value: "128 orders", cls: "fill-emerald-500" },
  { name: "Sydney", x: 610, y: 530, value: "48 orders", cls: "fill-rose-500" },
];

function WorldVectorMap() {
  return (
    <div role="img" aria-label="Vector world map with city pins" className="relative h-full w-full overflow-hidden rounded-xl bg-black">
      <Image
        src={WORLD_MAP_IMAGE}
        alt=""
        fill
        sizes="(min-width: 1280px) 65vw, 100vw"
        className="object-contain"
        priority
      />
      <svg viewBox="0 0 1024 672" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="pin-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="none" strokeLinecap="round" strokeWidth="3" strokeDasharray="8 10">
          <path d="M866 268 C790 158 680 154 578 288" className="stroke-violet-500/80" />
          <path d="M178 238 C262 246 334 286 374 338" className="stroke-sky-500/80" />
          <path d="M374 338 C468 402 560 454 610 530" className="stroke-emerald-500/80" />
        </g>

        {cityPins.map((pin) => (
          <g key={pin.name} transform={`translate(${pin.x} ${pin.y})`} filter="url(#pin-glow)">
            <circle r="11" className={cn(pin.cls, "opacity-25")} />
            <circle r="5" className={pin.cls} />
            <circle r="2.2" className="fill-white" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function WarehouseVectorMap() {
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label="Vector warehouse route map" className="h-full w-full">
      <rect width="420" height="260" rx="18" className="fill-(--t-hover)" />
      <path d="M55 205 C106 154 134 176 176 124 C226 63 279 68 353 40" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" />
      <path d="M55 205 C106 154 134 176 176 124 C226 63 279 68 353 40" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
      {[
        [55, 205, "bg-violet-500", "LAX"],
        [176, 124, "bg-sky-500", "HUB"],
        [353, 40, "bg-emerald-500", "NYC"],
      ].map(([x, y, color, label]) => (
        <g key={String(label)} transform={`translate(${x} ${y})`}>
          <circle r="15" className="fill-(--luxe-sidebar-2) stroke-(--t-border-2)" strokeWidth="2" />
          <foreignObject x="-9" y="-9" width="18" height="18">
            <div className={cn("h-[18px] w-[18px] rounded-full", color as string)} />
          </foreignObject>
          <text y="30" textAnchor="middle" className="fill-(--t-text-60) text-[10px] font-semibold">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function VectorMapsPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="panel p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="t-text text-sm font-semibold">Vector World Map</h3>
            <p className="t-text-40 mt-1 text-xs">
              Lightweight SVG map for dashboards that need regions, routes, pins, and no external map runtime.
            </p>
          </div>
          <Badge className="border border-emerald-500/20 bg-emerald-500/10 px-2 text-[10px] text-emerald-500">
            <Globe2 className="h-3 w-3" />
            SVG only
          </Badge>
        </div>
        <div className="aspect-1024/672 w-full overflow-hidden rounded-xl">
          <WorldVectorMap />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
          {cityPins.map((pin) => (
            <div key={pin.name} className="rounded-xl border border-(--t-border) p-3">
              <div className="flex items-center gap-2">
                <CircleDot className={cn("h-3.5 w-3.5", pin.cls.replace("fill-", "text-"))} />
                <p className="truncate text-xs font-semibold t-text-70">{pin.name}</p>
              </div>
              <p className="mt-1 text-[10px] t-text-30">{pin.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="t-text text-sm font-semibold">Distribution Route Map</h3>
            <p className="t-text-40 mt-1 text-xs">Custom SVG route diagram with waypoints and dashed road overlay.</p>
          </div>
          <Badge className="border border-violet-500/20 bg-violet-500/10 px-2 text-[10px] text-violet-500">
            <Route className="h-3 w-3" />
            Routes
          </Badge>
        </div>
        <div className="h-[320px] overflow-hidden rounded-xl">
          <WarehouseVectorMap />
        </div>
      </div>
    </div>
  );
}
