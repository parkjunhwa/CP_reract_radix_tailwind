"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "dark", resolvedTheme: "dark", setTheme: () => {} });

function resolve(t: Theme): "light" | "dark" {
  if (t === "system") {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }
  return t;
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
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("luxe-theme") as Theme) || "dark";
    const res = resolve(stored);
    setThemeState(stored);
    setResolved(res);
    applyResolved(res);

    // system preference listener
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const cur = (localStorage.getItem("luxe-theme") as Theme) || "dark";
      if (cur === "system") {
        const r = mq.matches ? "dark" : "light";
        setResolved(r);
        applyResolved(r);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = (t: Theme) => {
    const res = resolve(t);
    setThemeState(t);
    setResolved(res);
    localStorage.setItem("luxe-theme", t);
    applyResolved(res);
  };

  return <Ctx.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
