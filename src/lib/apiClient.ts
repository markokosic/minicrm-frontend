import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('API call failed:', error);
    // Handle specific error cases
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_active');
      }
    }
    return Promise.reject(error);
  }
);


export { api };
