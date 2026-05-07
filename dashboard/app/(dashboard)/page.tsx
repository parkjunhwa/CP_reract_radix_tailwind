import { redirect } from "next/navigation";

/** Default dashboard: aligns with Vuexy “CRM” as first dashboards item. Radix stays at `/radix`. */
export default function DashboardIndexPage() {
  redirect("/dashboards/crm");
}
