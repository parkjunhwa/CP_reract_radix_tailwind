"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  User, Mail, Phone, MapPin, Calendar, Shield,
  TrendingUp, ShoppingBag, Clock, Edit3, Camera,
  Key, LogOut, Star, Award, CheckCircle2, Save, Check,
} from "lucide-react";

const ACTIVITY = [
  { action: "Order approved", detail: "ORD-7821 · Patek Philippe · $142,000", time: "2 minutes ago", icon: CheckCircle2, color: "text-emerald-400" },
  { action: "Client upgraded", detail: "Mei Lin Zhang → promoted to Platinum tier", time: "34 minutes ago", icon: Star, color: "text-amber-400" },
  { action: "Invoice issued", detail: "INV-2026-0142 · James Worthington", time: "2 hours ago", icon: Award, color: "text-violet-400" },
  { action: "Settings updated", detail: "2FA enabled", time: "1 day ago", icon: Shield, color: "text-sky-400" },
  { action: "Report viewed", detail: "April monthly revenue report opened", time: "2 days ago", icon: TrendingUp, color: "text-emerald-400" },
];

const STATS = [
  { label: "Approved orders", value: "2,841", icon: ShoppingBag, color: "text-violet-400" },
  { label: "Managed clients", value: "284",   icon: User,        color: "text-sky-400"    },
  { label: "Processed this month", value: "147", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Avg. response time", value: "4m", icon: Clock,       color: "text-amber-400"  },
];

const ROLES = [
  { name: "Administrator", active: true  },
  { name: "Order Manager", active: true  },
  { name: "Analytics",     active: true  },
  { name: "Client Manager",active: true  },
  { name: "Finance",       active: false },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name:     "Junhwa Park",
    email:    "junhwa.park@gmail.com",
    phone:    "+82 10 1234 5678",
    location: "Seoul, South Korea",
    title:    "Administrator",
    bio:      "Senior administrator for LUXE Commerce. Responsible for approving high-value transactions and managing VIP client relationships.",
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-3 pb-0">
      {/* Profile hero card */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-2xl font-bold">
                JP
              </AvatarFallback>
            </Avatar>
            <button
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              style={{ backgroundColor: "var(--luxe-surface-2)", borderColor: "var(--luxe-bg)" }}
            >
              <Camera className="w-3.5 h-3.5" style={{ color: "var(--luxe-text-50)" }} aria-hidden="true" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold" style={{ color: "var(--luxe-text)" }}>{form.name}</h2>
              <Badge className="bg-violet-600/20 text-violet-300 border-violet-500/20 text-[10px]">Admin</Badge>
              {saved && (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" aria-hidden="true" /> Saved
                </Badge>
              )}
            </div>
            <p className="text-sm mb-3" style={{ color: "var(--luxe-text-40)" }}>{form.title}</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Mail,    val: form.email },
                { icon: Phone,   val: form.phone },
                { icon: MapPin,  val: form.location },
                { icon: Calendar,val: "Joined Mar 2019" },
              ].map(({ icon: Icon, val }) => (
                <div key={val} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" style={{ color: "var(--luxe-text-30)" }} />
                  <span className="text-xs" style={{ color: "var(--luxe-text-50)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <Save className="w-3.5 h-3.5" aria-hidden="true" /> Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                aria-label="Edit profile"
                className="px-4 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--luxe-border)" }}>
          {editing ? (
            <Form.Root>
              <Form.Field name="bio" className="space-y-1.5">
                <Form.Label asChild>
                  <Label className="text-xs font-medium" style={{ color: "var(--luxe-text-40)" }}>Bio</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Textarea
                    value={form.bio}
                    onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    className="text-sm resize-none"
                  />
                </Form.Control>
              </Form.Field>
            </Form.Root>
          ) : (
            <>
              <Label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--luxe-text-40)" }}>Bio</Label>
              <p className="text-sm leading-relaxed" style={{ color: "var(--luxe-text-50)" }}>{form.bio}</p>
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border p-4 flex items-center gap-3"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <Icon className={cn("w-5 h-5 flex-shrink-0", color)} aria-hidden="true" />
            <div>
              <p className="font-bold text-xl" style={{ color: "var(--luxe-text)" }}>{value}</p>
              <p className="text-xs" style={{ color: "var(--luxe-text-40)" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Personal info form */}
        <div
          className="lg:col-span-2 rounded-xl border p-6"
          style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
        >
          <h3 className="font-semibold text-sm mb-5" style={{ color: "var(--luxe-text)" }}>Personal information</h3>
          <Form.Root className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { label: "Name",     key: "name"     as const },
              { label: "Email",    key: "email"    as const },
              { label: "Title",    key: "title"    as const },
              { label: "Phone",    key: "phone"    as const },
              { label: "Location", key: "location" as const },
            ]).map(({ label, key }) => (
              <Form.Field key={key} name={key} className="space-y-1.5">
                <Form.Label asChild>
                  <Label htmlFor={`field-${key}`} className="text-xs" style={{ color: "var(--luxe-text-40)" }}>
                    {label}
                  </Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input
                    id={`field-${key}`}
                    value={form[key]}
                    onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                    readOnly={!editing}
                    className={cn("h-10 text-sm", !editing && "cursor-default border-transparent bg-transparent")}
                  />
                </Form.Control>
              </Form.Field>
            ))}
          </Form.Root>

          <Separator className="my-5" style={{ backgroundColor: "var(--luxe-border)" }} />

          {/* Security links */}
          <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--luxe-text)" }}>Security</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Change password", icon: Key, href: "/settings?tab=security" },
              { label: "Manage 2FA",      icon: Shield, href: "/settings?tab=security" },
              { label: "API keys",        icon: Key, href: "/settings?tab=api" },
            ].map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                style={{ borderColor: "var(--luxe-border-2)", color: "var(--luxe-text-50)" }}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          {/* Roles & Permissions */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--luxe-text)" }}>Roles & permissions</h3>
            <ul className="space-y-2" aria-label="Role list">
              {ROLES.map(role => (
                <li key={role.name} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--luxe-text-60)" }}>{role.name}</span>
                  <Badge className={cn(
                    "text-[10px] px-2 border",
                    role.active
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-[var(--t-input-bg)] t-text-40 border-[color:var(--t-border-2)]"
                  )}>
                    {role.active ? "Active" : "Inactive"}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent activity */}
          <div
            className="rounded-xl border flex flex-col"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "var(--luxe-border)" }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--luxe-border)" }}>
              <h3 className="font-semibold text-sm" style={{ color: "var(--luxe-text)" }}>Recent activity</h3>
            </div>
            <ul aria-label="Recent activity list">
              {ACTIVITY.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 px-5 py-3 transition-colors"
                    style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--luxe-border)" : "none" }}
                  >
                    <Icon className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0", a.color)} aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium" style={{ color: "var(--luxe-text-70, var(--luxe-text-60))" }}>{a.action}</p>
                      <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--luxe-text-40)" }}>{a.detail}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--luxe-text-30)" }}>
                        <time>{a.time}</time>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Danger zone */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "var(--luxe-surface)", borderColor: "rgba(239,68,68,0.2)" }}
          >
            <h3 className="font-semibold text-sm text-red-400 mb-3">Danger zone</h3>
            <button
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="Sign out of account"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
