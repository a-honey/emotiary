import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;

    // refreshToken 요청

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
});

formDataInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
