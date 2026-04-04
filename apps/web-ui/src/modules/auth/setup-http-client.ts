import { httpClient } from "@paul/http";
import { authService } from "./auth-api.service";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

let initialized = false;

export function setupHttpClient() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      const status = error.response?.status;
      const originalRequest = config;

      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/v1/auth/refresh-token")
      ) {
        if (isRefreshing) {
          console.log(
            "[Auth] Token refresh already in progress, queuing request...",
          );
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              originalRequest._retry = true;
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              resolve(httpClient(originalRequest));
            });
          });
        }

        console.log("[Auth] Token expired (401), attempting refresh...");
        originalRequest._retry = true;
        isRefreshing = true;

        const refreshTokenStr = localStorage.getItem("done-refresh-token");
        if (!refreshTokenStr) {
          console.warn(
            "[Auth] No refresh token found in storage, forcing logout.",
          );
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const parsedRefreshToken = JSON.parse(refreshTokenStr);
          const result = await authService.refreshToken(parsedRefreshToken);

          console.log("[Auth] Token refreshed successfully.");
          localStorage.setItem("done-token", JSON.stringify(result.token));
          localStorage.setItem(
            "done-refresh-token",
            JSON.stringify(result.refreshToken),
          );

          // Force update for useLocalStorage hooks
          window.dispatchEvent(new Event("storage"));

          onRefreshed(result.token);
          isRefreshing = false;

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${result.token}`;
          }
          return httpClient(originalRequest);
        } catch (refreshError) {
          console.error(
            "[Auth] Session expired during refresh, logging out.",
            refreshError,
          );
          isRefreshing = false;
          localStorage.removeItem("done-token");
          localStorage.removeItem("done-refresh-token");
          window.dispatchEvent(new Event("storage"));
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
}
