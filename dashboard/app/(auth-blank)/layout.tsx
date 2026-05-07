/**
 * Auth & blank marketing-style pages: full-viewport shell without dashboard chrome.
 */
export default function AuthBlankLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh antialiased">{children}</div>;
}
