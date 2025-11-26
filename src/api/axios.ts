import axios from "axios";

// GLOBAL FIX
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// INTERCEPTOR → DON'T attach token during login/register
api.interceptors.request.use((config) => {
  if (
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/register")
  ) {
    return config;
  }

  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
