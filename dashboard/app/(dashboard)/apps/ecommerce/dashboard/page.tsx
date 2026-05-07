import { redirect } from "next/navigation";

/** Same pattern as Academy: app route redirects to the main dashboards view. */
export default function EcommerceAppDashboardPage() {
  redirect("/dashboards/ecommerce");
}
