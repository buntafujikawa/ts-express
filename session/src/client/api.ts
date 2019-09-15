import axios, { AxiosRequestConfig } from "axios";
import { APP_HOST, APP_PORT } from "../constants";
import { GET } from "../types/get";
import { POST } from "../types/post";
import { PUT } from "../types/put";

export const axiosInstace = axios.create({
  baseURL: `http://${APP_HOST}:${APP_PORT}`,
  headers: { "Content-Type": "application/json" },
  responseType: "json"
});

export function apiGet<T extends keyof GET>(
  path: T,
  config?: AxiosRequestConfig
) {
  return axiosInstace.get<GET[T]["res"]>(path, config);
}

export function apiPost<T extends keyof POST>(
  path: T,
  data?: POST[T]["req"]["body"],
  config?: AxiosRequestConfig
) {
  return axiosInstace.post<POST[T]["res"]>(path, data, config);
}

export function apiPut<T extends keyof PUT>(
  path: T,
  data?: PUT[T]["req"]["body"],
  config?: AxiosRequestConfig
) {
  return axiosInstace.put<PUT[T]["res"]>(path, data, config);
}
