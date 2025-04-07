import { isDevelopmentEnv } from '../isDevelopmentEnv';

export default function getTaikoStatusEndpoint(): string {
  if (isDevelopmentEnv) {
    return '/api/mock-api/s4/taiko-status?address=';
  }
  return 'https://trailblazer.mainnet.taiko.xyz/s4/taikopass?address=';
}
