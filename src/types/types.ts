import type { Address } from 'viem';

export interface Toast {
  id?: number;
  type: 'info' | 'success' | 'error';
  dismissible?: boolean;
  timeout?: number;
  message?: string;
}

export type ScreenMode = 'desktop' | 'mobile';

export type IChainId = 167009 | 167000;

export type IContractData = Address;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IToDo = any;
