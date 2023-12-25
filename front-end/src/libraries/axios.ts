import authService from "@/services/auth.service";
import axiosClient from "axios";
import type { AxiosRequestConfig } from "axios";

const auth = authService.getAuth();
const accessToken = auth?.accessToken || "";

const instance = axiosClient.create({
  baseURL: import.meta.env.VITE_BE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${accessToken}`,
  },
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

export default axios;
