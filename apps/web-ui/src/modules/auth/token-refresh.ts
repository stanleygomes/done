import { authService } from "./auth-api.service";

export async function refreshTokens() {
  await authService.refreshToken();
  return true;
}

export function handleRefreshFailure() {
  localStorage.removeItem("app-is-authenticated");
  localStorage.removeItem("app-user");
  window.dispatchEvent(new Event("storage"));
  window.location.href = "/login";
}
