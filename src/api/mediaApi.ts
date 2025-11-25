import api from "./axios"; // ✅ use global axios instance

// BASE PATH — NO localhost
const BASE = "/api/media";

// UPLOAD MEDIA
export const uploadMedia = (file: File, uploadedBy: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadedBy", uploadedBy);

  return api.post(`${BASE}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET ALL MEDIA
export const getAllMedia = () => {
  return api.get(`${BASE}/all`);
};
