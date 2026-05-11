"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Trash2 } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Matches other Radix demo triggers (`RadixAllDemos`). */
export const radixDemoBtn =
  "inline-flex items-center justify-center h-9 px-3 rounded-lg border text-sm transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-ring)] focus-visible:ring-offset-2";

const dialogOverlayCls =
  "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const dialogMotion =
  "outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";

/** Centered sheet (default). */
const dialogCenteredBase =
  "fixed z-[60] rounded-xl border bg-[color:var(--t-surface)] p-6 shadow-2xl " +
  "border-[color:var(--t-border)] left-1/2 top-1/2 w-[92vw] -translate-x-1/2 -translate-y-1/2";

const playgroundCls =
  "flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-[color:var(--t-border-2)] bg-[color:var(--t-hover)] p-4";

type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen" | "scroll";

function dialogContentClass(size: DialogSize): string {
  switch (size) {
    case "sm":
      return cn(dialogCenteredBase, dialogMotion, "max-w-sm");
    case "md":
      return cn(dialogCenteredBase, dialogMotion, "max-w-md");
    case "lg":
      return cn(dialogCenteredBase, dialogMotion, "max-w-4xl");
    case "xl":
      return cn(dialogCenteredBase, dialogMotion, "max-w-6xl");
    case "fullscreen":
      return cn(
        "fixed inset-0 z-[60] flex max-h-[100dvh] w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 p-6 shadow-none outline-none sm:p-10",
        "border-[color:var(--t-border)] bg-[color:var(--t-surface)]",
        dialogMotion,
      );
    case "scroll":
      return cn(
        "fixed left-1/2 top-1/2 z-[60] flex w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-[color:var(--t-border)] bg-[color:var(--t-surface)] p-0 shadow-2xl outline-none",
        "max-h-[85vh] min-h-0",
        dialogMotion,
      );
    default:
      return cn(dialogCenteredBase, dialogMotion, "max-w-md");
  }
}

