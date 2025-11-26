import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

// DO NOT ATTACH AUTHORIZATION HEADER AT ALL
api.interceptors.request.use((config) => {
  return config;
});

export default api;
