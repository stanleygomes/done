"use client";

import { Button } from "@paul/ui/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@paul/ui/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLogin } from "../../modules/auth/login-context";
import { useLoginActions } from "../../modules/auth/use-login-actions";
import { LoginHeader } from "./login-header";

export default function OtpContainer() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, isNewUser, isLoading } = useLogin();
  const { handleVerifyOtp } = useLoginActions();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  if (!email) return null;

  const handleVerify = async () => {
    if (value.length === 6) {
      const success = await handleVerifyOtp(value);
      if (!success) {
        setValue("");
        inputRef.current?.focus();
      }
    }
  };

  return (
    <>
      <LoginHeader
        title={
          isNewUser ? t("login.otp.title_new") : t("login.otp.title_existing")
        }
        backHref="/login/password"
      />
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground/70 leading-relaxed">
          <Trans
            i18nKey={
              isNewUser ? "login.otp.message_new" : "login.otp.message_existing"
            }
            values={{ email }}
            components={[
              <span
                key="email"
                className="text-foreground font-black underline decoration-main decoration-2 underline-offset-4"
              />,
            ]}
          />
        </p>

        <div className="flex justify-center py-4">
          <InputOTP
            ref={inputRef}
            maxLength={6}
            value={value}
            onChange={(val) => setValue(val)}
            onComplete={handleVerify}
            disabled={isLoading}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-main hover:underline decoration-main decoration-2 underline-offset-4 cursor-pointer text-left"
        >
          {t("login.otp.change_email")}
        </button>
      </div>
      <div className="mt-4">
        <Button
          onClick={handleVerify}
          disabled={value.length < 6 || isLoading}
          isLoading={isLoading}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {isNewUser
            ? t("login.otp.submit_new")
            : t("login.otp.submit_existing")}
        </Button>
      </div>
    </>
  );
}
