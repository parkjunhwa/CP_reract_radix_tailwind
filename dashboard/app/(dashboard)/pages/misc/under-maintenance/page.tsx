import Link from "next/link";
import { Settings, ArrowLeft } from "lucide-react";

export default function UnderMaintenancePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center">
        <Settings className="w-10 h-10 text-amber-400 animate-spin" style={{ animationDuration: "4s" }} />
      </div>
      <div>
        <h1 className="t-text font-bold text-4xl mb-3">Under Maintenance 🔧</h1>
        <p className="t-text-40 text-sm max-w-md mx-auto">
          We are performing scheduled maintenance to improve your experience. We'll be back shortly.
        </p>
      </div>
      <div className="panel p-5 max-w-sm w-full text-left space-y-2">
        <p className="t-text-60 text-xs font-semibold">Expected downtime</p>
        <p className="t-text font-bold text-lg">2 hours</p>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
          <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: "65%" }} />
        </div>
        <p className="t-text-30 text-xs">65% complete — system updates in progress</p>
      </div>
      <Link href="/" className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
