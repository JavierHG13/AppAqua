import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://servidoriot.vercel.app/api";
//const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token a cada solicitud
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("jwt");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;