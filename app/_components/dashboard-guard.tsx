"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./auth-provider";

export function DashboardGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, pathname, router, token]);

  if (!isReady || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faff] px-6 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#6f7d96]">
            Tutor CNH
          </p>
          <p className="mt-3 text-lg font-semibold text-[#16325c]">
            Carregando sua sessao...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
