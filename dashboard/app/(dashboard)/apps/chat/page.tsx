"use client";

import { useState } from "react";
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, Smile, Plus } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Contact {
  id: string; name: string; avatar: string; status: "online" | "away" | "offline";
  lastMessage: string; time: string; unread: number; color: string;
}

interface Message {
  id: string; sender: string; text: string; time: string; mine: boolean;
}

const CONTACTS: Contact[] = [
  { id: "c1", name: "Marcus Thompson", avatar: "MT", status: "online", lastMessage: "Confirmed for the AP Royal Oak meeting", time: "9:42", unread: 2, color: "from-violet-500 to-purple-700" },
  { id: "c2", name: "Sofia Marchetti", avatar: "SM", status: "online", lastMessage: "Invoice confirmed — thank you!", time: "8:15", unread: 0, color: "from-sky-500 to-blue-700" },
  { id: "c3", name: "Robert Chen", avatar: "RC", status: "away", lastMessage: "Q2 report is ready for review", time: "Yesterday", unread: 1, color: "from-emerald-500 to-teal-700" },
  { id: "c4", name: "Yuki Tanaka", avatar: "YT", status: "online", lastMessage: "Looking forward to the viewing!", time: "Yesterday", unread: 0, color: "from-amber-500 to-orange-700" },
  { id: "c5", name: "Elena Petrov", avatar: "EP", status: "offline", lastMessage: "Geneva shipment cleared customs", time: "Mon", unread: 0, color: "from-rose-500 to-pink-700" },
];

const MESSAGES: Message[] = [
  { id: "m1", sender: "Marcus Thompson", text: "Good morning! I wanted to confirm our meeting for the Audemars Piguet Royal Oak discussion.", time: "9:14 AM", mine: false },
  { id: "m2", sender: "me", text: "Good morning Marcus! Yes, confirmed for 2 PM today. I'll have all the documentation ready.", time: "9:18 AM", mine: true },
  { id: "m3", sender: "Marcus Thompson", text: "Perfect. The client from London is very interested. He's willing to pay above asking for the right piece.", time: "9:25 AM", mine: false },
  { id: "m4", sender: "me", text: "Excellent. We have two AP Royal Oak 41mm in platinum — both pristine condition with full papers. I'll prepare the certificates.", time: "9:27 AM", mine: true },
  { id: "m5", sender: "Marcus Thompson", text: "Confirmed for the AP Royal Oak meeting — see you at 2 PM. Should I bring the authentication reports as well?", time: "9:42 AM", mine: false },
];

const statusColors: Record<string, string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-slate-400",
};

export default function ChatPage() {
  const [selected, setSelected] = useState("c1");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const filtered = CONTACTS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));
  const activeContact = CONTACTS.find(c => c.id === selected);

  return (
    <div className="panel flex overflow-hidden" style={{ height: "calc(100vh - 140px)", minHeight: 600 }}>
      {/* Contacts */}
      <div className="w-72 flex-shrink-0 flex flex-col" style={{ borderRight: "1px solid var(--t-border)" }}>
        <div className="p-4 space-y-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
          <div className="flex items-center justify-between">
            <h3 className="t-text font-semibold text-sm">Messages</h3>
            <button aria-label="New message" className="p-1.5 rounded-md t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Plus className="w-4 h-4" /></button>
          </div>
          <Form.Root>
            <Form.Field name="search">
              <div className="flex items-center gap-2 h-8 px-3 rounded-lg border" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                <Search className="w-3 h-3 t-text-30" />
                <Form.Control asChild>
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search contacts…"
                    aria-label="Search contacts"
                    className="h-8 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                  />
                </Form.Control>
              </div>
            </Form.Field>
          </Form.Root>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((contact) => (
            <button key={contact.id} onClick={() => setSelected(contact.id)}
              className={cn("w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left border-b border-[var(--t-border)]",
                selected === contact.id ? "bg-[var(--luxe-accent-2)]" : "hover:bg-[var(--t-hover)]"
              )}>
              <div className="relative flex-shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-bold", contact.color)}>
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2", statusColors[contact.status])} style={{ borderColor: "var(--luxe-sidebar)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="t-text-70 text-xs font-semibold truncate">{contact.name}</span>
                  <span className="t-text-30 text-[10px] flex-shrink-0">{contact.time}</span>
                </div>
                <p className="t-text-40 text-[10px] truncate mt-0.5">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <span className="w-4 h-4 rounded-full text-[9px] text-white font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--t-accent)" }}>
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeContact && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: "1px solid var(--t-border)" }}>
              <div className="relative">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={cn("bg-gradient-to-br text-white text-xs font-bold", activeContact.color)}>
                    {activeContact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2", statusColors[activeContact.status])} style={{ borderColor: "var(--luxe-sidebar)" }} />
              </div>
              <div className="flex-1">
                <p className="t-text font-semibold text-sm">{activeContact.name}</p>
                <p className={cn("text-[10px] font-medium capitalize", activeContact.status === "online" ? "text-emerald-400" : activeContact.status === "away" ? "text-amber-400" : "t-text-30")}>
                  {activeContact.status}
                </p>
              </div>
              <button aria-label="Call" className="p-2 rounded-lg t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Phone className="w-4 h-4" /></button>
              <button aria-label="Video call" className="p-2 rounded-lg t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Video className="w-4 h-4" /></button>
              <button aria-label="More actions" className="p-2 rounded-lg t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {MESSAGES.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.mine ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[65%] rounded-2xl px-4 py-2.5 space-y-1",
                    msg.mine ? "rounded-br-sm text-white" : "rounded-bl-sm"
                  )}
                    style={msg.mine
                      ? { backgroundColor: "var(--t-accent)" }
                      : { backgroundColor: "var(--t-hover)", border: "1px solid var(--t-border)" }
                    }>
                    <p className={cn("text-xs leading-relaxed", msg.mine ? "text-white" : "t-text-70")}>{msg.text}</p>
                    <p className={cn("text-[10px]", msg.mine ? "text-white/60" : "t-text-30")}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4" style={{ borderTop: "1px solid var(--t-border)" }}>
              <Form.Root onSubmit={(e) => { e.preventDefault(); if (input.trim()) setInput(""); }}>
                <Form.Field name="message">
                  <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }}>
                    <button type="button" aria-label="Attach file" className="t-text-30 hover:t-text-70 transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <Form.Control asChild>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message…"
                        aria-label="Message"
                        className="h-8 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                      />
                    </Form.Control>
                    <button type="button" aria-label="Emoji" className="t-text-30 hover:t-text-70 transition-colors"><Smile className="w-4 h-4" /></button>
                    <Form.Submit asChild>
                      <button
                        aria-label="Send message"
                        className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", input.trim() ? "text-white" : "t-text-30")}
                        style={input.trim() ? { backgroundColor: "var(--t-accent)" } : { backgroundColor: "var(--t-hover)" }}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </Form.Submit>
                  </div>
                </Form.Field>
              </Form.Root>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
