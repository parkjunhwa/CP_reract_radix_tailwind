"use client";

import { useState } from "react";
import { AlertTriangle, Info, CheckCircle2, Trash2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

function BasicDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}>
          Open Dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-xl p-6 shadow-2xl" style={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)" }}>
          <Dialog.Title className="t-text font-semibold text-base mb-1">Edit Profile</Dialog.Title>
          <Dialog.Description className="t-text-40 text-xs mb-5">Update your account information below.</Dialog.Description>
          <div className="space-y-3">
            {[["Full Name", "James Worthington"], ["Email", "j.worthington@luxe.com"], ["Phone", "+1 (212) 555-0100"]].map(([label, val]) => (
              <div key={label} className="space-y-1">
                <label className="t-text-40 text-xs">{label}</label>
                <input defaultValue={val} className="w-full h-9 px-3 rounded-lg border text-xs t-text-70 outline-none focus:border-[var(--t-accent)]" style={{ backgroundColor: "var(--t-input-bg)", borderColor: "var(--t-border-2)" }} />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <Dialog.Close asChild>
              <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}>Cancel</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="h-9 px-4 rounded-lg text-white text-xs font-medium hover:opacity-90" style={{ backgroundColor: "var(--t-accent)" }}>Save Changes</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ConfirmDeleteDialog() {
  const [deleted, setDeleted] = useState(false);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="h-9 px-4 rounded-lg border text-xs font-medium text-red-400 border-red-500/30 hover:bg-red-500/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5 inline mr-1.5" />Delete Item
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-xl p-6 shadow-2xl" style={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)" }}>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <AlertDialog.Title className="t-text font-semibold text-base mb-1">Delete Product</AlertDialog.Title>
              <AlertDialog.Description className="t-text-40 text-xs leading-relaxed">
                Are you sure you want to delete <strong className="t-text-60">Patek Philippe Nautilus 5711</strong>? This action cannot be undone and will remove all associated data.
              </AlertDialog.Description>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <AlertDialog.Cancel asChild>
              <button className="h-9 px-4 rounded-lg border text-xs font-medium t-text-60 hover:bg-[var(--t-hover)] transition-colors" style={{ borderColor: "var(--t-border-2)" }}>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={() => setDeleted(true)} className="h-9 px-4 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-medium transition-colors">
                Delete
              </button>
            </AlertDialog.Action>
          </div>
          {deleted && <p className="text-emerald-400 text-xs mt-2 text-center">Item deleted successfully!</p>}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function InfoDialog({ type }: { type: "info" | "success" | "warning" }) {
  const config = {
    info:    { icon: Info, label: "Info Dialog", color: "text-sky-400", bg: "bg-sky-500/10", title: "Information", body: "Your session will expire in 30 minutes. Please save your work to avoid losing unsaved changes." },
    success: { icon: CheckCircle2, label: "Success Dialog", color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Order Confirmed!", body: "Your order for the Patek Philippe Nautilus 5711 has been confirmed. Authentication begins within 24 hours." },
    warning: { icon: AlertTriangle, label: "Warning Dialog", color: "text-amber-400", bg: "bg-amber-500/10", title: "Low Stock Alert", body: "The Hermès Birkin 35 Porosus Crocodile has only 1 unit remaining. Consider restocking soon." },
  };
  const { icon: Icon, label, color, bg, title, body } = config[type];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={cn("h-9 px-4 rounded-lg border text-xs font-medium transition-colors", color, `border-current/30 hover:${bg}`)}>
          {label}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-xl p-6 text-center shadow-2xl" style={{ backgroundColor: "var(--luxe-sidebar-2)", border: "1px solid var(--t-border-2)" }}>
          <div className={cn("w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4", bg)}>
            <Icon className={cn("w-7 h-7", color)} />
          </div>
          <Dialog.Title className="t-text font-bold text-base mb-2">{title}</Dialog.Title>
          <Dialog.Description className="t-text-40 text-xs leading-relaxed mb-5">{body}</Dialog.Description>
          <Dialog.Close asChild>
            <button className="h-9 px-6 rounded-lg text-white text-xs font-medium hover:opacity-90" style={{ backgroundColor: "var(--t-accent)" }}>Got it</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const examples = [
  { title: "Basic Dialog", desc: "Standard modal with form fields and actions.", component: <BasicDialog /> },
  { title: "Confirmation Dialog", desc: "Alert dialog for destructive actions requiring confirmation.", component: <ConfirmDeleteDialog /> },
  { title: "Info Dialogs", desc: "Context-aware status dialogs (info, success, warning).", component: <div className="flex flex-wrap gap-2"><InfoDialog type="info" /><InfoDialog type="success" /><InfoDialog type="warning" /></div> },
];

export default function DialogExamplesPage() {
  return (
    <div className="space-y-4 pb-4 max-w-3xl">
      <div className="panel p-5">
        <h2 className="t-text font-semibold text-sm mb-1">Dialog Examples</h2>
        <p className="t-text-40 text-xs">Interactive dialog components built with Radix UI primitives.</p>
      </div>
      <div className="space-y-4">
        {examples.map((ex) => (
          <div key={ex.title} className="panel p-5 space-y-3">
            <div>
              <h3 className="t-text font-semibold text-sm">{ex.title}</h3>
              <p className="t-text-40 text-xs mt-0.5">{ex.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 p-4 rounded-lg border border-dashed" style={{ borderColor: "var(--t-border-2)", backgroundColor: "var(--t-hover)" }}>
              {ex.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
