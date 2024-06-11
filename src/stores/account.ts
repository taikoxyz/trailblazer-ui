import type { GetAccountReturnType } from '@wagmi/core';
import { writable } from 'svelte/store';
import { zeroAddress } from 'viem';

export type Account = GetAccountReturnType;

export const account = writable<GetAccountReturnType>();
export const address = writable<`0x${string}` | undefined>(zeroAddress);
