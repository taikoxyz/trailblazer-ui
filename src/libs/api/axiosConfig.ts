import type { AxiosRequestConfig } from 'axios';

import { apiConfig } from '$config';

export const globalAxiosConfig: AxiosRequestConfig = {
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};
