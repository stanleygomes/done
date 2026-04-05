"use client";

import { useSidebar } from "@modules/menu-layout/use-sidebar";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, mounted } = useSidebar();
  const pathname = usePathname();

  const SIDEBAR_PATHS = ["/", "/memories", "/plan", "/settings"];
  const isSidebarPage = SIDEBAR_PATHS.includes(pathname);

  if (!mounted) {
    return (
      <main className="min-h-screen transition-all duration-300">
        {children}
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen transition-all duration-300 ${
        isOpen && isSidebarPage ? "pl-0 lg:pl-72" : "pl-0"
      }`}
    >
      {children}
    </main>
  );
}
