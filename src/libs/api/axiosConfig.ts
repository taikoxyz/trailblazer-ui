import { apiConfig } from '$config';
import type { AxiosRequestConfig } from 'axios';

export const globalAxiosConfig: AxiosRequestConfig = {
  timeout: apiConfig.timeout,
};
