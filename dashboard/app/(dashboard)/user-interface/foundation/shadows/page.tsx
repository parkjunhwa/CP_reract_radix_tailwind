"use client";

const SYSTEM_SHADOWS = [
  { label: "Z1",  shadow: "0px 1px 3px 0px rgb(0 0 0 / 0.20), 0px 1px 1px 0px rgb(0 0 0 / 0.14), 0px 2px 1px -1px rgb(0 0 0 / 0.12)" },
  { label: "Z2",  shadow: "0px 1px 5px 0px rgb(0 0 0 / 0.20), 0px 2px 2px 0px rgb(0 0 0 / 0.14), 0px 3px 1px -2px rgb(0 0 0 / 0.12)" },
  { label: "Z3",  shadow: "0px 1px 8px 0px rgb(0 0 0 / 0.20), 0px 3px 4px 0px rgb(0 0 0 / 0.14), 0px 3px 3px -2px rgb(0 0 0 / 0.12)" },
  { label: "Z4",  shadow: "0px 2px 4px -1px rgb(0 0 0 / 0.20), 0px 4px 5px 0px rgb(0 0 0 / 0.14), 0px 1px 10px 0px rgb(0 0 0 / 0.12)" },
  { label: "Z5",  shadow: "0px 3px 5px -1px rgb(0 0 0 / 0.20), 0px 5px 8px 0px rgb(0 0 0 / 0.14), 0px 1px 14px 0px rgb(0 0 0 / 0.12)" },
  { label: "Z6",  shadow: "0px 3px 5px -1px rgb(0 0 0 / 0.20), 0px 6px 10px 0px rgb(0 0 0 / 0.14), 0px 1px 18px 0px rgb(0 0 0 / 0.12)" },
  { label: "Z7",  shadow: "0px 4px 5px -2px rgb(0 0 0 / 0.20), 0px 7px 10px 1px rgb(0 0 0 / 0.14), 0px 2px 16px 1px rgb(0 0 0 / 0.12)" },
  { label: "Z8",  shadow: "0px 5px 5px -3px rgb(0 0 0 / 0.20), 0px 8px 10px 1px rgb(0 0 0 / 0.14), 0px 3px 14px 2px rgb(0 0 0 / 0.12)" },
  { label: "Z9",  shadow: "0px 5px 6px -3px rgb(0 0 0 / 0.20), 0px 9px 12px 1px rgb(0 0 0 / 0.14), 0px 3px 16px 2px rgb(0 0 0 / 0.12)" },
  { label: "Z10", shadow: "0px 6px 6px -3px rgb(0 0 0 / 0.20), 0px 10px 14px 1px rgb(0 0 0 / 0.14), 0px 4px 18px 3px rgb(0 0 0 / 0.12)" },
  { label: "Z11", shadow: "0px 6px 7px -4px rgb(0 0 0 / 0.20), 0px 11px 15px 1px rgb(0 0 0 / 0.14), 0px 4px 20px 3px rgb(0 0 0 / 0.12)" },
  { label: "Z12", shadow: "0px 7px 8px -4px rgb(0 0 0 / 0.20), 0px 12px 17px 2px rgb(0 0 0 / 0.14), 0px 5px 22px 4px rgb(0 0 0 / 0.12)" },
  { label: "Z13", shadow: "0px 7px 8px -4px rgb(0 0 0 / 0.20), 0px 13px 19px 2px rgb(0 0 0 / 0.14), 0px 5px 24px 4px rgb(0 0 0 / 0.12)" },
  { label: "Z14", shadow: "0px 7px 9px -4px rgb(0 0 0 / 0.20), 0px 14px 21px 2px rgb(0 0 0 / 0.14), 0px 5px 26px 4px rgb(0 0 0 / 0.12)" },
  { label: "Z15", shadow: "0px 8px 9px -5px rgb(0 0 0 / 0.20), 0px 15px 22px 2px rgb(0 0 0 / 0.14), 0px 6px 28px 5px rgb(0 0 0 / 0.12)" },
  { label: "Z16", shadow: "0px 8px 10px -5px rgb(0 0 0 / 0.20), 0px 16px 24px 2px rgb(0 0 0 / 0.14), 0px 6px 30px 5px rgb(0 0 0 / 0.12)" },
  { label: "Z17", shadow: "0px 8px 11px -5px rgb(0 0 0 / 0.20), 0px 17px 26px 2px rgb(0 0 0 / 0.14), 0px 6px 32px 5px rgb(0 0 0 / 0.12)" },
  { label: "Z18", shadow: "0px 9px 11px -5px rgb(0 0 0 / 0.20), 0px 18px 28px 2px rgb(0 0 0 / 0.14), 0px 7px 34px 6px rgb(0 0 0 / 0.12)" },
  { label: "Z19", shadow: "0px 9px 12px -6px rgb(0 0 0 / 0.20), 0px 19px 29px 2px rgb(0 0 0 / 0.14), 0px 7px 36px 6px rgb(0 0 0 / 0.12)" },
  { label: "Z20", shadow: "0px 10px 13px -6px rgb(0 0 0 / 0.20), 0px 20px 31px 3px rgb(0 0 0 / 0.14), 0px 8px 38px 7px rgb(0 0 0 / 0.12)" },
  { label: "Z22", shadow: "0px 10px 14px -6px rgb(0 0 0 / 0.20), 0px 22px 35px 3px rgb(0 0 0 / 0.14), 0px 8px 42px 7px rgb(0 0 0 / 0.12)" },
  { label: "Z23", shadow: "0px 11px 14px -7px rgb(0 0 0 / 0.20), 0px 23px 36px 3px rgb(0 0 0 / 0.14), 0px 9px 44px 8px rgb(0 0 0 / 0.12)" },
  { label: "Z24", shadow: "0px 11px 15px -7px rgb(0 0 0 / 0.20), 0px 24px 38px 3px rgb(0 0 0 / 0.14), 0px 9px 46px 8px rgb(0 0 0 / 0.12)" },
];

