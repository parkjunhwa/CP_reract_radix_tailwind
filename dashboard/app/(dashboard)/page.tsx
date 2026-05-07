import { redirect } from "next/navigation";

/** Default dashboard: LUXE “CRM” as the first dashboards item. Radix stays at `/radix`. */
export default function DashboardIndexPage() {
  redirect("/dashboards/crm");
}
