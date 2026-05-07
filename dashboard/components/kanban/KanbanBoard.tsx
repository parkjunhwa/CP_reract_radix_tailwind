"use client";

import { useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { KanbanColumn, KanbanState, KanbanTask } from "@/lib/kanban";
import { colId, parseColId, parseTaskId, taskId } from "@/components/kanban/kanban-ids";
import { KanbanColumnView } from "@/components/kanban/KanbanColumnView";
import { KanbanTaskCard } from "@/components/kanban/KanbanTaskCard";
import { KanbanDrawer } from "@/components/kanban/KanbanDrawer";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function getTaskIdsInOrder(state: KanbanState, column: KanbanColumn) {
  return column.taskIds.filter((id) => state.tasks.some((t) => t.id === id));
}

function findColumnByTaskId(state: KanbanState, taskNumericId: number) {
  return state.columns.find((c) => c.taskIds.includes(taskNumericId));
}

export function KanbanBoard({
  state,
  setState,
}: {
  state: KanbanState;
  setState: (next: KanbanState) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeTask = useMemo(() => {
    const tid = activeId ? parseTaskId(activeId) : null;
    if (!tid) return null;
    return state.tasks.find((t) => t.id === tid) ?? null;
  }, [activeId, state.tasks]);

  const columnIds = useMemo(() => state.columns.map((c) => colId(c.id)), [state.columns]);

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  };

  const onDragEnd = (e: DragEndEvent) => {
    const active = String(e.active.id);
    const over = e.over?.id ? String(e.over.id) : null;
    setActiveId(null);
    if (!over) return;
    if (active === over) return;

    // Column re-order
    const activeCol = parseColId(active);
    const overCol = parseColId(over);
    if (activeCol && overCol) {
      const oldIndex = state.columns.findIndex((c) => c.id === activeCol);
      const newIndex = state.columns.findIndex((c) => c.id === overCol);
      if (oldIndex === -1 || newIndex === -1) return;
      setState({ ...state, columns: arrayMove(state.columns, oldIndex, newIndex) });
      return;
    }

    // Task move/reorder
    const activeTaskId = parseTaskId(active);
    if (!activeTaskId) return;

    const overTaskId = parseTaskId(over);
    const overColumnId = overCol ?? (overTaskId ? findColumnByTaskId(state, overTaskId)?.id ?? null : null);
    const activeColumnId = findColumnByTaskId(state, activeTaskId)?.id ?? null;
    if (!activeColumnId || !overColumnId) return;

    const next = { ...state, columns: state.columns.map((c) => ({ ...c, taskIds: [...c.taskIds] })) };
    const fromCol = next.columns.find((c) => c.id === activeColumnId)!;
    const toCol = next.columns.find((c) => c.id === overColumnId)!;

    // Remove from source
    fromCol.taskIds = fromCol.taskIds.filter((id) => id !== activeTaskId);

    if (overTaskId) {
      const overIndex = toCol.taskIds.indexOf(overTaskId);
      const insertAt = overIndex === -1 ? toCol.taskIds.length : overIndex;
      toCol.taskIds.splice(insertAt, 0, activeTaskId);
    } else {
      // Dropped on empty column area
      toCol.taskIds.push(activeTaskId);
    }

    setState(next);
  };

  const updateTask = (id: number, patch: Partial<KanbanTask>) => {
    setState({ ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  };

  const deleteTask = (id: number) => {
    setState({
      ...state,
      tasks: state.tasks.filter((t) => t.id !== id),
      columns: state.columns.map((c) => ({ ...c, taskIds: c.taskIds.filter((x) => x !== id) })),
      currentTaskId: state.currentTaskId === id ? undefined : state.currentTaskId,
    });
  };

  const addColumn = (title: string) => {
    const nextId = Math.max(0, ...state.columns.map((c) => c.id)) + 1;
    setState({ ...state, columns: [...state.columns, { id: nextId, title: title.trim() || "New Column", taskIds: [] }] });
  };

  const editColumn = (id: number, title: string) => {
    setState({ ...state, columns: state.columns.map((c) => (c.id === id ? { ...c, title } : c)) });
  };

  const deleteColumn = (id: number) => {
    const col = state.columns.find((c) => c.id === id);
    if (!col) return;
    setState({
      ...state,
      columns: state.columns.filter((c) => c.id !== id),
      tasks: state.tasks.filter((t) => !col.taskIds.includes(t.id)),
      currentTaskId: col.taskIds.includes(state.currentTaskId ?? -1) ? undefined : state.currentTaskId,
    });
  };

  const addTask = (columnId: number, title: string) => {
    const nextId = Math.max(0, ...state.tasks.map((t) => t.id)) + 1;
    const task: KanbanTask = {
      id: nextId,
      title: title.trim() || "New task",
      badgeText: [],
      attachments: 0,
      comments: 0,
      assigned: [],
    };
    setState({
      ...state,
      tasks: [...state.tasks, task],
      columns: state.columns.map((c) => (c.id === columnId ? { ...c, taskIds: [...c.taskIds, nextId] } : c)),
    });
  };

  return (
    <div className="pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
          <div className="flex items-start gap-3 overflow-x-auto pb-0" style={{ minHeight: "calc(100vh - 160px)" }}>
            {state.columns.map((col) => {
              const ids = getTaskIdsInOrder(state, col).map(taskId);
              return (
                <SortableContext key={col.id} items={ids} strategy={verticalListSortingStrategy}>
                  <KanbanColumnView
                    column={col}
                    tasks={getTaskIdsInOrder(state, col).map((id) => state.tasks.find((t) => t.id === id)!).filter(Boolean)}
                    onAddTask={addTask}
                    onEditColumn={editColumn}
                    onDeleteColumn={deleteColumn}
                    onOpenTask={(task) => {
                      setState({ ...state, currentTaskId: task.id });
                      setDrawerOpen(true);
                    }}
                  />
                </SortableContext>
              );
            })}

            {/* New column */}
            <NewColumnButton onAdd={addColumn} />
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTask ? (
            <div className="w-72">
              <KanbanTaskCard task={activeTask} dragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Drawer */}
      {state.currentTaskId ? (
        (() => {
          const task = state.tasks.find((t) => t.id === state.currentTaskId);
          if (!task) return null;
          return (
            <KanbanDrawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              task={task}
              onUpdateTask={(patch) => updateTask(task.id, patch)}
              onDeleteTask={() => deleteTask(task.id)}
            />
          );
        })()
      ) : null}
    </div>
  );
}

function NewColumnButton({ onAdd }: { onAdd: (title: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex-shrink-0 w-72 rounded-xl border border-dashed p-3 text-left",
            "border-[color:var(--t-border-2)] bg-[color:var(--t-surface)] hover:bg-[color:var(--t-hover)] transition-colors",
          )}
        >
          <div className="flex items-center gap-2 t-text-60 text-sm font-medium">
            <Plus className="w-4 h-4" /> New column
          </div>
          <p className="t-text-40 text-xs mt-1.5">Add a new column to your board</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New column</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="new-col-title">Title</Label>
          <Input
            id="new-col-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Blocked"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onAdd(title);
              setTitle("");
              setOpen(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

