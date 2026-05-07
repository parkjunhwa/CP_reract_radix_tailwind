"use client";

const HEADINGS = [
  { tag: "h1", label: "h1. Heading", size: 46, line: 68, weight: 500 },
  { tag: "h2", label: "h2. Heading", size: 38, line: 56, weight: 500 },
  { tag: "h3", label: "h3. Heading", size: 28, line: 42, weight: 500 },
  { tag: "h4", label: "h4. Heading", size: 24, line: 38, weight: 500 },
  { tag: "h5", label: "h5. Heading", size: 18, line: 28, weight: 500 },
  { tag: "h6", label: "h6. Heading", size: 15, line: 22, weight: 500 },
] as const;

const SAMPLE = "Cupcake ipsum dolor sit amet chocolate bar pastry sesame snaps.";

const BODY = [
  { name: "body1", size: 15, line: 22, weight: 400 },
  { name: "body2", size: 13, line: 20, weight: 400 },
];

const SUBTITLE = [
  { name: "subtitle1", size: 15, line: 22, weight: 400 },
  { name: "subtitle2", size: 13, line: 20, weight: 400 },
];

type ExtraVariant = {
  name: string;
  size: number;
  line: number;
  weight: number;
  transform?: "uppercase" | "none";
  spacing?: number;
};

const EXTRA: ExtraVariant[] = [
  { name: "button",   size: 15, line: 22, weight: 500, transform: "none" },
  { name: "caption",  size: 13, line: 18, weight: 400, spacing: 0.4 },
  { name: "overline", size: 12, line: 14, weight: 400, transform: "uppercase", spacing: 0.8 },
];

const COLORS = [
  { name: "Primary",   var: "var(--t-accent)" },
  { name: "Secondary", var: "var(--t-text-60)" },
  { name: "Error",     var: "#FF4C51" },
  { name: "Warning",   var: "#FF9F43" },
  { name: "Info",      var: "#00BAD1" },
  { name: "Success",   var: "#28C76F" },
];

function Specs({ size, line, weight, transform, spacing }: {
  size: number; line: number; weight: number; transform?: string; spacing?: number;
}) {
  const parts = [
    `font-size: ${size}px`,
    `line-height: ${line}px`,
    `font-weight: ${weight}`,
    transform ? `text-transform: ${transform}` : null,
    spacing ? `letter-spacing: ${spacing}px` : null,
  ].filter(Boolean);
  return <div className="t-text-40 text-xs mt-1">{parts.join(" / ")}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <header className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--t-border)" }}>
        <h3 className="t-text font-semibold text-sm">{title}</h3>
      </header>
      <div className="p-5 space-y-5 t-divide">{children}</div>
    </section>
  );
}

export default function TypographyPage() {
  return (
    <div className="space-y-3 pb-0">
      <Section title="Headings">
        {HEADINGS.map((h) => (
          <div key={h.tag} className="pt-5 first:pt-0">
            <div
              className="t-text"
              style={{ fontSize: `${h.size}px`, lineHeight: `${h.line}px`, fontWeight: h.weight }}
            >
              {h.label}
            </div>
            <Specs size={h.size} line={h.line} weight={h.weight} />
          </div>
        ))}
      </Section>

      <Section title="Body">
        {BODY.map((b) => (
          <div key={b.name} className="pt-5 first:pt-0">
            <div
              className="t-text"
              style={{ fontSize: `${b.size}px`, lineHeight: `${b.line}px`, fontWeight: b.weight }}
            >
              {b.name}. {SAMPLE}
            </div>
            <Specs size={b.size} line={b.line} weight={b.weight} />
          </div>
        ))}
      </Section>

      <Section title="Subtitle">
        {SUBTITLE.map((s) => (
          <div key={s.name} className="pt-5 first:pt-0">
            <div
              className="t-text"
              style={{ fontSize: `${s.size}px`, lineHeight: `${s.line}px`, fontWeight: s.weight }}
            >
              {s.name}. {SAMPLE}
            </div>
            <Specs size={s.size} line={s.line} weight={s.weight} />
          </div>
        ))}
      </Section>

      <Section title="Extra">
        {EXTRA.map((e) => (
          <div key={e.name} className="pt-5 first:pt-0">
            <div
              className="t-text"
              style={{
                fontSize: `${e.size}px`,
                lineHeight: `${e.line}px`,
                fontWeight: e.weight,
                textTransform: e.transform as React.CSSProperties["textTransform"],
                letterSpacing: e.spacing ? `${e.spacing}px` : undefined,
              }}
            >
              {e.name}. {SAMPLE}
            </div>
            <Specs size={e.size} line={e.line} weight={e.weight} transform={e.transform} spacing={e.spacing} />
          </div>
        ))}
      </Section>

      <Section title="Color">
        {COLORS.map((c) => (
          <div key={c.name} className="pt-5 first:pt-0" style={{ color: c.var }}>
            <span className="font-semibold">{c.name}</span> — {SAMPLE}
          </div>
        ))}
      </Section>
    </div>
  );
}
