import { ExampleCard } from "@/components/radix/ExampleCard";
import { ExampleShell } from "@/components/radix/ExampleShell";
import { RADIX_PRIMITIVES } from "@/lib/radix-primitives";

export default function RadixIndexPage() {
  return (
    <ExampleShell
      title="Radix Primitives"
      description="Unstyled, accessible UI primitives — each page is a small, working example."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {RADIX_PRIMITIVES.map((p) => (
          <ExampleCard
            key={p.slug}
            title={p.title}
            description={p.description}
            href={`/radix/${p.slug}`}
          />
        ))}
      </div>
    </ExampleShell>
  );
}

