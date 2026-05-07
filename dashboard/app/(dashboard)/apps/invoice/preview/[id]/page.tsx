import { redirect } from "next/navigation";

/** Menu uses /apps/invoice/preview/[id] like full-version; current app uses a single inbox-style list. */
export default function InvoicePreviewByIdPage() {
  redirect("/apps/invoice/list");
}
