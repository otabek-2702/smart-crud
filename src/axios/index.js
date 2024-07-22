import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

const token = getToken();
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.log('There is no token');
}

// Add a request interceptor to ensure the token is added to every request
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
