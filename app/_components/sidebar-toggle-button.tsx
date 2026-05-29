"use client";

import { useSidebarLayout } from "./sidebar-layout";

function SidebarExpandCollapseIcon({
  direction,
  className = "h-4 w-4",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {direction === "left" ? (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M9 5v14" />
          <path d="m15 9-3 3 3 3" />
        </>
      ) : (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M15 5v14" />
          <path d="m9 9 3 3-3 3" />
        </>
      )}
    </svg>
  );
}

export function SidebarToggleButton() {
  const { isExpanded, toggleSidebar } = useSidebarLayout();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-text-muted shadow-sm transition-colors hover:bg-slate-50 hover:text-foreground"
      aria-label={isExpanded ? "Retrair sidebar" : "Expandir sidebar"}
      title={isExpanded ? "Retrair sidebar" : "Expandir sidebar"}
    >
      <SidebarExpandCollapseIcon
        className="h-4 w-4"
        direction={isExpanded ? "left" : "right"}
      />
    </button>
  );
}
