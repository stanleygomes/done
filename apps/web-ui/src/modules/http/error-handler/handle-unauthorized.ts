import { httpClient } from "@paul/http";
import { handleRefreshFailure, refreshTokens } from "../../auth/token-refresh";

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

export async function handleUnauthorized(originalRequest: any) {
  if (isRefreshing) {
    return waitAndRetry(originalRequest);
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    await refreshTokens();
    onRefreshed();
    isRefreshing = false;
    return retryRequest(originalRequest);
  } catch (refreshError) {
    isRefreshing = false;
    handleRefreshFailure();
    return Promise.reject(refreshError);
  }
}

export function isUnauthorizedError(error: any) {
  const status = error.response?.status;
  const url = error.config?.url;
  const isRetry = error.config?._retry;

  return (
    status === 401 &&
    error.config &&
    !isRetry &&
    !url?.includes("/v1/auth/refresh-token")
  );
}

function onRefreshed() {
  refreshSubscribers.map((cb) => cb());
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: () => void) {
  refreshSubscribers.push(cb);
}

function waitAndRetry(originalRequest: any) {
  return new Promise((resolve) => {
    addRefreshSubscriber(() => {
      resolve(retryRequest(originalRequest));
    });
  });
}

function retryRequest(originalRequest: any) {
  originalRequest._retry = true;
  return httpClient(originalRequest);
}
