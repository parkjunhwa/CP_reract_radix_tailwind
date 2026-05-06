"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search, ChevronDown, ChevronRight, MessageSquare, BookOpen,
  Video, Mail, Phone, Plus, Send, CheckCircle2, Clock, AlertCircle,
} from "lucide-react";

const FAQS = [
  { q:"How do I process an international wire transfer?", a:"Navigate to Payments → New Payment, select Wire Transfer as the method. Ensure the client's SWIFT/BIC and IBAN are entered correctly. Transfers typically settle within 1–3 business days depending on the destination country.", cat:"Payments" },
  { q:"How can I upgrade a client's tier?", a:"Go to Clients → select the client → click Actions → Change Tier. Tier upgrades are based on lifetime value thresholds: Silver ($50K), Gold ($200K), Platinum ($500K). Manual overrides require admin approval.", cat:"Clients" },
  { q:"What happens when an order is cancelled?", a:"Cancellation triggers an automatic refund workflow. Wire transfers are reversed within 5–7 business days. The product inventory is automatically restocked. The client receives an email confirmation.", cat:"Orders" },
  { q:"How do I generate a custom invoice?", a:"Go to Invoices → New Invoice. Select the client, add line items, set payment terms, and choose the currency. PDF generation is automatic. You can customize the template in Settings → Appearance.", cat:"Invoices" },
  { q:"Can I export transaction data for accounting?", a:"Yes. In Payments, click Export and choose CSV or XLSX. You can filter by date range, transaction type, and status. Data includes all fields required for standard accounting software import.", cat:"Payments" },
  { q:"How do I manage API rate limits?", a:"The API allows 1,000 requests/minute for Enterprise plans. Rate limit headers (X-RateLimit-Remaining) are included in every response. Implement exponential backoff for 429 responses.", cat:"API" },
  { q:"How is product authenticity verified?", a:"Every product is authenticated through our 5-step verification process: provenance documentation, physical inspection, third-party appraiser report, serial number check, and digital certificate issuance.", cat:"Products" },
  { q:"What currencies are supported?", a:"We support 18 currencies: USD, EUR, GBP, CHF, JPY, HKD, SGD, AUD, CAD, AED, SAR, CNY, SEK, NOK, DKK, KRW, INR, BRL. Conversion rates update every 15 minutes.", cat:"Payments" },
];

const TICKETS = [
  { id:"TKT-0089", subject:"Wire transfer delay for ORD-7819", status:"open", priority:"high", created:"2026-05-05", updated:"2h ago" },
  { id:"TKT-0088", subject:"Custom invoice template request", status:"in_progress", priority:"medium", created:"2026-05-03", updated:"1d ago" },
  { id:"TKT-0087", subject:"API key regeneration needed", status:"resolved", priority:"low", created:"2026-04-28", updated:"3d ago" },
  { id:"TKT-0086", subject:"Client tier upgrade — manual override", status:"resolved", priority:"medium", created:"2026-04-20", updated:"1w ago" },
];

const STATUS_CFG: Record<string, { cls:string; icon:React.ElementType }> = {
  open:        { cls:"bg-red-500/10 text-red-400 border-red-500/20",        icon:AlertCircle },
  in_progress: { cls:"bg-amber-500/10 text-amber-400 border-amber-500/20",  icon:Clock },
  resolved:    { cls:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon:CheckCircle2 },
};

