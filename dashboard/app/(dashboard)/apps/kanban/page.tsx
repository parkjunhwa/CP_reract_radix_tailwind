"use client";

import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { useKanbanState } from "@/components/kanban/kanban-store";

export default function KanbanPage() {
  const { state, setState } = useKanbanState();

  return (
    <KanbanBoard state={state} setState={setState} />
  );
}
