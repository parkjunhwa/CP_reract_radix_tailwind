"use client";

import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, Paperclip } from "lucide-react";

import type { KanbanTask } from "@/lib/kanban";
import { taskId } from "@/components/kanban/kanban-ids";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
}

const badgeColors = [
  "bg-violet-500/10 text-violet-500 border-violet-500/20",
  "bg-sky-500/10 text-sky-500 border-sky-500/20",
  "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "bg-rose-500/10 text-rose-500 border-rose-500/20",
];

export function KanbanTaskCard({
  task,
  onClick,
  dragging = false,
}: {
  task: KanbanTask;
  onClick?: () => void;
  dragging?: boolean;
}) {
  const id = taskId(task.id);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const badges = task.badgeText ?? [];
  const assigned = task.assigned ?? [];

  const due = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;

  const numbers = useMemo(
    () => ({ attachments: task.attachments ?? 0, comments: task.comments ?? 0 }),
    [task.attachments, task.comments],
  );

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={cn(
        "panel p-4 space-y-3 text-left",
        "hover:ring-1 hover:ring-[var(--t-accent)] transition-all",
        "cursor-grab active:cursor-grabbing",
        (isDragging || dragging) && "opacity-70",
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="t-text-80 text-xs font-semibold leading-snug">{task.title}</h4>
        {due ? <span className="t-text-30 text-[10px] whitespace-nowrap">{due}</span> : null}
      </div>

      {badges.length ? (
        <div className="flex flex-wrap gap-1">
          {badges.map((lbl, i) => (
            <span key={`${task.id}-${lbl}-${i}`} className={cn("text-[9px] px-1.5 py-0.5 rounded border", badgeColors[i % badgeColors.length])}>
              {lbl}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between pt-1">
        <div className="flex -space-x-1.5">
          {assigned.slice(0, 4).map((a) => (
            <Avatar key={a.name} className="w-5 h-5 ring-2 ring-[var(--t-surface)]">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-[8px] font-bold">
                {initials(a.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {assigned.length > 4 ? (
            <span className="w-5 h-5 rounded-full bg-[var(--t-hover)] ring-2 ring-[var(--t-surface)] text-[9px] t-text-40 flex items-center justify-center">
              +{assigned.length - 4}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2 t-text-30 text-[10px]">
          {numbers.attachments ? (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="w-3 h-3" /> {numbers.attachments}
            </span>
          ) : null}
          {numbers.comments ? (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> {numbers.comments}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}

