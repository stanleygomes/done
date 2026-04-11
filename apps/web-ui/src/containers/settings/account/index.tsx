import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { User } from "@paul/entities";
import { useUser } from "@modules/user/use-user";
import { Info } from "lucide-react";
import { toast } from "@paul/ui";
import { GuestCard } from "./guest-card";
import { SettingsHeader } from "../settings-header";
import { SettingsMain } from "../settings-main";

interface UserProfileCardProps {
  user: User | null;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const { updateProfile } = useUser();
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <GuestCard />;
  }

  const initial = (user.name || user.email)?.[0]?.toUpperCase() ?? "?";

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error(
        t("settings.profile.name_empty_error") || "Name cannot be empty",
      );
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ name: name.trim() });
      toast.success(t("settings.profile.updated_success") || "Profile updated");
    } catch (error) {
      toast.error(
        t("settings.profile.update_error") || "Failed to update profile",
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsMain>
      <SettingsHeader />
      <div className="flex flex-col gap-6">
        <div className="rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-4 border-border bg-main text-3xl font-black text-main-foreground shadow-shadow">
                {initial}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black uppercase text-foreground/40 shrink-0">
                  {t("settings.profile.account_type")}
                </span>
                <span
                  className="text-lg font-black truncate"
                  title={user.email}
                >
                  {user.email}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl border-2 border-border justify-center items-center bg-background/50 p-4 text-xs font-bold text-foreground/60 leading-tight">
              <Info size={16} className="shrink-0 text-foreground/40" />
              <span>{t("settings.profile.email_change_warning")}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black uppercase text-foreground/60">
                {t("settings.profile.name_label") || "Full Name"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                placeholder={
                  t("settings.profile.name_placeholder") || "Your name"
                }
                className="w-full rounded-base border-2 border-border bg-background px-4 py-4 text-lg font-black focus:outline-none focus:ring-4 focus:ring-main/20 transition-all font-sans"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isLoading || name === user.name}
              className="w-full rounded-base border-2 border-border bg-main py-4 text-lg font-black uppercase tracking-tighter text-main-foreground shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 disabled:opacity-50 disabled:grayscale disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-shadow disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading
                ? t("common.saving")
                : t("settings.profile.save_button") || "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </SettingsMain>
  );
}
