import axios from 'axios';

export const loginUser = async (credentials) => {
  return axios.post('/api/auth/login', credentials);
};

export const registerUser = async (data) => {
  return axios.post('/api/auth/register', data);
};
