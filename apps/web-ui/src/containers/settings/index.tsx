"use client";

import { useUser } from "@modules/user/use-user";
import { useAuth } from "@modules/auth/use-auth";
import { useTranslation } from "react-i18next";
import { SettingsHeader } from "./settings-header";
import {
  User,
  Palette,
  Languages,
  Bell,
  Timer,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "src/components/user-avatar";
import { useRouter } from "next/navigation";
import { SyncStatusDetails } from "src/components/sync-status-details";

export default function Settings() {
  const { user } = useUser();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    {
      href: "/settings/account",
      label: t("settings.account"),
      icon: User,
      color: "bg-blue-500",
      description: user?.email,
    },
    {
      href: "/settings/theme",
      label: t("settings.theme"),
      icon: Palette,
      color: "bg-purple-500",
    },
    {
      href: "/settings/language",
      label: t("settings.language.title"),
      icon: Languages,
      color: "bg-green-500",
    },
    {
      href: "/settings/notifications",
      label: t("settings.notifications"),
      icon: Bell,
      color: "bg-red-500",
    },
    {
      href: "/settings/pomodoro",
      label: t("settings.pomodoro.title"),
      icon: Timer,
      color: "bg-orange-500",
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <SettingsHeader />

        <div className="flex flex-col gap-4">
          {user && (
            <div className="mb-6 flex items-center gap-4 rounded-xl border-2 border-border bg-secondary-background p-6 shadow-shadow">
              <UserAvatar className="h-16 w-16" />
              <div className="flex flex-col">
                <span className="text-xl font-black">{user.name}</span>
                <span className="text-sm text-foreground/50">{user.email}</span>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shadow-shadow active:scale-95 group flex items-center justify-between rounded-xl border-2 border-border bg-secondary-background p-4 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-base border-2 border-border ${item.color} p-3 text-white shadow-[2px_2px_0px_0px_var(--border)]`}
                  >
                    <item.icon size={24} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black uppercase tracking-tight">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-xs font-bold text-foreground/40">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="text-foreground/40 transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          <div className="rounded-xl border-2 border-border bg-secondary-background p-6 shadow-shadow">
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-foreground/40">
              {t("settings.sync_status") || "Status de Sincronização"}
            </h3>
            <SyncStatusDetails />
          </div>

          <div className="border-border/50 mt-4 border-t-2 pt-10">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-border bg-red-500 py-4 text-lg font-black uppercase tracking-tighter text-white shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95"
            >
              <LogOut size={22} strokeWidth={3} />
              {t("settings.profile.logout") || "Logout"}
            </button>

            <Link
              href="/settings/legal"
              className="mt-6 group flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-secondary-background"
            >
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-foreground/40" />
                <span className="font-bold text-foreground/60 group-hover:text-foreground">
                  {t("settings.legal.title")}
                </span>
              </div>
              <ChevronRight
                size={20}
                className="text-foreground/20 group-hover:text-foreground"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
