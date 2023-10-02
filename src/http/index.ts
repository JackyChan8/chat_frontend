import axios, { AxiosInstance } from 'axios';

import { SERVER_URI } from '@/constants';

const $api: AxiosInstance = axios.create({
  baseURL: SERVER_URI,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        localStorage.removeItem('token');
        const response = await axios.get(`${SERVER_URI}auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.token);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Не авторизован. error in interceptors.response error callback -->', error);
      }
    }
    throw error;
  },
);

export default $api;
