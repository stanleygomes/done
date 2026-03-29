"use client";

import { useUser } from "@modules/user/use-user";
import { UserProfileCard } from "./user-profile-card";
import { GuestCard } from "./guest-card";
import { ThemeSelector } from "./theme-selector";
import { NotificationSettings } from "./notification-settings";
import { LegalSection } from "./legal-section";
import { SettingsHeader } from "./settings-header";

export default function Settings() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-24">
        <SettingsHeader />

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">Account</h2>
            {user ? <UserProfileCard user={user} /> : <GuestCard />}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">Theme</h2>
            <ThemeSelector />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              Notifications
            </h2>
            <NotificationSettings />
          </section>

          <section className="flex flex-col gap-4">
            <LegalSection />
          </section>
        </div>
      </div>
    </main>
  );
}
