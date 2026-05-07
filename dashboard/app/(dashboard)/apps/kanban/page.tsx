"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Clock, User, Tag, CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Priority = "high" | "medium" | "low";
type Column = "todo" | "in_progress" | "review" | "done";

interface KanbanCard {
  id: string; title: string; description: string;
  priority: Priority; column: Column;
  assignee: string; avatar: string; avatarColor: string;
  labels: string[]; dueDate: string; tasks: number; doneTasks: number;
}

const CARDS: KanbanCard[] = [
  { id: "k1", title: "Patek Philippe Catalog Update", description: "Update product listings with new 2026 Nautilus models including detailed specifications.", priority: "high", column: "todo", assignee: "James C.", avatar: "JC", avatarColor: "from-violet-500 to-purple-700", labels: ["Products", "Catalog"], dueDate: "May 10", tasks: 5, doneTasks: 0 },
  { id: "k2", title: "Q2 Client Outreach Campaign", description: "Plan and execute targeted outreach for UHNW clients across Asia-Pacific region.", priority: "high", column: "todo", assignee: "Sofia L.", avatar: "SL", avatarColor: "from-sky-500 to-blue-700", labels: ["Marketing", "CRM"], dueDate: "May 15", tasks: 8, doneTasks: 2 },
  { id: "k3", title: "Invoice Automation System", description: "Implement automated invoice generation and approval workflow for high-value orders.", priority: "medium", column: "in_progress", assignee: "Robert C.", avatar: "RC", avatarColor: "from-emerald-500 to-teal-700", labels: ["Dev", "Finance"], dueDate: "May 12", tasks: 12, doneTasks: 7 },
  { id: "k4", title: "Authentication Protocol Update", description: "Update watch authentication procedures with new NFC certification standards.", priority: "high", column: "in_progress", assignee: "Aisha J.", avatar: "AJ", avatarColor: "from-amber-500 to-orange-700", labels: ["Operations"], dueDate: "May 8", tasks: 6, doneTasks: 4 },
  { id: "k5", title: "Fleet GPS Integration", description: "Integrate real-time GPS tracking into the logistics dashboard for all vehicles.", priority: "medium", column: "review", assignee: "Chen W.", avatar: "CW", avatarColor: "from-rose-500 to-pink-700", labels: ["Dev", "Logistics"], dueDate: "May 9", tasks: 9, doneTasks: 9 },
  { id: "k6", title: "Market Report — Rare Spirits", description: "Comprehensive analysis of rare spirits market trends for H1 2026.", priority: "low", column: "review", assignee: "Elena P.", avatar: "EP", avatarColor: "from-fuchsia-500 to-purple-700", labels: ["Research", "Report"], dueDate: "May 11", tasks: 4, doneTasks: 4 },
  { id: "k7", title: "Hermès Partnership Agreement", description: "Finalize exclusive partnership terms with Hermès for Birkin collection distribution.", priority: "high", column: "done", assignee: "Marcus T.", avatar: "MT", avatarColor: "from-cyan-500 to-teal-700", labels: ["Legal", "Business Dev"], dueDate: "May 5", tasks: 7, doneTasks: 7 },
  { id: "k8", title: "Warehouse Security Upgrade", description: "Install new biometric access system and upgraded surveillance for storage facilities.", priority: "medium", column: "done", assignee: "Yuki T.", avatar: "YT", avatarColor: "from-indigo-500 to-violet-700", labels: ["Operations", "Security"], dueDate: "May 4", tasks: 10, doneTasks: 10 },
];

const columns: { id: Column; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "text-slate-400" },
  { id: "in_progress", label: "In Progress", color: "text-violet-400" },
  { id: "review", label: "Review", color: "text-amber-400" },
  { id: "done", label: "Done", color: "text-emerald-400" },
];

const priorityConfig: Record<Priority, { label: string; cls: string; icon: React.ElementType }> = {
  high:   { label: "High",   cls: "text-red-400 border-red-500/20 bg-red-500/10", icon: AlertTriangle },
  medium: { label: "Medium", cls: "text-amber-400 border-amber-500/20 bg-amber-500/10", icon: Clock },
  low:    { label: "Low",    cls: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10", icon: Circle },
};

const labelColors = [
  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "bg-rose-500/10 text-rose-400 border-rose-500/20",
];

export default function KanbanPage() {
  const [cards, setCards] = useState(CARDS);

  const getColumnCards = (col: Column) => cards.filter(c => c.column === col);

  return (
    <div className="pb-4">
      <div className="flex gap-4 overflow-x-auto pb-2" style={{ minHeight: "calc(100vh - 160px)" }}>
        {columns.map((col) => {
          const colCards = getColumnCards(col.id);
          return (
            <div key={col.id} className="flex-shrink-0 w-72 flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {col.id === "todo" && <Circle className={cn("w-4 h-4", col.color)} />}
                  {col.id === "in_progress" && <Clock className={cn("w-4 h-4", col.color)} />}
                  {col.id === "review" && <AlertTriangle className={cn("w-4 h-4", col.color)} />}
                  {col.id === "done" && <CheckCircle2 className={cn("w-4 h-4", col.color)} />}
                  <span className="t-text-70 text-sm font-semibold">{col.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full t-text-40" style={{ backgroundColor: "var(--t-hover)" }}>{colCards.length}</span>
                </div>
                <button className="p-1 rounded t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"><Plus className="w-4 h-4" /></button>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {colCards.map((card) => {
                  const { label: pLabel, cls: pCls, icon: PIcon } = priorityConfig[card.priority];
                  const taskPct = card.tasks > 0 ? Math.round((card.doneTasks / card.tasks) * 100) : 0;
                  return (
                    <div key={card.id} className="panel p-4 space-y-3 cursor-grab hover:ring-1 hover:ring-[var(--t-accent)] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="t-text-80 text-xs font-semibold leading-snug">{card.title}</h4>
                        <button className="t-text-30 hover:t-text-70 transition-colors flex-shrink-0"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                      </div>
                      <p className="t-text-40 text-[10px] leading-relaxed">{card.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {card.labels.map((lbl, i) => (
                          <span key={lbl} className={cn("text-[9px] px-1.5 py-0.5 rounded border", labelColors[i % labelColors.length])}>
                            {lbl}
                          </span>
                        ))}
                      </div>
                      {card.tasks > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px]">
                            <span className="t-text-30 flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" />{card.doneTasks}/{card.tasks} tasks</span>
                            <span className="t-text-40 font-semibold">{taskPct}%</span>
                          </div>
                          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--t-border)" }}>
                            <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400" style={{ width: `${taskPct}%` }} />
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className={cn("bg-gradient-to-br text-white text-[8px] font-bold", card.avatarColor)}>
                              {card.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="t-text-40 text-[10px]">{card.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={cn("flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded border", pCls)}>
                            <PIcon className="w-2.5 h-2.5" />{pLabel}
                          </div>
                          <div className="flex items-center gap-1 t-text-30 text-[9px]">
                            <Clock className="w-2.5 h-2.5" />{card.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add card button */}
              <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed text-xs t-text-30 hover:t-text-60 hover:bg-[var(--t-hover)] transition-colors"
                style={{ borderColor: "var(--t-border-2)" }}>
                <Plus className="w-3.5 h-3.5" /> Add card
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
