import { CustomTokenService } from './CustomTokenService';

export const customTokenService = new CustomTokenService(globalThis.localStorage);
