import { getCookieAction } from "@/app/actions";
import axios from "axios";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_KEYWORD } from "./constants";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await getCookieAction(ACCESS_TOKEN_KEYWORD);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post("/api/auth/refresh");

        if (refreshResponse.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        // await axios.post("/api/auth/logout");

        redirect("/auth/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
