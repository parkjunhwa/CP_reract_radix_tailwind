"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { User, Shield, Bell, CreditCard, Key, Palette, Save, Eye, EyeOff, Check } from "lucide-react";

const TABS = [
  { id:"profile",  label:"Profile",       icon:User },
  { id:"security", label:"Security",      icon:Shield },
  { id:"notifications", label:"Alerts",   icon:Bell },
  { id:"billing",  label:"Billing",       icon:CreditCard },
  { id:"api",      label:"API Keys",      icon:Key },
  { id:"appearance", label:"Appearance",  icon:Palette },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />;
}

function Field({ label, desc, children }: { label:string; desc?:string; children:React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex-1 min-w-0">
        <p className="t-text-80 text-sm font-medium">{label}</p>
        {desc && <p className="t-text-40 text-xs mt-0.5">{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({ name:"Junhwa Park", email:"junhwa.park@gmail.com", title:"Administrator", company:"LUXE Commerce", phone:"+82 10 1234 5678", timezone:"Asia/Seoul", language:"English" });
  const [alerts, setAlerts] = useState({ emailOrders:true, emailPayments:true, emailAlerts:true, pushOrders:false, pushPayments:true, pushAlerts:true, weeklyReport:true, monthlyReport:true });
  const [appearance, setAppearance] = useState({ theme:"dark", density:"comfortable", accentColor:"violet" });

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex gap-4 pb-0">
      {/* Sidebar tabs */}
      <div className="w-48 shrink-0 self-stretch">
        <div className="panel h-full p-2 flex flex-col gap-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "group flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxe-accent)] focus-visible:ring-inset",
                  active
                    ? "bg-[var(--luxe-accent-2)] border"
                    : "hover:bg-[var(--t-hover)]"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "size-4 shrink-0 transition-colors",
                    active ? "t-accent-text" : "opacity-40 group-hover:opacity-70"
                  )}
                />
                <span className={cn(active ? "t-accent-text" : "t-text-40 group-hover:t-text-80")}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="panel">
          {tab === "profile" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">Profile Information</h3>
                <p className="t-text-40 text-xs mt-0.5">Update your personal details and public profile</p>
              </div>
              {/* Avatar */}
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-xl font-bold">JP</AvatarFallback>
                </Avatar>
                <div>
                  <button className="px-3 py-1.5 rounded-lg border text-xs transition-colors hover:bg-[var(--t-hover)]" style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-60)" }}>
                    Change photo
                  </button>
                  <p className="t-text-30 text-[11px] mt-1.5">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--t-border)" }} />
              <Form.Root className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name" as const },
                  { label: "Email Address", key: "email" as const },
                  { label: "Job Title", key: "title" as const },
                  { label: "Company", key: "company" as const },
                  { label: "Phone Number", key: "phone" as const },
                ].map((f) => (
                  <Form.Field key={f.key} name={f.key} className={cn("space-y-1.5", f.key === "phone" && "col-span-2 md:col-span-1")}>
                    <Form.Label asChild>
                      <Label htmlFor={`profile-${f.key}`}>{f.label}</Label>
                    </Form.Label>
                    <Form.Control asChild>
                      <Input
                        id={`profile-${f.key}`}
                        size="lg"
                        className="text-sm"
                        value={profile[f.key]}
                        onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                      />
                    </Form.Control>
                  </Form.Field>
                ))}
                <Form.Field name="timezone" className="space-y-1.5">
                  <Form.Label asChild>
                    <Label htmlFor="profile-timezone">Timezone</Label>
                  </Form.Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(v) => setProfile((p) => ({ ...p, timezone: v }))}
                  >
                    <SelectTrigger id="profile-timezone" className="w-full h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Seoul">Asia/Seoul (KST +9)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST -5)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT 0)</SelectItem>
                      <SelectItem value="Europe/Paris">Europe/Paris (CET +1)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST +9)</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Field>
                <Form.Field name="language" className="space-y-1.5">
                  <Form.Label asChild>
                    <Label htmlFor="profile-language">Language</Label>
                  </Form.Label>
                  <Select
                    value={profile.language}
                    onValueChange={(v) => setProfile((p) => ({ ...p, language: v }))}
                  >
                    <SelectTrigger id="profile-language" className="w-full h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </Form.Field>
              </Form.Root>
            </div>
          )}

          {tab === "security" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">Security Settings</h3>
                <p className="t-text-40 text-xs mt-0.5">Manage your password and two-factor authentication</p>
              </div>
              <Form.Root className="space-y-3">
                <Form.Field name="currentPassword" className="space-y-1.5">
                  <Form.Label asChild>
                    <Label htmlFor="security-current">Current Password</Label>
                  </Form.Label>
                  <Form.Control asChild>
                    <Input id="security-current" type="password" placeholder="••••••••••••" size="lg" className="text-sm" />
                  </Form.Control>
                </Form.Field>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Field name="newPassword" className="space-y-1.5">
                    <Form.Label asChild>
                      <Label htmlFor="security-new">New Password</Label>
                    </Form.Label>
                    <Form.Control asChild>
                      <Input id="security-new" type="password" placeholder="Min. 12 characters" size="lg" className="text-sm" />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field name="confirmPassword" className="space-y-1.5">
                    <Form.Label asChild>
                      <Label htmlFor="security-confirm">Confirm Password</Label>
                    </Form.Label>
                    <Form.Control asChild>
                      <Input id="security-confirm" type="password" placeholder="Repeat new password" size="lg" className="text-sm" />
                    </Form.Control>
                  </Form.Field>
                </div>
              </Form.Root>
              <Separator style={{ backgroundColor: "var(--t-border)" }} />
              <div>
                <h4 className="t-text-70 text-sm font-medium mb-3">Two-Factor Authentication</h4>
                <div className="t-divide">
                  <Field label="Authenticator App" desc="Use Google Authenticator or Authy">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">Enabled</Badge>
                  </Field>
                  <Field label="SMS Verification" desc="Backup via phone number +82 10 ****5678">
                    <Toggle checked={true} onChange={()=>{}} />
                  </Field>
                  <Field label="Login Notifications" desc="Email alert on new device sign-in">
                    <Toggle checked={true} onChange={()=>{}} />
                  </Field>
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--t-border)" }} />
              <div>
                <h4 className="t-text-70 text-sm font-medium mb-3">Active Sessions</h4>
                {[
                  { device:"MacBook Pro · Safari", location:"Seoul, KR", time:"Now", current:true },
                  { device:"iPhone 16 Pro · Mobile Safari", location:"Seoul, KR", time:"2h ago", current:false },
                ].map(s => (
                  <div key={s.device} className="flex items-center justify-between py-3 last:border-0" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <div>
                      <p className="t-text-70 text-xs font-medium">{s.device}</p>
                      <p className="t-text-30 text-[11px]">{s.location} · {s.time}</p>
                    </div>
                    {s.current
                      ? <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">Current</Badge>
                      : <button className="text-red-400 hover:text-red-300 text-xs transition-colors">Revoke</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">Notification Preferences</h3>
                <p className="t-text-40 text-xs mt-0.5">Choose how you receive business alerts</p>
              </div>
              {[
                { section:"Email Notifications", fields:[
                  { label:"New Orders", desc:"Receive email for each new order", key:"emailOrders" as const },
                  { label:"Payment Updates", desc:"Confirmations and failures", key:"emailPayments" as const },
                  { label:"Inventory Alerts", desc:"Low stock and out-of-stock warnings", key:"emailAlerts" as const },
                ]},
                { section:"Push Notifications", fields:[
                  { label:"New Orders", desc:"Browser push on new orders", key:"pushOrders" as const },
                  { label:"Payment Updates", desc:"Real-time payment alerts", key:"pushPayments" as const },
                  { label:"System Alerts", desc:"Platform status and maintenance", key:"pushAlerts" as const },
                ]},
                { section:"Reports", fields:[
                  { label:"Weekly Summary", desc:"Every Monday at 09:00 KST", key:"weeklyReport" as const },
                  { label:"Monthly Report", desc:"First Monday of each month", key:"monthlyReport" as const },
                ]},
              ].map(({ section, fields }) => (
                <div key={section}>
                  <h4 className="t-text-50 text-xs uppercase tracking-wider mb-2 font-medium">{section}</h4>
                  <div className="rounded-xl border t-divide" style={{ borderColor: "var(--t-border)" }}>
                    {fields.map(f => (
                      <div key={f.key} className="px-4">
                        <Field label={f.label} desc={f.desc}>
                          <Toggle checked={alerts[f.key]} onChange={v=>setAlerts(a=>({...a,[f.key]:v}))} />
                        </Field>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "billing" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">Billing & Subscription</h3>
                <p className="t-text-40 text-xs mt-0.5">Manage your plan and payment methods</p>
              </div>
              <div className="rounded-xl border border-violet-500/80 bg-violet-600/10 p-5 flex items-center justify-between">
                <div>
                  <Badge className="bg-violet-600/20 text-violet-500 border-violet-500/30 mb-2">Enterprise Plan</Badge>
                  <p className="text-violet-600 font-semibold text-lg">$2,400 / month</p>
                  <p className="t-text-40 text-xs mt-0.5">Unlimited users · 5TB storage · Priority support</p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg border text-xs transition-colors hover:bg-[var(--t-hover)]"
                  style={{ borderColor: "var(--t-border-2)", color: "var(--t-text-60)" }}
                >
                  Change Plan
                </button>
              </div>
              <div>
                <h4 className="t-text-70 text-sm font-medium mb-3">Payment Methods</h4>
                {[
                  { type:"Visa", last4:"4821", expiry:"12/28", primary:true },
                  { type:"Mastercard", last4:"9034", expiry:"08/27", primary:false },
                ].map(card => (
                  <div key={card.last4} className="flex items-center justify-between py-3 last:border-0" style={{ borderBottom: "1px solid var(--t-border)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: "var(--t-input-bg)" }}>
                        <CreditCard className="w-4 h-4 t-text-40" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="t-text-70 text-xs font-medium">{card.type} ···· {card.last4}</p>
                        <p className="t-text-30 text-[11px]">Expires {card.expiry}</p>
                      </div>
                    </div>
                    {card.primary
                      ? <Badge className="bg-violet-500/10 text-violet-500 border-violet-500/20 text-[10px]">Primary</Badge>
                      : <button className="t-text-40 hover:t-text text-xs transition-colors">Set primary</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "api" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">API Keys</h3>
                <p className="t-text-40 text-xs mt-0.5">Manage API access for integrations</p>
              </div>
              {[
                { name:"Production Key", key:"lx_prod_sk_a3f8c2...9d12", created:"2025-01-15", lastUsed:"2 min ago", scope:"Full Access" },
                { name:"Read-Only Key", key:"lx_ro_sk_b7e1d4...3k89", created:"2025-08-22", lastUsed:"5h ago", scope:"Read Only" },
                { name:"Webhook Secret", key:"lx_whsec_c9a2f1...7m56", created:"2025-11-01", lastUsed:"1d ago", scope:"Webhooks" },
              ].map(apiKey => (
                <div key={apiKey.name} className="rounded-xl border p-4" style={{ borderColor: "var(--t-border)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="t-text-80 text-sm font-medium">{apiKey.name}</p>
                      <p className="t-text-30 text-xs mt-0.5">Created {apiKey.created} · Last used {apiKey.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-[10px]" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)", color: "var(--t-text-40)" }}>{apiKey.scope}</Badge>
                      <button className="text-red-400 hover:text-red-300 text-xs transition-colors">Revoke</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 font-mono border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                    <span className="flex-1 t-text-40 text-xs">{showKey ? apiKey.key.replace("...","x7y8z9abc0def1") : apiKey.key}</span>
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      aria-label={showKey ? "Hide API key" : "Show API key"}
                      className="t-text-30 hover:t-text transition-colors"
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" aria-hidden="true" /> : <Eye className="w-3.5 h-3.5" aria-hidden="true" />}
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 rounded-lg border border-dashed text-sm transition-colors t-text-40 hover:t-text"
                style={{ borderColor: "var(--t-border-2)" }}
              >
                + Generate New Key
              </button>
            </div>
          )}

          {tab === "appearance" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="t-text font-semibold text-base">Appearance</h3>
                <p className="t-text-40 text-xs mt-0.5">Customize the look and feel of your dashboard</p>
              </div>
              <div>
                <p className="t-text-50 text-xs uppercase tracking-wider mb-3">Theme</p>
                <div className="flex gap-3">
                  {[["dark","Dark"],["light","Light"],["system","System"]].map(([v,l]) => (
                    <button key={v} onClick={() => setAppearance(a=>({...a,theme:v}))}
                      className={cn("flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                        appearance.theme===v ? "border-[color:var(--t-accent)] bg-[var(--luxe-accent-2)] t-accent-text" : "border-[color:var(--t-border-2)] t-text-40 hover:t-text")}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="t-text-50 text-xs uppercase tracking-wider mb-3">Density</p>
                <div className="flex gap-3">
                  {[["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]].map(([v,l]) => (
                    <button key={v} onClick={() => setAppearance(a=>({...a,density:v}))}
                      className={cn("flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                        appearance.density===v ? "border-[color:var(--t-accent)] bg-[var(--luxe-accent-2)] t-accent-text" : "border-[color:var(--t-border-2)] t-text-40 hover:t-text")}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="t-text-50 text-xs uppercase tracking-wider mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {[["violet","#7c3aed"],["emerald","#10b981"],["sky","#0ea5e9"],["amber","#f59e0b"],["rose","#f43f5e"]].map(([name,color]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setAppearance(a=>({...a,accentColor:name}))}
                      aria-label={`Use ${name} accent color`}
                      title={`Use ${name} accent color`}
                      className={cn("w-9 h-9 rounded-xl border-2 transition-all", appearance.accentColor===name ? "border-white scale-110" : "border-transparent")}
                      style={{ backgroundColor:color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="px-6 py-4 flex justify-end" style={{ borderTop: "1px solid var(--t-border)" }}>
            <Button
              size="lg"
              onClick={save}
              className={cn(
                "px-5 text-sm font-medium",
                saved
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700"
                  : "bg-violet-600 hover:bg-violet-500 text-white border-violet-700",
              )}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
