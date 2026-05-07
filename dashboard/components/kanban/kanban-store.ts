"use client";

import { useEffect, useMemo, useState } from "react";

import { KANBAN_SEED, KANBAN_STORAGE_KEY, safeParseKanban, type KanbanState } from "@/lib/kanban";

export function useKanbanState() {
  const [state, setState] = useState<KanbanState>(() => KANBAN_SEED);

  // Load once on mount (client only)
  useEffect(() => {
    const parsed = safeParseKanban(localStorage.getItem(KANBAN_STORAGE_KEY));
    if (parsed) setState(parsed);
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(KANBAN_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const taskById = useMemo(() => {
    const m = new Map<number, KanbanState["tasks"][number]>();
    for (const t of state.tasks) m.set(t.id, t);
    return m;
  }, [state.tasks]);

  const currentTask = state.currentTaskId ? taskById.get(state.currentTaskId) : undefined;

  return { state, setState, currentTask, taskById };
}

