"use client";

import { useRouter } from "next/navigation";
import { authService } from "./auth-api.service";
import { useAuth } from "./use-auth";
import { useLogin } from "./login-context";
import { toast } from "@paul/ui";
import { useTranslation } from "react-i18next";

export function useLoginActions() {
  const { t } = useTranslation();
  const { login: finishLogin } = useAuth();
  const router = useRouter();
  const { email, setEmail, setIsNewUser, isNewUser, setIsLoading } = useLogin();

  const handleEmailSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.checkEmail(data.email);
      setEmail(data.email);
      setIsNewUser(!response.isRegistered);
      router.push("/login/password");
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error(t("login.errors.check_email"));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: { password: string }) => {
    setIsLoading(true);
    try {
      if (isNewUser) {
        const response = await authService.register(email, data.password);
        finishLogin(response.token, response.refreshToken);
        router.push("/");
      } else {
        await authService.loginPassword(email, data.password);
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(t("login.errors.login_password"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithoutPassword = async () => {
    setIsLoading(true);
    try {
      await authService.sendCode(email);
      router.push("/login/otp");
    } catch {
      toast.error(t("login.errors.send_code"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await authService.sendCode(email);
      router.push("/login/recovery");
    } catch {
      toast.error(t("login.errors.send_code"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyCode(email, code);
      finishLogin(response.token, response.refreshToken);
      router.push("/");
      return true;
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(t("login.errors.verify_code"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = async (data: {
    code: string;
    newPassword: string;
  }) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      });
      toast.success(t("login.recovery.success"));
      router.push("/login/password");
    } catch {
      toast.error(t("login.errors.reset_password"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleEmailSubmit,
    handlePasswordSubmit,
    handleLoginWithoutPassword,
    handleForgotPassword,
    handleVerifyOtp,
    handleRecoverySubmit,
  };
}
