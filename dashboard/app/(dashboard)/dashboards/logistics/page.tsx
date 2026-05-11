"use client";

import { Truck, MapPin, Package, Clock, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Active Vehicles", value: "142", change: +8, icon: Truck, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Deliveries Today", value: "387", change: +12.4, icon: Package, color: "text-sky-400", bg: "bg-sky-500/10" },
  { label: "On-Time Rate", value: "94.2%", change: +1.8, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Avg. Transit Time", value: "2.4d", change: -0.3, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const deliveryData = [
  { day: "Mon", delivered: 312, pending: 28 },
  { day: "Tue", delivered: 284, pending: 42 },
  { day: "Wed", delivered: 398, pending: 18 },
  { day: "Thu", delivered: 356, pending: 31 },
  { day: "Fri", delivered: 421, pending: 22 },
  { day: "Sat", delivered: 267, pending: 14 },
  { day: "Sun", delivered: 198, pending: 9 },
];

const fleetStatus = [
  { month: "Jan", active: 118, maintenance: 12, idle: 8 },
  { month: "Feb", active: 124, maintenance: 8, idle: 6 },
  { month: "Mar", active: 131, maintenance: 11, idle: 4 },
  { month: "Apr", active: 128, maintenance: 14, idle: 7 },
  { month: "May", active: 138, maintenance: 9, idle: 5 },
  { month: "Jun", active: 142, maintenance: 7, idle: 3 },
];

type VehicleStatus = "active" | "maintenance" | "idle";

const vehicles: { id: string; driver: string; route: string; status: VehicleStatus; location: string; eta: string; cargo: string }[] = [
  { id: "VH-001", driver: "James Carter", route: "NYC → Miami", status: "active", location: "Charlotte, NC", eta: "2h 40m", cargo: "Fine Jewelry" },
  { id: "VH-002", driver: "Sofia Lindqvist", route: "LA → SF", status: "active", location: "Ventura, CA", eta: "45m", cargo: "Luxury Watches" },
  { id: "VH-003", driver: "Marco Ricci", route: "Chicago → Detroit", status: "maintenance", location: "Chicago Hub", eta: "—", cargo: "—" },
  { id: "VH-004", driver: "Aisha Johnson", route: "Dallas → Houston", status: "active", location: "Waxahachie, TX", eta: "1h 15m", cargo: "Premium Fashion" },
  { id: "VH-005", driver: "Chen Wei", route: "Seattle → Portland", status: "idle", location: "Seattle Hub", eta: "—", cargo: "—" },
];

const statusConfig: Record<VehicleStatus, { label: string; cls: string }> = {
  active:      { label: "Active",      cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  maintenance: { label: "Maintenance", cls: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  idle:        { label: "Idle",        cls: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

export default function LogisticsDashboardPage() {
  return (
    <div className="space-y-3 pb-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.change >= 0;
          return (
            <div key={k.label} className="panel p-4 flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", k.bg)}>
                <Icon className={cn("w-5 h-5", k.color)} aria-hidden="true" />
              </div>
              <div>
                <p className="t-text-40 text-[11px] uppercase tracking-wide">{k.label}</p>
                <p className="t-text font-bold text-xl">{k.value}</p>
                <div className={cn("flex items-center gap-0.5 text-xs font-semibold mt-0.5", positive ? "text-emerald-400" : "text-red-400")}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {positive ? "+" : ""}{k.change}{typeof k.change === "number" && Math.abs(k.change) < 2 && !Number.isInteger(k.change) ? "d" : "%"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Weekly Deliveries</h3>
          <p className="t-text-30 text-xs mb-4">Delivered vs pending this week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="delivered" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Delivered" stackId="a" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <h3 className="t-text font-semibold text-sm mb-1">Fleet Activity</h3>
          <p className="t-text-30 text-xs mb-4">Active vs maintenance vehicles (monthly)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={fleetStatus}>
              <defs>
                <linearGradient id="active-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--t-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--t-text-40)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="active" stroke="#7c3aed" fill="url(#active-grad)" strokeWidth={2} name="Active" />
              <Area type="monotone" dataKey="maintenance" stroke="#f59e0b" fill="none" strokeWidth={2} strokeDasharray="4 2" name="Maintenance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Active Fleet Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Vehicle", "Driver", "Route", "Current Location", "ETA", "Cargo", "Status"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => {
                const { label, cls } = statusConfig[v.status];
                return (
                  <tr key={v.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs t-text-50">{v.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-70 text-xs font-medium">{v.driver}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-50 text-xs">{v.route}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 t-text-30" />
                        <span className="t-text-50 text-xs">{v.location}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-xs font-semibold", v.eta === "—" ? "t-text-30" : "text-emerald-400")}>{v.eta}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="t-text-40 text-xs">{v.cargo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge className={cn("text-[10px] px-2 border", cls)}>{label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
