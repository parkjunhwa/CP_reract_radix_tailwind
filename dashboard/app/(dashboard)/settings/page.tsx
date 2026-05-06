"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { User, Shield, Bell, CreditCard, Key, Globe, Palette, Save, Eye, EyeOff, Check } from "lucide-react";

const TABS = [
  { id:"profile",  label:"Profile",       icon:User },
  { id:"security", label:"Security",      icon:Shield },
  { id:"notifications", label:"Alerts",   icon:Bell },
  { id:"billing",  label:"Billing",       icon:CreditCard },
  { id:"api",      label:"API Keys",      icon:Key },
  { id:"appearance", label:"Appearance",  icon:Palette },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v:boolean)=>void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={cn("relative w-9 h-5 rounded-full transition-colors flex-shrink-0", checked ? "bg-violet-600" : "bg-white/10")}>
      <span className={cn("absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform", checked && "translate-x-4")} />
    </button>
  );
}

function Field({ label, desc, children }: { label:string; desc?:string; children:React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm font-medium">{label}</p>
        {desc && <p className="text-white/35 text-xs mt-0.5">{desc}</p>}
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

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/25 outline-none focus:border-violet-500/50 transition-colors";

  return (
    <div className="flex gap-6 pb-6">
      {/* Sidebar tabs */}
      <div className="w-48 flex-shrink-0">
        <div className="rounded-xl border border-white/8 bg-[#0d0d18] p-2 flex flex-col gap-1">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={cn("flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                  tab===t.id ? "bg-violet-600/20 text-violet-300" : "text-white/40 hover:text-white/80 hover:bg-white/5")}>
                <Icon className="w-4 h-4 flex-shrink-0" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
          {tab === "profile" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold text-base">Profile Information</h3>
                <p className="text-white/35 text-xs mt-0.5">Update your personal details and public profile</p>
              </div>
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-xl font-bold">JP</AvatarFallback>
                </Avatar>
                <div>
                  <button className="px-3 py-1.5 rounded-lg border border-white/15 text-white/60 hover:text-white text-xs transition-colors">Change photo</button>
                  <p className="text-white/25 text-[11px] mt-1.5">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <Separator className="bg-white/5" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:"Full Name", key:"name" as const },
                  { label:"Email Address", key:"email" as const },
                  { label:"Job Title", key:"title" as const },
                  { label:"Company", key:"company" as const },
                  { label:"Phone Number", key:"phone" as const },
                ].map(f => (
                  <div key={f.key} className={f.key==="phone" ? "col-span-2 md:col-span-1" : ""}>
                    <label className="text-white/50 text-xs mb-1.5 block">{f.label}</label>
                    <input value={profile[f.key]} onChange={e=>setProfile(p=>({...p,[f.key]:e.target.value}))} className={inputCls} />
                  </div>
                ))}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Timezone</label>
                  <select value={profile.timezone} onChange={e=>setProfile(p=>({...p,timezone:e.target.value}))}
                    className={cn(inputCls, "cursor-pointer")}>
                    <option value="Asia/Seoul">Asia/Seoul (KST +9)</option>
                    <option value="America/New_York">America/New_York (EST -5)</option>
                    <option value="Europe/London">Europe/London (GMT 0)</option>
                    <option value="Europe/Paris">Europe/Paris (CET +1)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST +9)</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Language</label>
                  <select value={profile.language} onChange={e=>setProfile(p=>({...p,language:e.target.value}))}
                    className={cn(inputCls, "cursor-pointer")}>
                    <option>English</option><option>Korean</option><option>Japanese</option><option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab === "security" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold text-base">Security Settings</h3>
                <p className="text-white/35 text-xs mt-0.5">Manage your password and two-factor authentication</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Current Password</label>
                  <input type="password" placeholder="••••••••••••" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">New Password</label>
                    <input type="password" placeholder="Min. 12 characters" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Confirm Password</label>
                    <input type="password" placeholder="Repeat new password" className={inputCls} />
                  </div>
                </div>
              </div>
              <Separator className="bg-white/5" />
              <div>
                <h4 className="text-white/70 text-sm font-medium mb-3">Two-Factor Authentication</h4>
                <div className="divide-y divide-white/[0.04]">
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
              <Separator className="bg-white/5" />
              <div>
                <h4 className="text-white/70 text-sm font-medium mb-3">Active Sessions</h4>
                {[
                  { device:"MacBook Pro · Safari", location:"Seoul, KR", time:"Now", current:true },
                  { device:"iPhone 16 Pro · Mobile Safari", location:"Seoul, KR", time:"2h ago", current:false },
                ].map(s => (
                  <div key={s.device} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-white/70 text-xs font-medium">{s.device}</p>
                      <p className="text-white/30 text-[11px]">{s.location} · {s.time}</p>
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
                <h3 className="text-white font-semibold text-base">Notification Preferences</h3>
                <p className="text-white/35 text-xs mt-0.5">Choose how you receive business alerts</p>
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
                  <h4 className="text-white/50 text-xs uppercase tracking-wider mb-2 font-medium">{section}</h4>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] divide-y divide-white/[0.04]">
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
                <h3 className="text-white font-semibold text-base">Billing & Subscription</h3>
                <p className="text-white/35 text-xs mt-0.5">Manage your plan and payment methods</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 p-5 flex items-center justify-between">
                <div>
                  <Badge className="bg-violet-600/30 text-violet-300 border-violet-500/30 mb-2">Enterprise Plan</Badge>
                  <p className="text-white font-semibold text-lg">$2,400 / month</p>
                  <p className="text-white/40 text-xs mt-0.5">Unlimited users · 5TB storage · Priority support</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-white/15 text-white/60 hover:text-white text-xs transition-colors">Change Plan</button>
              </div>
              <div>
                <h4 className="text-white/70 text-sm font-medium mb-3">Payment Methods</h4>
                {[
                  { type:"Visa", last4:"4821", expiry:"12/28", primary:true },
                  { type:"Mastercard", last4:"9034", expiry:"08/27", primary:false },
                ].map(card => (
                  <div key={card.last4} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-md bg-white/8 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white/40" />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium">{card.type} ···· {card.last4}</p>
                        <p className="text-white/30 text-[11px]">Expires {card.expiry}</p>
                      </div>
                    </div>
                    {card.primary
                      ? <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[10px]">Primary</Badge>
                      : <button className="text-white/40 hover:text-white text-xs transition-colors">Set primary</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "api" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold text-base">API Keys</h3>
                <p className="text-white/35 text-xs mt-0.5">Manage API access for integrations</p>
              </div>
              {[
                { name:"Production Key", key:"lx_prod_sk_a3f8c2...9d12", created:"2025-01-15", lastUsed:"2 min ago", scope:"Full Access" },
                { name:"Read-Only Key", key:"lx_ro_sk_b7e1d4...3k89", created:"2025-08-22", lastUsed:"5h ago", scope:"Read Only" },
                { name:"Webhook Secret", key:"lx_whsec_c9a2f1...7m56", created:"2025-11-01", lastUsed:"1d ago", scope:"Webhooks" },
              ].map(apiKey => (
                <div key={apiKey.name} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white/80 text-sm font-medium">{apiKey.name}</p>
                      <p className="text-white/30 text-xs mt-0.5">Created {apiKey.created} · Last used {apiKey.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/5 text-white/40 border-white/10 text-[10px]">{apiKey.scope}</Badge>
                      <button className="text-red-400 hover:text-red-300 text-xs transition-colors">Revoke</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2 font-mono">
                    <span className="flex-1 text-white/40 text-xs">{showKey ? apiKey.key.replace("...","x7y8z9abc0def1") : apiKey.key}</span>
                    <button onClick={()=>setShowKey(!showKey)} className="text-white/30 hover:text-white transition-colors">
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 rounded-lg border border-dashed border-white/15 text-white/40 hover:text-white hover:border-white/30 text-sm transition-colors">
                + Generate New Key
              </button>
            </div>
          )}

          {tab === "appearance" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold text-base">Appearance</h3>
                <p className="text-white/35 text-xs mt-0.5">Customize the look and feel of your dashboard</p>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Theme</p>
                <div className="flex gap-3">
                  {[["dark","Dark"],["light","Light"],["system","System"]].map(([v,l]) => (
                    <button key={v} onClick={() => setAppearance(a=>({...a,theme:v}))}
                      className={cn("flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                        appearance.theme===v ? "border-violet-500/50 bg-violet-600/15 text-violet-300" : "border-white/8 text-white/40 hover:border-white/20")}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Density</p>
                <div className="flex gap-3">
                  {[["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]].map(([v,l]) => (
                    <button key={v} onClick={() => setAppearance(a=>({...a,density:v}))}
                      className={cn("flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                        appearance.density===v ? "border-violet-500/50 bg-violet-600/15 text-violet-300" : "border-white/8 text-white/40 hover:border-white/20")}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {[["violet","#7c3aed"],["emerald","#10b981"],["sky","#0ea5e9"],["amber","#f59e0b"],["rose","#f43f5e"]].map(([name,color]) => (
                    <button key={name} onClick={() => setAppearance(a=>({...a,accentColor:name}))}
                      className={cn("w-9 h-9 rounded-xl border-2 transition-all", appearance.accentColor===name ? "border-white scale-110" : "border-transparent")}
                      style={{ backgroundColor:color }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="px-6 py-4 border-t border-white/5 flex justify-end">
            <button onClick={save}
              className={cn("flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all",
                saved ? "bg-emerald-600 text-white" : "bg-violet-600 hover:bg-violet-500 text-white")}>
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