function RadixSizedDialog({
  size,
  label,
}: {
  size: DialogSize;
  label: string;
}) {
  const scrollParagraphs =
    size === "scroll"
      ? Array.from({ length: 24 }, (_, i) => (
          <p key={i} className="t-text-40 text-xs leading-relaxed">
            Section {i + 1}. This is placeholder body text for a tall dialog. Use for terms, privacy, or long forms.
          </p>
        ))
      : null;

  const footer = (
    <div
      className={cn(
        "flex shrink-0 justify-end gap-2",
        size === "scroll"
          ? "border-t border-[color:var(--t-border)] px-5 py-3"
          : cn("mt-4", size === "fullscreen" && "mt-auto border-t border-[color:var(--t-border)] pt-4"),
      )}
    >
      <Dialog.Close asChild>
        <button
          type="button"
          className={cn(radixDemoBtn, "h-9 border px-4 text-xs font-medium hover:bg-[var(--t-hover)]")}
          style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
        >
          취소
        </button>
      </Dialog.Close>
      <Dialog.Close asChild>
        <button
          type="button"
          className="h-9 rounded-lg px-4 text-xs font-medium text-white hover:opacity-90"
          style={{ backgroundColor: "var(--t-accent)" }}
        >
          확인
        </button>
      </Dialog.Close>
    </div>
  );

  if (size === "scroll") {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className={cn(radixDemoBtn, "h-9 border px-3 text-xs font-medium hover:bg-[var(--t-hover)]")}
            style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
          >
            {label}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogOverlayCls} />
          <Dialog.Content className={cn(dialogContentClass("scroll"), "gap-0")}>
            <div className="shrink-0 border-b border-[color:var(--t-border)] px-5 pt-5 pb-3">
              <Dialog.Title className="t-text text-base font-semibold">스크롤 본문</Dialog.Title>
              <Dialog.Description className="t-text-40 mt-1 text-xs">
                제목과 하단 버튼은 고정되고, 아래 본문만 스크롤됩니다.
              </Dialog.Description>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-3">
              <div className="space-y-3">{scrollParagraphs}</div>
            </div>
            {footer}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(radixDemoBtn, "h-9 border px-3 text-xs font-medium hover:bg-[var(--t-hover)]")}
          style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
        >
          {label}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayCls} />
        <Dialog.Content className={dialogContentClass(size)}>
          <Dialog.Title className="t-text shrink-0 text-base font-semibold">
            {size === "fullscreen" ? "전체 화면 다이얼로그" : "Dialog title"}
          </Dialog.Title>
          <Dialog.Description className="t-text-40 sr-only shrink-0 text-xs">
            Dialog size demo: {size}
          </Dialog.Description>

          {size === "md" || size === "lg" || size === "xl" ? (
            <Form.Root className="space-y-3">
              {(
                [
                  ["Full Name", "James Worthington"],
                  ["Email", "j.worthington@luxe.com"],
                ] as const
              ).map(([fieldLabel, val]) => (
                <Form.Field key={fieldLabel} name={fieldLabel.toLowerCase().replace(/\W+/g, "_")} className="space-y-1">
                  <Form.Label asChild>
                    <Label className="t-text-40 text-xs font-normal">{fieldLabel}</Label>
                  </Form.Label>
                  <Form.Control asChild>
                    <Input defaultValue={val} className="h-9 text-xs t-text-70" />
                  </Form.Control>
                </Form.Field>
              ))}
            </Form.Root>
          ) : null}

          {size === "sm" ? (
            <p className="t-text-40 text-xs leading-relaxed">
              짧은 확인이나 한 줄 메시지에 맞는 좁은 폭입니다.
            </p>
          ) : null}

          {(size === "lg" || size === "xl") && (
            <p className="t-text-40 text-xs leading-relaxed">
              넓은 레이아웃 — 대시보드 위젯, 두 컬럼 폼, 또는 테이블 미리보기 등에 사용할 수 있습니다.
            </p>
          )}

          {size === "fullscreen" && (
            <div className="mt-2 min-h-[40vh] flex-1 rounded-lg border border-dashed border-[color:var(--t-border-2)] bg-[color:var(--t-hover)] p-4">
              <p className="t-text-40 text-sm">콘텐츠 영역 — 전체 뷰포트를 채우는 모달입니다.</p>
            </div>
          )}

          {footer}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DialogShowcaseBasic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(radixDemoBtn, "h-9 border px-4 text-xs font-medium hover:bg-[var(--t-hover)]")}
          style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
        >
          Open dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayCls} />
        <Dialog.Content className={dialogContentClass("md")}>
          <Dialog.Title className="t-text mb-1 font-semibold text-base">Edit profile</Dialog.Title>
          <Dialog.Description className="t-text-40 mb-5 text-xs">Update your account information below.</Dialog.Description>
          <Form.Root className="space-y-3">
            {(
              [
                ["Full Name", "James Worthington"],
                ["Email", "j.worthington@luxe.com"],
                ["Phone", "+1 (212) 555-0100"],
              ] as const
            ).map(([fieldLabel, val]) => (
              <Form.Field key={fieldLabel} name={fieldLabel.toLowerCase().replace(/\W+/g, "_")} className="space-y-1">
                <Form.Label asChild>
                  <Label className="t-text-40 text-xs font-normal">{fieldLabel}</Label>
                </Form.Label>
                <Form.Control asChild>
                  <Input defaultValue={val} className="h-9 text-xs t-text-70" />
                </Form.Control>
              </Form.Field>
            ))}
            <div className="mt-5 flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={cn(radixDemoBtn, "h-9 border px-4 text-xs font-medium hover:bg-[var(--t-hover)]")}
                  style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Form.Submit asChild>
                  <button
                    type="button"
                    className="h-9 rounded-lg px-4 text-xs font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: "var(--t-accent)" }}
                  >
                    Save changes
                  </button>
                </Form.Submit>
              </Dialog.Close>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function InfoDialog({ type }: { type: "info" | "success" | "warning" }) {
  const config = {
    info: {
      icon: Info,
      label: "Info dialog",
      iconColor: "text-sky-400",
      triggerClass:
        "h-9 rounded-lg border border-sky-500/30 px-4 text-xs font-medium text-sky-400 transition-colors hover:bg-sky-500/10",
      bubble: "bg-sky-500/10",
      title: "Information",
      body: "Your session will expire in 30 minutes. Please save your work to avoid losing unsaved changes.",
    },
    success: {
      icon: CheckCircle2,
      label: "Success dialog",
      iconColor: "text-emerald-400",
      triggerClass:
        "h-9 rounded-lg border border-emerald-500/30 px-4 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10",
      bubble: "bg-emerald-500/10",
      title: "Order confirmed",
      body: "Your order has been confirmed. Authentication begins within 24 hours.",
    },
    warning: {
      icon: AlertTriangle,
      label: "Warning dialog",
      iconColor: "text-amber-400",
      triggerClass:
        "h-9 rounded-lg border border-amber-500/30 px-4 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10",
      bubble: "bg-amber-500/10",
      title: "Low stock",
      body: "This item has limited units remaining. Consider restocking soon.",
    },
  } as const;
  const c = config[type];
  const Icon = c.icon;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={c.triggerClass}>
          {c.label}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayCls} />
        <Dialog.Content className={cn(dialogContentClass("sm"), "text-center")}>
          <div className={cn("mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full", c.bubble)}>
            <Icon className={cn("h-7 w-7", c.iconColor)} aria-hidden />
          </div>
          <Dialog.Title className="t-text mb-2 text-base font-bold">{c.title}</Dialog.Title>
          <Dialog.Description className="t-text-40 mb-5 text-xs leading-relaxed">{c.body}</Dialog.Description>
          <Dialog.Close asChild>
            <button
              type="button"
              className="h-9 rounded-lg px-6 text-xs font-medium text-white hover:opacity-90"
              style={{ backgroundColor: "var(--t-accent)" }}
            >
              Got it
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DialogShowcaseStatusRow() {
  return (
    <>
      <InfoDialog type="info" />
      <InfoDialog type="success" />
      <InfoDialog type="warning" />
    </>
  );
}

