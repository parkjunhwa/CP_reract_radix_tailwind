import Link from "next/link";

/** Global 404 — Vuexy full-version의 `[lang]/[...not-found]`와 같은 역할입니다. */
export default function RootNotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 py-16 text-center"
      style={{ backgroundColor: "var(--luxe-bg)", color: "var(--luxe-text)" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-40">404</p>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm opacity-60 max-w-md">요청한 경로가 없거나 이동했을 수 있습니다.</p>
      <Link href="/dashboards/crm" className="text-sm font-medium text-violet-400 hover:underline">
        대시보드로 이동
      </Link>
    </div>
  );
}
