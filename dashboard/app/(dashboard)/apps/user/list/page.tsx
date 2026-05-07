"use client";

import { useState, useMemo } from "react";
import { Search, Plus, MoreHorizontal, UserCheck, UserX, Shield, Crown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type UserRole = "Admin" | "Manager" | "Editor" | "Viewer";
type UserStatus = "active" | "inactive" | "suspended";

interface AppUser {
  id: string; name: string; avatar: string; email: string;
  role: UserRole; status: UserStatus; joined: string;
  lastLogin: string; orders: number; color: string;
}

const USERS: AppUser[] = [
  { id: "u1", name: "James Worthington", avatar: "JW", email: "j.worthington@luxe.com", role: "Admin", status: "active", joined: "2024-01-15", lastLogin: "Today, 9:41 AM", orders: 187, color: "from-violet-500 to-purple-700" },
  { id: "u2", name: "Sofia Marchetti", avatar: "SM", email: "s.marchetti@luxe.com", role: "Manager", status: "active", joined: "2024-03-08", lastLogin: "Today, 8:22 AM", orders: 143, color: "from-sky-500 to-blue-700" },
  { id: "u3", name: "Robert Chen", avatar: "RC", email: "r.chen@luxe.com", role: "Editor", status: "active", joined: "2024-05-21", lastLogin: "Yesterday", orders: 89, color: "from-emerald-500 to-teal-700" },
  { id: "u4", name: "Yuki Tanaka", avatar: "YT", email: "y.tanaka@luxe.com", role: "Editor", status: "active", joined: "2024-07-03", lastLogin: "Yesterday", orders: 112, color: "from-amber-500 to-orange-700" },
  { id: "u5", name: "Elena Petrov", avatar: "EP", email: "e.petrov@luxe.com", role: "Viewer", status: "inactive", joined: "2024-09-14", lastLogin: "3 days ago", orders: 24, color: "from-rose-500 to-pink-700" },
  { id: "u6", name: "Carlos Ruiz", avatar: "CR", email: "c.ruiz@luxe.com", role: "Manager", status: "active", joined: "2024-02-28", lastLogin: "Today, 7:55 AM", orders: 201, color: "from-fuchsia-500 to-purple-700" },
  { id: "u7", name: "Isabelle Fontaine", avatar: "IF", email: "i.fontaine@luxe.com", role: "Editor", status: "active", joined: "2024-11-01", lastLogin: "2 days ago", orders: 67, color: "from-cyan-500 to-teal-700" },
  { id: "u8", name: "Marcus Thompson", avatar: "MT", email: "m.thompson@luxe.com", role: "Viewer", status: "suspended", joined: "2025-01-19", lastLogin: "5 days ago", orders: 3, color: "from-indigo-500 to-violet-700" },
];

const roleConfig: Record<UserRole, { cls: string; icon: React.ElementType }> = {
  Admin:   { cls: "bg-violet-500/10 text-violet-400 border-violet-500/20", icon: Crown },
  Manager: { cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", icon: Shield },
  Editor:  { cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: UserCheck },
  Viewer:  { cls: "bg-slate-500/10 text-slate-400 border-slate-500/20", icon: UserCheck },
};

const statusConfig: Record<UserStatus, { label: string; cls: string }> = {
  active:    { label: "Active",    cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  inactive:  { label: "Inactive",  cls: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  suspended: { label: "Suspended", cls: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

  const filtered = useMemo(() =>
    USERS.filter((u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    ), [search, roleFilter]);

  return (
    <div className="space-y-4 pb-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["Admin", "Manager", "Editor", "Viewer"] as UserRole[]).map((role) => {
          const { cls, icon: Icon } = roleConfig[role];
          return (
            <div key={role} className="panel p-4 flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border", cls.replace("text-", "bg-").split(" ")[0])}>
                <Icon className={cn("w-4 h-4", cls.split(" ")[1])} />
              </div>
              <div>
                <p className="t-text font-bold text-xl">{USERS.filter(u => u.role === role).length}</p>
                <p className="t-text-40 text-xs">{role}s</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg border flex-1 min-w-[200px]" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
            <Search className="w-3.5 h-3.5 t-text-30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…"
              className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
          </div>
          <div className="flex gap-1">
            {(["all", "Admin", "Manager", "Editor", "Viewer"] as const).map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={cn("px-3 h-9 rounded-lg text-xs font-medium transition-colors", roleFilter === r ? "text-white" : "t-text-40 border hover:bg-[var(--t-hover)]")}
                style={roleFilter === r ? { backgroundColor: "var(--t-accent)" } : { borderColor: "var(--t-border-2)" }}>
                {r === "all" ? "All" : r}
              </button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg text-white text-xs flex items-center gap-1.5 font-medium" style={{ backgroundColor: "var(--t-accent)" }}>
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--t-border)" }}>
                {["User", "Email", "Role", "Status", "Joined", "Last Login", "Orders", ""].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium t-text-30 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const { cls: rCls, icon: RIcon } = roleConfig[user.role];
                const { label: sLabel, cls: sCls } = statusConfig[user.status];
                return (
                  <tr key={user.id} className="t-hover transition-colors" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="w-7 h-7 flex-shrink-0">
                          <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-bold", user.color)}>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="t-text-70 text-xs font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{user.email}</span></td>
                    <td className="px-5 py-3.5">
                      <div className={cn("flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border w-fit", rCls)}>
                        <RIcon className="w-2.5 h-2.5" />{user.role}
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><Badge className={cn("text-[10px] px-2 border", sCls)}>{sLabel}</Badge></td>
                    <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{user.joined}</span></td>
                    <td className="px-5 py-3.5"><span className="t-text-40 text-xs">{user.lastLogin}</span></td>
                    <td className="px-5 py-3.5"><span className="t-text-50 text-xs">{user.orders}</span></td>
                    <td className="px-3 py-3.5">
                      <button className="t-text-30 hover:t-text-70 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span className="t-text-30 text-xs">{filtered.length} users</span>
        </div>
      </div>
    </div>
  );
}
