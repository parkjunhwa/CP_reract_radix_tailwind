"use client";

import { useState } from "react";
import { Search, Star, Trash2, Archive, Tag, RefreshCcw, ChevronDown, Paperclip, Reply, Forward, MoreHorizontal, Inbox, Send, FileText, AlertCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Email {
  id: string; from: string; avatar: string; subject: string;
  preview: string; time: string; read: boolean; starred: boolean;
  label: "work" | "personal" | "vip" | null; hasAttachment: boolean;
}

const EMAILS: Email[] = [
  { id: "e1", from: "Marcus Thompson", avatar: "MT", subject: "Audemars Piguet Royal Oak — Acquisition Proposal", preview: "Dear Team, I wanted to follow up on our discussion regarding the Royal Oak collection. The client from London has confirmed his interest in...", time: "9:42 AM", read: false, starred: true, label: "vip", hasAttachment: true },
  { id: "e2", from: "Sofia Marchetti", avatar: "SM", subject: "Invoice #4987 — Payment Confirmation", preview: "Please find attached the payment confirmation for invoice #4987 regarding the Cartier Diamond Necklace. Transfer has been initiated...", time: "8:15 AM", read: false, starred: false, label: "work", hasAttachment: true },
  { id: "e3", from: "Robert Chen", avatar: "RC", subject: "Q2 Luxury Watch Market Report", preview: "Attached is the comprehensive Q2 report on the secondary luxury watch market. Key insights include a 22% surge in Richard Mille valuations...", time: "Yesterday", read: true, starred: true, label: "work", hasAttachment: true },
  { id: "e4", from: "Yuki Tanaka", avatar: "YT", subject: "Private Viewing — Chanel Haute Joaillerie", preview: "I would like to invite you to an exclusive private viewing of our new Chanel Haute Joaillerie collection. The event will be held at our...", time: "Yesterday", read: true, starred: false, label: "vip", hasAttachment: false },
  { id: "e5", from: "Elena Petrov", avatar: "EP", subject: "Customs Clearance — Geneva Shipment", preview: "The Geneva shipment containing the Vintage Bordeaux Collection has cleared customs. Expected delivery to the client warehouse is...", time: "Mon", read: true, starred: false, label: "work", hasAttachment: false },
  { id: "e6", from: "Carlos Ruiz", avatar: "CR", subject: "Rolex Daytona — Authentication Complete", preview: "We are pleased to inform you that the Rolex Daytona White Gold reference 116519LN has passed all authentication checks. Serial number...", time: "Mon", read: true, starred: false, label: "work", hasAttachment: true },
  { id: "e7", from: "Isabelle Fontaine", avatar: "IF", subject: "Re: Van Cleef & Arpels Partnership", preview: "Thank you for your detailed proposal. The Van Cleef & Arpels partnership terms look promising. I'll have our legal team review the...", time: "Sun", read: true, starred: false, label: "personal", hasAttachment: false },
];

const labelConfig = {
  work:     { label: "Work",     cls: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  personal: { label: "Personal", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  vip:      { label: "VIP",      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

const AVATAR_COLORS = [
  "from-violet-500 to-purple-700", "from-sky-500 to-blue-700", "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-700", "from-rose-500 to-pink-700", "from-cyan-500 to-teal-700",
  "from-fuchsia-500 to-purple-700",
];

const folders = [
  { label: "Inbox", icon: Inbox, count: 3 },
  { label: "Sent", icon: Send, count: 0 },
  { label: "Drafts", icon: FileText, count: 2 },
  { label: "Spam", icon: AlertCircle, count: 1 },
  { label: "Trash", icon: Trash2, count: 0 },
];

export default function EmailPage() {
  const [selected, setSelected] = useState<string | null>("e1");
  const [starred, setStarred] = useState(new Set(EMAILS.filter(e => e.starred).map(e => e.id)));
  const [folder, setFolder] = useState("Inbox");
  const [search, setSearch] = useState("");

  const filtered = EMAILS.filter(e =>
    !search || e.from.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase())
  );
  const selectedEmail = EMAILS.find(e => e.id === selected);

  return (
    <div className="pb-4">
      <div className="panel flex overflow-hidden" style={{ height: "calc(100vh - 140px)", minHeight: 600 }}>
        {/* Left panel: folders */}
        <div className="w-48 flex-shrink-0 flex flex-col" style={{ borderRight: "1px solid var(--t-border)" }}>
          <div className="p-2">
            <button className="w-full h-9 rounded-lg text-white text-xs font-medium flex items-center justify-center gap-2" style={{ backgroundColor: "var(--t-accent)" }}>
              <Plus className="w-3.5 h-3.5" /> Compose
            </button>
          </div>
          <nav className="px-2 space-y-0.5">
            {folders.map((f) => {
              const Icon = f.icon;
              return (
                <button key={f.label} onClick={() => setFolder(f.label)}
                  className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    folder === f.label ? "bg-[var(--luxe-accent-2)] text-[var(--t-accent-text)]" : "t-text-40 hover:bg-[var(--t-hover)]"
                  )}>
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{f.label}</span>
                  {f.count > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--t-accent-soft)", color: "var(--t-accent-text)" }}>{f.count}</span>}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 px-2">
            <p className="text-[10px] font-medium uppercase tracking-wide px-3 mb-1 opacity-30" style={{ color: "var(--luxe-text)" }}>Labels</p>
            {Object.entries(labelConfig).map(([key, val]) => (
              <button key={key} className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs t-text-40 hover:bg-[var(--t-hover)] transition-colors">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: key === "vip" ? "#f59e0b" : key === "work" ? "#0ea5e9" : "#10b981" }} />
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="w-72 flex-shrink-0 flex flex-col" style={{ borderRight: "1px solid var(--t-border)" }}>
          <div className="p-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
            <div className="flex items-center gap-2 h-8 px-3 rounded-lg border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
              <Search className="w-3 h-3 t-text-30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search emails…"
                className="flex-1 bg-transparent text-xs outline-none text-[color:var(--t-text-70)] placeholder:text-[color:var(--t-text-30)]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((email, i) => (
              <div key={email.id} onClick={() => setSelected(email.id)}
                className={cn("px-4 py-3.5 cursor-pointer transition-colors border-b border-[var(--t-border)]",
                  selected === email.id ? "bg-[var(--luxe-accent-2)]" : "hover:bg-[var(--t-hover)]"
                )}>
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={cn("bg-gradient-to-br text-white text-[10px] font-bold", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                      {email.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-1">
                      <span className={cn("text-xs truncate", email.read ? "t-text-60" : "t-text font-semibold")}>{email.from}</span>
                      <span className="t-text-30 text-[10px] flex-shrink-0">{email.time}</span>
                    </div>
                    <p className={cn("text-xs truncate mt-0.5", email.read ? "t-text-50" : "t-text-70 font-medium")}>{email.subject}</p>
                    <p className="t-text-30 text-[10px] truncate mt-0.5">{email.preview}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {!email.read && <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
                      {email.hasAttachment && <Paperclip className="w-2.5 h-2.5 t-text-30" />}
                      {email.label && <Badge className={cn("text-[9px] px-1.5 py-0 border h-4", labelConfig[email.label].cls)}>{labelConfig[email.label].label}</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email content */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedEmail ? (
            <>
              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
                <button className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Archive className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Trash2 className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Tag className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><RefreshCcw className="w-4 h-4" /></button>
                <div className="flex-1" />
                <button onClick={() => setStarred(prev => { const n = new Set(prev); n.has(selectedEmail.id) ? n.delete(selectedEmail.id) : n.add(selectedEmail.id); return n; })}
                  className={cn("p-1.5 rounded-md transition-colors", starred.has(selectedEmail.id) ? "text-amber-400" : "t-text-30 hover:text-amber-400")}>
                  <Star className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <h2 className="t-text font-semibold text-base">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-bold", AVATAR_COLORS[EMAILS.indexOf(selectedEmail) % AVATAR_COLORS.length])}>
                      {selectedEmail.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <span className="t-text-70 text-sm font-semibold">{selectedEmail.from}</span>
                      <span className="t-text-30 text-xs">{selectedEmail.time}</span>
                    </div>
                    <p className="t-text-30 text-xs">to me</p>
                  </div>
                </div>
                <div className="t-text-60 text-sm leading-relaxed space-y-3">
                  <p>{selectedEmail.preview}</p>
                  <p>We look forward to finalizing the details at your earliest convenience. Please don't hesitate to reach out if you need any additional information or documentation.</p>
                  <p>Best regards,<br />{selectedEmail.from}</p>
                </div>
                {selectedEmail.hasAttachment && (
                  <div className="rounded-lg border p-3 flex items-center gap-3" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}>
                    <Paperclip className="w-4 h-4 t-text-40" />
                    <div>
                      <p className="t-text-70 text-xs font-medium">Document.pdf</p>
                      <p className="t-text-30 text-[10px]">2.4 MB</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-[var(--t-border)] flex items-center gap-2">
                <button className="h-9 px-4 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors hover:bg-[var(--t-hover)] t-text-60" style={{ borderColor: "var(--t-border-2)" }}>
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
                <button className="h-9 px-4 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors hover:bg-[var(--t-hover)] t-text-60" style={{ borderColor: "var(--t-border-2)" }}>
                  <Forward className="w-3.5 h-3.5" /> Forward
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center t-text-30 text-sm">Select an email to read</div>
          )}
        </div>
      </div>
    </div>
  );
}
