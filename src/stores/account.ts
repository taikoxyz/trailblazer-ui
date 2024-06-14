import type { GetAccountReturnType } from '@wagmi/core';
import { writable } from 'svelte/store';
import { type Address, zeroAddress } from 'viem';

export type Account = GetAccountReturnType;

export const account = writable<GetAccountReturnType>();
export const address = writable<Address | undefined>(zeroAddress);
