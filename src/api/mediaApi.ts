import axios from "axios";

const API = "http://localhost:9090/api/media";

export const uploadMedia = (file: File, uploadedBy: string) => {
  const token = sessionStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadedBy", uploadedBy);

  return axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
  });
};

export const getAllMedia = () => {
  const token = sessionStorage.getItem("token");

  return axios.get(`${API}/all`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
  });
};
