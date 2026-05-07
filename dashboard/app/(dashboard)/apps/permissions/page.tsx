"use client";

import { CheckCircle2, XCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = ["Administrator", "Sales Manager", "Inventory Editor", "Finance Viewer", "Logistics Coord."];

const PERMISSION_GROUPS = [
  {
    group: "Dashboard & Analytics",
    permissions: [
      { name: "View Dashboard", access: [true, true, true, true, true] },
      { name: "View Analytics", access: [true, true, false, true, false] },
      { name: "Export Reports", access: [true, true, false, true, false] },
    ],
  },
  {
    group: "Products",
    permissions: [
      { name: "View Products", access: [true, true, true, false, false] },
      { name: "Create Products", access: [true, false, true, false, false] },
      { name: "Edit Products", access: [true, false, true, false, false] },
      { name: "Delete Products", access: [true, false, false, false, false] },
    ],
  },
  {
    group: "Orders & Clients",
    permissions: [
      { name: "View Orders", access: [true, true, true, false, true] },
      { name: "Create Orders", access: [true, true, false, false, false] },
      { name: "Cancel Orders", access: [true, true, false, false, false] },
      { name: "View Clients", access: [true, true, false, false, false] },
      { name: "Manage Clients", access: [true, true, false, false, false] },
    ],
  },
  {
    group: "Finance",
    permissions: [
      { name: "View Invoices", access: [true, true, false, true, false] },
      { name: "Create Invoices", access: [true, true, false, false, false] },
      { name: "View Payments", access: [true, false, false, true, false] },
      { name: "Process Payments", access: [true, false, false, false, false] },
    ],
  },
  {
    group: "User Management",
    permissions: [
      { name: "View Users", access: [true, false, false, false, false] },
      { name: "Create Users", access: [true, false, false, false, false] },
      { name: "Manage Roles", access: [true, false, false, false, false] },
      { name: "Manage Permissions", access: [true, false, false, false, false] },
    ],
  },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-4 pb-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {ROLES.map((role, i) => {
          const colors = ["text-violet-400", "text-sky-400", "text-emerald-400", "text-amber-400", "text-rose-400"];
          const totalPerms = PERMISSION_GROUPS.reduce((acc, g) => acc + g.permissions.length, 0);
          const grantedPerms = PERMISSION_GROUPS.reduce((acc, g) => acc + g.permissions.filter(p => p.access[i]).length, 0);
          return (
            <div key={role} className="panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className={cn("w-4 h-4", colors[i])} />
                <span className="t-text-60 text-xs font-semibold truncate">{role}</span>
              </div>
              <p className={cn("font-bold text-xl", colors[i])}>{grantedPerms}</p>
              <p className="t-text-30 text-[10px]">of {totalPerms} permissions</p>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                <div className="h-full rounded-full" style={{ width: `${(grantedPerms/totalPerms)*100}%`, backgroundColor: i === 0 ? "#7c3aed" : i === 1 ? "#0ea5e9" : i === 2 ? "#10b981" : i === 3 ? "#f59e0b" : "#f43f5e" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions matrix */}
      <div className="panel">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <h3 className="t-text font-semibold text-sm">Permission Matrix</h3>
          <p className="t-text-40 text-xs mt-0.5">Access control by role and feature</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                <th className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3 w-52">Permission</th>
                {ROLES.map((r) => (
                  <th key={r} className="text-center text-[10px] font-medium t-text-40 px-3 py-3 min-w-[120px]">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_GROUPS.map((group) => (
                <>
                  <tr key={`group-${group.group}`} style={{ backgroundColor: "var(--t-hover)" }}>
                    <td colSpan={ROLES.length + 1} className="px-5 py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider t-text-40">{group.group}</span>
                    </td>
                  </tr>
                  {group.permissions.map((perm) => (
                    <tr key={perm.name} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                      <td className="px-5 py-3">
                        <span className="t-text-60 text-xs">{perm.name}</span>
                      </td>
                      {perm.access.map((allowed, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          {allowed
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                            : <XCircle className="w-4 h-4 t-text-20 mx-auto" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
