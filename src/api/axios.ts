import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,   // 🔥 VERY IMPORTANT
});

// ===============================
// REMOVE ALL TOKEN LOGIC
// JWT Cookie will be sent automatically
// ===============================
api.interceptors.request.use((config) => {
  // NEVER attach Authorization header
  // NEVER read sessionStorage token
  return config;
});

// ===============================
// REMOVE response token saving also
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
