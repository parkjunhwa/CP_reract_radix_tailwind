"use client";

import { useMemo, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreHorizontal, Plus } from "lucide-react";

import type { KanbanColumn, KanbanTask } from "@/lib/kanban";
import { colId, taskId } from "@/components/kanban/kanban-ids";
import { KanbanTaskCard } from "@/components/kanban/KanbanTaskCard";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function KanbanColumnView({
  column,
  tasks,
  onAddTask,
  onEditColumn,
  onDeleteColumn,
  onOpenTask,
}: {
  column: KanbanColumn;
  tasks: KanbanTask[];
  onAddTask: (columnId: number, title: string) => void;
  onEditColumn: (columnId: number, title: string) => void;
  onDeleteColumn: (columnId: number) => void;
  onOpenTask: (task: KanbanTask) => void;
}) {
  const sortableId = colId(column.id);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Drop zone for empty column (so tasks can be dropped onto the column body)
  const dropId = sortableId;
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: dropId });

  const taskIds = useMemo(() => tasks.map((t) => taskId(t.id)), [tasks]);

  const [newOpen, setNewOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex-shrink-0 w-72 flex flex-col gap-3",
        isDragging && "opacity-70",
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            className="p-1 rounded hover:bg-[var(--t-hover)] transition-colors t-text-40"
            aria-label="Reorder column"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <span className="t-text-70 text-sm font-semibold truncate">{column.title}</span>
          <span
            className={cn("text-[10px] px-1.5 py-0.5 rounded-full t-text-40", isOver && "ring-1 ring-[var(--t-accent)]")}
            style={{ backgroundColor: "var(--t-hover)" }}
          >
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* New task */}
          <Dialog open={newOpen} onOpenChange={setNewOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="p-1 rounded t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"
                aria-label="Add task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New task</DialogTitle>
              </DialogHeader>
              <div className="space-y-1.5">
                <Label htmlFor={`new-task-${column.id}`}>Title</Label>
                <Input
                  id={`new-task-${column.id}`}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Update contract terms"
                  autoFocus
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    onAddTask(column.id, newTitle);
                    setNewTitle("");
                    setNewOpen(false);
                  }}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Column menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1 rounded t-text-30 hover:t-text-70 hover:bg-[var(--t-hover)] transition-colors"
                aria-label="Column options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => { setEditTitle(column.title); setEditOpen(true); }}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => onDeleteColumn(column.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Rename dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename column</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor={`col-title-${column.id}`}>Title</Label>
            <Input
              id={`col-title-${column.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                onEditColumn(column.id, editTitle.trim() || column.title);
                setEditOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cards */}
      <div ref={setDropRef} className={cn("flex flex-col gap-2 min-h-6", isOver && "outline outline-1 outline-[var(--t-accent)]/40 rounded-xl")}>
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              onClick={() => onOpenTask(task)}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add task button */}
      <button
        type="button"
        onClick={() => setNewOpen(true)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed text-xs t-text-40 hover:t-text-60 hover:bg-[var(--t-hover)] transition-colors"
        style={{ borderColor: "var(--t-border-2)" }}
      >
        <Plus className="w-3.5 h-3.5" /> Add task
      </button>
    </div>
  );
}