export function DialogShowcaseAlertConfirm() {
  const [deleted, setDeleted] = useState(false);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className="flex h-9 items-center rounded-lg border border-red-500/30 px-4 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
        >
          <Trash2 className="mr-1.5 inline h-3.5 w-3.5" aria-hidden />
          Delete item
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={dialogOverlayCls} />
        <AlertDialog.Content className={dialogContentClass("md")}>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <AlertDialog.Title className="t-text mb-1 text-base font-semibold">Delete product</AlertDialog.Title>
              <AlertDialog.Description className="t-text-40 text-xs leading-relaxed">
                Are you sure you want to delete this item? This action cannot be undone and will remove all associated
                data.
              </AlertDialog.Description>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className={cn(radixDemoBtn, "h-9 border px-4 text-xs font-medium hover:bg-[var(--t-hover)]")}
                style={{ backgroundColor: "var(--t-surface-2)", borderColor: "var(--t-border-2)", color: "var(--t-text)" }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                className="h-9 rounded-lg bg-red-500 px-4 text-xs font-medium text-white transition-colors hover:bg-red-400"
                onClick={() => setDeleted(true)}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
          {deleted ? <p className="mt-2 text-center text-xs text-emerald-400">Item deleted (demo).</p> : null}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

/** Dialog panel for `/radix`: sizes, form sample, status row. */
export function RadixDialogPanelContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h4 className="t-text text-xs font-semibold tracking-wide">크기 옵션</h4>
        <p className="t-text-40 text-xs">
          작은 알림부터 전체화면까지 동일한 푸터(취소 / 확인) 패턴입니다. 스크롤 본문은 제목·버튼 고정, 가운데만 스크롤됩니다.
        </p>
        <div className={playgroundCls}>
          <RadixSizedDialog size="sm" label="작은 (sm)" />
          <RadixSizedDialog size="md" label="보통 (md)" />
          <RadixSizedDialog size="lg" label="큰 (lg)" />
          <RadixSizedDialog size="xl" label="아주 큼 (xl)" />
          <RadixSizedDialog size="fullscreen" label="전체화면" />
          <RadixSizedDialog size="scroll" label="스크롤 본문" />
        </div>
      </section>

      <section className="space-y-2">
        <h4 className="t-text text-xs font-semibold tracking-wide">폼 예시 (기본)</h4>
        <p className="t-text-40 text-xs">표준 폼 필드와 Save — 보통(md) 폭.</p>
        <div className={playgroundCls}>
          <DialogShowcaseBasic />
        </div>
      </section>

      <section className="space-y-2">
        <h4 className="t-text text-xs font-semibold tracking-wide">상태 다이얼로그</h4>
        <p className="t-text-40 text-xs">작은 폭 · info / success / warning.</p>
        <div className={playgroundCls}>
          <DialogShowcaseStatusRow />
        </div>
      </section>
    </div>
  );
}

/** Alert Dialog panel for `/radix`. */
export function RadixAlertDialogPanelContent() {
  return (
    <div className={playgroundCls}>
      <DialogShowcaseAlertConfirm />
    </div>
  );
}
