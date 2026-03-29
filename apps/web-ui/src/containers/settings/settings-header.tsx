"use client";

import Link from "next/link";

export function SettingsHeader() {
  return (
    <>
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-foreground/50 transition-colors hover:text-foreground"
      >
        ← Back
      </Link>
      <h1 className="mb-8 text-4xl font-black tracking-tight text-foreground">
        Settings
      </h1>
    </>
  );
}
