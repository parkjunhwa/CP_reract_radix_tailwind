"use client";

type Swatch = { label: string; hex: string; rgb: string };
type ColorGroup = { name: string; swatches: Swatch[] };

const SOLID: ColorGroup[] = [
  {
    name: "Primary",
    swatches: [
      { label: "light", hex: "#8F85F3", rgb: "rgb(143, 133, 243)" },
      { label: "main",  hex: "#7367F0", rgb: "rgb(115, 103, 240)" },
      { label: "dark",  hex: "#675DD8", rgb: "rgb(103, 93, 216)" },
    ],
  },
  {
    name: "Secondary",
    swatches: [
      { label: "light", hex: "#999CA6", rgb: "rgb(153, 156, 166)" },
      { label: "main",  hex: "#808390", rgb: "rgb(128, 131, 144)" },
      { label: "dark",  hex: "#737682", rgb: "rgb(115, 118, 130)" },
    ],
  },
  {
    name: "Error",
    swatches: [
      { label: "light", hex: "#FF7074", rgb: "rgb(255, 112, 116)" },
      { label: "main",  hex: "#FF4C51", rgb: "rgb(255, 76, 81)" },
      { label: "dark",  hex: "#E64449", rgb: "rgb(230, 68, 73)" },
    ],
  },
  {
    name: "Warning",
    swatches: [
      { label: "light", hex: "#FFB269", rgb: "rgb(255, 178, 105)" },
      { label: "main",  hex: "#FF9F43", rgb: "rgb(255, 159, 67)" },
      { label: "dark",  hex: "#E68F3C", rgb: "rgb(230, 143, 60)" },
    ],
  },
  {
    name: "Info",
    swatches: [
      { label: "light", hex: "#33C8DA", rgb: "rgb(51, 200, 218)" },
      { label: "main",  hex: "#00BAD1", rgb: "rgb(0, 186, 209)" },
      { label: "dark",  hex: "#00A7BC", rgb: "rgb(0, 167, 188)" },
    ],
  },
  {
    name: "Success",
    swatches: [
      { label: "light", hex: "#53D28C", rgb: "rgb(83, 210, 140)" },
      { label: "main",  hex: "#28C76F", rgb: "rgb(40, 199, 111)" },
      { label: "dark",  hex: "#24B364", rgb: "rgb(36, 179, 100)" },
    ],
  },
];

const OPACITY_INTENT: { name: string; baseRgb: string }[] = [
  { name: "Primary",   baseRgb: "115 103 240" },
  { name: "Secondary", baseRgb: "128 131 144" },
  { name: "Error",     baseRgb: "255 76 81"   },
  { name: "Warning",   baseRgb: "255 159 67"  },
  { name: "Info",      baseRgb: "0 186 209"   },
  { name: "Success",   baseRgb: "40 199 111"  },
];

const OPACITY_LEVELS = [
  { label: "lighterOpacity", value: 0.08 },
  { label: "lightOpacity",   value: 0.16 },
  { label: "mainOpacity",    value: 0.24 },
  { label: "darkOpacity",    value: 0.32 },
  { label: "darkerOpacity",  value: 0.38 },
];

function SwatchTile({ swatch }: { swatch: Swatch }) {
  return (
    <div className="panel overflow-hidden">
      <div className="h-20 w-full" style={{ backgroundColor: swatch.hex }} aria-hidden />
      <div className="px-3 py-2.5 space-y-0.5">
        <div className="t-text-50 text-[11px] font-semibold uppercase tracking-wide">{swatch.label}</div>
        <div className="t-text font-mono text-xs">{swatch.hex}</div>
        <div className="t-text-40 font-mono text-[11px]">{swatch.rgb}</div>
      </div>
    </div>
  );
}

function OpacityTile({ name, level, baseRgb }: { name: string; level: { label: string; value: number }; baseRgb: string }) {
  const css = `rgb(${baseRgb} / ${level.value})`;
  return (
    <div className="panel overflow-hidden">
      <div className="h-20 w-full" style={{ backgroundColor: css }} aria-hidden />
      <div className="px-3 py-2.5 space-y-0.5">
        <div className="t-text-50 text-[11px] font-semibold uppercase tracking-wide">{level.label}</div>
        <div className="t-text-40 font-mono text-[11px]">rgb({baseRgb} / {level.value})</div>
        <div className="t-text-40 text-[11px]">{name}</div>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="space-y-3 pb-0">
      {SOLID.map((group) => (
        <section key={group.name} className="panel">
          <header className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--t-border)" }}>
            <h3 className="t-text font-semibold text-sm">{group.name}</h3>
          </header>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {group.swatches.map((s) => (
              <SwatchTile key={s.label} swatch={s} />
            ))}
          </div>
        </section>
      ))}

      {OPACITY_INTENT.map((intent) => (
        <section key={intent.name} className="panel">
          <header className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--t-border)" }}>
            <h3 className="t-text font-semibold text-sm">{intent.name}Opacity</h3>
          </header>
          <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {OPACITY_LEVELS.map((level) => (
              <OpacityTile key={level.label} name={intent.name} level={level} baseRgb={intent.baseRgb} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
