"use client";

import { useState } from "react";
import { Truck, MapPin, Fuel, AlertTriangle, CheckCircle2, Clock, MoreHorizontal, Search, Plus } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

type VehicleStatus = "active" | "maintenance" | "idle" | "offline";

interface Vehicle {
  id: string; plate: string; type: string; driver: string;
  status: VehicleStatus; fuel: number; mileage: number;
  lastService: string; nextService: string; location: string;
  deliveries: number; issues: number;
}

const FLEET: Vehicle[] = [
  { id: "VH-001", plate: "NXL-4821", type: "Armored Van", driver: "James Carter", status: "active", fuel: 82, mileage: 24800, lastService: "2026-04-10", nextService: "2026-07-10", location: "Charlotte, NC", deliveries: 187, issues: 0 },
  { id: "VH-002", plate: "LUX-9903", type: "Luxury Sedan", driver: "Sofia Lindqvist", status: "active", fuel: 67, mileage: 18200, lastService: "2026-04-22", nextService: "2026-07-22", location: "Ventura, CA", deliveries: 143, issues: 0 },
  { id: "VH-003", plate: "TRN-5512", type: "Climate Van", driver: "Marco Ricci", status: "maintenance", fuel: 45, mileage: 52100, lastService: "2026-01-15", nextService: "2026-04-15", location: "Chicago Hub", deliveries: 312, issues: 2 },
  { id: "VH-004", plate: "NXL-7734", type: "Armored Van", driver: "Aisha Johnson", status: "active", fuel: 91, mileage: 31400, lastService: "2026-03-08", nextService: "2026-06-08", location: "Waxahachie, TX", deliveries: 224, issues: 0 },
  { id: "VH-005", plate: "LUX-2215", type: "Luxury Sedan", driver: "Chen Wei", status: "idle", fuel: 100, mileage: 9800, lastService: "2026-04-28", nextService: "2026-07-28", location: "Seattle Hub", deliveries: 78, issues: 0 },
  { id: "VH-006", plate: "TRN-8801", type: "Climate Truck", driver: "Dmitri Volkov", status: "offline", fuel: 12, mileage: 67300, lastService: "2026-02-01", nextService: "2026-02-01", location: "Moscow Depot", deliveries: 421, issues: 3 },
  { id: "VH-007", plate: "NXL-3390", type: "Armored Van", driver: "Priya Sharma", status: "active", fuel: 74, mileage: 41200, lastService: "2026-03-20", nextService: "2026-06-20", location: "Mumbai Intl", deliveries: 198, issues: 0 },
];

const statusConfig: Record<VehicleStatus, { label: string; cls: string; icon: React.ElementType }> = {
  active:      { label: "Active",      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  maintenance: { label: "Maintenance", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",  icon: AlertTriangle },
  idle:        { label: "Idle",        cls: "bg-slate-500/10 text-slate-400 border-slate-500/20",  icon: Clock },
  offline:     { label: "Offline",     cls: "bg-red-500/10 text-red-400 border-red-500/20",        icon: AlertTriangle },
};

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "all">("all");

  const filtered = FLEET.filter((v) =>
    (statusFilter === "all" || v.status === statusFilter) &&
    (!search || v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase()) ||
      v.plate.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = { all: FLEET.length, active: FLEET.filter(v => v.status === "active").length, maintenance: FLEET.filter(v => v.status === "maintenance").length, idle: FLEET.filter(v => v.status === "idle").length, offline: FLEET.filter(v => v.status === "offline").length };

  return (
    <div className="space-y-3 pb-0">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["active", "maintenance", "idle", "offline"] as VehicleStatus[]).map((s) => {
          const cfg = statusConfig[s];
          const Icon = cfg.icon;
          return (
            <button key={s} onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
              className={cn("panel flex items-center gap-3 p-4 text-left transition-all", statusFilter === s ? "ring-2 ring-[var(--t-accent)]" : "hover:t-border-2")}>
              <Icon className={cn("w-5 h-5", cfg.cls.split(" ")[1])} aria-hidden="true" />
              <div>
                <p className="t-text font-bold text-xl">{counts[s]}</p>
                <p className="t-text-40 text-xs capitalize">{s}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="panel">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <Form.Root className="flex-1">
            <Form.Field name="search">
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                <Search className="w-3.5 h-3.5 t-text-30" />
                <Form.Control asChild>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by vehicle ID, driver or plate…"
                    aria-label="Search vehicles"
                    className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                  />
                </Form.Control>
              </div>
            </Form.Field>
          </Form.Root>
          <button className="h-9 px-3 rounded-lg text-white text-xs flex items-center gap-1.5 font-medium" style={{ backgroundColor: "var(--t-accent)" }}>
            <Plus className="w-3.5 h-3.5" /> Add Vehicle
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["Vehicle", "Plate", "Type", "Driver", "Location", "Fuel", "Mileage", "Deliveries", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const { label, cls } = statusConfig[v.status];
                const fuelColor = v.fuel < 20 ? "text-red-400" : v.fuel < 40 ? "text-amber-400" : "text-emerald-400";
                return (
                  <tr key={v.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5"><span className="font-mono text-xs t-text-50">{v.id}</span></td>
                    <td className="px-5 py-3.5"><span className="font-mono text-xs t-text-60">{v.plate}</span></td>
                    <td className="px-5 py-3.5"><span className="t-text-50 text-xs">{v.type}</span></td>
                    <td className="px-5 py-3.5"><span className="t-text-70 text-xs font-medium">{v.driver}</span></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 t-text-30" /><span className="t-text-50 text-xs">{v.location}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 w-28">
                      <div className="flex items-center gap-2">
                        <Fuel className={cn("w-3 h-3 flex-shrink-0", fuelColor)} />
                        <Progress value={v.fuel} className="h-1 flex-1" />
                        <span className={cn("text-xs w-8 text-right", fuelColor)}>{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{v.mileage.toLocaleString()} mi</span></td>
                    <td className="px-5 py-3.5"><span className="t-text-50 text-xs">{v.deliveries}</span></td>
                    <td className="px-5 py-3.5"><Badge className={cn("text-[10px] px-2 border", cls)}>{label}</Badge></td>
                    <td className="px-3 py-3.5">
                      <button aria-label="More actions" className="t-text-30 hover:t-text-70 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="t-text-30 text-xs">{filtered.length} vehicles</span>
        </div>
      </div>
    </div>
  );
}
