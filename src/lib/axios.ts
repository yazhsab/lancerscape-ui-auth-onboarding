import axios from 'axios';
import { toast } from 'react-hot-toast';

// Use proxy in production, direct connection in development
const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment 
  ? 'http://ec2-3-238-114-176.compute-1.amazonaws.com:3000'
  : '/api'; // Use proxy in production

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and other configurations
  timeout: 10000,
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
    // Handle network errors (like mixed content)
    if (error.code === 'ERR_NETWORK' || error.message.includes('Mixed Content')) {
      toast.error('Unable to connect to server. Please ensure the backend is accessible.');
      return Promise.reject(error);
    }
    
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