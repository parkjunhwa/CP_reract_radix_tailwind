"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "system", resolvedTheme: "dark", setTheme: () => {} });

const THEME_STORAGE_KEY = "luxe-theme";
const THEME_EVENT = "luxe-theme-change";

function readStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    // ignore
  }
  return "system";
}

function subscribeThemeStore(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(THEME_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(THEME_EVENT, handler as EventListener);
  };
}

function useStoredTheme(): Theme {
  return useSyncExternalStore(
    subscribeThemeStore,
    () => readStoredTheme(),
    () => "system"
  );
}

function readPrefersDark(): boolean {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
}

function subscribePrefersDark(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => onStoreChange();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

function usePrefersDark(): boolean {
  return useSyncExternalStore(
    subscribePrefersDark,
    () => readPrefersDark(),
    () => true
  );
}

function applyResolved(resolved: "light" | "dark") {
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(resolved);
  html.setAttribute("data-theme", resolved);
  // meta theme-color for mobile browsers
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = resolved === "dark" ? "#080810" : "#f0f2f8";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStoredTheme();
  const prefersDark = usePrefersDark();
  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (theme === "system") return prefersDark ? "dark" : "light";
    return theme;
  }, [prefersDark, theme]);

  useEffect(() => {
    applyResolved(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (t: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
      window.dispatchEvent(new Event(THEME_EVENT));
    } catch {
      // ignore
    }
  };

  return <Ctx.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
