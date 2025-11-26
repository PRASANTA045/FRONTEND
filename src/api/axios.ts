import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

// ======================================
//   INTERCEPTOR FIX → DO NOT send 
//   old JWT token during LOGIN or REGISTER
// ======================================
api.interceptors.request.use((config) => {
  
  // DO NOT attach token for login/register
  if (
    config.url?.includes("/auth/login") || 
    config.url?.includes("/auth/register")
  ) {
    return config; 
  }

  // Attach token for all other API calls
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================================
// OPTIONAL: Response interceptor 
// Auto-save JWT token into sessionStorage
// ======================================
api.interceptors.response.use(
  (response) => {
    // If backend ever returns JWT in body (not cookie)
    if (response.data?.token) {
      sessionStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
