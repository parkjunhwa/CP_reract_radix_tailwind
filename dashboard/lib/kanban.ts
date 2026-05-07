export type KanbanAssignee = { name: string };

export type KanbanTask = {
  id: number;
  title: string;
  badgeText?: string[];
  attachments?: number;
  comments?: number;
  assigned?: KanbanAssignee[];
  dueDate?: string; // ISO date (YYYY-MM-DD) for easy input binding
};

export type KanbanColumn = {
  id: number;
  title: string;
  taskIds: number[];
};

export type KanbanState = {
  columns: KanbanColumn[];
  tasks: KanbanTask[];
  currentTaskId?: number;
};

export const KANBAN_STORAGE_KEY = "luxe-kanban-v1";

// Seed data mirrors `full-version/src/fake-db/apps/kanban.ts` but simplified for this UI.
export const KANBAN_SEED: KanbanState = {
  columns: [
    { id: 1, title: "In Progress", taskIds: [1, 2] },
    { id: 2, title: "In Review", taskIds: [3, 4] },
    { id: 3, title: "Done", taskIds: [5, 6] },
  ],
  tasks: [
    {
      id: 1,
      title: "Research FAQ page UX",
      badgeText: ["UX"],
      attachments: 4,
      comments: 12,
      assigned: [{ name: "John Doe" }, { name: "Jane Smith" }, { name: "Robert Johnson" }],
      dueDate: "2026-12-30",
    },
    {
      id: 2,
      title: "Review Javascript code",
      badgeText: ["Code Review"],
      attachments: 2,
      comments: 8,
      assigned: [{ name: "Emily Davis" }, { name: "Tom Smith" }],
      dueDate: "2026-06-30",
    },
    {
      id: 3,
      title: "Review completed Apps",
      badgeText: ["Dashboard"],
      attachments: 8,
      comments: 17,
      assigned: [{ name: "David Smith" }, { name: "Jane Smith" }],
      dueDate: "2026-09-15",
    },
    {
      id: 4,
      title: "Find new images for pages",
      badgeText: ["Images"],
      attachments: 10,
      comments: 18,
      assigned: [{ name: "David Smith" }, { name: "John Doe" }, { name: "Tom Smith" }, { name: "Emily Davis" }],
      dueDate: "2026-10-20",
    },
    {
      id: 5,
      title: "Forms & tables section",
      badgeText: ["App"],
      attachments: 5,
      comments: 14,
      assigned: [{ name: "Robert Johnson" }, { name: "Jane Smith" }, { name: "John Doe" }],
      dueDate: "2026-11-10",
    },
    {
      id: 6,
      title: "Complete charts & maps",
      badgeText: ["Charts & Map"],
      attachments: 6,
      comments: 21,
      assigned: [{ name: "John Doe" }],
      dueDate: "2026-12-05",
    },
  ],
};

export function safeParseKanban(json: string | null): KanbanState | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as KanbanState;
    if (!parsed || !Array.isArray(parsed.columns) || !Array.isArray(parsed.tasks)) return null;
    return parsed;
  } catch {
    return null;
  }
}

