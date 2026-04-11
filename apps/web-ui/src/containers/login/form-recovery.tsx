"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-expect-error - Module declaration for resolvers/zod may be missing or hard to resolve
import { zodResolver } from "@hookform/resolvers/zod";
import { userPasswordSchema } from "@paul/entities";
import { Button } from "@paul/ui/components/ui/button";
import { Input } from "@paul/ui/components/ui/input";
import { Key, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../modules/auth/login-context";
import { useLoginActions } from "../../modules/auth/use-login-actions";
import { LoginHeader } from "./login-header";
import { PasswordRequirement } from "./password-requirement";

type RecoveryFormData = {
  code: string;
  newPassword: string;
};

export default function RecoveryContainer() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, isLoading } = useLogin();
  const { handleRecoverySubmit } = useLoginActions();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setFocus,
  } = useForm<RecoveryFormData>({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        code: z.string().length(6, "code_invalid"),
        newPassword: userPasswordSchema,
      }),
    ),
    defaultValues: { code: "", newPassword: "" },
  });

  const passwordValue = watch("newPassword", "");

  useEffect(() => {
    if (!email) {
      router.push("/login");
    } else {
      setFocus("code");
    }
  }, [email, router, setFocus]);

  if (!email) return null;

  return (
    <>
      <LoginHeader
        title={t("login.recovery.title")}
        description={t("login.recovery.info_code_sent", { email })}
        backHref="/login/password"
      />
      <div className="mt-4">
        <form id="recovery-form" onSubmit={handleSubmit(handleRecoverySubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.recovery.code_label")}
              </p>
              <div className="relative">
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  {...register("code")}
                  placeholder="000000"
                  className="h-12 rounded-base border-2 border-border bg-background px-4 pl-10 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                  required
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                  size={20}
                />
              </div>
              {errors.code && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {t(`login.form.errors.${errors.code.message}`)}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.recovery.new_password_label")}
              </p>
              <div className="relative">
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  placeholder={t("login.password.placeholder")}
                  className="h-12 rounded-base border-2 border-border bg-background px-4 pl-10 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                  required
                />
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                  size={20}
                />
              </div>
              {errors.newPassword && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {errors.newPassword.message &&
                  t(`login.form.errors.${errors.newPassword.message}`) !==
                    `login.form.errors.${errors.newPassword.message}`
                    ? t(`login.form.errors.${errors.newPassword.message}`)
                    : errors.newPassword.message}
                </p>
              )}

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-base border-2 border-border bg-background/50">
                <PasswordRequirement
                  label={t("login.password.requirements.length")}
                  met={passwordValue.length >= 12}
                />
                <PasswordRequirement
                  label={t("login.password.requirements.lowercase")}
                  met={/[a-z]/.test(passwordValue)}
                />
                <PasswordRequirement
                  label={t("login.password.requirements.uppercase")}
                  met={/[A-Z]/.test(passwordValue)}
                />
                <PasswordRequirement
                  label={t("login.password.requirements.number")}
                  met={/[0-9]/.test(passwordValue)}
                />
                <PasswordRequirement
                  label={t("login.password.requirements.special")}
                  met={/[^a-zA-Z0-9]/.test(passwordValue)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-col gap-4 mt-4">
        <Button
          type="submit"
          form="recovery-form"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {t("login.recovery.submit")}
        </Button>
      </div>
    </>
  );
}
