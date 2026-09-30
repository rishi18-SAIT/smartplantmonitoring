// src/api/axiosConfig.js
import axios from "axios";
import authService from "./authService";

// Create Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 🔑 change if deployed
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
      console.log("✅ Attached token:", token); // debug log
    } else {
      console.warn("⚠️ No token found. Requests may return 401 Unauthorized.");
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
      // Optional: redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
