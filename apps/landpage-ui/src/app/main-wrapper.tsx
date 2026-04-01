"use client";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen transition-all duration-300">{children}</main>
  );
}
