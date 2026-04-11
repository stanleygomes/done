"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-expect-error - Module declaration for resolvers/zod may be missing or hard to resolve
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@paul/ui/components/ui/button";
import { Input } from "@paul/ui/components/ui/input";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../modules/auth/login-context";
import { useLoginActions } from "../../modules/auth/use-login-actions";
import LoginFooter from "./login-footer";
import { LoginHeader } from "./login-header";

const emailSchema = z.object({
  email: z.string().email("invalid_email"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function EmailContainer() {
  const { t } = useTranslation();
  const { handleEmailSubmit } = useLoginActions();
  const { isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EmailFormData>({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <>
      <LoginHeader title={t("login.form.title")} showLogo />
      <div className="mt-4">
        <form id="email-form" onSubmit={handleSubmit(handleEmailSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.form.email_label")}
              </p>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("login.form.email_placeholder")}
                className="h-12 rounded-base border-2 border-border bg-background px-4 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                required
              />
              {errors.email && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {t(`login.form.errors.${errors.email.message}`)}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="flex-col gap-4 mt-4">
        <Button
          type="submit"
          form="email-form"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {t("login.form.submit")}
        </Button>
      </div>
      <LoginFooter />
    </>
  );
}
