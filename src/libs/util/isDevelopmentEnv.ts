const { MODE } = import.meta.env;
import { PUBLIC_ENV } from '$env/static/public';

export const isDevelopmentEnv = PUBLIC_ENV === 'development' || MODE === 'development';
