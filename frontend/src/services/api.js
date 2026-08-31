import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const predictRisk = async (data) => {
  const response = await api.post("/api/predict", data);
  return response.data;
};

export const sendChatMessage = async (data) => {
  const response = await api.post("/api/chat", data);
  return response.data;
};

export const healthCheck = async () => {
  const response = await api.get("/api/health");
  return response.data;
};

export default api;