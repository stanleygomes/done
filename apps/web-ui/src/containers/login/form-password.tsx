"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-expect-error - Module declaration for resolvers/zod may be missing or hard to resolve
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@paul/ui/components/ui/button";
import { Input } from "@paul/ui/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@paul/ui/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLoginActions } from "../../modules/auth/use-login-actions";
import { useLogin } from "../../modules/auth/login-context";

const passwordSchema = z.object({
  password: z.string().min(1, "password_required"),
});

type PasswordFormData = z.infer<typeof passwordSchema>;

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
    formState: { errors, isValid },
    setFocus,
  } = useForm<PasswordFormData>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

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
    <Card className="w-full max-w-lg rounded-base border-2 md:border-4 border-border bg-secondary-background p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--border)] md:shadow-[10px_10px_0px_0px_var(--border)]">
      <CardHeader className="pb-4 relative">
        <button
          onClick={() => router.push("/login")}
          className="absolute left-0 top-0 p-2 text-foreground/40 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <CardTitle className="text-3xl font-black uppercase tracking-tighter text-foreground flex flex-col gap-2 pt-4">
          <div className="text-2xl md:text-3xl">
            {isRegistered
              ? t("login.password.title_login")
              : t("login.password.title_register")}
          </div>
          <p className="text-sm font-bold text-foreground/40 normal-case tracking-normal">
            {email}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <form id="password-form" onSubmit={handleSubmit(handlePasswordSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.password.label")}
              </p>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder={t("login.password.placeholder")}
                className="h-12 rounded-base border-2 border-border bg-background px-4 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                required
              />
              {errors.password && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {t(`login.form.errors.${errors.password.message}`)}
                </p>
              )}
            </div>

            {isRegistered && (
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-foreground/60 hover:text-main underline decoration-2 underline-offset-4"
                >
                  {t("login.password.forgot_password")}
                </button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4 mt-4">
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
            className="h-14 w-full rounded-base border-2 border-border bg-background text-lg font-black uppercase text-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/10"
          >
            {t("login.password.login_without_password")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
