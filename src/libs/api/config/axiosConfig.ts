import type { AxiosRequestConfig } from 'axios';
import axios, { type AxiosInstance } from 'axios';

import { apiConfig } from '$config';

import { baseSeasonURL } from './baseApiUrl';

export const globalAxiosConfig: AxiosRequestConfig = {
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseSeasonURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);
