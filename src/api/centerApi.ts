import api from "./axios";

export const getAllCenters = () => api.get("/api/centers");

export const createCenter = (data: any) => api.post("/api/centers", data);

export const updateCenter = (id: number, data: any) =>
  api.put(`/api/centers/${id}`, data);

export const deleteCenter = (id: number) => api.delete(`/api/centers/${id}`);