const CUSTOM_SHADOWS = [
  { label: "xs", shadow: "0px 1px 2px 0px rgb(47 43 61 / 0.10)" },
  { label: "sm", shadow: "0px 2px 4px 0px rgb(47 43 61 / 0.10)" },
  { label: "md", shadow: "0px 4px 8px 0px rgb(47 43 61 / 0.16)" },
  { label: "lg", shadow: "0px 6px 12px 0px rgb(47 43 61 / 0.18)" },
  { label: "xl", shadow: "0px 8px 16px 0px rgb(47 43 61 / 0.22)" },
];

const COLOR_INTENTS = [
  { name: "primary",   rgb: "115 103 240" },
  { name: "secondary", rgb: "128 131 144" },
  { name: "error",     rgb: "255 76 81"   },
  { name: "warning",   rgb: "255 159 67"  },
  { name: "info",      rgb: "0 186 209"   },
  { name: "success",   rgb: "40 199 111"  },
];

const COLOR_LEVELS = [
  { suffix: "sm", spread: "0px 2px 6px 0px",  alpha: 0.30 },
  { suffix: "md", spread: "0px 4px 8px 0px",  alpha: 0.40 },
  { suffix: "lg", spread: "0px 6px 14px 0px", alpha: 0.45 },
];

function ShadowTile({ label, shadow }: { label: string; shadow: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg p-2 t-surface-2 sm:gap-2 sm:p-2.5">
      <div
        className="size-12 shrink-0 rounded-md t-surface sm:size-14"
        style={{ boxShadow: shadow }}
        aria-hidden
      />
      <div className="t-text-50 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <header className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--t-border)" }}>
        <h3 className="t-text font-semibold text-sm">{title}</h3>
      </header>
      <div className="grid grid-cols-4 gap-2 p-5 sm:grid-cols-6 sm:gap-2.5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        {children}
      </div>
    </section>
  );
}

export default function ShadowsPage() {
  return (
    <div className="space-y-3 pb-0">
      <Section title="System">
        {SYSTEM_SHADOWS.map((s) => (
          <ShadowTile key={s.label} label={s.label} shadow={s.shadow} />
        ))}
      </Section>

      <Section title="Custom">
        {CUSTOM_SHADOWS.map((s) => (
          <ShadowTile key={s.label} label={s.label} shadow={s.shadow} />
        ))}
      </Section>

      <Section title="Color">
        {COLOR_INTENTS.flatMap((intent) =>
          COLOR_LEVELS.map((level) => {
            const shadow = `${level.spread} rgb(${intent.rgb} / ${level.alpha})`;
            return <ShadowTile key={`${intent.name}-${level.suffix}`} label={`${intent.name}-${level.suffix}`} shadow={shadow} />;
          })
        )}
      </Section>
    </div>
  );
}
