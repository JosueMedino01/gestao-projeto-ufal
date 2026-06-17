"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "./auth-provider";
import { useSidebarLayout } from "./sidebar-layout";

type IconProps = {
  className?: string;
};

function IconBase({
  children,
  className = "",
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function HomeIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-5h5v5" />
    </IconBase>
  );
}

function ClipboardIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="6" y="5" width="12" height="15" rx="2" />
      <path d="M9 5.5h6" />
      <path d="M9 9.5h6" />
      <path d="M9 13.5h6" />
      <path d="M9 2.8h6a1.2 1.2 0 0 1 1.2 1.2v1H7.8V4A1.2 1.2 0 0 1 9 2.8Z" />
    </IconBase>
  );
}

function BookIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4.5 5.5h6.5a3 3 0 0 1 3 3V20a3 3 0 0 0-3-3H4.5Z" />
      <path d="M19.5 5.5H13a3 3 0 0 0-3 3V20a3 3 0 0 1 3-3h6.5Z" />
    </IconBase>
  );
}

function AlertIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M12 4.5 20 18.5a1 1 0 0 1-.87 1.5H4.87A1 1 0 0 1 4 18.5Z" />
      <path d="M12 9v4.5" />
      <circle cx="12" cy="16.5" r=".6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function MedalIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M8.5 4h7l-1.5 4h-4Z" />
      <path d="m8.5 4-2 3.5L10 9" />
      <path d="m15.5 4 2 3.5L14 9" />
      <circle cx="12" cy="15" r="5" />
      <path d="m10.5 15 1 1 2-2" />
    </IconBase>
  );
}

function BotIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="5" y="7" width="14" height="10" rx="3" />
      <path d="M12 4v3" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M8.5 17v2l2.5-2" />
      <path d="M15.5 17v2L15 17" />
    </IconBase>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </IconBase>
  );
}

function CogIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2" />
      <path d="M12 18.3v2.2" />
      <path d="m5.98 5.98 1.55 1.55" />
      <path d="m16.47 16.47 1.55 1.55" />
      <path d="M3.5 12h2.2" />
      <path d="M18.3 12h2.2" />
      <path d="m5.98 18.02 1.55-1.55" />
      <path d="m16.47 7.53 1.55-1.55" />
    </IconBase>
  );
}

const menuItems = [
  { label: "Inicio", href: "/dashboard/inicio", icon: HomeIcon },
  { label: "Simulados", href: "/dashboard/simulados", icon: ClipboardIcon },
  { label: "Pratica por Tema", href: "/dashboard/pratica-por-tema", icon: BookIcon },
  { label: "Revisar Erros", href: "/dashboard/revisar-erros", icon: AlertIcon },
  { label: "Desempenho", href: "/dashboard/desempenho", icon: MedalIcon },
  { label: "Tutor Inteligente", href: "/dashboard/tutor-inteligente", icon: BotIcon },
  { label: "Perfil", href: "/dashboard/perfil", icon: UserIcon },
  { label: "Configuracoes", href: "/dashboard/configuracoes", icon: CogIcon },
] as const;

function SidebarLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/tutor-cnh-icon.png"
        alt="Tutor CNH"
        width={64}
        height={64}
        className="h-16 w-16 object-contain lg:hidden"
        priority
      />
      <Image
        src="/tutor-cnh-logo.png"
        alt="Tutor CNH"
        width={311}
        height={236}
        className="hidden h-auto w-[132px] object-contain lg:block"
        priority
      />
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { isExpanded } = useSidebarLayout();
  const { logout } = useAuth();

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col justify-between overflow-hidden bg-secondary py-5 text-white transition-[width,padding] duration-300 ${
        isExpanded ? "w-[240px] px-5 lg:py-7" : "w-[78px] px-2 lg:py-5"
      }`}
    >
      <div className="space-y-8">
        <div className="flex items-start justify-center">
          <SidebarLogo />
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex rounded-xl py-3 text-sm transition-colors ${
                  isExpanded
                    ? "items-center gap-3 px-3 lg:px-4"
                    : "justify-center px-0"
                } ${
                  isActive
                    ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "text-blue-100/80 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                {isExpanded ? <span className="truncate">{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`flex items-center text-xs text-blue-100/70 ${
          isExpanded ? "justify-between lg:px-2" : "justify-center"
        }`}
      >
        <button
          type="button"
          onClick={logout}
          className={`flex rounded-lg px-2 py-1.5 hover:bg-white/8 ${
            isExpanded ? "items-center gap-2" : "justify-center"
          }`}
        >
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">LO</span>
          {isExpanded ? <span>Log out</span> : null}
        </button>
        {isExpanded ? (
          <span className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold lg:inline">
            UI
          </span>
        ) : null}
      </div>
    </aside>
  );
}
