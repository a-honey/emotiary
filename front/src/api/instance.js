import axios from 'axios';
import { getRefreshToken } from '../utils/localStorageHandlers';

//const baseURL = process.env.REACT_APP_BASE_URL;
const baseURL = "http://localhost:5001"

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('token');

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
    const userToken = localStorage.getItem('token');

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답을 인터셉트하여 만료되었을 경우 refresh token으로 새로운 토큰을 요청
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const response = await instance.post(
        '/users/refresh-token',
        getRefreshToken,
      );
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.data);
      return;
    }
    return Promise.reject(error);
  },
);
