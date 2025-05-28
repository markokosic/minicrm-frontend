import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call failed:', error);
    // Handle specific error cases
    if (error.response.status === 401) {
      // Unauthorized
    } else if (error.response.status === 404) {
      // Not found
    }
    return Promise.reject(error);
  }
);

export { api };
