"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Sidebar } from "./sidebar";

type SidebarLayoutContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
};

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(
  null,
);

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext);

  if (!context) {
    throw new Error("useSidebarLayout must be used within SidebarLayout");
  }

  return context;
}

export function SidebarLayout({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);

  function toggleSidebar() {
    setIsExpanded((current) => !current);
  }

  return (
    <SidebarLayoutContext.Provider value={{ isExpanded, toggleSidebar }}>
      <div className="flex h-full w-full overflow-hidden bg-surface">
        <Sidebar />
        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-[#fbfcff]">
          {children}
        </section>
      </div>
    </SidebarLayoutContext.Provider>
  );
}
