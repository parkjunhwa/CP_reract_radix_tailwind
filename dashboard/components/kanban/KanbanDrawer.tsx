"use client";

import { useMemo, useState } from "react";
import * as Form from "@radix-ui/react-form";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { KanbanState, KanbanTask } from "@/lib/kanban";

function splitTags(v: string) {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function KanbanDrawer({
  open,
  onOpenChange,
  task,
  onUpdateTask,
  onDeleteTask,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  task: KanbanTask;
  onUpdateTask: (patch: Partial<KanbanTask>) => void;
  onDeleteTask: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [badges, setBadges] = useState((task.badgeText ?? []).join(", "));
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined,
  );
  const [attachments, setAttachments] = useState(String(task.attachments ?? 0));
  const [comments, setComments] = useState(String(task.comments ?? 0));
  const [assigned, setAssigned] = useState((task.assigned ?? []).map((a) => a.name).join(", "));

  // When task changes while open, reset form values.
  useMemo(() => {
    setTitle(task.title);
    setBadges((task.badgeText ?? []).join(", "));
    setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setAttachments(String(task.attachments ?? 0));
    setComments(String(task.comments ?? 0));
    setAssigned((task.assigned ?? []).map((a) => a.name).join(", "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="border-b">
          <SheetTitle>Task</SheetTitle>
          <SheetDescription>Edit task details</SheetDescription>
        </SheetHeader>

        <Form.Root className="p-4 space-y-3 overflow-auto">
          <Form.Field name="title" className="space-y-1.5">
            <Form.Label asChild>
              <Label htmlFor="kb-title">Title</Label>
            </Form.Label>
            <Form.Control asChild>
              <Input id="kb-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Control>
          </Form.Field>

          <Form.Field name="badges" className="space-y-1.5">
            <Form.Label asChild>
              <Label htmlFor="kb-badges">Badges (comma separated)</Label>
            </Form.Label>
            <Form.Control asChild>
              <Input id="kb-badges" value={badges} onChange={(e) => setBadges(e.target.value)} />
            </Form.Control>
          </Form.Field>

          <div className="grid grid-cols-2 gap-3">
            <Form.Field name="dueDate" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="kb-due">Due date</Label>
              </Form.Label>
              <Form.Control asChild>
                <DatePicker
                  id="kb-due"
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="YYYY-MM-DD"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="attachments" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="kb-attachments">Attachments</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input
                  id="kb-attachments"
                  inputMode="numeric"
                  value={attachments}
                  onChange={(e) => setAttachments(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="comments" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="kb-comments">Comments</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input
                  id="kb-comments"
                  inputMode="numeric"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="assigned" className="space-y-1.5">
              <Form.Label asChild>
                <Label htmlFor="kb-assigned">Assigned (comma separated)</Label>
              </Form.Label>
              <Form.Control asChild>
                <Input id="kb-assigned" value={assigned} onChange={(e) => setAssigned(e.target.value)} />
              </Form.Control>
            </Form.Field>
          </div>
        </Form.Root>

        <SheetFooter className="border-t">
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              onDeleteTask();
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
          <Button
            size="md"
            onClick={() => {
              onUpdateTask({
                title: title.trim() || task.title,
                badgeText: splitTags(badges),
                dueDate: dueDate ? dueDate.toISOString().slice(0, 10) : undefined,
                attachments: Number(attachments) || 0,
                comments: Number(comments) || 0,
                assigned: splitTags(assigned).map((name) => ({ name })),
              });
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

