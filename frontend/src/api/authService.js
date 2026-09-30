// src/api/authService.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}/auth/`; // Backend auth route

// --- Register user ---
const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}register`, { name, email, password });
  return response.data;
};

// --- Login user ---
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, { email, password });

  // ✅ Store token in localStorage if it exists
  const token = response.data?.token;
  if (token) {
    localStorage.setItem('token', token);
  }

  return response.data;
};

// --- Logout user ---
const logout = () => {
  localStorage.removeItem('token');
};

// --- Get current token (used in axios interceptor) ---
const getCurrentUserToken = () => {
  return localStorage.getItem('token') || null;
};

// --- Check if user is logged in ---
const isLoggedIn = () => {
  return !!getCurrentUserToken();
};

// Optional: Get Authorization header for Axios if needed
const authHeader = () => {
  const token = getCurrentUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const authService = {
  register,
  login,
  logout,
  getCurrentUserToken,
  isLoggedIn,
  authHeader, // 🔹 can be used with custom Axios requests
};

export default authService;
