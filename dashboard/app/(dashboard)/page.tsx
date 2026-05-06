import KpiCards from "@/components/dashboard/KpiCards";
import ChartsSection from "@/components/charts/ChartsSection";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopProducts from "@/components/dashboard/TopProducts";
import TopClients from "@/components/dashboard/TopClients";

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-6">
      <KpiCards />
      <ChartsSection />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3"><RecentOrders /></div>
        <div className="xl:col-span-2"><TopProducts /></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2"><TopClients /></div>
        <div className="xl:col-span-3"><ActivityFeed /></div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    { time: "2 min ago", icon: "💳", text: "New order", detail: "ORD-7821 · Patek Philippe Nautilus · $142,000", color: "text-emerald-400" },
    { time: "18 min ago", icon: "👤", text: "New client registered", detail: "Yuki Tanaka · Tokyo · Gold tier", color: "text-sky-400" },
    { time: "34 min ago", icon: "📦", text: "Inventory alert", detail: "Hermès Birkin 35 Crocodile — 1 unit remaining", color: "text-amber-400" },
    { time: "1h ago", icon: "✅", text: "Payment confirmed", detail: "ORD-7819 · Richard Mille RM 011 · $215,000", color: "text-emerald-400" },
    { time: "2h ago", icon: "❌", text: "Order cancelled", detail: "ORD-7815 · Vintage Bordeaux Collection · $28,500", color: "text-red-400" },
    { time: "3h ago", icon: "🌍", text: "New market opened", detail: "Middle East region now active", color: "text-violet-400" },
    { time: "5h ago", icon: "📈", text: "Monthly target exceeded", detail: "April revenue +13.6% over target", color: "text-violet-400" },
  ];
  return (
    <div className="rounded-xl border border-white/8 bg-[#0d0d18] flex flex-col h-full">
      <div className="px-5 py-4 border-b border-white/5">
        <h3 className="text-white font-semibold text-sm">Activity Feed</h3>
        <p className="text-white/30 text-xs mt-0.5">Real-time business events</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
            <span className="text-base mt-0.5 flex-shrink-0">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-xs font-semibold ${a.color}`}>{a.text}</span>
                <span className="text-white/20 text-[10px] flex-shrink-0">{a.time}</span>
              </div>
              <p className="text-white/40 text-xs mt-0.5 truncate">{a.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
