"use client";

import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  type ComponentType,
} from "react";

import { Lucide, LUCIDE_ICON_NAMES } from "@/lib/lucide-all-icons";
import { LUCIDE_REACT_VERSION } from "@/lib/lucide-package-meta";
import { Input, InputAddon, InputGroup } from "@/components/ui/input";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type IconCellProps = {
  name: string;
  onCopy: (name: string) => void;
};

const IconCell = memo(function IconCell({ name, onCopy }: IconCellProps) {
  const Cmp = Lucide[name as keyof typeof Lucide] as ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;

  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      className="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors hover:bg-[color:var(--t-hover)] text-center min-w-0 w-full [content-visibility:auto] [contain-intrinsic-size:72px_72px]"
      title={`${name} — click to copy`}
      aria-label={`Copy icon name ${name}`}
    >
      <Cmp className="w-6 h-6 t-text shrink-0" aria-hidden />
      <span className="t-text-40 text-[11px] truncate w-full">{name}</span>
    </button>
  );
});

export default function IconsPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [letter, setLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const q = deferredQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    return LUCIDE_ICON_NAMES.filter((name) => {
      if (letter && name[0] !== letter) return false;
      if (q && !name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [letter, q]);

  const onCopy = useCallback(async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }, []);

  const SearchIcon = Lucide.Search as ComponentType<{ className?: string }>;

  return (
    <div className="space-y-3">
      <div className="panel p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1 max-w-md">
            <InputGroup>
              <InputAddon>
                <SearchIcon className="w-3.5 h-3.5" />
              </InputAddon>
              <Input
                placeholder="Filter by icon name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search icons"
              />
            </InputGroup>
          </div>
          <p className="t-text-50 text-xs lg:text-right lg:pb-2">
            Showing <span className="t-text font-medium">{filtered.length}</span> of{" "}
            <span className="t-text font-medium">{LUCIDE_ICON_NAMES.length}</span>
            {copied && (
              <span className="ml-2 t-accent-text" aria-live="polite">
                Copied “{copied}”
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setLetter(null)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              letter === null
                ? "bg-[color:var(--t-accent)] text-white"
                : "t-text-60 hover:bg-[color:var(--t-hover)]"
            }`}
          >
            All
          </button>
          {LETTERS.map((L) => (
            <button
              key={L}
              type="button"
              onClick={() => setLetter((prev) => (prev === L ? null : L))}
              className={`min-w-7 px-1 py-1 rounded-md text-[11px] font-medium transition-colors ${
                letter === L
                  ? "bg-[color:var(--t-accent)] text-white"
                  : "t-text-60 hover:bg-[color:var(--t-hover)]"
              }`}
            >
              {L}
            </button>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        {filtered.length === 0 ? (
          <p className="t-text-50 text-sm text-center py-10">
            No icons match this filter.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1">
            {filtered.map((name) => (
              <IconCell key={name} name={name} onCopy={onCopy} />
            ))}
          </div>
        )}
      </div>

      <p className="t-text-40 text-xs leading-relaxed">
        Source of truth is the{" "}
        <code className="px-1 py-0.5 rounded t-surface-2 t-text-60 text-[11px]">lucide-react</code>{" "}
        package (
        <a
          className="t-accent-text underline"
          href={`https://www.npmjs.com/package/lucide-react/v/${LUCIDE_REACT_VERSION}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          npm {LUCIDE_REACT_VERSION}
        </a>
        ). Browse names and SVG previews at{" "}
        <a className="t-accent-text underline" href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer">
          lucide.dev/icons
        </a>
        .
      </p>
    </div>
  );
}
