import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/plants' });

export const getPlants = () => API.get('/');
export const updateSettings = (id, data) => API.put(`/${id}/settings`, data);
export const updateMoisture = (data) => API.post('/updateMoisture', data);
export const addPlant = (data) => API.post('/', data);
