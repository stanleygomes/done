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
import { useTranslation } from "react-i18next";
import { useLogin } from "../../modules/auth/login-context";
import { useLoginActions } from "../../modules/auth/use-login-actions";
import { LoginHeader } from "./login-header";
import { PasswordRequirement } from "./password-requirement";

type PasswordFormData = {
  password: string;
};

export default function PasswordContainer() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, isNewUser, isLoading } = useLogin();
  const {
    handlePasswordSubmit,
    handleLoginWithoutPassword,
    handleForgotPassword,
  } = useLoginActions();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setFocus,
  } = useForm<PasswordFormData>({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        password: isNewUser
          ? userPasswordSchema
          : z.string().min(1, "password_required"),
      }),
    ),
    defaultValues: { password: "" },
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    if (!email) {
      router.push("/login");
    } else {
      setFocus("password");
    }
  }, [email, router, setFocus]);

  if (!email) return null;

  const isRegistered = !isNewUser;

  return (
    <>
      <LoginHeader
        title={
          isRegistered
            ? t("login.password.title_login")
            : t("login.password.title_register")
        }
        description={email}
        backHref="/login"
      />
      <div className="mt-4">
        <form id="password-form" onSubmit={handleSubmit(handlePasswordSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.password.label")}
              </p>
              <input
                type="text"
                name="email"
                value={email}
                autoComplete="username"
                readOnly
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
              <Input
                id="password"
                type="password"
                {...register("password")}
                autoComplete={isNewUser ? "new-password" : "current-password"}
                placeholder={t("login.password.placeholder")}
                className="h-12 rounded-base border-2 border-border bg-background px-4 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                required
              />
              {errors.password && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {errors.password.message &&
                  t(`login.form.errors.${errors.password.message}`) !==
                    `login.form.errors.${errors.password.message}`
                    ? t(`login.form.errors.${errors.password.message}`)
                    : errors.password.message}
                </p>
              )}

              {isNewUser && (
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
              )}
            </div>

            {isRegistered && (
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="cursor-pointer text-xs font-bold text-foreground/60 hover:text-main underline decoration-2 underline-offset-4"
                >
                  {t("login.password.forgot_password")}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex-col gap-4 mt-6">
        <Button
          type="submit"
          form="password-form"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {isRegistered
            ? t("login.password.submit_login")
            : t("login.password.submit_register")}
        </Button>

        {isRegistered && (
          <Button
            type="button"
            onClick={handleLoginWithoutPassword}
            disabled={isLoading}
            className="h-14 w-full mt-4 rounded-base border-2 border-border bg-background text-lg font-black uppercase text-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/10"
          >
            {t("login.password.login_without_password")}
          </Button>
        )}
      </div>
    </>
  );
}
