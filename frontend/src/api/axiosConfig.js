// src/api/axiosConfig.js
import axios from "axios";
import authService from "./authService";

const rawBase = (process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api").trim().replace(/\/+$/, '');
export const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;

// Create Axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    // 1️⃣ Get token from authService
    let token = authService?.getCurrentUserToken?.() || null;

    // 2️⃣ Fallback: try from localStorage
    if (!token) {
      token = localStorage.getItem("token") || null;
    }

    // 3️⃣ Attach token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("❌ Unauthorized! Token may be invalid or expired.");
    }
    return Promise.reject(error);
  }
);

export default instance;
