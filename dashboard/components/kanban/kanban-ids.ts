export const colId = (id: number) => `col-${id}` as const;
export const taskId = (id: number) => `task-${id}` as const;

export function parseColId(value: string): number | null {
  if (!value.startsWith("col-")) return null;
  const n = Number(value.slice(4));
  return Number.isFinite(n) ? n : null;
}

export function parseTaskId(value: string): number | null {
  if (!value.startsWith("task-")) return null;
  const n = Number(value.slice(5));
  return Number.isFinite(n) ? n : null;
}

