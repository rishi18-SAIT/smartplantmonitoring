// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../api/authService';

const ProtectedRoute = () => {
  const token = authService.getCurrentUserToken();

  // If there's a token, render the child component via <Outlet />
  // Otherwise, redirect the user to the /login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;