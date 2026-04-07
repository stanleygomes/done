import {
  httpClient,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "@paul/http";
import { AUTH_API_URL } from "../../environment";

export const authClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.get<T>(`${AUTH_API_URL}${url}`, config),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.post<T>(`${AUTH_API_URL}${url}`, data, config),
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.put<T>(`${AUTH_API_URL}${url}`, data, config),
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.patch<T>(`${AUTH_API_URL}${url}`, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.delete<T>(`${AUTH_API_URL}${url}`, config),
};
