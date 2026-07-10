import axios from 'axios';
import { getToken } from './auth';

// URL do backend hospedado no Render
const API_URL = 'https://projeto-swingtrack.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;