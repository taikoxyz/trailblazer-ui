import { json } from '@sveltejs/kit';
import type { Address } from 'viem';

import { ActivityType, type UserPointHistory } from '$lib/domains/profile/types/ActivityHistory';

type APIResponse<T> = {
  items: T[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: boolean;
  first: boolean;
  visible: number;
};

export function GET({ url }) {
  const address = url.searchParams.get('address') as Address;
  if (!address) throw new Error('address is required');

  return json({
    items: [
      {
        address: address,
        points: 0,
        event: ActivityType.TRANSACTION,
        date: 1721642099,
        multiplier: 3,
      },
      {
        address: address,
        points: 0,
        event: ActivityType.TRANSACTION_VALUE,
        date: 1721642099,
        multiplier: 4,
      },
      {
        address: address,
        points: 0,
        event: ActivityType.TRANSACTION,
        date: 1721642099,
        multiplier: 1,
      },
      {
        address: address,
        points: 0,
        event: ActivityType.BRIDGED,
        date: 1721642039,
        multiplier: 1,
      },
      {
        address: address,
        points: 0,
        event: ActivityType.BLOCK_PROPOSED,
        date: 1721642039,
        multiplier: 1,
      },
      {
        address: address,
        points: 5000,
        event: ActivityType.TRANSACTION,
        date: 1721641979,
        multiplier: 5,
      },
      {
        address: address,
        points: 1234,
        event: ActivityType.TRANSACTION,
        date: 1721641943,
        multiplier: 1,
      },
      {
        address: address,
        points: 12345678,
        event: ActivityType.TRANSACTION,
        date: 1721641907,
        multiplier: 1,
      },
      {
        address: address,
        points: 123456789,
        event: ActivityType.BRIDGED,
        date: 1721571479,
        multiplier: 1,
      },
      {
        address: address,
        points: 123456789,
        event: ActivityType.TRANSACTION,
        date: 1721571431,
        multiplier: 1,
      },
      {
        address: address,
        points: 123456789,
        event: ActivityType.TRANSACTION_VALUE,
        date: 1721571431,
        multiplier: 1,
      },
      {
        address: address,
        points: 1234567890,
        event: ActivityType.TRANSACTION,
        date: 1721571263,
        multiplier: 1,
      },
      {
        address: address,
        points: 123.456789,
        event: ActivityType.TRANSACTION_VALUE,
        date: 1721571263,
        multiplier: 1,
      },
      {
        address: address,
        points: 1.23456789,
        event: ActivityType.TRANSACTION,
        date: 1721571155,
        multiplier: 1,
      },
    ],
    page: 0,
    size: 20,
    max_page: 3,
    total_pages: 4,
    total: 64,
    last: false,
    first: true,
    visible: 20,
  } satisfies APIResponse<UserPointHistory>);
}
