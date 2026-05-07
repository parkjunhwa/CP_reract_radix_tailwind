"use client";

import { useState } from "react";
import { Shield, Users, Edit, Trash2, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Role {
  id: string; name: string; description: string; users: number;
  color: string; permissions: string[];
}

const ROLES: Role[] = [
  { id: "r1", name: "Administrator", description: "Full system access including user management, billing, and configuration.", users: 2, color: "violet", permissions: ["Dashboard", "Products", "Orders", "Clients", "Analytics", "Invoices", "Payments", "Users", "Roles", "Settings"] },
  { id: "r2", name: "Sales Manager", description: "Manages client relationships, orders, and sales performance reporting.", users: 4, color: "sky", permissions: ["Dashboard", "Products", "Orders", "Clients", "Analytics", "Invoices"] },
  { id: "r3", name: "Inventory Editor", description: "Manages product catalog, stock levels, and pricing updates.", users: 3, color: "emerald", permissions: ["Products", "Orders"] },
  { id: "r4", name: "Finance Viewer", description: "Read-only access to financial reports, invoices, and payment data.", users: 5, color: "amber", permissions: ["Dashboard", "Invoices", "Payments", "Analytics"] },
  { id: "r5", name: "Logistics Coordinator", description: "Manages shipments, fleet operations, and delivery tracking.", users: 6, color: "rose", permissions: ["Orders", "Clients"] },
];

const colorStyles: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  sky:    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  emerald:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  rose:   "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const avatarColors = ["from-violet-500 to-purple-700","from-sky-500 to-blue-700","from-emerald-500 to-teal-700","from-amber-500 to-orange-700"];

const ALL_PERMISSIONS = ["Dashboard", "Products", "Orders", "Clients", "Analytics", "Invoices", "Payments", "Users", "Roles", "Settings"];

export default function RolesPage() {
  const [selected, setSelected] = useState<string | null>("r1");
  const selectedRole = ROLES.find(r => r.id === selected);

  return (
    <div className="space-y-3 pb-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Roles", value: ROLES.length, icon: Shield, color: "text-violet-400" },
          { label: "Total Users", value: ROLES.reduce((acc, r) => acc + r.users, 0), icon: Users, color: "text-sky-400" },
          { label: "Custom Roles", value: ROLES.length - 1, icon: Shield, color: "text-emerald-400" },
          { label: "Default Role", value: 1, icon: Shield, color: "text-amber-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="panel p-4 flex items-center gap-3">
            <Icon className={cn("w-5 h-5 flex-shrink-0", color)} />
            <div>
              <p className="t-text font-bold text-2xl">{value}</p>
              <p className="t-text-40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Role list */}
        <div className="xl:col-span-1 panel">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
            <h3 className="t-text font-semibold text-sm">Roles</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-lg" style={{ backgroundColor: "var(--t-accent)" }}>
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--t-border)" }}>
            {ROLES.map((role) => (
              <button key={role.id} onClick={() => setSelected(role.id)}
                className={cn("w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors",
                  selected === role.id ? "bg-[var(--luxe-accent-2)]" : "hover:bg-[var(--t-hover)]"
                )}>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border", colorStyles[role.color])}>
                  <Shield className={cn("w-4 h-4", colorStyles[role.color].split(" ")[1])} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="t-text-70 text-xs font-semibold truncate">{role.name}</p>
                  <p className="t-text-30 text-[10px] mt-0.5">{role.users} users</p>
                </div>
                <MoreHorizontal className="w-4 h-4 t-text-30 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Role detail */}
        {selectedRole && (
          <div className="xl:col-span-2 space-y-3">
            <div className="panel p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", colorStyles[selectedRole.color])}>
                    <Shield className={cn("w-5 h-5", colorStyles[selectedRole.color].split(" ")[1])} />
                  </div>
                  <div>
                    <h3 className="t-text font-semibold text-sm">{selectedRole.name}</h3>
                    <p className="t-text-40 text-xs mt-0.5">{selectedRole.users} users assigned</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg border t-text-40 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg border text-red-400 hover:bg-red-500/10 transition-colors" style={{ borderColor: "var(--t-border-2)" }}><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="t-text-50 text-xs leading-relaxed">{selectedRole.description}</p>

              <div>
                <h4 className="t-text-40 text-xs font-semibold uppercase tracking-wide mb-3">Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_PERMISSIONS.map((perm) => {
                    const has = selectedRole.permissions.includes(perm);
                    return (
                      <div key={perm} className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-xs", has ? "bg-emerald-500/5 border-emerald-500/20" : "border-[var(--t-border)]")}>
                        <CheckCircle2 className={cn("w-3.5 h-3.5 flex-shrink-0", has ? "text-emerald-400" : "t-text-20")} />
                        <span className={has ? "t-text-70" : "t-text-30"}>{perm}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="panel p-5 space-y-3">
              <h4 className="t-text font-semibold text-sm">Assigned Users</h4>
              <div className="flex items-center gap-2">
                {Array.from({ length: selectedRole.users }, (_, i) => (
                  <Avatar key={i} className="w-8 h-8 border-2" style={{ borderColor: "var(--luxe-sidebar)" }}>
                    <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-bold", avatarColors[i % avatarColors.length])}>
                      U{i + 1}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <button className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center t-text-30 hover:t-text-60 transition-colors" style={{ borderColor: "var(--t-border-2)" }}>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
