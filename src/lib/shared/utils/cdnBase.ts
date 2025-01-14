import { isDevelopmentEnv } from './isDevelopmentEnv';

const useLocalFiles = process.env.PUBLIC_NO_CDN === 'true';

export const cdnBase =
  isDevelopmentEnv || !useLocalFiles
    ? '' // In dev: local root
    : 'https://cdn.trailblazer.taiko.xyz/ui';
