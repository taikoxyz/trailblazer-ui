import { isDevelopmentEnv } from './isDevelopmentEnv';

export const cdnBase = isDevelopmentEnv
  ? '' // In dev: local root
  : 'https://cdn.trailblazer.taiko.xyz/ui';
