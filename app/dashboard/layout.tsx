import type { ReactNode } from "react";
import { SidebarLayout } from "../_components/sidebar-layout";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="h-screen overflow-hidden">
      <SidebarLayout>{children}</SidebarLayout>
    </main>
  );
}
