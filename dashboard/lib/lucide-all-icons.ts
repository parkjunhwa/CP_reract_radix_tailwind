import * as Lucide from "lucide-react";

const EXCLUDE = new Set(["icons", "useLucideContext"]);

/**
 * Every Lucide glyph exported by the installed `lucide-react` build.
 * Drops duplicate `FooIcon` aliases and `LucideFoo` legacy names.
 */
export const LUCIDE_ICON_NAMES: string[] = Object.keys(Lucide)
  .filter((k) => !k.startsWith("Lucide") && !k.endsWith("Icon") && !EXCLUDE.has(k))
  .sort((a, b) => a.localeCompare(b));

export type LucideModule = typeof Lucide;

export { Lucide };
