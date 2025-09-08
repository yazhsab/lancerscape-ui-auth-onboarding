import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://ec2-3-238-114-176.compute-1.amazonaws.com:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.errors?.[0]?.detail || 
                   error.response?.data?.message || 
                   'Something went wrong';
    toast.error(message);
    
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;