export default function HelpPage() {
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticket, setTicket] = useState({ subject:"", body:"", priority:"medium" });
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = FAQS.filter(f =>
    !faqSearch || f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.cat.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const submit = () => {
    if (ticket.subject && ticket.body) {
      setSubmitted(true);
      setTicket({ subject:"", body:"", priority:"medium" });
      setTimeout(()=>setSubmitted(false), 3000);
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/25 outline-none focus:border-violet-500/50 transition-colors";

  return (
    <div className="space-y-5 pb-6">
      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Documentation", desc:"Guides & API reference", icon:BookOpen, cls:"text-violet-400" },
          { label:"Video Tutorials", desc:"Step-by-step walkthroughs", icon:Video, cls:"text-sky-400" },
          { label:"Email Support", desc:"support@luxecommerce.co", icon:Mail, cls:"text-emerald-400" },
          { label:"Phone Support", desc:"+1 800 LUXE 247", icon:Phone, cls:"text-amber-400" },
        ].map(({ label, desc, icon: Icon, cls }) => (
          <button key={label} className="rounded-xl border border-white/8 bg-[#0d0d18] p-4 flex items-center gap-3 hover:border-white/20 transition-colors text-left">
            <Icon className={cn("w-5 h-5 flex-shrink-0", cls)} />
            <div>
              <p className="text-white/80 text-sm font-medium">{label}</p>
              <p className="text-white/35 text-xs mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* FAQ */}
        <div className="lg:col-span-3 rounded-xl border border-white/8 bg-[#0d0d18]">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-white font-semibold text-sm">Frequently Asked Questions</h3>
            <div className="flex items-center gap-2 mt-3 h-8 px-3 rounded-lg bg-white/5 border border-white/8">
              <Search className="w-3.5 h-3.5 text-white/30" />
              <input value={faqSearch} onChange={e=>setFaqSearch(e.target.value)} placeholder="Search FAQs…"
                className="flex-1 bg-transparent text-xs text-white placeholder:text-white/25 outline-none" />
            </div>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {filteredFaqs.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  className="w-full flex items-start justify-between gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left">
                  <div className="flex items-start gap-2">
                    <Badge className="bg-white/5 text-white/30 border-white/8 text-[10px] mt-0.5 flex-shrink-0">{faq.cat}</Badge>
                    <span className={cn("text-sm", openFaq===i ? "text-white" : "text-white/70")}>{faq.q}</span>
                  </div>
                  {openFaq===i ? <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" /> : <ChevronRight className="w-4 h-4 text-white/25 flex-shrink-0 mt-0.5" />}
                </button>
                {openFaq===i && (
                  <div className="px-5 pb-4">
                    <p className="text-white/50 text-sm leading-relaxed pl-16">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Submit ticket */}
          <div className="rounded-xl border border-white/8 bg-[#0d0d18] p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <h3 className="text-white font-semibold text-sm">Submit a Ticket</h3>
            </div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <p className="text-white/70 text-sm font-medium">Ticket submitted!</p>
                <p className="text-white/35 text-xs">We'll respond within 4 hours.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Subject</label>
                  <input value={ticket.subject} onChange={e=>setTicket(t=>({...t,subject:e.target.value}))}
                    placeholder="Describe the issue briefly" className={inputCls} />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Description</label>
                  <textarea value={ticket.body} onChange={e=>setTicket(t=>({...t,body:e.target.value}))}
                    placeholder="Provide details, order IDs, screenshots…" rows={4}
                    className={cn(inputCls, "resize-none")} />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Priority</label>
                  <select value={ticket.priority} onChange={e=>setTicket(t=>({...t,priority:e.target.value}))}
                    className={cn(inputCls, "cursor-pointer")}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High — Urgent</option>
                  </select>
                </div>
                <button onClick={submit}
                  className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Submit Ticket
                </button>
              </div>
            )}
          </div>

          {/* Recent tickets */}
          <div className="rounded-xl border border-white/8 bg-[#0d0d18]">
            <div className="px-5 py-4 border-b border-white/5">
              <h3 className="text-white font-semibold text-sm">My Tickets</h3>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {TICKETS.map(t => {
                const { cls, icon: Icon } = STATUS_CFG[t.status];
                return (
                  <div key={t.id} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-white/70 text-xs font-medium truncate">{t.subject}</p>
                        <p className="text-white/25 text-[11px] mt-0.5 font-mono">{t.id} · Updated {t.updated}</p>
                      </div>
                      <Badge className={cn("text-[10px] px-1.5 border flex items-center gap-1 flex-shrink-0", cls)}>
                        <Icon className="w-2.5 h-2.5" />{t.status.replace("_"," ")}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
