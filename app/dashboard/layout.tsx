import type { ReactNode } from "react";
import { DashboardGuard } from "../_components/dashboard-guard";
import { SidebarLayout } from "../_components/sidebar-layout";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="h-screen overflow-hidden">
      <DashboardGuard>
        <SidebarLayout>{children}</SidebarLayout>
      </DashboardGuard>
    </main>
  );
}
