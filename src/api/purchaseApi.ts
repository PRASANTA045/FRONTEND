import api from "./axios";

export const purchaseCourse = (data: any) => api.post("/api/purchase", data);

export const getMyPurchases = () => api.get("/api/purchase/my");

export const getAllPurchases = () => api.get("/api/purchase/all");

// NEW: fetch simplified purchased courses
export const getMyCourses = () => api.get("/api/purchase/my-courses");

export const getAllUsersWithPurchases = () =>
  api.get("/api/purchase/admin/user-purchases");
