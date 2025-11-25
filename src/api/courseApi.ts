import api from "./axios";

export const getAllCourses = () => api.get("/api/courses");

export const getCourseById = (id: number | string) =>
  api.get(`/api/courses/${id}`);

export const createCourse = (courseData: any) =>
  api.post("/api/courses", courseData);

export const updateCourse = (id: number, courseData: any) =>
  api.put(`/api/courses/${id}`, courseData);

export const deleteCourse = (id: number) => api.delete(`/api/courses/${id}`);
