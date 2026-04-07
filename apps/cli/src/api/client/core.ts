import {
  httpClient,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "@paul/http";
import { CORE_API_URL } from "../../environment";

export const coreClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.get<T>(`${CORE_API_URL}${url}`, config),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.post<T>(`${CORE_API_URL}${url}`, data, config),
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.put<T>(`${CORE_API_URL}${url}`, data, config),
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.patch<T>(`${CORE_API_URL}${url}`, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    httpClient.delete<T>(`${CORE_API_URL}${url}`, config),
};
